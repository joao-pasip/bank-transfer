import LoginService from '../../services/users/login.service';
import { Request, Response } from 'express';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const bodyLogin = req.body;
    const userLogin = await LoginService.login(bodyLogin);
    return res.status(200).json({ data: userLogin });
  }
}