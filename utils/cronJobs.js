// cronJobs.js
const cron = require('node-cron');
const { Event } = require('../models/event');
const { Op } = require('sequelize');

const startEventExpiryCron = () => {
  // This cron runs every day at midnight
  cron.schedule('0 0 * * *', async () => {
    try {
      const currentDate = new Date();
      const expire_days = 5;
      const expireDate = new Date(currentDate.setDate(currentDate.getDate() - expire_days));

      const result = await Event.update(
        { status: 'expired' },
        {
          where: {
            date: { [Op.lt]: expireDate },
            status: { [Op.ne]: 'expired' }
          }
        }
      );

      console.log(`${result[0]} events marked as expired at ${new Date()}`);
    } catch (err) {
      console.error('Cron Error:', err.message);
    }
  });
};

module.exports = startEventExpiryCron;
