const convoThreadCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  validatePageElements: function() {
    return this.waitForElementVisible('@messageInput', 5000, 'Conversation thread is visible')
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

  addMessagesToThread: function(text) {
    return this.setValue('@messageInput', text)
  },

  clickSendMessage: function() {
    return this.click('@messageSendButton')
  },

  addNoteToThread: function(text) {
    return this.click('@addNoteButton')
      .setValue('@addNoteInput', text)
      .click('@addNoteSubmit')
  },

  validateNotesFilter: function() {
    return this.click('@allCommunicationsDropdown')
      .waitForElementVisible('@notesChoice', 5000, 'Notes choice is visible')
      .click('@notesChoice')
      .waitForElementNotPresent('@lastMessageBubble', 5000, 'Messages are no longer present')
      .waitForElementPresent('@lastNoteBubble', 5000, 'Most recent Note is visible')
  },

  validateAllComsFilter: function() {
    return this.click('@notesDropdown')
      .waitForElementVisible('@notesChoice', 5000, 'Notes choice is visible')
      .click('@allCommunicationsChoice')
      .waitForElementPresent('@lastMessageBubble', 5000, 'Messages and notes are both visible')
  },

  clickSearchButton: function() {
    return this.click('@searchConvobutton')
      .waitForElementPresent('@searchConvoInput', 5000, 'Search input is visible')
  },

  searchMessageThread: function(searchString) {
    return this.setValue('@searchConvoInput', searchString)
      .waitForElementNotPresent('@lastMessageBubble', 5000, 'Message bubble hidden while searching for string')
      .waitForElementPresent('@lastMessageBubble', 5000, 'Message bubble with search string is visible')
      .verify.containsText('@lastMessageBubble', searchString, 'Found message with the searched for string')
      .clearValue('@searchConvoInput')
      .click('@searchConvoClearButton')
  },

  validateMessageTo: function() {
    return this.click('@messageToDropdown')
      .waitForElementPresent('@rhinoSecureChoice', 5000, 'TO choices are visible')
      .verify.visible('@phoneNumChoice', 'Phone number choice is visible')
      .click('@phoneNumChoice')
  },

  validateMessageFrom: function() {
    return this.waitForElementPresent('@messageFromDropdown', 5000, 'Message FROM dropdown is visible')
    // not validating any further as there are no other choices in dropdown currently
    // also sms channel name has random number generated in another test and hard to track
  },

  clickaddFilePopupButton: function() {
    return this.waitForElementVisible('@addFilePopupButton', 5000, 'Add file dropdown button is visible')
      .click('@addFilePopupButton')
  },

  clickUseTemplateChoice: function() {
    return this.waitForElementPresent('@useTemplateChoice', 5000, 'Add file dropdown choices are visible')
      .click('@useTemplateChoice')
  },

  useHIPAATemplate: function(hipaa) {
    return this.waitForElementPresent('@useHIPAATemplateButton', 5000, 'Add file dropdown is visible')
      .waitForElementPresent('@useHIPAATemplateButton', 5000, 'Create/Use HIPAA template popup is visible')
      .click('@useHIPAATemplateButton')
      .pause(1000)
      // .click('@messageSendButton')
      // .pause()
      .waitForElementNotVisible('@useHIPAATemplateButton', 5000, 'Create/Use HIPAA template popup is no longer present')
      .verify.containsText('@messageInput', hipaa)
      .clearValue('@messageInput')
  },

  useFirstTemplate: function() {
    return this.click('@firstTemplateFilterButton')
      .waitForElementNotPresent('@firstTemplateFilterButton', 5000, 'Template Modal is no longer visible')
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
      selector: `//BUTTON[contains(@class, 'convo__header__back-button')]`,
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

    /*------------------------------------------------------------------------*/
    // message thread elements
    /*------------------------------------------------------------------------*/

    messageInput: {
      selector: `//TEXTAREA[contains(@name, 'message')]`,
      locateStrategy: 'xpath',
    },

    messageSendButton: {
      selector: `//BUTTON[contains(@class, 'convo__message__send')]`,
      locateStrategy: 'xpath',
    },
    
    /*------------------------------------------------------------------------*/
    // add file/Templates popup and elements
    /*------------------------------------------------------------------------*/

    addFilePopupButton: {
      selector: `//BUTTON[contains(@class, 'convo__message__add')]`,
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
