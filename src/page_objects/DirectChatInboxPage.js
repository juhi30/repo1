const memberFeeder = require('../feeder/member.feeder');
const helper = require('../toolboxes/helpers.toolbox');
const messageFeeder = require('../feeder/message.feeder');

const commands = {

  clickAddIcon() {
    return this.waitForElementVisible('@addIcon', 'Add icon to search member/contact is visible')
      .click('@addIcon');
  },

  searchMemberAndOpenThread(titleElement, searchText) {
    return this.waitForElementVisible(titleElement, 'Search Modal is opened')
      .setValue('@searchInput', searchText)
      .api.useXpath().waitForElementVisible(`//SPAN[contains(., '${searchText}')]`, `Span with text "${searchText}" is visible`)
      .click(`//SPAN[contains(., '${searchText}')]`);
  },

  fillInMessageInput(message) {
    return this.waitForElementVisible('@messageInput', 'Message input is visible')
      .setValue('@messageInput', message);
  },

  addToMessageOption() {
    return this.waitForElementVisible('@addToMessageIcon', 'Add To Message Icon is visible')
      .click('@addToMessageIcon');
  },

  async addingAttachment() {
    this.waitForElementVisible('@addFileOption', 'Add File option is visible')
      .pause(2000)
      .waitForElementVisible('@attachmentInput', 'attachment input is visible');
    await helper.uploadFile(this, 'contact.png', '@attachmentInput');
    return this.pause(5000);
  },

  useTemplate(templateElement) {
    return this.waitForElementVisible(templateElement, `Template "${templateElement}" is visible`)
      .click(templateElement);
  },

  clickSendMessageButton() {
    return this.waitForElementVisible('@sendMessageButton', 'Send message button is enabled')
      .click('@sendMessageButton');
  },

  openMessageThread(messageThread) {
    return this.api.useXpath().waitForElementVisible(`//SPAN[contains(., '${messageThread}')]`, `Span with text "${messageThread}" is visible`)
      .click(messageThread);
  },

  openAssignModal() {
    return this.waitForElementVisible('@assignConversationIcon', 'Assign icon is visible')
      .click('@assignConversationIcon')
      .waitForElementVisible();
  },

  selectMemberAndGroup(search, titleElement, searchText) {
    return this.waitForElementVisible(titleElement, 'Search Modal is opened')
      .setValue(search, searchText)
      .api.useXpath().waitForElementVisible(`//SPAN[contains(., '${searchText}')]`, `Span with text "${searchText}" is visible`)
      .click(`//SPAN[contains(., '${searchText}')]`);
  },

  searchMessageAndNote(searchText) {
    return this.waitForElementVisible('@messageSearchOption', 'Message Search Option is visible.')
      .waitForElementVisible('@messageSearchTextBox', 'Message Search Text Box is visible.')
      .setValue('@messageSearchTextBox', searchText)
      .api.useXpath().waitForElementVisible(`//SPAN[contains(., '${searchText}')]`, `Span with text "${searchText}" is visible as search result.`)
      .click(`//SPAN[contains(., '${searchText}')]`)
      .api.useXpath().waitForElementVisible(`//SPAN[contains(., '${searchText}')]`, `Span with text "${searchText}" is visible in the chat box.`);
  },


  clickOption(element) {
    return this.waitForElementVisible(element, `${element} is visible`)
      .click(element);
  },

  addNote(text) {
    return this.waitForElementVisible('@noteTextArea', 'Add Note Textarea is visible')
      .setValue('@noteTextArea', text);
  },


};

