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
      .verify.visible('@addFileDropdown', 'Add file dropdown is visible')
      .verify.visible('@messageToDropdown', 'Message to dropdown is visible')
      .verify.visible('@messageFromDropdown', 'Message from dropdown is visible')
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

  clickAddFileButton: function() {
    return this.click('@addFileDropdown')
  },

  useHIPAATemplate: function() {
    return this.waitForElementPresent('@useTemplateChoice', 5000, 'Add file dropdown is visible')
      .click('@useTemplateChoice')
      .waitForElementPresent('@createTemplateButton', 5000, 'Create/Use HIPAA template popup is visible')
      .click('@useHIPAATemplateButton')
      .waitForElementNotPresent('@useHIPAATemplateButton', 5000, 'Create/Use HIPAA template popup is no longer present')
      .verify.containsText('@messageInput', 'In order to communicate protected health information (PHI) using unencrypted channels (like texting and Facebook), please give consent by replying "Agree."')
      .clearValue('@messageInput')
  }

}

module.exports = {
  commands: [convoThreadCommands],
  url: function() {
    return this.api.launch_url + '/inbox'
  },
  elements: {

    backArrowbutton: {
      selector: `//*[@id="app"]/div/div[2]/div/div[2]/div[1]/div/div[1]/button[1]`,
      locateStrategy: 'xpath',
    },

    infoButton: {
      selector: `//div[@class='convo__header']/button[2]`,
      locateStrategy: 'xpath'
    },

    editProfileButton: {
      selector: `//div[@class='profile__user']//button[.='Edit Profile']`,
      locateStrategy: 'xpath'
    },

    /*------------------------------------------------------------------------*/
    // Communication dropdown filters
    /*------------------------------------------------------------------------*/

    allCommunicationsDropdown: {
      selector: `//SPAN[@class='dropdown__toggle__text'][text()='All Communication']`,
      locateStrategy: 'xpath',
    },

    notesDropdown: {
      selector: `//SPAN[@class='dropdown__toggle__text'][text()='Notes']`,
      locateStrategy: 'xpath',
    },

    allCommunicationsChoice: {
      selector: `//SPAN[@class='u-text-overflow'][text()='All Communication']`,
      locateStrategy: 'xpath',
    },

    notesChoice: {
      selector: `//SPAN[@class='u-text-overflow'][text()='Notes']`,
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------------------*/
    // add note elements
    /*------------------------------------------------------------------------*/

    addNoteButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Add Note']`,
      locateStrategy: 'xpath'
    },

    addNoteInput: {
      selector: `(//INPUT[@type='text'])[4]`,
      locateStrategy: 'xpath'
    },

    addNoteSubmit: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Add']`,
      locateStrategy: 'xpath'
    },

    /*------------------------------------------------------------------------*/
    // search elements
    /*------------------------------------------------------------------------*/

    searchConvobutton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[11]`,
      locateStrategy: 'xpath',
    },

    searchConvoInput: {
      selector: `(//INPUT[@type='text'])[3]`,
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------------------*/
    // message thread elements
    /*------------------------------------------------------------------------*/

    messageInput: {
      selector: `//TEXTAREA[@rows='1']`,
      locateStrategy: 'xpath',
    },

    messageSendButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Send']`,
      locateStrategy: 'xpath',
    },

    lastMessageBubble: {
      selector: `(//DIV[@class='msg convo__item__body__msg msg--primary msg--outbound'])[last()]`,
      locateStrategy: 'xpath',
    },

    lastNoteBubble: {
      selector: `(//DIV[@class='msg convo__item__body__msg msg--note msg--outbound'])[last()]`,
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------------------*/
    // add file dropdown and elements
    /*------------------------------------------------------------------------*/

    addFileDropdown: {
      selector: `(//SPAN[@class='button__text-wrapper'])[15]`,
      locateStrategy: 'xpath',
    },

    useTemplateChoice: {
      selector: `//SPAN[@class='u-text-overflow'][text()='Use Template']`,
      locateStrategy: `xpath`,
    },

    createTemplateButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Create Template']`,
      locateStrategy: 'xpath',
    },

    useHIPAATemplateButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Use']`,
      locateStrategy: 'xpath',
    },

    addFilechoice: {
      selector: `//SPAN[@class='u-text-overflow'][text()='Add File']`,
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------------------*/
    // TO/FROM channel dropdown
    /*------------------------------------------------------------------------*/

    messageToDropdown: {
      selector: `//SPAN[@class='dropdown__toggle__text'][text()='(843) 555-1234']`,
      locateStrategy: 'xpath',
    },

    rhinoSecureChoice: {
      selector: `//DIV[@class='dropdown__menu__item__content__desc'][text()='RhinoSecure messaging']`,
      locateStrategy: 'xpath',
    },

    phoneNumChoice: {
      selector: `//SPAN[@class='u-text-overflow'][text()='(843) 555-1234']`,
      locateStrategy: 'xpath',
    },

    messageFromDropdown: {
      selector: `(//BUTTON[@class='button dropdown__toggle u-p-a-0 button--link button--small'])[2]`,
      locateStrategy: 'xpath',
    },

    smsChannelChoice: {
      selector: `//SPAN[@class='dropdown__toggle__text'][text()='SMS Test Channel56']`,
      locateStrategy: 'xpath',
    },
  }
};
