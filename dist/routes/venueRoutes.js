"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _venueController = _interopRequireDefault(require("../controllers/venue.controller.js"));
var _ajvValidator = _interopRequireDefault(require("../utils/ajvValidator.js"));
var _venueValidator = _interopRequireDefault(require("../validators/venueValidator.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.get('/', _venueController.default.getAllVenues);
router.get('/oneToMany', _venueController.default.oneToMany);
router.get('/:id', _venueController.default.getVenueById);
router.post('/', (0, _ajvValidator.default)(_venueValidator.default), _venueController.default.createVenue);
router.put('/:id', (0, _ajvValidator.default)(_venueValidator.default), _venueController.default.updateVenue);
router.delete('/:id', _venueController.default.deleteVenue);
var _default = exports.default = router;