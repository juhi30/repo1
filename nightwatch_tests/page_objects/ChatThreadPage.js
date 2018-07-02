const chatThreadCommands = {
  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  clickSendMessageButton: function() {
    return this.waitForElementVisible('@sendMessageButton', 5000, 'Send message button is visible')
      .click('@sendMessageButton');
  },

  fillInMessageInput: function(text) {
    return this.waitForElementVisible('@messageInput', 5000, 'Message input is visible')
      .setValue('@messageInput', text);
  },

}

module.exports = {
  commands: [chatThreadCommands],
  url: 'https://dev.dev-rhinogram.com/chat',
  elements: {
    messageInput: {
      selector: `//TEXTAREA[contains(@name, 'message')]`,
      locateStrategy: 'xpath'
    },

    sendMessageButton: {
      selector: `//BUTTON[contains(@class, 'convo__message__send')]`,
      locateStrategy: 'xpath'
    },
  }
};
