import { Router } from "express";
import LoginValidation from '../middlewares/schemas/login.schema';
import LoginController from '../controllers/users/login.controllers';

import CadasterController from '../controllers/users/cadaster.controller';

const routesUsers = Router();

routesUsers.post('/login', LoginValidation.login, LoginController.login);

routesUsers.post('/cadaster/user', LoginValidation.login, CadasterController.userRegister);

routesUsers.get('/user', (_req, res) => {
  return res.status(200).json({message: 'Tudo certo na bahia'})
})

export default routesUsers;