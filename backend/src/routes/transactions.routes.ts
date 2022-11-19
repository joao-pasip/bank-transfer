import { Router } from 'express';
import TokenGlobal from '../middlewares/token.global';
import TransactionController from '../controllers/transactions/post.transaction.controller';

const transactionsRoute = Router();

transactionsRoute.post(
  '/transaction', 
  TokenGlobal.validationToken, 
  TransactionController.postTransaction
);

export default transactionsRoute;