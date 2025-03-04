"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(require("../db/models/index.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Ticket = _index.default.Ticket;
const User = _index.default.User;
const Event = _index.default.Event;
const sequelize = _index.default.sequelize;
let currentPage = 1;
const getAllTickets = async (req, res) => {
  try {
    const size = 3;
    const totalTickets = await Ticket.count();
    const totalPage = Math.ceil(totalTickets / size);
    const offset = (currentPage - 1) * size;
    const data = await Ticket.findAll({
      limit: size,
      offset: offset
    });
    currentPage = currentPage < totalPage ? currentPage + 1 : 1;
    res.status(200).json({
      currentPage,
      totalPage,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
const getUserTickets = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    if (!userId) return res.status(400).json({
      error: "User Id is required"
    });
    const data = await Ticket.findAll({
      where: {
        userId
      }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
const cancelTicket = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const data = await Ticket.destroy({
      where: {
        id: req.params.id
      }
    }, {
      transaction
    });
    if (!data) return res.json(404).json({
      error: "Ticket not found"
    });
    await transaction.commit();
    res.json({
      message: "Ticket canceled Successfully"
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      error: error.message
    });
  }
};
const onetomany = async (req, res) => {
  try {
    const data = await Ticket.findAll({
      include: [User, Event]
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
var _default = exports.default = {
  getAllTickets,
  getUserTickets,
  cancelTicket,
  onetomany
};