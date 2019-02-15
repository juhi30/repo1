const login = require('../new_tests/login');
const accountSetup = require('../new_tests/accountSetup');
const member = require('../new_tests/member');

const ooo = require('../canary/outOfOfficeEvent');



module.exports = {

  'Login as a CCR and Add a WB Org': function (client) {
    const setup = client.page.AccountSetupPage();

    login.renderLoginPage(client)
    login.ccrLogin(client)
    accountSetup.addWithoutBillingOrg(client)
    setup.getOrgId()
      
  },

  'Create a Member for this new Org': function (client) {
    member["Add a new Member"](client)
  },

  'Add a New Phone Type Channel for this Org': function (client) {
    
  },
}