'use strict';

/*----------------------------------------------------------------*/

// These tests make sure all page elements are visible and that
// all toggles change and render properly and are able to be saved
// and then reverts back to there original saved state

// Mobile notification toggles have been removed from desktop view
// add more tests to check mobile view
/*----------------------------------------------------------------*/

module.exports = {

  'Login Page with Correct Credentials': function (client) {
    const login = client.page.LoginPage();

    login.navigate().enterMemberCreds().submit().validateUrlChange();

    client.pause(1000);
  },

  'Render and verify all page elements': function (client) {
    const prefs = client.page.PreferencesPage();

    prefs.navigate().renderPageElements();

    client.pause(1000);
  },

  'Validate toggle change and save then revert': function (client) {
    const prefs = client.page.PreferencesPage();

    prefs.changeDesktopToggles()
    // .changeMobileToggles()
    .pause(1000).validateToggleChange().clickSavePreferences().pause(500).changeDesktopToggles()
    // .changeMobileToggles()
    .pause(1000).clickSavePreferences();

    client.end(3000);
  }
};