"use strict";

var _axios = _interopRequireDefault(require("axios"));

require("./env");

var rhinofeeder = _interopRequireWildcard(require("./services/Rhinofeeder"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const followRedirects = require('follow-redirects');

followRedirects.maxRedirects = 10;
followRedirects.maxBodyLength = 500 * 1024 * 1024 * 1024;
/* eslint-disable global-require, import/first */

if (process.env.NODE_ENV !== 'local') {
  // Should enable proper stack traces after project is build
  require('source-map-support').install();
}

rhinofeeder.sendCSVData('./resources/fakeData.csv', 1, 'users');
//# sourceMappingURL=index.js.map