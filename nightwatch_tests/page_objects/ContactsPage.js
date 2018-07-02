const contactsCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  validateContactsElements: function() {
    return this.waitForElementVisible('@contactsContainer', 1500, 'Contacts container is visible')
      .verify.visible('@filterDropdown', 'Filter dropdown button is visible')
      .click('@filterDropdown')
      .verify.visible('@allContactsOption', 'All contacts option is visible')
      .verify.visible('@patientOption', 'Patient option is visible')
      .verify.visible('@memberOption', 'Member option is visible')
      .verify.visible('@connectedPartyOption', 'Connected party option is visible')
      .verify.visible('@unknownOption', 'Unknown option is visible')
      .verify.visible('@otherOption', 'Other option is visible')
  },

  clickPatientOption: function() {
    return this.click('@filterDropdown')
      .click('@patientOption')
      .verify.containsText('@filterDropdown', 'Patient', 'Filter dropdown is now set to patient')
  },

  clickMemberOption: function() {
    return this.click('@filterDropdown')
      .click('@memberOption')
      .verify.containsText('@filterDropdown', 'Member', 'Filter dropdown is now set to member')
  },

  clickConnectedPartyOption: function() {
    return this.click('@filterDropdown')
      .click('@connectedPartyOption')
      .verify.containsText('@filterDropdown', 'Connected Party', 'Filter dropdown is now set to connected party')
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
    return this.waitForElementVisible('@addContactButton', 5000, 'Add contact button is visible')
      .click('@addContactButton')
      .waitForElementVisible('@addContactButtonModal', 5000, 'Add new contact button is visible')
      .verify.visible('@addContactDropdownInput', 'Dropdown input is visible')
      .verify.visible('@addNewContactButton', 'Add New Contact button is visible')
  },

  searchForContact: function(contactName) {
    return this.setValue('@addContactDropdownInput', contactName)
      .waitForElementVisible('@addContactDropdownFirstResult', 5000, 'First result is visible')
      .click('@addContactDropdownFirstResult')
      .waitForElementVisible('@profileContainer', 5000, 'Profile summary is visible')
  },

  clickAddNewContact: function() {
    return this.waitForElementVisible('@addContactButtonModal', 5000, 'Add new contact button is visible')
      .click('@addNewContactButton')
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
  }
};
