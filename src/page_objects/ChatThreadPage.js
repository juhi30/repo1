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
  },
};
