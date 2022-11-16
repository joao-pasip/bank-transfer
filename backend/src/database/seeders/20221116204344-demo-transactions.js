'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('transactions', [
     {
      debited_account_id: 1,
      credited_account_id: 2,
      value: 10,
      created_at: '2022-01-17T04:33:12.000Z'
     },
     {
      debited_account_id: 2,
      credited_account_id: 3,
      value: 10,
      created_at: '2022-01-17T04:33:12.000Z'
     },
     {
      debited_account_id: 3,
      credited_account_id: 1,
      value: 10,
      created_at: '2022-01-17T04:33:12.000Z'
     }
    ], {});
 },

 async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('transactions', null, {});
 }
};
