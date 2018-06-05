const inboxCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  validateInbox: function() {
    return this.waitForElementVisible('@inboxMessages', 5000, 'Inbox is visible')
      .verify.visible('@inboxMessages', 'Inbox Messages are visible')
      .waitForElementVisible('@threadContainer', 5000, 'Thread container is visible')
      .verify.visible('@threadContainer', 'First thread is visible')
      .verify.visible('@newMessageButton', 'Button is visible')
      .verify.containsText('@newMessageButton', 'New Message', 'Button says New Message')
  },

  newMessageClick: function() {
    return this.waitForElementVisible('@newMessageButton', 5000, 'New Message button is visible')
      .click('@newMessageButton')
  },

  validateNewMessageInput: function() {
      return this.waitForElementVisible('@newMessageSearchInput', 5000, 'New message input is visible')
        .verify.visible('@newMessageSearchInput', 'New message input is visible')
  },

  fillInNewMessageInput: function(searchInput) {
    return this.waitForElementVisible('@newMessageSearchInput', 5000, 'Search input is visible')
      .setValue('@newMessageSearchInput', searchInput)
  },

  searchResultNotVisible: function() {
      return this.waitForElementVisible('body', 5000)
        .verify.elementNotPresent('@firstResultNewMessageSearch', 'First input result is not visible')
  },

  searchResultVisible: function() {
      return this.waitForElementVisible('@firstResultNewMessageSearch', 5000, 'First result of the search is visible')
        .verify.visible('@firstResultNewMessageSearch', 'First input result is visible')
  },

  clickFirstResult: function() {
    return this.waitForElementVisible('@firstResultNewMessageSearch', 5000, 'First result of the search is visible')
      .click('@firstResultNewMessageSearch')
      .verify.urlContains('profileOpen=1', 'The page address goes to conversation thread and profile view')
  },

  clickAddNewContact: function() {
    return this.waitForElementVisible('@addNewContactButton', 5000, 'Add new contact button is visible')
      .click('@addNewContactButton');
  },
}

const InboxPage = {
  commands: [inboxCommands],
  url: function() {
    return this.api.launch_url + '/inbox'
  },
  elements: {
    inboxMessages: {
      selector: ``,
      locateStrategy: 'xpath'
    },

    // written to make sure threads have somewhere to populate as the thread xpath changes and difficult to find
    threadContainer: {
      selector: ``,
      locateStrategy: 'xpath',
    },

    newMessageButton: {
      selector: ``,
      locateStrategy: 'xpath',
    },

    newMessageSearchInput: {
      selector: ``,
      locateStrategy: 'xpath',
    },

    firstResultNewMessageSearch: {
      selector: ``, 
      locateStrategy: 'xpath',
    },

    addNewContactButton: {
      selector: ``,
      locateStrategy: 'xpath'
    },

  }
};

export default InboxPage;