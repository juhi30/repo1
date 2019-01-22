/*--------------------------------------------------------------------------------------------------------*/

  // These tests are to check the functionality of the login page, make sure the form shows up, validates
  // properly and shows error when login incorrectly and transfers properly when login is correct

/*--------------------------------------------------------------------------------------------------------*/
const newOrgConfig = require('../../conf/new_org.conf');

module.exports = {
    'Login Page Initial Render': function(client) {
      const login = client.page.LoginPage();
  
      login.navigate()
        .validateForm()
  
      client.pause(1000);
    },
  
    'Try to login with NO name and NO password': function(client) {
      const login = client.page.LoginPage();
  
      login.navigate()
        .submit()
        .validateError()
  
      client.pause(1000);
    },
  
    'Try to login WITH name and NO password': function(client) {
      const login = client.page.LoginPage();
  
      login.navigate()
        .fillInUsername(newOrgConfig.ccrLogin)
        .submit()
        .validateError()
  
      client.pause(1000);
    },
  
    'Try to login WITH NO name and password': function(client) {
      const login = client.page.LoginPage();
  
      login.navigate()
        .fillInPassword(newOrgConfig.ccrPassword)
        .submit()
        .validateError()
  
      client.pause(1000);
    },
  
    'Login Page with Correct Credentials': function(client) {
      const login = client.page.LoginPage();
  
      login.navigate()
        .enterCSRCreds(newOrgConfig.ccrLogin, newOrgConfig.ccrPassword)
        .submit()
        .validateUrlChange('selectorg')
  
      client.end(3000);
    },
  };
  