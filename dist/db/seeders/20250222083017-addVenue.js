'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Venues', [{
      name: 'Marriage',
      location: "Marriage garden",
      capacity: 175,
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
    await queryInterface.bulkDelete('Venues', null, {});
  }
};