import { ILogin } from '../../interfaces/login.interface';
import Jwt from '../../utils/jwt';
import CustomError from '../../helpers/error/custom.error';
import UserModel from '../../database/models/users';
import BcryptService from '../../utils/bcrypt';

export default class LoginService {
  static async login(userLogin: ILogin) {
    const { username } = userLogin;
    const userDB = await UserModel.findOne({ where: { username } });

    if (!userDB) {
      throw new CustomError(401, 'Incorrect email or password');
    }

    BcryptService.decrypt(userLogin.password, userDB.password);

    const token = Jwt.generate({
      username
    });

    const dataLogin = {
      username,
      token,
    }

    return dataLogin;
  }
}