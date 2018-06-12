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
      selector: `//*[@id="app"]/div/div[2]/div/div/div/div/div[1]/div[2]/button`,// needs svg title added to button
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
  }
};
