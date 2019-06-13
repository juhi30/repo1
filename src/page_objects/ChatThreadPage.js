const chatThreadCommands = {
  pause(time) {
    this.api.pause(time);
    return this;
  },

  clickSendMessageButton() {
    return this.waitForElementVisible('@sendMessageButton', 'Send message button is visible')
      .click('@sendMessageButton');
  },

  fillInMessageInput(text) {
    return this.waitForElementVisible('@messageInput', 'Message input is visible')
      .setValue('@messageInput', text);
  },

  selectFromRoute(channelName) {
    return this.waitForElementVisible('@fromRouteSelected', 'From Route is visible')
      .click('@fromRouteSelected')
      .waitForElementVisible('@fromRouteDropdown', 'Dropdown to select From Route is visible')
      .setValue('@fromRouteDropdown', channelName);
  },
};

module.exports = {
  commands: [chatThreadCommands],
  url: 'https://dev.dev-rhinogram.com/chat',
  elements: {
    messageInput: {
      selector: '//TEXTAREA[contains(@name, \'message\')]',
      locateStrategy: 'xpath',
    },

    sendMessageButton: {
      selector: '//BUTTON[contains(@class, \'convo__message__send\')]',
      locateStrategy: 'xpath',
    },

    fromRouteSelected: {
      selector: '//SPAN[@class=\'convo__channels__label__text\']//*[contains(text(),\'From\')]',
      locateStrategy: 'xpath',
    },

    fromRouteDropdown: {
      selector: '//SELECT[@name=\'from-channel\']',
      locateStrategy: 'xpath',
    },
  },
};
