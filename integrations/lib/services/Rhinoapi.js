"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findUserByUser = findUserByUser;
exports.getUserByExternalId = getUserByExternalId;
exports.getApointmentByExternalId = getApointmentByExternalId;
exports.sendData1 = sendData1;

var _fs = _interopRequireDefault(require("fs"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function findUserByUser(orgId, user) {
  _axios.default.defaults.headers.common.Authorization = `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}`;
  return _axios.default.post(`${process.env.API_BASE_URL}/rhinoliner/users/matching`, {
    orgId,
    user
  });
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

async function getApointmentByExternalId(orgId, externalId, userId) {
  _axios.default.defaults.headers.common.Authorization = `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}`;
  return _axios.default.post(`${process.env.API_BASE_URL}/rhinoliner/appointment/matching`, {
    externalId,
    userId
  });
}

async function sendData1() {
  _fs.default.readFile('.../../resources/fakeData.csv', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);

    _axios.default.post('/csv/process?email=shannon@rhinogram.com&handler=users&organizationId=1', {
      user: data,
      orgId: org.id
    });
  });
}
//# sourceMappingURL=Rhinoapi.js.map