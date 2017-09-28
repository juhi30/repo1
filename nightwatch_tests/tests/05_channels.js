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

    client.window_handles(function(result) {
      let facebookWindow = result.value[1];
      client.switchWindow(facebookWindow)
    });

    channelsPage.loginFacebook('geoff@rhinogram.com', 'rhinos')

    client.window_handles(function(result) {
      let rhinoWindow = result.value[0];
      client.switchWindow(rhinoWindow)
    });

    channelsPage.validateFacebookPagePopup()
      .clickFacebookPage()
      .validateConnectFBAcctPopup()

    client.pause();
  },
}
