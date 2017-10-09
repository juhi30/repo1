const chatCommands = {
  clickNewChatButton: function() {
    return this.waitForElementVisible('@newChatButton', 5000, 'New Chat button is visible')
      .click('@newChatButton');
  },

  clickFirstChatResult: function() {
    return this.waitForElementVisible('@newChatSearchResult', 5000, 'First result is visible')
      .click('@newChatSearchResult');
  },

  clickSendMessageButton: function() {
    return this.waitForElementVisible('@sendMessageButton', 5000, 'Send message button is visible')
      .click('@sendMessageButton');
  },

  fillInNewChatSearchInput: function(text) {
    return this.waitForElementVisible('@newChatSearchInput', 5000, 'New chat search input is visible')
      .setValue('@newChatSearchInput', text);
  },

  fillInChatMessageInput: function(text) {
    return this.waitForElementVisible('@chatMessageInput', 5000, 'Message input is visible')
      .setValue('@chatMessageInput', text);
  },

}

module.exports = {
  commands: [chatCommands],
  url: 'https://dev.dev-rhinogram.com/chat',
  elements: {
    newChatButton: {
      selector: `//div[@class='inbox__header']//button[.='New Chat']`,
      locateStrategy: 'xpath'
    },

    newChatSearchInput: {
      selector: `//div[@class='inbox__header']/div/div/div/div/div/div/input`,
      locateStrategy: 'xpath'
    },

    newChatSearchResult: {
      selector: `//div[@class='dropdown__menu__item__content__desc']`,
      locateStrategy: 'xpath'
    },

    chatMessageInput: {
      selector: `//div[@class='convo__message__compose']/div/textarea`,
      locateStrategy: 'xpath'
    },

    firstChatThread: {
      selector: `//div[1]/div/div[2]/div/div[1]/div/div[2]/div[1]/div[1]/div[1]`,
      locateStrategy: 'xpath'
    },

    sendMessageButton: {
      selector: `//div[@class='convo__message__send']//button[.='Send']`,
      locateStrategy: 'xpath'
    },

    typingIndicator: {
      selector: `//span[@class='convo__typing-indicator__info__names']`,
      locateStrategy: 'xpath',
    },

  }
};
