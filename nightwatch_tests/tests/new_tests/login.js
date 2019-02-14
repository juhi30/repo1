/*--------------------------------------------------------------------------------------------------------*/

  // These tests are to check the functionality of the login page, make sure the form shows up, validates
  // properly and shows error when login incorrectly and transfers properly when login is correct

/*--------------------------------------------------------------------------------------------------------*/
const newOrgConfig = require('../../feeder');

module.exports = {

  renderLoginPage: function(client) {
    client.maximizeWindow()
    const login = client.page.LoginPage();

    login.navigate()
      .validateForm()
    client.pause(1000);
  },
    
    memberLogin: function(client) {
      const login = client.page.LoginPage();
  
      login.navigate()
        .enterCSRCreds(newOrgConfig.memberUsername, newOrgConfig.memberPassword)
        .submit()
        .validateUrlChange('inbox')
    },
  
    ccrLogin: function(client) {
      const login = client.page.LoginPage();
  
      login.navigate()
        .enterCSRCreds(newOrgConfig.ccrLogin, newOrgConfig.ccrPassword)
        .submit()
        .validateUrlChange('selectorg')
    },
  };
  