'use strict';
/** @type {import('sequelize-cli').Migration} */
// import moment from 'moment';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      debitedAccountId: {
        allowNull: false,
        foreignKey: true,
        field: 'debited_account_id',
        type: Sequelize.INTEGER,
        references: { model: 'accounts', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      creditedAccountId: {
        allowNull: false,
        foreignKey: true,
        field: 'credited_account_id',
        type: Sequelize.INTEGER,
        references: { model: 'accounts', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      value: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE,
        get() {
          return this.getDataValue('createdAt').format('DD/MM/YYYY h:mm:ss');
        }
      }
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};