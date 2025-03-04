"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(require("../db/models/index.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const User = _index.default.User;
const Ticket = _index.default.Ticket;
const sequelize = _index.default.sequelize;
let currentPage = 1;
const getAllUsers = async (req, res) => {
  try {
    const size = 3;
    const totalUsers = await User.count();
    const totalPages = Math.ceil(totalUsers / size);
    const offset = (currentPage - 1) * size;
    const data = await User.findAll({
      limit: size,
      offset: offset
    });
    currentPage = currentPage < totalPages ? currentPage + 1 : 1;
    res.status(200).json({
      currentPage,
      totalPages,
      data
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) res.status(404).json("User not found");
    res.status(200).json({
      data: user
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
const createUser = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      name,
      email,
      role
    } = req.body;
    const user = await User.create({
      name,
      email,
      role
    }, {
      transaction
    });
    await transaction.commit();
    res.status(200).json({
      message: "User Created Successfully"
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      error: error.message
    });
  }
};
const updateUser = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const user = await User.update(req.body, {
      where: {
        id: req.params.id
      }
    }, {
      transaction
    });
    if (!user) res.status(404).json({
      error: "User not found"
    });
    await transaction.commit();
    res.status(200).json({
      message: "User Updated Successfully"
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      error: error.message
    });
  }
};
const deleteUser = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id
      }
    }, {
      transaction
    });
    if (!user) res.status(404).json({
      error: "User not found"
    });
    await transaction.commit();
    res.status(200).json({
      message: "User Deleted Successfully"
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      error: error.message
    });
  }
};
const OneToMany = async (req, res) => {
  try {
    const data = await User.findAll({
      include: [{
        model: Ticket,
        as: 'Tickets',
        foreignKey: 'userId',
        required: false
      }]
    });
    res.status(200).json({
      data: data
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
var _default = exports.default = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  OneToMany
};