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
    return this.waitForElementVisible('@addContactButton', 2000, 'Add contact button is visible')
      .click('@addContactButton')
      .waitForElementVisible('@addContactButtonDropdown', 1500, 'Add new contact button is visible')
      .verify.visible('@addContactDropdownInput', 'Dropdown input is visible')
      .verify.visible('@addNewContactButton', 'Add New Contact button is visible')
  },

  searchForContact: function(contactName) {
    return this.setValue('@addContactDropdownInput', contactName)
      .waitForElementVisible('@addContactDropdownFirstResult', 1000, 'First result is visible')
      .click('@addContactDropdownFirstResult')
      .waitForElementVisible('@profileContainer', 1500, 'Profile summary is visible')
  },

  clickAddNewContact: function() {
    return this.waitForElementVisible('@addContactButtonDropdown', 1500, 'Add new contact button is visible')
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
      selector: `(//BUTTON[@class='button dropdown__toggle u-flex-shrink-0 u-text-capitalize button--default'])[1]`,
      locateStrategy: 'xpath'
    },

    allContactsOption: {
      selector: `(//SPAN[@class='u-text-overflow'][text()='All Contacts'][text()='All Contacts'])[1]`,
      locateStrategy: 'xpath',
    },

    patientOption: {
      selector: `(//SPAN[@class='u-text-overflow'][text()='patient'][text()='patient'])[1]`,
      locateStrategy: 'xpath'
    },

    memberOption: {
      selector: `(//SPAN[@class='u-text-overflow'][text()='member'][text()='member'])[1]`,
      locateStrategy: 'xpath'
    },

    connectedPartyOption: {
      selector: `(//SPAN[@class='u-text-overflow'][text()='connected party'][text()='connected party'])[1]`,
      locateStrategy: 'xpath'
    },

    unknownOption: {
      selector: `(//SPAN[@class='u-text-overflow'][text()='unknown'][text()='unknown'])[1]`,
      locateStrategy: 'xpath'
    },

    otherOption: {
      selector: `(//SPAN[@class='u-text-overflow'][text()='other'][text()='other'])[1]`,
      locateStrategy: 'xpath'
    },

    /*-----------------------------------------------------------*/
    // Contacts page containers and elements
    /*-----------------------------------------------------------*/

    contactsContainer: {
      selector: `//*[@id="app"]/div/div[2]/div/div[1]/div[2]`,
      locateStrategy: 'xpath',
    },

    firstContact: {
      selector: `//div[1]/div/div[2]/div/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[2]/div`,
      locateStrategy: 'xpath'
    },

    profileContainer: {
      selector: `//DIV[@class='profile']`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/
    // Add contact elements
    /*-----------------------------------------------------------*/

    addContactButton: {
      selector: `//SPAN[@class='dropdown__toggle__text'][text()='Add Contact']`,
      locateStrategy: 'xpath'
    },

    addContactButtonDropdown: {
      selector: `(//DIV[@class='dropdown__menu__container'])[2]`,
      locateStrategy: 'xpath'
    },

    addContactDropdownInput: {
      selector: `(//INPUT[@type='text'])[2]`,
      locateStrategy: 'xpath',
    },

    addContactDropdownFirstResult: {
      selector: `//*[@id="app"]/div/div[2]/div/div[1]/div[1]/div[3]/div/div/div/div[2]/a`,
      locateStrategy: 'xpath',
    },

    addNewContactButton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[8]`,
      locateStrategy: 'xpath'
    }
  }
};
