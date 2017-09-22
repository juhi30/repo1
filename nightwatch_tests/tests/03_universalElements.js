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
      .validateSearchDropdown('jyo')
      .validateSettingsDropdown()

    client.pause(3000);
  },

  'Test click app-navigation buttons': function(client) {
    let universalElements = client.page.UniversalElements();

    universalElements.clickAppNavButtons()

    client.pause(3000);
  },

  'Test click search dropdown buttons': function(client) {
    let universalElements = client.page.UniversalElements();
    let addContactPopup = client.page.AddContactPopupPage();

    universalElements.clickSearchDropdownButtons('jyo')
    addContactPopup.renderAddContactsPage()
      .closeAddContactsPage()

    client.pause();
  }
}
