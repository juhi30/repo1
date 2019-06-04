import logger from 'rhinotilities/lib/loggers/logger';

const messageFeeder = require('../feeder/message.feeder');

const convoThreadCommands = {

  fillMessageInput(text) {
    return this.setValue('@messageInput', text);
  },

  // Clicking functions //
  clickElement(element) {
    return this.waitForElementVisible(element, `${element} is visible`)
      .click(element);
  },

  clickSendMessage() {
    return this.click('@messageSendButton');
  },

  clickSearchButton() {
    return this.click('@searchConvobutton')
      .waitForElementPresent('@searchConvoInput', 'Search input is visible');
  },

  clickaddFilePopupButton() {
    return this.waitForElementVisible('@addFilePopupButton', 'Add file dropdown button is visible')
      .click('@addFilePopupButton');
  },

  clickUseTemplateChoice() {
    return this.waitForElementPresent('@useTemplateChoice', 'Add file dropdown choices are visible')
      .click('@useTemplateChoice');
  },

  clickRhinoSecureTab() {
    return this.waitForElementPresent('@rhinoSecureTab', 'RhinoSecure tab visible')
      .click('@rhinoSecureTab');
  },

  clickApplyFiltersButton() {
    return this.waitForElementPresent('@applyFiltersButton', 'Apply Filters button is visible')
      .click('@applyFiltersButton');
  },

  clickAssignButton() {
    return this.waitForElementVisible('@assignButton', 'Assign button is visible')
      .click('@assignButton');
  },

  applyChannelFilter(channelName) {
    return this
      .api.useXpath().waitForElementVisible(`//DIV[@class='resource__intro__title']//SPAN[contains(., '${channelName}')]`, ` "${channelName}" is visible and clicked.`)
      .click(`//DIV[@class='resource__intro__title']//SPAN[contains(., '${channelName}')]`);
  },

  // Multistep functions //

  validatePageElements() {
    return this.waitForElementVisible('@messageInput', 'Conversation thread is visible')
      .verify.visible('@allCommunicationsDropdown', 'All Communications dropdown is visible')
      .verify.visible('@addNoteButton', 'Add note button is visible')
      .verify.visible('@searchConvobutton', 'Search Conversation button is visible')
      .verify.visible('@lastMessageBubble', 'First message is visible')
      .verify.visible('@messageInput', 'Message input is visible')
      .verify.visible('@messageSendButton', 'Send message button is visible')
      .verify.visible('@addFilePopupButton', 'Add file dropdown is visible')
      .verify.visible('@messageToDropdown', 'Message TO dropdown is visible')
      .verify.visible('@messageFromDropdown', 'Message FROM dropdown is visible');
  },

  addNoteToThread(text) {
    return this.click('@addNoteButton')
      .setValue('@addNoteInput', text)
      .click('@addNoteSubmit');
  },

  validateNotesFilter() {
    return this.click('@allCommunicationsDropdown')
      .waitForElementVisible('@notesChoice', 'Notes choice is visible')
      .click('@notesChoice')
      .waitForElementNotPresent('@lastMessageBubble', 'Messages are no longer present')
      .waitForElementPresent('@lastNoteBubble', 'Most recent Note is visible');
  },

  validateAllComsFilter() {
    return this.click('@notesDropdown')
      .waitForElementVisible('@notesChoice', 'Notes choice is visible')
      .click('@allCommunicationsChoice')
      .waitForElementPresent('@lastMessageBubble', 'Messages and notes are both visible');
  },

  searchMessageThread(searchString) {
    return this.setValue('@searchConvoInput', searchString)
      .waitForElementNotPresent('@lastMessageBubble', 'Message bubble hidden while searching for string')
      .waitForElementPresent('@lastMessageBubble', 'Message bubble with search string is visible')
      .verify.containsText('@lastMessageBubble', searchString, 'Found message with the searched for string')
      .clearValue('@searchConvoInput')
      .click('@searchConvoClearButton');
  },

  validateMessageTo() {
    return this.click('@messageToDropdown')
      .waitForElementPresent('@rhinoSecureChoice', 'TO choices are visible')
      .verify.visible('@phoneNumChoice', 'Phone number choice is visible')
      .click('@phoneNumChoice');
  },

  validateMessageFrom() {
    return this.waitForElementPresent('@messageFromDropdown', 'Message FROM dropdown is visible');
    // not validating any further as there are no other choices in dropdown currently
    // also sms channel name has random number generated in another test and hard to track
  },

  useHIPAATemplate(hipaa) {
    return this.waitForElementPresent('@useHIPAATemplateButton', 'Add file dropdown is visible')
      .waitForElementPresent('@useHIPAATemplateButton', 'Create/Use HIPAA template popup is visible')
      .click('@useHIPAATemplateButton')
      .pause(1000)
      // .click('@messageSendButton')
      // .pause()
      .waitForElementNotVisible('@useHIPAATemplateButton', 'Create/Use HIPAA template popup is no longer present')
      .verify.containsText('@messageInput', hipaa)
      .clearValue('@messageInput');
  },

  useFirstTemplate() {
    return this.click('@firstTemplateFilterButton')
      .waitForElementNotPresent('@firstTemplateFilterButton', 'Template Modal is no longer visible');
  },

  searchMessageAndNote(searchText, searchResult, message) {
    return this.waitForElementVisible('@messageSearchTextBox', 'Message Search Text Box is visible.')
      .setValue('@messageSearchTextBox', searchText)
      .pause(1000)
      .waitForElementVisible(searchResult, `Span with text "${searchText}" is visible as search result.`)
      .click(searchResult)
      .pause(1000)
      .waitForElementVisible(message, `Div with text "${searchText}" is visible in the chat box.`);
  },

  validateTemplateWasSent() {
    return this.verify.containsText('@lastMessageBubble', 'this should be in the template\'s message body', 'Template is shown in convo thread');
  },

  clickMemberAssign() {
    return this.waitForElementVisible('@membersOption', 'Members option is visible')
      .click('@membersOption');
  },

  clickAssignmentComplete() {
    return this.waitForElementVisible('@assignmentCompleteOption', 'Assignment Complete option is visible')
      .click('@assignmentCompleteOption');
  },

  clickOnIcon(element) {
    return this.waitForElementVisible(element, `${element} is visible.`)
      .click(element);
  },

  setValueOfMemberAssignSearchInput(name) {
    return this.waitForElementVisible('@assignmentMemberSearchInput', 'Member search input is visible')
      .setValue('@assignmentMemberSearchInput', name);
  },

  verifyUnreadMessage(contactName) {
    return this.api.useXpath().waitForElementVisible(`//DIV[contains(@class, 'is-unread')]//*[contains(., '${contactName}')]`, `Div with Unread text "${contactName}" is visible`);
  },

  sendRhinosecureMessage(rhinoSecureMessage) {
    return this.verify.visible('@rhinoSecureButton', 'Rhinosecure Button is visible')
      .click('@rhinoSecureButton')
      .verify.visible('@conversationTextarea')
      .clearValue('@rhinoSecureMessageInput')
      .setValue('@rhinoSecureMessageInput', rhinoSecureMessage)
      .pause(1000)
      .click('@sendMessageButton');
  },

  getPatientLink(globalVariable) {
    return this.getAttribute('@rhinoSecureAutoResponseLink', 'href', (tpObj) => {
      global[globalVariable] = tpObj.value;
      logger.info(global.NEW_CANARY_PATIENT_SIGNUP_LINK);
    });
  },

  verifyAutoResponse() {
    return this.waitForElementVisible('@rhinoSecureAutoResponseLink', 'Auto Response Message is Received');
  },
};

