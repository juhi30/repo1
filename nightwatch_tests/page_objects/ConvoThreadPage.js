const convoThreadCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  validatePageElements: function() {
    return this.waitForElementVisible('@messageInput', 'Conversation thread is visible')
      .verify.visible('@allCommunicationsDropdown', 'All Communications dropdown is visible')
      .verify.visible('@addNoteButton', 'Add note button is visible')
      .verify.visible('@searchConvobutton', 'Search Conversation button is visible')
      .verify.visible('@lastMessageBubble', 'First message is visible')
      .verify.visible('@messageInput', 'Message input is visible')
      .verify.visible('@messageSendButton', 'Send message button is visible')
      .verify.visible('@addFilePopupButton', 'Add file dropdown is visible')
      .verify.visible('@messageToDropdown', 'Message TO dropdown is visible')
      .verify.visible('@messageFromDropdown', 'Message FROM dropdown is visible')
  },

  fillMessageInput: function(text) {
    return this.setValue('@messageInput', text)
  },

    // Clicking functions //
  clickElement: function(element) {
    return this.waitForElementVisible(element, `${element} is visible`)
      .click(element)
  },

  clickSendMessage: function() {
    return this.click('@messageSendButton')
  },

  clickSearchButton: function(element) {
    return this.click('@searchConvobutton')
      .waitForElementPresent('@searchConvoInput', 'Search input is visible')
  },

  clickaddFilePopupButton: function() {
    return this.waitForElementVisible('@addFilePopupButton', 'Add file dropdown button is visible')
      .click('@addFilePopupButton')
  },

  clickUseTemplateChoice: function() {
    return this.waitForElementPresent('@useTemplateChoice', 'Add file dropdown choices are visible')
      .click('@useTemplateChoice')
  },
  
  clickaddFilePopupButton: function() {
    return this.waitForElementVisible('@addFilePopupButton', 'Add file dropdown button is visible')
      .click('@addFilePopupButton')
  },

  clickUseTemplateChoice: function() {
    return this.waitForElementPresent('@useTemplateChoice', 'Add file dropdown choices are visible')
      .click('@useTemplateChoice')
  },

  clickRhinoSecureTab: function() {
    return this.waitForElementPresent('@rhinoSecureTab', 'RhinoSecure tab visible')
      .click('@rhinoSecureTab')
  },

  clickApplyFiltersButton: function() {
    return this.waitForElementPresent('@applyFiltersButton', 'Apply Filters button is visible')
      .click('@applyFiltersButton')
  },

  // Multistep functions //

  addNoteToThread: function(text) {
    return this.click('@addNoteButton')
      .setValue('@addNoteInput', text)
      .click('@addNoteSubmit')
  },

  validateNotesFilter: function() {
    return this.click('@allCommunicationsDropdown')
      .waitForElementVisible('@notesChoice', 'Notes choice is visible')
      .click('@notesChoice')
      .waitForElementNotPresent('@lastMessageBubble', 'Messages are no longer present')
      .waitForElementPresent('@lastNoteBubble', 'Most recent Note is visible')
  },

  validateAllComsFilter: function() {
    return this.click('@notesDropdown')
      .waitForElementVisible('@notesChoice', 'Notes choice is visible')
      .click('@allCommunicationsChoice')
      .waitForElementPresent('@lastMessageBubble', 'Messages and notes are both visible')
  },

  searchMessageThread: function(searchString) {
    return this.setValue('@searchConvoInput', searchString)
      .waitForElementNotPresent('@lastMessageBubble', 'Message bubble hidden while searching for string')
      .waitForElementPresent('@lastMessageBubble', 'Message bubble with search string is visible')
      .verify.containsText('@lastMessageBubble', searchString, 'Found message with the searched for string')
      .clearValue('@searchConvoInput')
      .click('@searchConvoClearButton')
  },

  validateMessageTo: function() {
    return this.click('@messageToDropdown')
      .waitForElementPresent('@rhinoSecureChoice', 'TO choices are visible')
      .verify.visible('@phoneNumChoice', 'Phone number choice is visible')
      .click('@phoneNumChoice')
  },

  validateMessageFrom: function() {
    return this.waitForElementPresent('@messageFromDropdown', 'Message FROM dropdown is visible')
    // not validating any further as there are no other choices in dropdown currently
    // also sms channel name has random number generated in another test and hard to track
  },

  useHIPAATemplate: function(hipaa) {
    return this.waitForElementPresent('@useHIPAATemplateButton', 'Add file dropdown is visible')
      .waitForElementPresent('@useHIPAATemplateButton', 'Create/Use HIPAA template popup is visible')
      .click('@useHIPAATemplateButton')
      .pause(1000)
      // .click('@messageSendButton')
      // .pause()
      .waitForElementNotVisible('@useHIPAATemplateButton', 'Create/Use HIPAA template popup is no longer present')
      .verify.containsText('@messageInput', hipaa)
      .clearValue('@messageInput')
  },

  useFirstTemplate: function() {
    return this.click('@firstTemplateFilterButton')
      .waitForElementNotPresent('@firstTemplateFilterButton', 'Template Modal is no longer visible')
  },

  validateTemplateWasSent: function() {
    return this.verify.containsText('@lastMessageBubble', 'this should be in the template\'s message body', 'Template is shown in convo thread')
  }

}

