import UserModel from '../../database/models/users'
import AccountModel from '../../database/models/accounts';
import TransactionModel from '../../database/models/transactions';
import CustomError from '../../helpers/error/custom.error';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../../interfaces/jwt_payload.interface';
import sequelize from '../../database/models';
import { Op } from 'sequelize';
// import { IExtract } from '../../interfaces/extract.interface';


export default class ExtractService {
  static async extractGeneral(token: string) {

    const decoded = jwt.decode(token, {complete: true});
    if(!decoded) throw new CustomError(401, 'Token not decoded');
    const { username } = decoded.payload as JwtPayload;
    
    const result = await sequelize.transaction(async (t) => {

      const formattedExtract = async (extracts: TransactionModel[]) => {
        let extractFinally: any;
        const newExtract = await Promise.all(extracts.map(async (extract) => {
          // console.log(extract.dataValues.debitedAccountId)
          const userDebited = await UserModel.findOne({
            where: { accountId: extract.dataValues.debitedAccountId },
            attributes: { exclude: ['password'] }
          });

          const userCredited = await UserModel.findOne({
            where: { accountId: extract.dataValues.creditedAccountId },
            attributes: { exclude: ['password'] }
          })

          if(!userDebited) throw new CustomError(401, 'user debited not found');

          if(!userCredited) throw new CustomError(401, 'user credited not found');

          const formattedUserDebited = userDebited.dataValues;
          const formattedUserCredited = userCredited.dataValues;

          const valueNumber = Number(parseFloat(extract.dataValues.value).toFixed(2));
          // console.log(typeof(valueNumber));

          if(
            extract.dataValues.debitedAccountId === formattedUserDebited.accountId &&
            extract.dataValues.creditedAccountId === formattedUserCredited.accountId
          ) {
            const userExtract = {
              id: extract.dataValues.id,
              value: valueNumber,
              from: {
                accountId: formattedUserCredited.accountId,
                username: formattedUserCredited.username
              },
              to: {
                accountId: formattedUserDebited.accountId,
                username: formattedUserDebited.username
              },
              date: extract.dataValues.createdAt
            }

            extractFinally = userExtract
          }

          return extractFinally;
        }));

        return newExtract;
      }

      const user = await UserModel.findOne({
        where: { username: username },
        include: [
          {
            model: AccountModel,
          }
        ],
        transaction: t
      });

      if(!user) throw new CustomError(401, 'user not found');
      // const accountUser = user.dataValues;
      // console.log(accountUser);
      

      const extract = await TransactionModel.findAll({
        where: {
          [Op.or]: [
            { debitedAccountId: user.accountId},
            { creditedAccountId: user.accountId }
          ]
        },
        transaction: t
      });

      // console.log(extract[0].dataValues)

      const newFormattedExtract = formattedExtract(extract as TransactionModel[]);

      return newFormattedExtract;
    });

    return result;
  }
}