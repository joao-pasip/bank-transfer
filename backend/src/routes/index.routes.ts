import { Router } from 'express';
import routesUsers from './users.routes';
import routeHome from './home.routes';

const routes = Router();
routes.use(routesUsers);
routes.use(routeHome);

export default routes;