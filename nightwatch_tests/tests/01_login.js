/*--------------------------------------------------------------------------------------------------------*/

  // These tests are to check the functionality of the login page, make sure the form shows up, validates
  // properly and shows error when login incorrectly and transfers properly when login is correct

/*--------------------------------------------------------------------------------------------------------*/

module.exports = {
  'Login Page Initial Render': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .validateForm()

    client.pause(1000);
  },

  'Try to login with NO name and NO password': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .fillInForm('', '')
      .submit()
      .validateError()

    client.pause(1000);
  },

  'Try to login WITH name and NO password': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .fillInForm('nTester', '')
      .submit()
      .validateError()

    client.pause(1000);
  },

  'Try to login WITH NO name and password': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .fillInForm('', 'tester')
      .submit()
      .validateError()

    client.pause(1000);
  },

  'Login Page with Correct Credentials': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .fillInForm('ntester', 'tester')
      .submit()
      .validateUrlChange()
      ///need step to validate that it transfered to inbox view here

    client.end();
  },
};
