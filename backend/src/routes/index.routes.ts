import { Router } from 'express';
import routesUsers from './users.routes';

const routes = Router();
routes.use(routesUsers);

export default routes;