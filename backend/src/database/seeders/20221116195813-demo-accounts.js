'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
     await queryInterface.bulkInsert('accounts', [
      {
        balance: 50.00,
      },
      {
        balance: 200.00,
      },
      {
        balance: 999.99,
      }
     ], {});
  },

  async down (queryInterface, _Sequelize) {
     await queryInterface.bulkDelete('accounts', null, {});
  }
};
