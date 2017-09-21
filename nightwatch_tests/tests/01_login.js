module.exports = {
  'Login Page Initial Render': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .validateForm()

    client.end();
  },

  'Try to login with NO name and NO password': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .fillInForm('', '')
      .submit()
      .validateError()

    client.end();
  },

  'Try to login WITH name and NO password': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .fillInForm('nightTester', '')
      .submit()
      .validateError()

    client.end();
  },

  'Try to login WITH NO name and password': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .fillInForm('', 'Tester')
      .submit()
      .validateError()

    client.end();
  },

  'Login Page with Correct Credentials': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .fillInForm('nightTester', 'tester')
      .submit()
      .validateUrlChange()
      ///need step to validate that it transfered to inbox view here

    client.end();
  },
};
