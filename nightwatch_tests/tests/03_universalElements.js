/*--------------------------------------------------------------------------------------------------------*/

// The purpose of these tests are to make sure the elements present throughout the app (universalElements)
// render properly and function properly when clicked and lead to their respective end points

/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

  //Logs into app to start tests
  'Login Page with Correct Credentials': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .fillInForm('ntester', 'tester')
      .submit()
      .validateUrlChange()
  },

  'Universal Elements render': function(client) {
    let universalElements = client.page.UniversalElements();

    universalElements.validateUniversalElements()
      .validateSearchDropdown('fro')
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

    universalElements.clickSearchDropdownButtons('fro')

    addContactPopup.renderAddContactsPage()
      .closeAddContactsPage()

    client.pause(3000);
  },

  'Test click all setting dropdown buttons': function(client) {
    let universalElements = client.page.UniversalElements();

    universalElements.clickMyProfile()
      .clickMyPreferences()
      .clickAutoResponse()
      .clickChannels()
      .clickMembers()
      .clickOrgPreferences()
      .clickOrgProfile()
      .clickTemplates()
      .clickLogout()

    client.end(3000);
  },
}
