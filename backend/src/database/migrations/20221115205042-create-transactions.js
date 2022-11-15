'use strict';
/** @type {import('sequelize-cli').Migration} */
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
        type: Sequelize.INTEGER,
        references: { model: 'accounts', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      creditedAccountId: {
        allowNull: false,
        foreignKey: true,
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
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};