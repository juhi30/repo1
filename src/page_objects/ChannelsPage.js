const testConstants = require('./../toolboxes/feeder.toolbox')
const channelsCommands = {

  validateChannelsEls: function () {
    return this.waitForElementVisible('@addChannelButton', 'add channel button is present')
      .waitForElementVisible('@firstChannelContainer', 'first channel is visible')
      .click('@firstChannelContainer')
      .waitForElementVisible('@summaryPanel', 'summary panel is visible')
      .waitForElementVisible('@editChannel', 'edit channel button is visible')
      .click('@firstChannelContainer')
  },

  navigateToCreateChannels: function () {
    return this.waitForElementVisible('@addChannelButton', 'add channel button is present')
      .click('@addChannelButton')
  },

  navigateToEditChannels: function () {
    return this.waitForElementVisible('@addChannelButton', 'add channel button is present')
      .waitForElementVisible('@desiredChannel', 'Desired channel is visible')
      .click('@desiredChannel')
      .waitForElementVisible('@editChannel', 'edit channel button is visible')
      .click('@editChannel')
      .waitForElementVisible('@channelTypeTitle', 'Edit page opened')
  },

}

module.exports = {
  commands: [channelsCommands],
  url: function () {
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

    channelTitle: {
      selector: `//DIV[@class='app-page__header__title']`,
      locateStrategy: 'xpath',
    },

    summary: {
      selector: `//DIV[text()='Summary']`,
      locateStrategy: 'xpath',
    },

    desiredChannel: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][text()='${testConstants.channelName1}']`,
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

    editChannelTitle: {
      selector: `//DIV[@class='app-page__header__title']`,
      locateStrategy: 'xpath',
    },

    createNewTag: {
      selector: `//SPAN[text()='Create New Tag']`,
      locateStrategy: 'xpath',
    },

    channelTypeTitle: {
      selector: `//DIV[@class='box__title'][text()='Channel Type']`,
      locateStrategy: 'xpath',
    },
  }
};
