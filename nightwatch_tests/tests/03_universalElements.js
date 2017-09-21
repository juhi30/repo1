
module.exports = {

  //Logs into app to start tests
  'Login Page with Correct Credentials': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .fillInForm('nightTester', 'tester')
      .submit()
      .validateUrlChange()
    // ^ better name for this function needed?

  },

  'Universal Elements render': function(client) {
    let universalElements = client.page.UniversalElements();

    universalElements.validateUniversalElements();

  },

}
