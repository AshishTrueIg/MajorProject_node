"use strict";

require("dotenv/config");
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _express = _interopRequireDefault(require("express"));
var _index = _interopRequireDefault(require("./db/models/index.js"));
var _userRoutes = _interopRequireDefault(require("./routes/userRoutes.js"));
var _ticketRoutes = _interopRequireDefault(require("./routes/ticketRoutes.js"));
var _venueRoutes = _interopRequireDefault(require("./routes/venueRoutes.js"));
var _eventRoutes = _interopRequireDefault(require("./routes/eventRoutes.js"));
var _cronJobs = _interopRequireDefault(require("./utils/cronJobs.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const sequelize = _index.default.sequelize;
const app = (0, _express.default)();
const PORT = process.env.PORT;
app.use((0, _cookieParser.default)());
app.use(_express.default.json());
(0, _cronJobs.default)();
app.use('/users', _userRoutes.default);
app.use('/tickets', _ticketRoutes.default);
app.use('/events', _eventRoutes.default);
app.use('/venues', _venueRoutes.default);
app.get('/', (req, res) => {
  res.send("Hello from backend");
});
sequelize.authenticate().then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.error(`Database connection failed: ${err.message}`);
  process.exit(1);
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});