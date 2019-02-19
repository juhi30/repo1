const login = require('../../services/Login.Service');
const deleteOrg = require('../../services/Organization.Service');

module.exports = {

  'Login and Delete Org': function (client) {
    login.login().then(function (cookie) {
      //const orgId = process.env.ORGANIZATION_ID;
      console.log('Deleting Org ==' , '419')
      deleteOrg.archiveOrganization('419', cookie).then(function (archiveResp) {
        deleteOrg.deleteOrganization('419', cookie);
      })

      client.end(2000);
    });
  },
}