module.exports = {
  commands: [convoThreadCommands],
  url() {
    return `${this.api.launch_url}/inbox`;
  },
  elements: {

    backArrowbutton: {
      selector: '//BUTTON[contains(@title, \'Back to list\')]',
      locateStrategy: 'xpath',
    },

    messageSearchResult: {
      selector: `//*[contains(text(),'${messageFeeder.groupPatientMessage}')]`,
      locateStrategy: 'xpath',
    },

    noteSearchResult: {
      selector: `//*[contains(text(),'${messageFeeder.noteMessage}')]`,
      locateStrategy: 'xpath',
    },

    editProfileButton: {
      selector: '//SPAN[contains(.,\'Edit Profile\')]',
      locateStrategy: 'xpath',
    },

    messsage: {
      selector: `//DIV[@class='msg convo__item__body__msg msg--primary msg--outbound'][contains(text(),'${messageFeeder.groupPatientMessage}')]`,
      locateStrategy: 'xpath',
    },

    note: {
      selector: `//DIV[@class='msg convo__item__body__msg msg--note msg--outbound'][contains(text(),'${messageFeeder.noteMessage}')]`,
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------------------*/
    // convo header actions
    /*------------------------------------------------------------------------*/

    profileIcon: {
      selector: '//BUTTON[contains(@title, \'Contact Profile\')]',
      locateStrategy: 'xpath',
    },

    searchConversationIcon: {
      selector: '(//BUTTON[contains(@title, \'Search Conversation\')])[1]',
      locateStrategy: 'xpath',
    },

    messageSearchTextBox: {
      selector: '//INPUT[contains(@id,\'search\')]',
      locateStrategy: 'xpath',
    },

    assignmentIcon: {
      selector: '(//DIV[@class=\'convo__header convo__header--variation\']//button[@title=\'Assign Conversation\']/span/*[@class=\'icon\'])[1]',
      locateStrategy: 'xpath',
    },

    moreOptionsIcon: {
      selector: '//BUTTON[contains(@title, \'More Options\')]',
      locateStrategy: 'xpath',
    },

    filterByModalTitle: {
      selector: '//DIV[@class=\'app-page__header__title\'][contains(text(),\'Filter By\')]',
      locateStrategy: 'xpath',
    },

    assignmentCompleteOption: {
      selector: '(//SPAN[@class=\'u-text-overflow\'][contains(text(),\'Assignment Complete\')])[1]',
      locateStrategy: 'xpath',
    },

    markUnreadOption: {
      selector: '(//SPAN[@class=\'u-text-overflow\'][contains(text(),\'Mark as Unread\')])[1]',
      locateStrategy: 'xpath',
    },

    followIcon: {
      selector: '//BUTTON[contains(.,\'Follow\')]',
      locateStrategy: 'xpath',
    },

    unfollowIcon: {
      selector: '//BUTTON[contains(.,\'Unfollow\')]',
      locateStrategy: 'xpath',
    },

    filterIcon: {
      selector: '//BUTTON[contains(@title, \'Filter Conversation\']',
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------------------*/
    // filter by elements
    /*------------------------------------------------------------------------*/

    applyFiltersButton: {
      selector: '//SPAN[contains(text(), \'Apply Filters\')]',
      locateStrategy: 'xpath',
    },

    closeFilterByPageButton: {
      selector: '//BUTTON[contains(@title, \'Close\')]',
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------------------*/
    // message thread elements
    /*------------------------------------------------------------------------*/

    messageInput: {
      selector: '//TEXTAREA[contains(@name, \'message\')]',
      locateStrategy: 'xpath',
    },

    messageSendButton: {
      selector: '//BUTTON[contains(@title, \'Send message\')]',
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------------------*/
    // add file/Templates popup and elements
    /*------------------------------------------------------------------------*/

    addFilePopupButton: {
      selector: '//BUTTON[contains(@title, \'Add to message\')]',
      locateStrategy: 'xpath',
    },

    addFileChoice: {
      selector: '//SPAN[contains(.,\'Add File\')]',
      locateStrategy: 'xpath',
    },

    useTemplateChoice: {
      selector: '//SPAN[contains(.,\'Use Template\')]',
      locateStrategy: 'xpath',
    },

    consentRequestTemplateChoice: {
      selector: '//SPAN[contains(.,\'Use consent request template\')]',
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------------------*/
    // TO/FROM channel dropdown
    /*------------------------------------------------------------------------*/

    channelPopupButton: {
      selector: '//DIV[contains(@class, \'convo__channels\')]',
      locateStrategy: 'xpath',
    },

    toDropdown: {
      selector: '//SELECT[contains(@name, \'to-channel\')]',
      locateStrategy: 'xpath',
    },

    fromDropdown: {
      selector: '//SELECT[contains(@name, \'from-channel\')]',
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------------------*/
    // Message / RhinoSecure / Note tabs
    /*------------------------------------------------------------------------*/

    messageTab: {
      selector: '//SPAN[contains(.,\'Message\')]',
      locateStrategy: 'xpath',
    },

    rhinoSecureTab: {
      selector: '//SPAN[contains(.,\'RhinoSecure\')]',
      locateStrategy: 'xpath',
    },

    noteTab: {
      selector: '//SPAN[contains(.,\'Note\')]',
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------------------*/
    // Assignment Container elements
    /*------------------------------------------------------------------------*/

    membersOption: {
      selector: '//BUTTON[contains(@id, \'assign__members\')]',
      locateStrategy: 'xpath',
    },

    groupsOption: {
      selector: '//BUTTON[contains(@id, \'assign__groups\')]',
      locateStrategy: 'xpath',
    },

    assignmentMemberSearchInput: {
      selector: '//INPUT[contains(@placeholder, \'Search Members\')]',
      locateStrategy: 'xpath',
    },

    assignmentGroupSearchInput: {
      selector: '//INPUT[contains(@placeholder, \'Search Groups\')]',
      locateStrategy: 'xpath',
    },

    assignButton: {
      selector: '//BUTTON[contains(@id, \'assign__final__button\')]',
      locateStrategy: 'xpath',
    },

    closeConversationOption: {
      selector: '(//span[@class=\'u-text-overflow\'][text()=\'Close Conversation\'])[1]',
      locateStrategy: 'xpath',
    },

    closeConversationSuccessMessage: {
      selector: '//DIV[contains(text(),\'Conversation closed.\')]',
      locateStrategy: 'xpath',
    },

    rhinoSecureButton: {
      selector: '//SPAN[@class="button__text-wrapper"][text()="RhinoSecure"]',
      locateStrategy: 'xpath',
    },

    conversationTextarea: {
      selector: '//DIV[@class="convo__message__container"]',
      locateStrategy: 'xpath',
    },

    rhinoSecureMessageInput: {
      selector: '//TEXTAREA[contains(@id,"message")]',
      locateStrategy: 'xpath',
    },

    rhinoSecureAutoResponseLink: {
      selector: '(//DIV[contains(@class,"msg--outbound")])[last()]//A',
      locateStrategy: 'xpath',
    },

    sendMessageButton: {
      selector: '//BUTTON[contains(@class, \'convo__message__send\')]',
      locateStrategy: 'xpath',
    },
  },
};
