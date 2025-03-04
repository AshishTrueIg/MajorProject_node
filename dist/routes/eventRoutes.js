"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _eventController = _interopRequireDefault(require("../controllers/event.controller.js"));
var _ajvValidator = _interopRequireDefault(require("../utils/ajvValidator.js"));
var _eventValidator = _interopRequireDefault(require("../validators/eventValidator.js"));
var _ticketValidator = _interopRequireDefault(require("../validators/ticketValidator.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.get('/', _eventController.default.getAllEvents);
router.get('/oneToMany', _eventController.default.oneToMany);
router.get('/:id', _eventController.default.getEventById);
router.post('/', (0, _ajvValidator.default)(_eventValidator.default), _eventController.default.createEvent);
router.put('/:id', (0, _ajvValidator.default)(_eventValidator.default), _eventController.default.updateEvent);
router.delete('/:id', _eventController.default.deleteEvent);
router.post('/:id/tickets', (0, _ajvValidator.default)(_ticketValidator.default), _eventController.default.bookTicket);
var _default = exports.default = router;