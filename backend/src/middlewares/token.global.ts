import { Request, Response, NextFunction } from 'express';
import Jwt from '../utils/jwt';
import CustomError from '../helpers/error/custom.error';

export default class TokenGlobal {
  static validationToken(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if(!token) throw new CustomError(400, 'Token not exists');
    Jwt.verify(token);

    return next();
  }
}