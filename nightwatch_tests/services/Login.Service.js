const request = require('request');

function login() {
    const RHINO_API_BASE_URL = process.env.RHINO_API_BASE_URL;
    const USERNAME = process.env.CCR_USERNAME;
    const PASSWORD = process.env.CCR_PASSWORD;


    var options = {
        method: 'POST',
        url: RHINO_API_BASE_URL + '/login',
        headers:
        {
            'content-type': 'application/json'
        },
        body: { username: USERNAME, password: PASSWORD },
        json: true
    };

    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) reject(error);

            resolve(response.headers['set-cookie'][0])

        });
    })


}


module.exports = {
    login: login,
}