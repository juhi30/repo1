const login = require('../new_tests/login');
//const orgSetUp = require('../new_tests/accountSetup')
const member = require('../new_tests/member')

module.exports = {

    'Edit Member': function(client) {
      login.renderLoginPage(client)
      login.memberLogin(client)
      //orgSetUp.addWithoutBillingOrg(client)
      member['Edit Member'](client)
      client.end(2000);    
    },
  }