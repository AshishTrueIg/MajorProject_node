'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Events', [{
      title: "Team Lunch",
      description: "Meeting with the new members of the team",
      date: new Date(),
      status:"Ongoing",
      venue_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Events', null, {});
  }
};
