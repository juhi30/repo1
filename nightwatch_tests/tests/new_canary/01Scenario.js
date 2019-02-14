const login = require('../new_tests/login');
//const member = require('../new_tests/member');
//const accountSetup = require('../new_tests/accountSetup');
const helpers = require('../../helpers');
const testConstants = require('../../feeder');


module.exports = {

    'Login as a CCR and Add a WB Org': function(client) {

      const universalElements = client.page.UniversalElements();
      const setup = client.page.AccountSetupPage();

      login.renderLoginPage(client)
      login.ccrLogin(client)
      //accountSetup.addWithoutBillingOrg(client)
      universalElements.searchForOrganization(testConstants.name)
      .pause(5000)
      setup.getOrgId()
      .pause(5000)

      client.end(2000);
    },
  }