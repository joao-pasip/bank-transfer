import ExtractService from '../../services/extract/extract.service';
import { Request, Response } from 'express';
import CustomError from '../../helpers/error/custom.error';

export default class ExtractController {
  static async getExtractGeneral(req: Request, res: Response) {
    const token = req.headers.authorization;
    if(!token) throw new CustomError(401, 'Token not found');
    const extract = await ExtractService.extractGeneral(token);
    return res.status(200).json({ data: extract });
  }
}