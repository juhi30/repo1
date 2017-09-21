module.exports = {

  //Logs into app to start tests
  'Login Page with Correct Credentials': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .fillInForm('nightTester', 'tester')
      .submit()
      .validateUrlChange()
  },

  'Universal Elements render': function(client) {
    let universalElements = client.page.UniversalElements();

    universalElements.validateUniversalElements()
      .validateSearchDropdown()
      .validateSettingsDropdown()

    client.pause(3000);
  },



}
