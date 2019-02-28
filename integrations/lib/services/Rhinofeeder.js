"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendCSVData = sendCSVData;
exports.sendData1 = sendData1;

var _fs = _interopRequireDefault(require("fs"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function sendCSVData(file, orgId, handler) {
  return new Promise((resolve, reject) => {
    _fs.default.readFile(file, 'utf8', async (err, data) => {
      if (err) throw err;
      _axios.default.defaults.headers.common.Authorization = `Basic ${Buffer.from(process.env.FEEDER_BASIC_AUTH).toString('base64')}`;
      const message = await _axios.default.post(`${process.env.FEEDER_BASE_URL}/csv/process?handler=${handler}&organizationId=${orgId}`, data, {
        headers: {
          'Content-Type': 'text/csv'
        }
      });
      resolve(message);
    });
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
//# sourceMappingURL=Rhinofeeder.js.map