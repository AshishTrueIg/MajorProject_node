"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controllers/user.controller.js"));
var _ajvValidator = _interopRequireDefault(require("../utils/ajvValidator.js"));
var _userValidator = _interopRequireDefault(require("../validators/userValidator.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.get('/', _userController.default.getAllUsers);
router.get('/oneToMany', _userController.default.OneToMany);
router.get('/:id', _userController.default.getUserById);
router.post('/', (0, _ajvValidator.default)(_userValidator.default), _userController.default.createUser);
router.put('/:id', (0, _ajvValidator.default)(_userValidator.default), _userController.default.updateUser);
router.delete('/:id', _userController.default.deleteUser);
var _default = exports.default = router;