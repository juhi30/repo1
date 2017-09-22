module.exports = {
  // commands: [chatCommands],
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
    }
  }
};
