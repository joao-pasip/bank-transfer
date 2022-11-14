import 'express-async-errors';
import express from 'express';
import routes from './routes/index.routes'
import globalError from './helpers/error/global.error';

const app = express();
app.use(express.json());
app.use(routes);

app.use(globalError);

export default app;