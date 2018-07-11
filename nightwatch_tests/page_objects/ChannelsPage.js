const channelsCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  validateChannelsEls: function() {
    return this.waitForElementVisible('@addChannelButton', 'add channel button is present')
      .waitForElementVisible('@firstChannelContainer', 'first channel is visible')
      .click('@firstChannelContainer')
      .waitForElementVisible('@summaryPanel', 'summary panel is visible')
      .waitForElementVisible('@editChannel', 'edit channel button is visible')
      .click('@firstChannelContainer')
  },

  navigateToCreateChannels: function() {
    return this.waitForElementVisible('@addChannelButton', 'add channel button is present')
      click('@addChannelButton')
  },

  navigateToEditChannels: function() {
    return this.waitForElementVisible('@addChannelButton', 'add channel button is present')
      .waitForElementVisible('@firstChannelContainer', 'first channel is visible')
      .click('@firstChannelContainer')
      .waitForElementVisible('@editChannel', 'edit channel button is visible')
      .click('@editChannel')
  }
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
      selector: `//BUTTON[contains(@title,'Create Channel')]`, 
      locateStrategy: 'xpath',
    },

    firstChannelContainer: {
      selector: `//SPAN[contains(text(),'QA Test channel')]`, // first channel listed to access channel summary container
      locateStrategy: 'xpath',
    },

    summaryPanel: {
      selector: `//DIV[@class='summary-panel__content']`,
      locateStrategy: 'xpath'
    },

    editChannel: {
      selector: `//SPAN[contains(text(),'Edit Channel')]`,
      locateStrategy: 'xpath'
    },  
  }
};
