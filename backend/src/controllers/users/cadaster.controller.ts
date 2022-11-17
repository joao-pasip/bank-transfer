import CadasterService from '../../services/users/cadaster.service';
import { Request, Response } from 'express';

export default class CadasterController {
  static async userRegister(req: Request, res: Response) {
    const infoUser = req.body;

    const user = await CadasterService.userRegister(infoUser);

    return res.status(200).json({ data: user });
  }
}