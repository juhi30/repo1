const login = require('../../services/Login.Service');
const deleteOrg = require('../../services/Organization.Service');

module.exports = {

   'Login and Delete Org': function(client) {
     login.login().then(function(cookie) {
       const orgId = process.env.ORGANIZATION_ID;
       console.log('zzzzzzzzzzzzzz' , orgId)
       //deleteOrg.archiveOrganization(orgId, cookie).then(function(archiveResp){
         //deleteOrg.deleteOrganization(orgId, cookie);
       })

       client.end(2000);
     //});
   },
 }