
/*--------------------------------------------------------------------------------------------------------*/

// Channels page found under the settings tab is tested to validate its elements including parts found
// on modals(popups) it also creates a new channel by connecting to facebook

/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

  //Logs into app to start tests
  'Login Page with Correct Credentials': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .enterMemberCreds()
      .submit()
      .validateUrlChange()
  },

  'Render and validate Channels page': function(client) {
    const channelsPage = client.page.ChannelsPage();

    channelsPage.navigate()
      .validateChannelsEls();

    client.pause(1000)
  },

  'Render and validate Edit Channels page': function(client) {
    const channelsPage = client.page.ChannelsPage();
    const createEditChannelsPage = client.page.ChannelsCreateEditPage();

    channelsPage.navigate()
      .navigateToEditChannels();

    createEditChannelsPage.thing()
      

    client.pause()
  },
}
