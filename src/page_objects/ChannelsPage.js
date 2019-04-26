const testConstants = require('../toolboxes/feeder.toolbox');

const channelsCommands = {

  validateChannelsEls: function () {
    return this
      .waitForElementPresent('@channelsPageTitle', 'Channels Page Opened.')
      .waitForElementVisible('@addChannelButton', 'add channel button is present')
  },

  channelEditMode: function (channel) {
    return this.waitForElementVisible(channel, channel + ' Created Channel is visible in the channel list.')
      .click(channel)
      .waitForElementVisible('@editChannel', 'Summary Panel opened.')
      .click('@editChannel')
  },

  checkElementVisibility: function(element){
    console.log('check visibility of edit page title')
    return this.waitForElementVisible(element, 1000, (result) => {
      console.log('=================', result.value)
      if(result.value) {
        console.log('>>>>>>>>>>>>>> Inside If condition')
        this.click(element)
      }
    })
  },

  verifyUpdatedChannel: function (updatedChannel) {
    return this.waitForElementVisible(updatedChannel, updatedChannel + ' Created Channel is visible in the channel list.')
      .click(updatedChannel)
  },
}

module.exports = {
  commands: [channelsCommands],
  url: function () {
    return this.api.launch_url + '/settings/organization/channels'
  },
  
  elements: {

    channelsPageTitle: {
      selector: `//DIV[@class='app-page__header__title'][contains(text(),'Channels')]`,
      locateStrategy: 'xpath',
    },

    addChannelButton: {
      selector: `//BUTTON[contains(@title,'Create Channel')]`,
      locateStrategy: 'xpath',
    },

    channelName: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(text(),'${testConstants.channelName}')]`,
      locateStrategy: 'xpath',
    },

    rhinoSecureChannelTitle: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.rhinoChannelName}')]`,
      locateStrategy: 'xpath',
    },

    updatedChannelTitle: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(text(),'${testConstants.newChannelName}')]`,
      locateStrategy: 'xpath',
    },

    updatedRhinoSecureChannelTitle: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.rhinoChannelNewName}')]`,
      locateStrategy: 'xpath',
    },

    editChannel: {
      selector: `//SPAN[@class='button__text-wrapper'][contains(text(),'Edit Channel')]`,
      locateStrategy: 'xpath',
    },

    editPageTitle: {
      selector: `//*[@class='app-page__header']//*[text()='Edit Channel']`,
      locateStrategy: 'xpath',
    }
  }
};
