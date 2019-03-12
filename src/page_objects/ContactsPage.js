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

  searchForContact: function(contactName) {
    return this.setValue('@addContactDropdownInput', contactName)
      .waitForElementVisible('@addContactDropdownFirstResult', 'First result is visible')
      .click('@addContactDropdownFirstResult')
      .waitForElementVisible('@profileContainer', 'Profile summary is visible')
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
      locateStrategy: 'xpath'
    },

    allContactsOption: {
      selector: `//SPAN[contains(.,'All Contacts')]`,
      locateStrategy: 'xpath',
    },

    patientOption: {
      selector: `//SPAN[contains(.,'Patient')]`,
      locateStrategy: 'xpath'
    },

    unknownOption: {
      selector: `//SPAN[contains(.,'Unknown')]`,
      locateStrategy: 'xpath'
    },

    otherOption: {
      selector: `//SPAN[contains(.,'Other')]`,
      locateStrategy: 'xpath'
    },

    /*-----------------------------------------------------------*/
    // Add contact elements
    /*-----------------------------------------------------------*/

    addContactButton: {
      selector: `//BUTTON[contains(@title, 'Add New Contact')]`,
      locateStrategy: 'xpath'
    },

    searchInputInAddContactModal: {
      selector: `//INPUT[contains(@name, 'nonMembers')]`,
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
