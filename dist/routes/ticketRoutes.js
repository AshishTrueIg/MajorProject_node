"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _ticketController = _interopRequireDefault(require("../controllers/ticket.controller.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.get('/', _ticketController.default.getAllTickets);
router.get('/user/:id', _ticketController.default.getUserTickets);
router.delete('/:id', _ticketController.default.cancelTicket);
router.get('/oneToMany', _ticketController.default.onetomany);
var _default = exports.default = router;