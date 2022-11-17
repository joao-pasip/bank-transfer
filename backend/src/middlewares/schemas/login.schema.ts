import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../../helpers/error/custom.error';

const msg = 'All fields must be filled';
export default class LoginValidation {
  static login(req: Request, _res: Response, next: NextFunction) {
    const loginSchema = joi.object({
      username: joi.string().min(3).empty().required().messages({
        'string.min': 'username must be at least 3 characters long',
        'any.required': msg,
        'string.empty': msg,
      }),
      password: joi.string().min(8).empty().required().messages({
        'string.min': 'password must be at least 8 characters long',
        'any.required': msg,
        'string.empty': msg,
      })
    });

    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw new CustomError(400, error.message)
    }
    return next();
  }
}
