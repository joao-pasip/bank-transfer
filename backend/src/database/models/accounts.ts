import { Model, DataTypes } from 'sequelize';
import db from '.';

class AccountModel extends Model {
  declare id: number;

  declare balance: number;
}


AccountModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  balance: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
    get() {
      return parseFloat(this.getDataValue('balance'));
    },
    defaultValue: 100.00,
  },
}, {
  underscored: true,
  tableName: 'accounts',
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
})

export default AccountModel;