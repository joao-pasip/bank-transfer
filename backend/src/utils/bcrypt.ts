import CustomError from '../helpers/error/custom.error';
import * as bcrypt from 'bcryptjs';

export default class BcryptService {
  static encrypt(key: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(key, salt);
    return hash;
  }

  static decrypt(key: string, hash: string) {
    const password = bcrypt.compareSync(key, hash);

    if(!password) throw new CustomError(401, 'Incorrect email or password');
  }
}