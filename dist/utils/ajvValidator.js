"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ajv = _interopRequireDefault(require("ajv"));
var _ajvFormats = _interopRequireDefault(require("ajv-formats"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// const Ajv = require('ajv');
// const addFormats = require('ajv-formats')

const ajv = new _ajv.default({
  allErrors: true,
  strict: false
});
(0, _ajvFormats.default)(ajv);
const validateSchema = schema => {
  return (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).json({
        errors: validate.errors.map(err => ({
          field: err.instancePath.replace('/', ''),
          message: err.message
        }))
      });
    }
    next();
  };
};
var _default = exports.default = validateSchema;