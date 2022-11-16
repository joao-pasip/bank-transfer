import 'express-async-errors';
import * as express from 'express';
// import cors from 'cors';
import routes from './routes/index.routes'
import globalError from './helpers/error/global.error';

const accessControl: express.RequestHandler = (_req, res, next) => {
  const allowedOrigins = ['http://localhost:3001', 'http://localhost:3002'];

  res.header('Access-Control-Allow-Origin', allowedOrigins);
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

const app = express();
app.use(express.json());
app.use(accessControl);
app.use(routes);

app.use(globalError);

export default app;