import { Sequelize } from 'sequelize';
import * as config from '../config/database';

// config.types.setTypeParser(1114, (str:string) => new Date((str.split(' ').join('T'))+'Z'));

const sequelize = new Sequelize(config);

export default sequelize;