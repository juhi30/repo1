
const request = require('request');


function mergeUsers(id1, id2, cookie) {
  const RHINO_API_BASE_URL = process.env.API_BASE_URL;
  const url = `${RHINO_API_BASE_URL}/users/mergeUsers/${id1}/${id2}`;

  const options = {
    method: 'GET',
    url,
    headers:
    {
      'content-type': 'application/json',
      token: process.env.RG_DEV_TOKEN,
      Cookie: cookie,
    },
    json: true,
  };

  return new Promise(((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) reject(error);

      resolve(body);
    });
  }));
}

function getUser(userId, cookie) {
  const RHINO_API_BASE_URL = process.env.API_BASE_URL;
  const url = `${RHINO_API_BASE_URL}/users/${userId}`;

  const options = {
    method: 'GET',
    url,
    headers:
    {
      'content-type': 'application/json',
      token: process.env.RG_DEV_TOKEN,
      Cookie: cookie,
    },
    json: true,
  };

  return new Promise(((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) reject(error);

      resolve(body);
    });
  }));
}

module.exports = {
  mergeUsers,
  getUser,
};
