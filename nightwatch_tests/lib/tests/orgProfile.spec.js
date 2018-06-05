'use strict';

/*----------------------------------------------------------------------------*/

// These test make sure all elements render properly and the organization profile
// can be updated. Input validators are not able to be tested as the inputs
// are refilled on clicking save profile button. This seems to be a quirk of nightwatch
// have not found a way around it yet.

/*----------------------------------------------------------------------------*/

module.exports = {

  'Login Page with Correct Credentials': function (client) {
    const login = client.page.LoginPage();

    login.navigate().enterMemberCreds().submit().validateUrlChange();

    client.pause(1000);
  },

  'Render and validate page elements and popup': function (client) {
    const orgProfile = client.page.OrgProfilePage();

    orgProfile.navigate().renderPageElements().renderUploadPhotoPopup();

    client.pause(1000);
  },

  'Fill out form with new info and save': function (client) {
    let randoNum = Math.ceil(Math.random() * 1000);
    const orgProfile = client.page.OrgProfilePage();

    orgProfile.clearPrefilledValues().pause(1000).setNewValues('QA Test Org' + randoNum, randoNum + 'A', 'C').pause(1000).clickSaveProfile().validateSaveToast().clearPrefilledValues().clickSaveProfile();

    client.end(5000);
  }
};