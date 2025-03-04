"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _fs = require("fs");
var _url = require("url");
var _path = _interopRequireWildcard(require("path"));
var _sequelize = require("sequelize");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
_dotenv.default.config();
const _filename = (0, _url.fileURLToPath)(import.meta.url);
const _dirname = (0, _path.dirname)(_filename);
const basename = _path.default.basename(_filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT || 'postgres'
};
const db = {};
const sequelize = new _sequelize.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
const modelFiles = (0, _fs.readdirSync)(_dirname).filter(file => file.indexOf('.') !== 0 && file !== basename && (file.endsWith('.js') || file.endsWith('.cjs')));
for (const file of modelFiles) {
  const modelPath = (0, _url.pathToFileURL)((0, _path.join)(_dirname, file)).href;
  const {
    default: modelInit
  } = await (specifier => new Promise(r => r(`${specifier}`)).then(s => _interopRequireWildcard(require(s))))(modelPath);
  const model = modelInit(sequelize, _sequelize.Sequelize.DataTypes);
  db[model.name] = model;
}
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = _sequelize.Sequelize;
var _default = exports.default = db;