/*--------------------------------------------------------------------------------------------------------*/

// Channels page found under the settings tab is tested to validate its elements including parts found
// on modals(popups) it also creates a new channel by connecting to facebook

/*--------------------------------------------------------------------------------------------------------*/

module.exports = {
  //Logs into app to start tests
  "Login Page with Correct Credentials": function(client) {
    let login = client.page.LoginPage();

    login
      .navigate()
      .fillInForm("ntester", "tester")
      .submit()
      .validateUrlChange();
  },

  "Render and validate edit channel form": function(client) {
    const channelsPage = client.page.ChannelsPage();

    channelsPage
      .navigate()
      .validateChannelsElements()
      .validateEditForm();

    client.pause(1000);
  },

  "Change channel name in edit form and test": function(client) {
    const channelsPage = client.page.ChannelsPage();

    channelsPage.changeEditFormElements("SMS Test Channel");

    client.pause(1000);
  },

  "Render and create channel elements and popups": function(client) {
    const channelsPage = client.page.ChannelsPage();

    channelsPage
      .navigate()
      .validateChannelsElements()
      .clickCreateNewFBChannel()
      .validateConnectFBPopup()
      .clickConnectFacebook();

    client.window_handles(function(result) {
      let facebookWindow = result.value[1];
      client.switchWindow(facebookWindow);
    });

    channelsPage.loginFacebook("geoff@rhinogram.com", "rhinos");

    client.window_handles(function(result) {
      let rhinoWindow = result.value[0];
      client.switchWindow(rhinoWindow);
    });

    channelsPage
      .validateFacebookPagePopup()
      .clickFacebookPage()
      .validateConnectFBAcctPopup()
      .finalizeCreateNewFBChannel("Rhino's Night Moves");

    client.pause(1000);
  },

  "Validate and remove added channel and elements": function(client) {
    const channelsPage = client.page.ChannelsPage();

    channelsPage
      .navigate()
      .validateChannelAdded()
      .removeChannelAdded();

    client.end(5000);
  }
};
