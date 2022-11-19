import { Model, DataTypes } from 'sequelize';
import db from '.';
import AccountModel from './accounts';

class TransactionModel extends Model {
  declare id: number;

  declare username: string;

  declare password: string;

  declare accountId: number;
}


TransactionModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  debitedAccountId: {
    allowNull: false,
    field: 'debited_account_id',
    type: DataTypes.DECIMAL,
    references: { model: AccountModel, key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  creditedAccountId: {
    allowNull: false,
    field: 'credited_account_id',
    type: DataTypes.DECIMAL,
    references: { model: AccountModel, key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  value: {
    allowNull: false,
    type: DataTypes.DECIMAL,
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE
  }
}, {
  underscored: true,
  tableName: 'transactions',
  sequelize: db,
  modelName: 'transactions',
  timestamps: false,
});

// Associations for transactions that debitedAccountId
TransactionModel.belongsTo(AccountModel, { as: 'debited', foreignKey: 'debitedAccountId' });
AccountModel.hasMany(TransactionModel, { as: 'debiteds', foreignKey: 'debitedAccountId' });

// Associations for transactions that creditedAccountId
TransactionModel.belongsTo(AccountModel, { as: 'credited', foreignKey: 'creditedAccountId' });
AccountModel.hasMany(TransactionModel, { as: 'crediteds', foreignKey: 'creditedAccountId' });

export default TransactionModel;