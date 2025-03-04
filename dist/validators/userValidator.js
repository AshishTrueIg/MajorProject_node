"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const createUserSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 3
    },
    email: {
      type: "string",
      format: "email"
    },
    role: {
      type: "string",
      enum: ["organizer", "attendee", "admin"]
    }
  },
  required: ["name", "email", "role"],
  additionalProperties: false
};
var _default = exports.default = createUserSchema;