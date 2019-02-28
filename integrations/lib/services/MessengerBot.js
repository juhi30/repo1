"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureHandler = configureHandler;
exports.getUserByExternalId = getUserByExternalId;

var _fs = _interopRequireDefault(require("fs"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function configureHandler(config) {
  // axios.defaults.headers.common.Authorization = `Basic ${Buffer.from(process.env.MESSENGER_BASIC_AUTH).toString('base64')}`;
  return _axios.default.post(`${process.env.MESSENGER_BASE_URL}/handlers`, config);
}

async function getUserByExternalId(orgId, externalId) {
  _axios.default.defaults.headers.common.Authorization = `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}`;
  return _axios.default.post(`${process.env.API_BASE_URL}/rhinoliner/users/matching`, {
    orgId,
    user: {
      externalId
    }
  });
}
//# sourceMappingURL=MessengerBot.js.map