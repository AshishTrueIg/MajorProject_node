'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tickets', [{
      event_id: 1,
      user_id: 2,
      type: "VIP",
      price: 999,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tickets', null, {});
  }
};