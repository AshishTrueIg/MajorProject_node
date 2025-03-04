"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodeCron = _interopRequireDefault(require("node-cron"));
var _event = _interopRequireDefault(require("../db/models/event.cjs"));
var _sequelize = require("sequelize");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const startEventExpiryCron = () => {
  // This cron runs every day at midnight
  _nodeCron.default.schedule('0 0 * * *', async () => {
    try {
      const currentDate = new Date();
      const expire_days = 5;
      const expireDate = new Date(currentDate.setDate(currentDate.getDate() - expire_days));
      const result = await _event.default.update({
        status: 'expired'
      }, {
        where: {
          date: {
            [_sequelize.Op.lt]: expireDate
          },
          status: {
            [_sequelize.Op.ne]: 'expired'
          }
        }
      });
      console.log(`${result[0]} events marked as expired at ${new Date()}`);
    } catch (err) {
      console.error('Cron Error:', err.message);
    }
  });
};
var _default = exports.default = startEventExpiryCron;