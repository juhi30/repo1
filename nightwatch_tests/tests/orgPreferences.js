/*----------------------------------------------------------------------*/

/*----------------------------------------------------------------------*/

module.exports = {

  'Login Page with Correct Credentials': function(client) {
    const login = client.page.LoginPage();

    login.navigate()
      .fillInForm('ntester', 'tester')
      .submit()
      .validateUrlChange()
    ///need step to validate that it transfered to inbox view here

    client.pause(1000);
  },

  'Navigate to and render Organization Page': function(client) {
    const orgPrefs = client.page.OrgPreferencesPage();

    orgPrefs.navigate()
      .validatePageElements()

    client.pause(1000)
  },

  'Toggle sound and save then revert': function(client) {
    const orgPrefs = client.page.OrgPreferencesPage();

    orgPrefs.toggleSoundOn()
      .pause(1000)
      .clickSave()
      .validateSaveToast()
      .pause(1000)
      .toggleSoundOff()
      .pause(1000)
      .clickSave()
      .validateSaveToast()

    client.end(3000)
  }
}
