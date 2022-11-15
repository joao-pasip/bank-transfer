'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      accountId: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: 'accounts', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('users');
  }
};