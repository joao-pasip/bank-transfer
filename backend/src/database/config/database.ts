import 'dotenv/config';
import { Options } from 'sequelize';
// require('dotenv/config')

const config: Options = {
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '123456',
  database: process.env.POSTGRES_DB || 'NG_CASH',
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT) || 5432,
  dialect: 'postgres',
  define: {
    timestamps: true,
  },
};

module.exports = config;

// module.exports = {
//   "development": {
//     "username": process.env.DB_USER || 'root',
//     "password": process.env.DB_PASS || '123456',
//     "database": process.env.DB_NAME || 'NG_CASH',
//     "host": process.env.DB_HOST || 'localhost',
//     "port": Number(process.env.DB_PORT) || 5432,
//     "dialect": "postgres"
//   },
//   "test": {
//     "username": process.env.DB_USER || 'root',
//     "password": process.env.DB_PASS || '123456',
//     "database": process.env.DB_NAME || 'NG_CASH',
//     "host": process.env.DB_HOST || 'localhost',
//     "port": Number(process.env.DB_PORT) || 5432,
//     "dialect": "postgres"
//   },
//   "production": {
//     "username": process.env.DB_USER || 'root',
//     "password": process.env.DB_PASS || '123456',
//     "database": process.env.DB_NAME || 'NG_CASH',
//     "host": process.env.DB_HOST || 'localhost',
//     "port": Number(process.env.DB_PORT) || 5432,
//     "dialect": "postgres"
//   }
// }