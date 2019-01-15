//--------------------------------------------------------------------------------------------------------*/
// tests for the Analytics page and elements it contains.
// User is logged in as CCR 
/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

    'Login Page with CCR Credentials': function (client) {
      const login = client.page.LoginPage();
  
      login.navigate()
        .enterMemberCreds('ccr', 'bacon')
        .submit()
        .validateUrlChange('selectorg');
    },
  
  }
  