import { Request, Response } from 'express';
import { ICash_in_user } from '../../interfaces/cash_in_user.interface';
import TransactionService from '../../services/transactions/post.transaction.service';
import CustomError from '../../helpers/error/custom.error';

export default class TransactionController {
  static async postTransaction(req: Request, res: Response) {
    const token = req.headers.authorization;
    if(!token) throw new CustomError(401, 'Token not found');
    const user_cash_in: ICash_in_user = req.body;

    const transaction = await TransactionService.postTransaction(token, user_cash_in);

    return res.status(200).json({ data: transaction });
  }
}