const testConstants = require('../toolboxes/feeder.toolbox');

const randomNumber = Math.floor(Math.random() * 1000000);

const contactsCommands = {

  validateContactsElements: function() {
    return this.waitForElementVisible('@filterDropdown', 'Filter dropdown button is visible')
      .click('@filterDropdown')
      .verify.visible('@allContactsOption', 'All contacts option is visible')
      .verify.visible('@patientOption', 'Patient option is visible')
      .verify.visible('@unknownOption', 'Unknown option is visible')
      .verify.visible('@otherOption', 'Other option is visible')
  },

  clickPatientOption: function() {
    return this.click('@filterDropdown')
      .click('@patientOption')
      .verify.containsText('@filterDropdown', 'Patient', 'Filter dropdown is now set to patient')
  },

  clickUnknownOption: function() {
    return this.click('@filterDropdown')
      .click('@unknownOption')
      .verify.containsText('@filterDropdown', 'Unknown', 'Filter dropdown is now set to unknown')
  },

  clickOtherOption: function() {
    return this.click('@filterDropdown')
      .click('@otherOption')
      .verify.containsText('@filterDropdown', 'Other', 'Filter dropdown is now set to other')
  },

  clickAllContactsOption: function() {
    return this.click('@filterDropdown')
      .click('@allContactsOption')
      .verify.containsText('@filterDropdown', 'All Contacts', 'Filter dropdown is now set to all Contacts')
  },

  clickAddContact: function() {
    return this.waitForElementVisible('@addContactButton', 'Add contact button is visible')
      .click('@addContactButton')
      .waitForElementVisible('@addContactButtonModal', 'Add new contact button is visible')
      .verify.visible('@addContactDropdownInput', 'Dropdown input is visible')
      .verify.visible('@addNewContactButton', 'Add New Contact button is visible')
  },

  searchForContact: function(contactName, firstResultObject) {
    return this.waitForElementVisible('@searchContactInput', 'Search Contacts Bar is visible')
      .click('@searchContactInput')
      .setValue('@addContactDropdownInput', contactName)
      .waitForElementVisible(firstResultObject, 'First result is visible')
      .click(firstResultObject)
      .waitForElementVisible('@profileInboxContainer', 'Profile summary is visible')
  },

  sendOutboundMessageAndGetReply: function(handlerMessage, message) {
    const handlerRandomizedMessage = `${handlerMessage} ${randomNumber}`;
    return this.waitForElementVisible('@inboxMessageArea', 'Inbox message area is visible')
      .setValue('@inboxMessageArea', handlerRandomizedMessage)
      .pause(1000)
      .click('@sendMessageButton')
      .pause(3000)
      .setValue('@inboxMessageArea', message)
      .pause(1000)
      .click('@sendMessageButton')
      .pause(5000)
      .waitForElementVisible('@replyMessage', 'Reply is received from bot contact to the channel')
      .pause(2000);

  },

  sendOutboundMessageToFbContact: function (message) {
    const randomizedMessage = `${message} ${randomNumber}`;
    return this.waitForElementVisible('@inboxMessageArea', 'Inbox message area is visible')
      .setValue('@inboxMessageArea', randomizedMessage)
      .pause(1000)
      .click('@sendMessageButton')
      .pause(3000)
      .waitForElementVisible('@fbContactMessage', 'Message is sent to facebook contact')
      .pause(2000);

  },

  getInboundMessage: function(message) {
    const randomizedMessage = `${message} ${randomNumber}`;
    return this.waitForElementVisible('@inboxMessageArea', 'Inbox message area is visible')
      .pause(4000)
      .waitForElementVisible('@inboundMessage', 'Inbound Message is received from Bot Contact')
      .pause(2000);

  },

  clickAddNewContact: function() {
    return this.waitForElementVisible('@addContactButtonModal', 'Add new contact button is visible')
      .click('@addNewContactButton')
  },

  validateAnalyticsIconVisibility: function() {
    return this.waitForElementVisible('@pageHeader', 'Page header is visible')
      .verify.visible('@analyticsIcon', 'Analytics icon is visible');
  },

  validateAnalyticsPageNavigation: function() {
    return this.click('@analyticsIcon');
  },

  validateUrlChange: function(url) {
    return this.verify.urlContains(url);
  },

  getRandomNumber: function() {
    return randomNumber;
  }
}

module.exports = {
  commands: [contactsCommands],
  url: function() {
    return this.api.launch_url + '/contacts'
  },
  elements: {

    /*-----------------------------------------------------------*/
    // filter dropdown and its elements
    /*-----------------------------------------------------------*/

    filterDropdown: {
      selector: `//BUTTON[contains(@title, 'Filter contacts')]`,
      locateStrategy: 'xpath',
    },

    allContactsOption: {
      selector: `//SPAN[contains(.,'All Contacts')]`,
      locateStrategy: 'xpath',
    },

    patientOption: {
      selector: `//SPAN[contains(.,'Patient')]`,
      locateStrategy: 'xpath',
    },

    unknownOption: {
      selector: `//SPAN[contains(.,'Unknown')]`,
      locateStrategy: 'xpath',
    },

    otherOption: {
      selector: `//SPAN[contains(.,'Other')]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/
    // Add contact elements
    /*-----------------------------------------------------------*/

    addContactButton: {
      selector: `//BUTTON[contains(@title, 'Add New Contact')]`,
      locateStrategy: 'xpath',
    },

    searchInputInAddContactModal: {
      selector: `//INPUT[contains(@name, 'nonMembers')]`,
      locateStrategy: 'xpath',
    },

    addContactDropdownFirstResultBot: {
      selector: `//SPAN[contains(@class, 'resource__intro__title__content')]//strong[contains(text(), '${process.env.BOT_CONTACT_NAME}')]`,
      locateStrategy: 'xpath',
    },
 
    addContactDropdownFirstResultFb: {
      selector: `//SPAN[contains(@class, 'resource__intro__title__content')]//strong[contains(text(), '${process.env.FACEBOOK_CONTACT_NAME}')]`,
      locateStrategy: 'xpath',
    },

    searchContactInput: {
      selector: `//SPAN[contains(text(), 'Search users')]`,
      locateStrategy: 'xpath',
    },

    addContactDropdownInput: {
      selector: `//DIV[contains(@class, 'modal')]//INPUT`,
      locateStrategy: 'xpath',
    },

    profileInboxContainer: {
      selector: `//DIV[contains(@class, 'convo__inner')]`,
      locateStrategy: 'xpath',
    },

    inboxMessageArea: {
      selector: `//DIV[contains(@class, 'convo__message__textarea')]//TEXTAREA`,
      locateStrategy: 'xpath',
    },

    sendMessageButton: {
      selector: `//BUTTON[contains(@class, 'convo__message__send')]`,
      locateStrategy: 'xpath',
    },

    replyMessage: {
      selector: `//DIV[text() = '${testConstants.testBotReplyMessage} ${randomNumber}']`,
      locateStrategy: 'xpath',
    },

    inboundMessage: {
      selector: `//DIV[text() = '${testConstants.testBotInboundMessage} ${randomNumber}']`,
      locateStrategy: 'xpath',
    },

    fbContactMessage: {
      selector: `//DIV[text() = '${testConstants.facebookOutboundMessage} ${randomNumber}']`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/
    // Header Elements
    /*-----------------------------------------------------------*/

    pageHeader: {
      selector: `//HEADER[contains(@class, 'app-header')]`,
      locateStrategy: 'xpath',
    },

    analyticsIcon: {
      selector: `//BUTTON[contains(@id, 'nav-analytics')]`,
      locateStrategy: 'xpath',
    },
  }
};
