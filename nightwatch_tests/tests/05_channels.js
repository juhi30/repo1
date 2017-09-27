
/*--------------------------------------------------------------------------------------------------------*/

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

  'Render channel elements and popups': function(client) {
    const channelsPage = client.page.ChannelsPage();

    channelsPage.navigate()
      .validateChannelsElements()
      .clickCreateNewFBChannel()
      .validateConnectFBPopup()
      .clickConnectFacebook()
      .validateFacebookPagePopup()

    client.pause();
  },
}
