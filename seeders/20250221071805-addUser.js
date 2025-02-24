'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { 
     await queryInterface.bulkInsert('Users', [{
      name: 'Mohit Kumar',
      email:"mohitKumar@gmail.com",
      role:"Organizer",
      createdAt: new Date(),
      updatedAt: new Date(),
      }
    ]);
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
