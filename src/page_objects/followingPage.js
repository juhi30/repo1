const contactFeeder = require('../feeder/contact.feeder');

const followingPageCommands = {

  verifyFollowedThread(ContactName, chatContact) {
    return this.waitForElementVisible(ContactName, `Div with Unread text "${ContactName}" is visible`)
      .click(ContactName)
      .waitForElementVisible(chatContact, 'Followed Thread is opened successfully.');
  },

  clickOnIcon(element) {
    return this.waitForElementVisible(element, `${element} is visible.`)
      .click(element);
  },

  clickElement(element) {
    return this.waitForElementVisible(element, `${element} is visible.`)
      .click(element);
  },

  verifyDefaultState() {
    return this.waitForElementVisible('@defaultMessage', 'Inbox page List is empty.');
  },
};

module.exports = {
  commands: [followingPageCommands],
  url() {
    return `${this.api.launch_url}/inbox/following`;
  },

  elements: {
    unFollowOption: {
      selector: '(//SPAN[@class=\'u-text-overflow\'][contains(text(),\'Unfollow\')])[1]',
      locateStrategy: 'xpath',
    },

    contactChatBoxTitle: {
      selector: `//SPAN[@class='u-text-overflow'][contains(.,'${contactFeeder.anotherContactFirstName}')]`,
      locateStrategy: 'xpath',
    },

    contactNameList: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(., '${contactFeeder.anotherContactFirstName}')]`,
      locateStrategy: 'xpath',
    },

    moreOptionsIcon: {
      selector: '//BUTTON[contains(@title, \'More Options\')]',
      locateStrategy: 'xpath',
    },

    defaultMessage: {
      selector: '//H3',
      locateStrategy: 'xpath',
    },
  },
};
