'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('users', [
     {
       username: '@joaopasip',
       password: 'xablau',
       account_id: 1,
     },
     {
      username: '@tertu',
      password: 'acai',
      account_id: 2,
     },
     {
      username: '@paublim',
      password: 'fallen',
      account_id: 3,
     }
    ], {});
 },

 async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
 }
};
