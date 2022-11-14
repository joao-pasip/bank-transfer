import { Router } from "express";

const routesUsers = Router();

routesUsers.get('/user', (_req, res) => {
  return res.status(200).json({message: 'Tudo certo na bahia'})
})

export default routesUsers;