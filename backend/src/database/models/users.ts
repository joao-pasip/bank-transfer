import { Model, DataTypes } from 'sequelize';
import db from '.';
import AccountModel from './accounts';

class UserModel extends Model {
  declare id: number;

  declare username: string;

  declare password: string;

  declare accountId: number;
}


UserModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  accountId: {
    allowNull: false,
    field: 'account_id',
    type: DataTypes.INTEGER,
    references: { model: AccountModel, key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
}, {
  underscored: true,
  tableName: 'users',
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

AccountModel.hasOne(UserModel);

UserModel.belongsTo(AccountModel, {
  foreignKey: {
    name: 'accountId'
  }
});

export default UserModel;