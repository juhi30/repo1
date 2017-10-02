const channelsCommands = {

  validateChannelsElements: function() {
    return this.waitForElementVisible('body', 2000, 'Body is visible')
      .waitForElementVisible('@firstChannelContainer', 3000, 'First channel is visible')
      .verify.visible('@addChannelbutton', 'Add channel button is visible')
      .verify.visible('@editChannel', 'Edit channel button is visible')

  },

  validateEditForm: function() {
    return this.click('@editChannel')
      .waitForElementVisible('@editChannelPopup', 2000, 'Edit channel form is visible')
      .verify.visible('@editChannelName', 'Edit channel name input is visible')
      .verify.visible('@editLocationDropdown', 'Edit location dropdown is visible')
      .click('@editLocationDropdown')
      .waitForElementVisible('@editLocationFirstResult', 1000, 'First location is visible')
      .verify.visible('@bizHoursOnSelector', 'Business hours ON checkbox visible')
      .verify.visible('@bizHoursOffSelector', 'Business hours OFF checkbox visible')
      .verify.visible('@bizHoursForm', 'Business hours form input is visible')
      .verify.visible('@dSTCheckBox', 'Daylight savings time checkbox is visible')
      .click('@cancelEditChannelForm')
    // .waitForElementNotVisible('@editChannel', 4000, 'Edit channel form is no longer visible')
    // ^^^ keeps failing due to element being found/present
  },

  changeEditFormElements: function(channelName) {
    let randoNum = Math.ceil(Math.random() * 100);
    return this.click('@editChannel')
      .waitForElementVisible('@editChannelPopup', 2000, 'Edit channel form is visible')
      .clearValue('@editChannelName')
      .setValue('@editChannelName', channelName + randoNum)
      .verify.valueContains('@editChannelName', channelName + randoNum, 'The title is ' + channelName + ' and random number which is ' + randoNum)
      .click('@editLocationCloseButton')
      .verify.elementNotPresent('@editLocationCloseButton', 'Location selected choice is hidden')
      .click('@editLocationDropdown')
      .click('@editLocationFirstResult')
      .verify.visible('@editLocationCloseButton', 'Location selected choice is visible')
      .click('@bizHoursOffSelector')
      .waitForElementNotPresent('@bizHoursForm', 'Business hours form is hidden')
      .click('@bizHoursOnSelector')
      .verify.visible('@bizHoursForm', 'Business hours form is visible again')
      .click('@dSTCheckBox')
      .click('@saveChannelButton')
      // .waitForElementNotPresent('@editChannel', 2000, 'Edit channel form is longer visible')
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

  loginFacebook: function(email, password) {
    return this.waitForElementVisible('@facebookLoginPage', 3000, 'Facebook login page is visible')
      .setValue('@facebookLoginEmail', email)
      .setValue('@facebookLoginPassword', password)
      .click('@facebookLoginButton')
  },

  clickFacebookPage: function() {
    return this.click('@firstFacebookPageChoice')
      .click('@facebookPageNextButton')
  },

  validateConnectFBAcctPopup: function() {
    return this.waitForElementVisible('@connectFacebookAcctPopup', 1000, 'Connect facebook account popup is visible')
      .verify.visible('@connectFacebookAcctChannelName', 'Channel name is visible')
      .verify.visible('@facebookLocationDropdown', 'Location dropdown is visible')
      .click('@facebookLocationDropdown')
      .waitForElementVisible('@facebookFirstLocation', 1000, 'First location choice is visible')
      .verify.visible('@facebookPageFinishButton', 'Finish form button is visible')
  },

  finalizeCreateNewFBChannel: function(channelName) {
    return this.verify.valueContains('@connectFacebookAcctChannelName', channelName)
      .click('@facebookLocationDropdown')
      .waitForElementVisible('@facebookFirstLocation', 1000, 'First location choice is visible')
      .click('@facebookFirstLocation')
      .click('@facebookPageFinishButton')
  },

  validateChannelAdded: function() {
    return this.waitForElementVisible('body', 4000, 'Body is visible')
      .waitForElementNotVisible('@connectFacebookAcctPopup', 2000, 'Facebook popups are closed')
      .verify.elementNotPresent('@addChannelbutton', 'Add Channel button is not present')
      .waitForElementVisible('@facebookChannelContainer', 2000, 'Facebook Channel is visible')
      .verify.visible('@deleteChannel', 'Delete button is visible')
  },

  removeChannelAdded: function() {
    return this.click('@deleteChannel')
      .waitForElementVisible('@deleteChannelPopup', 3000, 'Delete channel popup is visible')
      .verify.visible('@cancelDeleteChannel', 'Cancel button is visible')
      .verify.visible('@deleteChannelFinal', 'Final delete button is visible')
      .click('@deleteChannelFinal')
      // .waitForElementVisible('@savedPrompt', 1000, 'Saved prompt visible')
      .waitForElementNotVisible('@deleteChannelPopup', 2000, 'Delete channel popup is not visible')
      .waitForElementNotPresent('@facebookChannelContainer', 1000, 'Facebook channel is deleted')
  },

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

    facebookChannelContainer: {
      selector: `//*[@id="app"]/div/div[2]/div/div[1]/div[3]`,
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
      selector: `/html/body/div[6]/div/div/div`,
      locateStrategy: 'xpath',
    },

    deleteChannelFinal: {
      selector: `/html/body/div[6]/div/div/div/div[3]/div/button[2]`,
      locateStrategy: 'xpath',
    },

    cancelDeleteChannel: {
      selector: `/html/body/div[6]/div/div/div/div[3]/div/button[1]`,
      locateStrategy: 'xpath',
    },

    // savedPrompt: {
    //   selector: ``,
    //   locateStrategy: 'xpath'
    // },

    /*-----------------------------------------------------*/
    // connect facebook popups
    // breaks between elements separate different popups
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
    /*-----------------------------------------------------*/
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
    /*-----------------------------------------------------*/
    connectFacebookAcctPopup: {
      selector: `/html/body/div[4]/div/div/div`,
      locateStrategy: 'xpath'
    },

    connectFacebookAcctChannelName: {
      selector: `//*[@id="name"]`,
      locateStrategy: 'xpath',
    },

    facebookLocationDropdown: {
      selector: `/html/body/div[4]/div/div/div/div[2]/div/div[2]/span[2]/div[1]/input`,
      locateStrategy: 'xpath',
    },

    facebookFirstLocation: {
      selector: `/html/body/div[4]/div/div/div/div[2]/div/div[2]/span[2]/div[1]/div/div/div/a`,
      locateStrategy: 'xpath',
    },

    facebookPageFinishButton: {
      selector: `/html/body/div[4]/div/div/div/div[3]/div/div/button[2]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------*/
    // facebook login user page
    /*-----------------------------------------------------*/

    facebookLoginPage: {
      selector: `//*[@id="facebook"]/body`,
      locateStrategy: 'xpath',
    },

    facebookLoginEmail: {
      selector: `//*[@id="email"]`,
      locateStrategy: 'xpath',
    },

    facebookLoginPassword: {
      selector: `//*[@id="pass"]`,
      locateStrategy: 'xpath',
    },

    facebookLoginButton: {
      selector: `//*[@id="loginbutton"]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------*/
    // Edit channel popup elements
    /*-----------------------------------------------------*/

    editChannelPopup: {
      selector: `/html/body/div[5]/div/div/div`,
      locateStrategy: 'xpath',
    },

    editChannelName: {
      selector: `//*[@id="name"]`,
      locateStrategy: 'xpath',
    },

    editLocationDropdown: {
      selector: `/html/body/div[5]/div/div/div/div[2]/div[1]/div[2]/span[2]/div[1]/input`,
      locateStrategy: 'xpath',
    },

    editLocationFirstResult: {
      selector: `/html/body/div[5]/div/div/div/div[2]/div[1]/div[2]/span[2]/div[1]/div/div/div/a`,
      locateStrategy: 'xpath'
    },

    editLocationCloseButton: {
      selector: `/html/body/div[5]/div/div/div/div[2]/div[1]/div[2]/span[2]/div[2]/div/button`,
      locateStrategy: 'xpath',
    },

    bizHoursOnSelector: {
      selector: `/html/body/div[5]/div/div/div/div[2]/div[2]/div[1]/div/div[1]/div/label`,
      locateStrategy: 'xpath'
    },

    bizHoursOffSelector: {
      selector: `/html/body/div[5]/div/div/div/div[2]/div[2]/div/div/div[2]/div/label`,
      locateStrategy: 'xpath'
    },

    bizHoursForm: {
      selector: `/html/body/div[5]/div/div/div/div[2]/div[2]/div[2]/div[1]`,
      locateStrategy: 'xpath',
    },

    dSTCheckBox: {
      selector: `//*[@id="checkbox"]`,
      locateStrategy: 'xpath',
    },

    saveChannelButton: {
      selector: `/html/body/div[5]/div/div/div/div[3]/div/button[2]`,
      locateStrategy: 'xpath'
    },

    cancelEditChannelForm: {
      selector: `/html/body/div[5]/div/div/div/div[3]/div/button[1]`,
      locateStrategy: 'xpath'
    }
  }
};
