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