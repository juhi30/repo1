const testConstants = require('../../feeder');

module.exports = {

    addWithoutBillingOrg: function (client) {
      client.maximizeWindow()

      const setup = client.page.AccountSetupPage();
  
      setup.navigate()
        .clickBillingToggle()
        .fillInOrgBasicInformation(testConstants.name, testConstants.address, testConstants.city, 
            testConstants.state, testConstants.zip)
            .clickCreateOrganization()
            .getOrgId()

    },    
  }