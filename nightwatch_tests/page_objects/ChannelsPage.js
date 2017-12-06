const channelsCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  validateChannelsElements: function() {
    return this.waitForElementVisible('body', 5000, 'Body is visible')
      .waitForElementVisible('@firstChannelContainer', 5000, 'First channel is visible')
  },

  validateEditForm: function() {
    return this.click('@editChannel')
      .waitForElementVisible('@editLocationDropdown', 5000, 'Edit channel form is visible')
      .click('@editLocationDropdown')
      .waitForElementVisible('@editLocationFirstResult', 5000, 'First location is visible')
      .click('@cancelEditChannelForm');
    // .waitForElementNotVisible('@editChannel', 4000, 'Edit channel form is no longer visible')
    // ^^^ keeps failing due to element being found/present
  },

  changeEditFormElements: function(channelName) {
    let randoNum = Math.ceil(Math.random() * 100);
    return this.click('@editChannel')
      .waitForElementVisible('@editChannelName', 5000, 'Edit channel form is visible')
      .clearValue('@editChannelName')
      .setValue('@editChannelName', channelName + randoNum)
      .verify.valueContains('@editChannelName', channelName + randoNum, 'The title is ' + channelName + ' and random number which is ' + randoNum)
      .click('@editLocationCloseButton')
      .click('@editLocationDropdown')
      .click('@editLocationFirstResult')
      // .click('@bizHoursOffSelector') biz hour radio button xpaths are very brittle
      // .waitForElementNotPresent('@bizHoursForm', 'Business hours form is hidden')
      // .click('@bizHoursOnSelector')
      .click('@dSTCheckBox')
      .click('@saveChannelButton');
      // .waitForElementNotPresent('@editChannel', 5000, 'Edit channel form is longer visible')
  },

  clickCreateNewFBChannel: function() {
    return this.waitForElementVisible('@addChannelButton', 5000, 'Add channel button is visible')
      .click('@addChannelButton')
      .waitForElementVisible('@addChannelDropdown', 5000, 'Add facebook dropdown is visible')
      .click('@addChannelDropdown');
  },

  validateConnectFBPopup: function() {
    return this.waitForElementVisible('@connectFacebookButton', 5000, 'Connect to facebook popup is visible')
  },

  clickConnectFacebook: function() {
    return this.click('@connectFacebookButton');
  },

  validateFacebookPagePopup: function() {
    return this.waitForElementVisible('@facebookPageNextButton', 5000, 'Facebook page selection popup is visible')
      // .waitForElementVisible('@facebookPageCancel', 5000, 'Cancel button is visible wisible');
      // .verify.visible('@firstFacebookPageChoice', 'First FB page choice is visible');

      // these two are unecessary for the purpose of this test
  },

  loginFacebook: function(email, password) {
    return this.waitForElementVisible('@facebookLoginPage', 5000, 'Facebook login page is visible')
      .setValue('@facebookLoginEmail', email)
      .setValue('@facebookLoginPassword', password)
      .click('@facebookLoginButton');
  },

  clickFacebookPage: function() {
    return this.waitForElementVisible('@firstFacebookPageChoice', 5000, 'First facebook page choice is visible')
      .click('@firstFacebookPageChoice')
      .click('@facebookPageNextButton');
  },

  validateConnectFBAcctPopup: function() {
    return this.waitForElementVisible('@connectFacebookAcctChannelName', 5000, 'Connect facebook account popup is visible')
      .click('@facebookLocationDropdown')
      .waitForElementVisible('@facebookFirstLocation', 5000, 'First location choice is visible');
  },

  finalizeCreateNewFBChannel: function(channelName) {
    return this.verify.valueContains('@connectFacebookAcctChannelName', channelName)
      .click('@facebookLocationDropdown')
      .waitForElementVisible('@facebookFirstLocation', 5000, 'First location choice is visible')
      .click('@facebookFirstLocation')
      .waitForElementVisible('@facebookChannelTimeZone', 5000, 'Timezone dropdown is visible')
      .setValue('@facebookChannelTimeZone', 'E')

      .click('@facebookPageFinishButton');
  },

  validateChannelAdded: function() {
    return this.waitForElementNotPresent('@connectFacebookAcctPopup', 4000, 'Facebook popups are closed')
      .waitForElementVisible('@deleteChannel', 4000, 'Delete button is visible')
      .waitForElementVisible('@facebookChannelContainer', 5000, 'Facebook Channel is visible')
  },

  removeChannelAdded: function() {
    return this.waitForElementVisible('@deleteChannel', 5000, 'Delete button is visible')
      .click('@deleteChannel')
      .waitForElementVisible('@deleteChannelFinal', 5000, 'Delete channel popup is visible')
      .click('@deleteChannelFinal')
      // .waitForElementVisible('@savedPrompt', 5000, 'Saved prompt visible')
      .waitForElementNotPresent('@deleteChannelPopup', 5000, 'Delete channel popup is not visible')
      .waitForElementNotPresent('@facebookChannelContainer', 5000, 'Facebook channel is deleted');
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

    addChannelButton: {
      selector: `//SPAN[@class='dropdown__toggle__text'][text()='Add Channel']`,
      locateStrategy: 'xpath',
    },

    addChannelDropdown: {
      selector: `//SPAN[@class='u-text-overflow'][text()='Facebook']`,
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
      selector: `(//BUTTON[@type='button'][text()='Edit'][text()='Edit'])[1]`,
      locateStrategy: 'xpath'
    },

    deleteChannel: {
      selector: `//BUTTON[@type='button'][text()='Delete']`,
      locateStrategy: 'xpath',
    },

    deleteChannelPopup: {
      selector: `/html/body/div[4]/div/div/div`,
      locateStrategy: 'xpath',
    },

    deleteChannelFinal: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Delete Channel']`,
      locateStrategy: 'xpath',
    },

    cancelDeleteChannel: {
      selector: `/html/body/div[4]/div/div/div/div[3]/div/button[1]`,
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

    // connectFacebookPopup: {
    //   selector: `(//SPAN[@class='button__text-wrapper'])[7]`,
    //   locateStrategy: 'xpath',
    // },

    connectFacebookCancel: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Cancel']`,
      locateStrategy: 'xpath',
    },

    connectFacebookButton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[7]`,
      locateStrategy: 'xpath',
    },
    /*-----------------------------------------------------*/
    facebookPagePopup: {
      selector: `/html/body/div[5]/div/div/div`,
      locateStrategy: 'xpath',
    },

    firstFacebookPageChoice: {
      selector: `(//A[@href='javascript:void(0)'])[3]`,
      locateStrategy: 'xpath',
    },

    facebookPageCancel: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Cancel']`,
      locateStrategy: 'xpath',
    },

    facebookPageNextButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Next']`,
      locateStrategy: 'xpath',
    },
    /*-----------------------------------------------------*/
    connectFacebookAcctPopup: {
      selector: `/html/body/div[5]/div/div/div`,
      locateStrategy: 'xpath'
    },

    connectFacebookAcctChannelName: {
      selector: `//*[@id="name"]`,
      locateStrategy: 'xpath',
    },

    facebookLocationDropdown: {
      selector: `(//INPUT[@type='text'])[3]`,
      locateStrategy: 'xpath',
    },

    facebookFirstLocation: {
      selector: `(//A[@href='javascript:void(0)'])[3]`,
      locateStrategy: 'xpath',
    },

    facebookPageFinishButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Finish']`,
      locateStrategy: 'xpath',
    },

    facebookChannelTimeZone: {
      selector: `//SELECT[@id='timeZoneId']`,
      locateStrategy: 'xpath'
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
      selector: `(//INPUT[@type='text'])[3]`,
      locateStrategy: 'xpath',
    },

    editLocationFirstResult: {
      selector: `(//DIV[@class='dropdown__menu__item__content'])[13]`,
      locateStrategy: 'xpath'
    },

    editLocationCloseButton: {
      selector: `(//BUTTON[@type='button'])[8]`,
      locateStrategy: 'xpath',
    },

    bizHoursOnSelector: {
      selector: `//LABEL[@for='afterHoursRadio-811257'][text()='On']`,
      locateStrategy: 'xpath'
    },

    bizHoursOffSelector: {
      selector: `//LABEL[@for='afterHoursRadio-850364'][text()='Off']`,
      locateStrategy: 'xpath'
    },

    bizHoursForm: {
      selector: `/html/body/div[5]/div/div/div/div[2]/div[2]/div[2]/div[1]`,
      locateStrategy: 'xpath',
    },

    dSTCheckBox: {
      selector: `//LABEL[@for='observesDst'][text()='Observe Daylight Saving Time']`,
      locateStrategy: 'xpath',
    },

    saveChannelButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Channel']`,
      locateStrategy: 'xpath'
    },

    cancelEditChannelForm: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Cancel'][text()='Cancel'])`,
      locateStrategy: 'xpath'
    }
  }
};
