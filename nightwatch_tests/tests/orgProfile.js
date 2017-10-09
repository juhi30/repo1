/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------*/

module.exports = {

  'Login Page with Correct Credentials': function(client) {
    const login = client.page.LoginPage();

    login.navigate()
      .fillInForm('ntester', 'tester')
      .submit()
      .validateUrlChange()

    client.pause(1000);
  },

  'Render and validate page elements and popup': function(client) {
    const orgProfile = client.page.OrgProfilePage();

    orgProfile.navigate()
      .renderPageElements()
      .renderUploadPhotoPopup()

    client.pause(1000);
  },

  // 'Clear values and test validators': function(client) {
  //   const orgProfile = client.page.OrgProfilePage();
  //
  //   orgProfile.clearPrefilledValues()
  //     .setNewValues()
  //     .clickSaveProfile()
  //     .renderValidators()
  //
  //   client.pause(1000);
  // },

  'Fill out form with new info and save': function(client) {
    let randoNum = Math.ceil(Math.random() * 1000);
    const orgProfile = client.page.OrgProfilePage();

    orgProfile.clearPrefilledValues()
    .pause()
    .setNewValues('QA Test Org', randoNum+'somewhere st.', 'Charleston', 'SC', '29403')
    .clickSaveProfile()
    .validateSaveToast()

    client.pause()
  }
}
