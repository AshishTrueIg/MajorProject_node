"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  createUserSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 3
      },
      location: {
        type: "string"
      },
      capacity: {
        type: "integer"
      }
    },
    required: ["name", "location", "capacity"],
    additionalProperties: false
  }
};