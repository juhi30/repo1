"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
const DEV_ENV = `${__dirname}/dev.env`;
const PROD_ENV = `${__dirname}/prod.env`;

if (process.env.NODE_ENV === 'production' && !!_fs.default.existsSync(PROD_ENV)) {
  _dotenv.default.config({
    path: PROD_ENV
  });
} else if (!!_fs.default.existsSync(DEV_ENV)) {
  _dotenv.default.config({
    path: DEV_ENV
  });
}
//# sourceMappingURL=env.js.map