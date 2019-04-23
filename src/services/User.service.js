
const request = require('request');


function mergeUsers(id1, id2, cookie) {
  const RHINO_API_BASE_URL = process.env.API_BASE_URL;
  const url = RHINO_API_BASE_URL + `/users/mergeUsers/${id1}/${id2}`;

  var options = {
    method: 'GET',
    url: url,
    headers:
    {
      'content-type': 'application/json',
      token: process.env.RG_DEV_TOKEN,
      Cookie: cookie,
    },
    json: true
  };

  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if (error) reject(error);

      resolve(body);

    });
  })
}

module.exports = {
  mergeUsers: mergeUsers,
}