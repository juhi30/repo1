module.exports = {
  'Login Page Initial Render': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .validateForm()

    client.end();
  },

  'Login Page with Correct Credentials': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .fillInForm('nightTester', 'tester')
      .submit()

    client.end();
  }
};
