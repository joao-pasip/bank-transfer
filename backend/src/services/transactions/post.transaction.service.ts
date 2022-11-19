import UserModel from '../../database/models/users'
import AccountModel from '../../database/models/accounts';
import TransactionModel from '../../database/models/transactions';
import HomeService from '../home/index.service';
import CustomError from '../../helpers/error/custom.error';
import { ICash_in_user } from '../../interfaces/cash_in_user.interface';
import { IUser } from '../../interfaces/info_user.interface';
import sequelize from '../../database/models';

export default class TransactionService {

  static validatedTransaction(user_cash_out: IUser, user_cash_in: IUser) {
    let validated;
    if(user_cash_out.balance <= 0) throw new CustomError(401, 'Balance insufficient');

    if(user_cash_out.username === user_cash_in.username) {
      throw new CustomError(401, 'You cannot transact for yourself');
    }

    if(user_cash_out.balance > 0 && user_cash_out.username !== user_cash_in.username) {
      validated = true;
    }

    return validated;
  }

  static async userCashIn(cash_in_user: ICash_in_user) {
    const info_cash_in_user = await UserModel.findOne({
      where: { username: cash_in_user.username },
      include: [
        {
          model: AccountModel,
        }
      ]
    });

    if(!info_cash_in_user) throw new CustomError(400,'user not found');

    const value_info_cash_in_user = info_cash_in_user.dataValues;

    const newUserCashIn = {
      username: value_info_cash_in_user.username,
      accountId: value_info_cash_in_user.accountId,
      balance: Number(parseFloat(value_info_cash_in_user.account.dataValues.balance).toFixed(2)),
    };
    return newUserCashIn;
  }

  static async postTransaction(token: string, cash_in_user: ICash_in_user) {
    let transactionDone;
    const user_cash_out = await HomeService.board(token);
    const user_cash_in = await this.userCashIn(cash_in_user);
    const validated = this.validatedTransaction(user_cash_out, user_cash_in);
    const valueFixed2 = cash_in_user.value.toFixed(2);

    console.log(user_cash_out)
    // console.log(typeof(user_cash_out.balance))
    
    if(validated) {
      const result = await sequelize.transaction(async (t) => {
        await TransactionModel.create({
          debitedAccountId: user_cash_in.accountId,
          creditedAccountId: user_cash_out.accountId,
          value: valueFixed2,
          createdAt: Date()
        }, { transaction: t });

        // const balance_cash_in = user_cash_in.balance + cash_in_user.value

        await AccountModel.update({balance: (user_cash_in.balance + cash_in_user.value)
            .toFixed(2)}, {
          where: {
            id: user_cash_in.accountId,
          },
          transaction: t
        });

        await AccountModel.update({balance: (user_cash_out.balance - cash_in_user.value)
            .toFixed(2)}, {
          where: {
            id: user_cash_out.accountId,
          },
          transaction: t
        });

      });

      transactionDone = result;
    }

    return transactionDone;
  }
}