module.exports = {
  commands: [convoThreadCommands],
  url: function() {
    return this.api.launch_url + '/inbox'
  },
  elements: {

    backArrowbutton: {
      selector: `//BUTTON[contains(@title, 'Back to list')]`,
      locateStrategy: 'xpath',
    },

    editProfileButton: {
      selector: `//SPAN[contains(.,'Edit Profile')]`,
      locateStrategy: 'xpath'
    },

    /*------------------------------------------------------------------------*/
    // convo header actions
    /*------------------------------------------------------------------------*/

    profileIcon: {
      selector: `//BUTTON[contains(@title, 'Contact Profile')]`,
      locateStrategy: 'xpath'
    },

    searchConversationIcon: {
      selector: `//BUTTON[contains(@title, 'Search Conversation')]`,
      locateStrategy: 'xpath'
    },

    assignmentIcon: {
      selector: `//BUTTON[contains(@title, 'Assign Conversation')]`,
      locateStrategy: 'xpath'
    },

    moreOptionsIcon: {
      selector: `//BUTTON[contains(@title, 'More Options')]`,
      locateStrategy: 'xpath'
    },

    assignmentCompleteOption: {
      selector: `//SPAN[contains(.,'Assignment Complete')]`,
      locateStrategy: 'xpath'
    },

    markUnreadOption: {
      selector: `//SPAN[contains(.,'Mark as Unread')]`,
      locateStrategy: 'xpath'
    },

    followIcon: {
      selector: `//BUTTON[contains(.,'Follow')]`,
      locateStrategy: 'xpath'
    },

    unfollowIcon: {
      selector: `//BUTTON[contains(.,'Unfollow')]`,
      locateStrategy: 'xpath'
    },

    filterIcon: {
      selector: `//BUTTON[contains(@title, 'Filter Conversation']`,
      locateStrategy: 'xpath'
    },

    /*------------------------------------------------------------------------*/
    // filter by elements
    /*------------------------------------------------------------------------*/

    applyFiltersButton: {
      selector: `//SPAN[contains(text(), 'Apply Filters')]`,
      locateStrategy: 'xpath'
    },

    closeFilterByPageButton: {
      selector: `//BUTTON[contains(@title, 'Close')]`,
      locateStrategy: 'xpath'
    },

    /*------------------------------------------------------------------------*/
    // message thread elements
    /*------------------------------------------------------------------------*/

    messageInput: {
      selector: `//TEXTAREA[contains(@name, 'message')]`,
      locateStrategy: 'xpath',
    },

    messageSendButton: {
      selector: `//BUTTON[contains(@title, 'Send message')]`,
      locateStrategy: 'xpath',
    },
    
    /*------------------------------------------------------------------------*/
    // add file/Templates popup and elements
    /*------------------------------------------------------------------------*/

    addFilePopupButton: {
      selector: `//BUTTON[contains(@title, 'Add to message')]`,
      locateStrategy: 'xpath',
    },

    addFileChoice: {
      selector: `//SPAN[contains(.,'Add File')]`,
      locateStrategy: 'xpath',
    },

    useTemplateChoice: {
      selector: `//SPAN[contains(.,'Use Template')]`,
      locateStrategy: `xpath`,
    },

    consentRequestTemplateChoice: {
      selector: `//SPAN[contains(.,'Use consent request template')]`,
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------------------*/
    // TO/FROM channel dropdown
    /*------------------------------------------------------------------------*/

    channelPopupButton: {
      selector: `//DIV[contains(@class, 'convo__channels')]`,
      locateStrategy: 'xpath',
    },

    toDropdown: {
      selector: `//SELECT[contains(@name, 'to-channel')]`,
      locateStrategy: 'xpath',
    },

    fromDropdown: {
      selector: `//SELECT[contains(@name, 'from-channel')]`,
      locateStrategy: 'xpath',
    },
    
    /*------------------------------------------------------------------------*/
    // Message / RhinoSecure / Note tabs
    /*------------------------------------------------------------------------*/

    messageTab: {
      selector: `//SPAN[contains(.,'Message')]`,
      locateStrategy: 'xpath',
    },

    rhinoSecureTab: {
      selector: `//SPAN[contains(.,'RhinoSecure')]`,
      locateStrategy: 'xpath',
    },

    noteTab: {
      selector: `//SPAN[contains(.,'Note')]`,
      locateStrategy: 'xpath',
    },
  }
};
