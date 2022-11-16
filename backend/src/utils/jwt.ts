import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ILogin } from '../interfaces/login.interface';
import CustomError from '../helpers/error/custom.error';

export default class Jwt {
  payload: { username: string }

  static generate(payload: { username: string }): string {
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'jwt_secret', { expiresIn: '24h'});
    return token;
  }

  static verify(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
      return decoded as ILogin;
    } catch (error) {
      throw new CustomError(401, 'Token must be a valid token')
    }
  }
}