const inboxCommands = {

  validateInbox: function() {
    return this.waitForElementVisible('body', 5000)
      .verify.visible('@inboxMessages', 'Inbox Messages are visible')
      .verify.visible('@newMessageButton', 'Button is visible')
      .verify.containsText('@newMessageButton', 'New Message', 'Button says New Message')
  },

  newMessageClick: function() {
    return this.waitForElementVisible('body', 1000)
      .verify.visible('@newMessageButton', 'Button is visible')
      .click('@newMessageButton')
    client.pause(3000)
  },

  validateNewMessageInput: function() {
      return this.waitForElementVisible('@newMessageSearchInput', 1000)
        .verify.visible('@newMessageSearchInput', 'New message input is visible')
  },

  fillInNewMessageInput: function(searchInput) {
    return this.waitForElementVisible('body', 1000)
      .setValue('@newMessageSearchInput', searchInput)
  },

  searchResultNotVisible: function() {
      return this.waitForElementVisible('body', 1000)
        .verify.elementNotPresent('@firstResultNewMessageSearch', 'First input result is not visible')
  },

  searchResultVisible: function() {
      return this.waitForElementVisible('@firstResultNewMessageSearch', 1000)
        .verify.visible('@firstResultNewMessageSearch', 'First input result is visible')
  },

  clickFirstResult: function() {
    return this.waitForElementVisible('body', 1000)
      .click('@firstResultNewMessageSearch')
  },
}

module.exports = {
  commands: [inboxCommands],
  url: function() {
    return this.api.launch_url + '/inbox'
  },
  elements: {
    inboxMessages: {
      selector: `//*[@id="app"]/div/div[2]/div/div[1]/div/div[2]`,
      locateStrategy: 'xpath'
    },
    firstThread: {
      selector: `//div[1]/div/div[2]/div/div[1]/div/div[2]/div[1]/div[1]/div[2]/div[1]`,
      locateStrategy: 'xpath',
    },
    newMessageButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div[1]/div/div[1]/div/div/button/span`,
      locateStrategy: 'xpath',
    },
    newMessageSearchInput: {
      selector: `//div[@class='inbox__header']/div/div/div/div/div[1]/div/input`,
      locateStrategy: 'xpath',
    },
    firstResultNewMessageSearch: {
      selector: `//div[@class='inbox__header']/div/div/div/div/div[2]/button`,
      locateStrategy: 'xpath',
    },
    newContactButtonWithinNewMessage: {
      selector: `//div[@class='inbox__header']/div/div/div/div/div[2]/button`,
      locateStrategy: 'xpath',
    },
  }
};
