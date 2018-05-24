const channelsCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  validateChannelsElements: function() {
    return this.waitForElementVisible('@addChannelButton', 'Channel page is visible')
      .waitForElementVisible('@firstChannelContainer', 'First channel is visible')
  },

  validateEditForm: function() {
    return this.waitForElementVisible('@firstChannelContainer', 'First Channel is visible')
      .click('@firstChannelContainer')
      .waitForElementVisible('@summaryContainer', 'channel summary container is visible')
      .click('@editChannel')
      .waitForElementNotVisible('@editChannel', 'Edit channel button is no longer visible')
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
      selector: `(//SPAN[@class='button__text-wrapper'])[6]`,
      locateStrategy: 'xpath',
    },

    firstChannelContainer: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][text()='QA Test channel']`,// first channel listed to access channel summary container
      locateStrategy: 'xpath',
    },

    summaryPanel: {
      selector: `//DIV[@class='summary-panel__content']`,
      locateStrategy: 'xpath'
    },

    editChannel: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Edit Channel']`,
      locateStrategy: 'xpath'
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
