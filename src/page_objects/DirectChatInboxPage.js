const memberFeeder = require('../feeder/member.feeder');
const helpers = require('../toolboxes/helpers.toolbox');

const commands = {

  clickAddIcon() {
    return this.waitForElementVisible('@addicon', 'Add icon to search member is visible')
      .click('@addicon');
  },

  searchMemberAndOpenchatThread(titleElement, searchText) {
     this.waitForElementVisible(titleElement, 'Search Modal is opened')
      .setValue('@searchInput', searchText)
      // .waitForElementVisible(resultElement, 'Searched member name is visible')
      // .click(resultElement);
      return helpers.clickSpanViaText(this, searchText);
  },

  fillInMessageInput(text) {
    return this.waitForElementVisible('@messageInput', 'Message input is visible')
      .setValue('@messageInput', text);
  },

  clickSendMessageButton() {
    return this.waitForElementVisible('@sendMessageButton', 'Send message button is visible')
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
      selector: '//BUTTON[contains(@class, \'convo__message__send\')]',
      locateStrategy: 'xpath',
    },

  },
};
