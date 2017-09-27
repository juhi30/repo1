const channelsCommands = {

  validateChannelsElements: function() {
    return this.waitForElementVisible('body', 2000, 'Body is visible')
      .waitForElementVisible('@firstChannelContainer', 3000, 'First channel is visible')
      .verify.visible('@addChannelbutton', 'Add channel button is visible')
      .verify.visible('@editChannel', 'Edit channel button is visible')

  },

  clickCreateNewFBChannel: function() {
    return this.waitForElementVisible('body', 1000, 'Body is visible')
      .click('@addChannelbutton')
      .waitForElementVisible('@addChannelDropdown', 1500, 'Add facebook dropdown is visible')
      .click('@addChannelDropdown')
  },

  validateConnectFBPopup: function() {
    return this.waitForElementVisible('@connectFacebookPopup', 1500, 'Connect to facebook popup is visible')
      .verify.visible('@connectFacebookCancel', 'Cancel button is visible')
      .verify.visible('@connectFacebookButton', 'Connect facebook button is visible')
  },

  clickConnectFacebook: function() {
    return this.click('@connectFacebookButton')
  },

  validateFacebookPagePopup: function() {
    return this.waitForElementVisible('@facebookPagePopup', 3000, 'Facebook page selection popup is visible')
      .verify.visible('@facebookPageCancel', 'Facebook page selection cancel is visible')
      .verify.visible('@facebookPageNextButton', 'Facebook page Next button is visible')
      .verify.visible('@firstFacebookPageChoice', 'First FB page choice is visible')
  },

  // ^^^ Create a facebook page to connect to the channel for testing purposes



}

module.exports = {
  commands: [channelsCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/channels'
  },
  elements: {

    /*-----------------------------------------------------*/
    // main page elements
    /*-----------------------------------------------------*/

    addChannelbutton: {
      selector: `//*[@id="app"]/div/div[2]/div/div[1]/div[1]/div/div[2]/div/div/button`,
      locateStrategy: 'xpath',
    },

    addChannelDropdown: {
      selector: `//*[@id="app"]/div/div[2]/div/div[1]/div[1]/div/div[2]/div/div/div/div/div/a`,
      locateStrategy: 'xpath',
    },

    firstChannelContainer: {
      selector: `//*[@id="app"]/div/div[2]/div/div[1]/div[2]/div`,
      locateStrategy: 'xpath',
    },

    editChannel: {
      selector: `//*[@id="app"]/div/div[2]/div[2]/div[1]/div[2]/div/div[1]/div[2]/button`,
      locateStrategy: 'xpath'
    },

    deleteChannel: {
      selector: `//*[@id="app"]/div/div[2]/div[2]/div[1]/div[3]/div/div[1]/div[2]/span/span/button`,
      locateStrategy: 'xpath',
    },

    deleteChannelPopup: {
      selector: `/html/body/div[5]/div/div/div`,
      locateStrategy: 'xpath',
    },

    deleteChannelFinal: {
      selector: `/html/body/div[5]/div/div/div/div[3]/div/button[2]`,
      locateStrategy: 'xpath',
    },

    cancelDeleteChannel: {
      selector: `/html/body/div[5]/div/div/div/div[3]/div/button[1]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------*/
    // connect facebook popups
    /*-----------------------------------------------------*/

    connectFacebookPopup: {
      selector: `/html/body/div[4]/div/div/div/div[2]`,
      locateStrategy: 'xpath',
    },

    connectFacebookCancel: {
      selector: `/html/body/div[4]/div/div/div/div[3]/div/button[1]`,
      locateStrategy: 'xpath',
    },

    connectFacebookButton: {
      selector: `/html/body/div[4]/div/div/div/div[3]/div/button[2]`,
      locateStrategy: 'xpath',
    },

    facebookPagePopup: {
      selector: `/html/body/div[4]/div/div/div/div[2]/div/div[1]`,
      locateStrategy: 'xpath',
    },

    firstFacebookPageChoice: {
      selector: `/html/body/div[4]/div/div/div/div[2]/div/div[2]/div/div/div/div[1]/div/a[1]`,
      locateStrategy: 'xpath',
    },

    facebookPageCancel: {
      selector: `/html/body/div[4]/div/div/div/div[3]/div/button`,
      locateStrategy: 'xpath',
    },

    facebookPageNextButton: {
      selector: `/html/body/div[4]/div/div/div/div[3]/div/div/button`,
      locateStrategy: 'xpath',
    },

    connectFacebookAcctPopup: {
      selector: `/html/body/div[4]/div/div/div`,
      locateStrategy: 'xpath'
    },

    facebookLocationDropdown: {
      selector: `/html/body/div[3]/div/div/div/div[2]/div/div[2]/span[2]/div[1]`,
      locateStrategy: 'xpath',
    },

    facebookFirstLocation: {
      selector: `/html/body/div[3]/div/div/div/div[2]/div/div[2]/span[2]/div[1]/div/div/div/a`,
      locateStrategy: 'xpath',
    },

    facebookPageFinishButton: {
      selector: `/html/body/div[4]/div/div/div/div[3]/div/div/button[2]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------*/
    // Edit channel popup elements
    /*-----------------------------------------------------*/

    editChannelName: {
      selector: `//*[@id="name"]`,
      locateStrategy: 'xpath',
    },

    editLocationDropdown: {
      selector: `/html/body/div[4]/div/div/div/div[2]/div[1]/div[2]/span[2]/div[1]/input`,
      locateStrategy: 'xpath',
    },

    editLocationFirstResult: {
      selector: `/html/body/div[4]/div/div/div/div[2]/div[1]/div[2]/span[2]/div[1]/div/div/div/a`,
      locateStrategy: 'xpath'
    },

    bizHoursOnSelector: {
      selector: `//*[@id="afterHoursRadio-851162"]`,
      locateStrategy: 'xpath'
    },

    bizHoursOffSelector: {
      selector: `//*[@id="afterHoursRadio-832226"]`,
      locateStrategy: 'xpath'
    },

    bizHoursForm: {
      selector: `/html/body/div[4]/div/div/div/div[2]/div[2]/div[2]/div[1]`,
      locateStrategy: 'xpath',
    },

    dSTCheckBox: {
      selector: `//*[@id="checkbox"]`,
      locateStrategy: 'xpath',
    },

    saveChannelButton: {
      selector: `/html/body/div[4]/div/div/div/div[3]/div/button[2]`,
      locateStrategy: 'xpath'
    },

    cancelEditChannelForm: {
      selector: `/html/body/div[4]/div/div/div/div[3]/div/button[1]`,
      locateStrategy: 'xpath'
    }
  }
};