module.exports = {
  commands: [commands],
  url() {
    return `${this.api.launch_url}/chat`;
  },

  elements: {

    addNoteButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][contains(text(),\'Add Note\')]',
      locateStrategy: 'xpath',
    },

    followButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][contains(text(),\'Follow\')]',
      locateStrategy: 'xpath',
    },

    noteTextArea: {
      selector: '//TEXTAREA[contains(@id,\'note\')]',
      locateStrategy: 'xpath',
    },

    noteMessage: {
      selector: `//div[@class='msg convo__item__body__msg msg--note msg--outbound'][contains(text(),'${messageFeeder.noteMessage}')]`,
      locateStrategy: 'xpath',
    },

    assignmentCompleteButton: {
      selector: '(//SPAN[@class=\'u-text-overflow\'][contains(text(),\'Assignment Complete\')])[2]',
      locateStrategy: 'xpath',
    },

    assignToMeButton: {
      selector: '(//SPAN[@class=\'u-text-overflow\'][contains(text(),\'Assign to Me\')])[2]',
      locateStrategy: 'xpath',
    },

    markAsUnreadButton: {
      selector: '(//SPAN[@class=\'u-text-overflow\'][contains(text(),\'Mark as Unread\')])[2]',
      locateStrategy: 'xpath',
    },

    addIcon: {
      selector: '//BUTTON[@title= \'Add New Contact\']',
      locateStrategy: 'xpath',
    },

    memberOption: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][contains(text(),\'Members\')]',
      locateStrategy: 'xpath',
    },

    memberSearchInput: {
      selector: '//input[contains(@id,\'preloadedMembers\')]',
      locateStrategy: 'xpath',
    },

    groupOption: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][contains(text(),\'Groups\')]',
      locateStrategy: 'xpath',
    },

    groupSearchInput: {
      selector: '//input[contains(@id,\'search\')]',
      locateStrategy: 'xpath',
    },

    assignButton: {
      selector: '//span[@class=\'button__text-wrapper\'][contains(., \'Assign\')]',
      locateStrategy: 'xpath',
    },

    assignConversationIcon: {
      selector: '(//DIV[@class=\'convo__header convo__header--variation\']//button[@title=\'Assign Conversation\']/span/*[@class=\'icon\'])[1]',
      locateStrategy: 'xpath',
    },

    messageSearchOption: {
      selector: '(//BUTTON[@title=\'Search Conversation\'])[2]',
      locateStrategy: 'xpath',
    },

    messageSearchTextBox: {
      selector: '//INPUT[contains(@id,\'search\')]',
      locateStrategy: 'xpath',
    },

    // messageSearchResult: {
    //   selector: `//DIV[@class='msg convo__item__body__msg msg--primary msg--outbound'][contains(text(),'hey')]`,
    //   locateStrategy: 'xpath',
    // },

    chatPageTitle: {
      selector: '//*[@class=\'app-page__header__title\'][contains(text(),\'Team\')]',
      locateStrategy: 'xpath',
    },

    modalTitle: {
      selector: '//H3[text() = \'Search Members\']',
      locateStrategy: 'xpath',
    },

    searchInput: {
      selector: '//Input[@placeholder = \'First, last, or preferred name\']',
      locateStrategy: 'xpath',
    },

    memberResult: {
      selector: `//SPAN[contains(., '${memberFeeder.memberName}')]`,
      locateStrategy: 'xpath',
    },

    member2Result: {
      selector: `//SPAN[contains(., '${memberFeeder.memberName2}')]`,
      locateStrategy: 'xpath',
    },

    messageInput: {
      selector: '//TEXTAREA[contains(@name, \'message\')]',
      locateStrategy: 'xpath',
    },

    sendMessageButton: {
      selector: '//BUTTON[@title=\'Send message\']',
      locateStrategy: 'xpath',
    },

    // For Searching Contact for Patient Inbox
    searchContactModalTitle: {
      selector: '//H3[text() = \'Search Contacts\']',
      locateStrategy: 'xpath',
    },

    failedMessage: {
      selector: '//SPAN[contains(text(),\'Failed\')]',
      locateStrategy: 'xpath',
    },

    addToMessageIcon: {
      selector: '//BUTTON[@title=\'Add to message\']',
      locateStrategy: 'xpath',
    },

    addFileOption: {
      selector: '//SPAN[@class = \'u-text-overflow\'][contains(text(),\'Add File\')]',
      locateStrategy: 'xpath',
    },

    hipaaTemplate: {
      selector: '//SPAN[contains(text(),\'Use HIPAA consent request template\')]',
      locateStrategy: 'xpath',
    },

    useTemplateOption: {
      selector: '//*[text() = \'Use Template\']',
      locateStrategy: 'xpath',
    },

    attachmentInput: {
      selector: '//DIV[contains(@class,\'dropdown__menu--top\')]//Input[@type=\'file\']',
      locateStrategy: 'xpath',
    },
  },
};
