'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.User = require('./user')(sequelize,Sequelize.DataTypes)
// db.Event = require('./event')(sequelize,Sequelize.DataTypes)
// db.Venue = require('./venue')(sequelize,Sequelize.DataTypes)
// db.Ticket = require('./ticket')(sequelize,Sequelize.DataTypes)


// db.User.hasMany(db.Ticket , {foreignKey:'userId'});
// db.Ticket.belongsTo(db.User, {foreignKey:'userId'})

// db.Event.hasMany(db.Ticket, {foreignKey:'eventId'});
// db.Ticket.belongsTo(db.Event, {foreignKey:'eventId'})


// db.Event.belongsTo(db.Venue, {foreignKey:'venueId'});
// db.Venue.hasMany(db.Event ,{foreignKey:'venueId'})

module.exports = db;
