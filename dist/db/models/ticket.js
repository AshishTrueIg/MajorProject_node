'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket.init({
    eventId: {
      type: DataTypes.INTEGER,
      field: 'event_id'
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    type: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Ticket',
    tableName: 'Tickets',
    underscored: true
  });
  return Ticket;
};