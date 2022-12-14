'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      balance: {
        allowNull: false,
        type: Sequelize.DECIMAL,
        get() {
          const value = this.getDataValue('balance');
          return parseFloat(value);
        }
      }
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('accounts');
  }
};