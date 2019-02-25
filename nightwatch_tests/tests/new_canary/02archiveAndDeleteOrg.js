const loginApi = require('../../services/Login.Service');
const deleteOrg = require('../../services/Organization.Service');

const orgId = process.env.ORGANIZATION_ID;

module.exports = {

  'Login and Delete Org': function (client) {
    loginApi.login().then(function (cookie) {

      console.log('Deleting Org ==', orgId)
      deleteOrg.archiveOrganization(orgId, cookie).then(function (archiveResp) {
        deleteOrg.deleteOrganization(orgId, cookie);
      })
    });
    client.end(2000);
  },
}