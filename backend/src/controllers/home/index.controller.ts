import { Request, Response } from 'express';
import HomeService from '../../services/home/index.service';
import CustomError from '../../helpers/error/custom.error';

export default class HomeController {
  static async board(req: Request, res: Response) {
    const token = req.headers.authorization;
    if(!token) throw new CustomError(401, 'Token not found');
    const userInfos = await HomeService.board(token);
    return res.status(200).json({ data: userInfos });
  }
}