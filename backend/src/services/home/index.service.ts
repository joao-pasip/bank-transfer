import UserModel from '../../database/models/users';
import AccountModel from '../../database/models/accounts';
import CustomError from '../../helpers/error/custom.error';
import * as jwt from 'jsonwebtoken';
// import * as jwt_decode from 'jwt-decode'
import { JwtPayload } from '../../interfaces/jwt_payload.interface';

// interface JwtPayload {
//   username: string
// }
export default class HomeService {
  static async board(token: string) {
    // if(!token) throw new CustomError(401, 'Token not found');
    // const payload = jwt_decode.default(token, { header: true})
    const decoded = jwt.decode(token, {complete: true});
    if(!decoded) throw new CustomError(401, 'Token not decoded');
    const { username } = decoded.payload as JwtPayload;
    // const { username } = payload;
    // console.log(username)
    // console.log(username);

    const user = await UserModel.findOne({
      where: { username: username },
      include: [
        {
          model: AccountModel,
        }
      ]
    });

    if(!user) throw new CustomError(400,'user not found');

    const infoUser = user.dataValues;

    const newUser = {
      username: infoUser.username,
      accountId: infoUser.accountId,
      balance: Number(parseFloat(infoUser.account.dataValues.balance).toFixed(2)),
    };
    // console.log(newUser);
    return newUser;
  }
}
