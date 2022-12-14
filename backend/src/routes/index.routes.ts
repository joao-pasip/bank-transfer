import { Router } from 'express';
import routesUsers from './users.routes';
import routeHome from './home.routes';
import transactionsRoute from './transactions.routes';
import extractRoute from './extract.routes';

const routes = Router();
routes.use(routesUsers);
routes.use(routeHome);
routes.use(transactionsRoute);
routes.use(extractRoute);

export default routes;