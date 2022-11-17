import CustomError from '../../helpers/error/custom.error';
import sequelize from '../../database/models';
import UserModel from '../../database/models/users';
import AccountModel from '../../database/models/accounts';
import { ILogin } from '../../interfaces/login.interface';
import BcryptService from '../../utils/bcrypt';
import Jwt from '../../utils/jwt';

export default class CadasterService {

  static async validated(username: string, password:string) {
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/
    const validatedPassword = regexPassword.test(password);
    const userDB = await UserModel.findOne({ where: { username } });

    if(userDB) throw new CustomError(400, 'Already exists that username');
    if(!validatedPassword) throw new CustomError(400, 'Your password need have one number, one letter uppercase and eight characters in the minimum');

    if(!userDB && validatedPassword) return true;

  }

  static async userRegister(user: ILogin) {
    // let transaction;
    let newUser;

    const { username, password } = user;
    const validatedFields = await this.validated(username, password);
    const hashPassword = BcryptService.encrypt(password);

    if(validatedFields) {
      const result = await sequelize.transaction(async (t) => {
        const accountDB = await AccountModel.create({}, { transaction: t });

        await UserModel.create({
          username,
          password: hashPassword,
          accountId: accountDB.id
        }, { transaction: t });

        const token = Jwt.generate({ username });
  
        newUser = {
          username,
          token,
          balance: accountDB.balance,
        }

        return newUser;
      })

      return result;
    }

    return newUser;
    // try {
    //   transaction = await sequelize.transaction();
    //   const { username, password } = user;
    //   const validatedFields = await this.validated(username, password);
    //   const hashPassword = BcryptService.encrypt(password);

    //   if(validatedFields) {
    //     const accountDB = await AccountModel.create({}, { transaction });

    //     await UserModel.create({
    //       username,
    //       password: hashPassword,
    //       accountId: accountDB.id
    //     }, { transaction });

    //     const token = Jwt.generate({ username });
  
    //     newUser = {
    //       username,
    //       token,
    //       balance: accountDB.balance,
    //     }

    //     return newUser;
    //   }

    //   console.log('success');
    //   await transaction.commit();

    // } catch (error) {
    //   console.log('error');
    //   if(transaction){
    //     await transaction.rollback();
    //   }
    // }
  }
}