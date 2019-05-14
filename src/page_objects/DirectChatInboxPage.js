const memberFeeder = require('../feeder/member.feeder');
const helper = require('../toolboxes/helpers.toolbox');

const commands = {

  clickAddIcon() {
    return this.waitForElementVisible('@addicon', 'Add icon to search member/contact is visible')
      .click('@addicon');
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
    await helper.uploadFile2(this, 'contact.png');
    return this.pause(5000);
  },

  useHipaaTemplate() {
    return this.waitForElementVisible('@hipaaTemplate', 'Option to use Hipaa Template is visible')
      .click('@hipaaTemplate');
  },

  useOtherTemplate() {
    return this.waitForElementVisible('@useTemplateOption', 'Use Template option is visible')
      .click('@useTemplateOption');
  },

  clickSendMessageButton() {
    return this.waitForElementVisible('@sendMessageButton', 'Send message button is enabled')
      .click('@sendMessageButton');
  },
};

module.exports = {
  commands: [commands],
  url() {
    return `${this.api.launch_url}/chat`;
  },

  elements: {
    addicon: {
      selector: '//BUTTON[@title= \'Add New Contact\']',
      locateStrategy: 'xpath',
    },

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
