import TokenGlobal from '../middlewares/token.global';
import { Router } from 'express';
import HomeController from '../controllers/home/index.controller';

const routeHome = Router();

routeHome.get('/home', TokenGlobal.validationToken, HomeController.board)

export default routeHome;