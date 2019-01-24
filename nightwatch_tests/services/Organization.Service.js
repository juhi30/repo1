const request = require('request');

function archiveOrganization(organizationId, cookie) {
    const RHINO_API_BASE_URL = process.env.RHINO_API_BASE_URL;
    const url = RHINO_API_BASE_URL + '/organization/archive/' + organizationId;

    var options = {
        method: 'POST',
        url: url,
        headers:
        {
            'content-type': 'application/json', 
            token : process.env.RG_DEV_TOKEN,
            Cookie : cookie,
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



function deleteOrganization(organizationId, cookie) {
    const RHINO_API_BASE_URL = process.env.RHINO_API_BASE_URL;
    const url = RHINO_API_BASE_URL + '/organization/' + organizationId;
    var options = {
        method: 'DELETE',
        url: url,
        headers:
        {
            'content-type': 'application/json', 
            token : process.env.RG_DEV_TOKEN,
            Cookie : cookie,
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
    archiveOrganization: archiveOrganization,
    deleteOrganization: deleteOrganization,
}