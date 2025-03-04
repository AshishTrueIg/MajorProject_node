'use strict';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING,
          unique: true
        },
        role: {
          type: Sequelize.STRING
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  
      await queryInterface.addIndex('Users',['email'],{
        name: 'users_email_index',
        unique: true,
        transaction
      })
  
      await queryInterface.addIndex('Users',['role'],{
        name: 'users_role_index',transaction
      })

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {

    await queryInterface.removeIndex('Users','users_email_index');
    await queryInterface.removeIndex('Users','users_role_index')


    await queryInterface.dropTable('Users');
  }
};