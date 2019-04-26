const editCreateContacts = {
  pause(time) {
    this.api.pause(time);
    return this;
  },

  fillFirstNameInput(name) {
    return this.waitForElementVisible('@firstNameInput', 'First name input is visible')
      .setValue('@firstNameInput', name);
  },

  fillLastNameInput(name) {
    return this.waitForElementVisible('@lastNameInput', 'Last name input is visible')
      .setValue('@lastNameInput', name);
  },

  fillBirthday(date) {
    return this.waitForElementVisible('@birthdayInput', 'Birthday in put is visible')
      .setValue('@birthdayInput', date);
  },

  fillPhoneNumber(phoneNumber) {
    return this.waitForElementVisible('@firstPhoneInput', 'Phone input is visible')
      .setValue('@firstPhoneInput', phoneNumber);
  },

  clickCreateContact() {
    return this.waitForElementVisible('@createContactButton', 'Create contact button is visible')
      .click('@createContactButton');
  },

  clickPatientOption() {
    return this.waitForElementVisible('@patientOption', 'Patient Option is visible')
      .click('@patientOption');
  },

};

module.exports = {
  commands: [editCreateContacts],
  // url: not necessary for this page (navigation would only occur via navigating manually in UI)
  elements: {
    // Contact type
    patientOption: {
      selector: '//SPAN[contains(.,\'Patient\')]',
      locateStrategy: 'xpath',
    },

    otherOption: {
      selector: '//SPAN[contains(.,\'Other\')]',
      locateStrategy: 'xpath',
    },

    // Inputs

    firstNameInput: {
      selector: '//INPUT[contains(@name, \'firstName\')]',
      locateStrategy: 'xpath',
    },

    middleNameInput: {
      selector: '//INPUT[contains(@name, \'middleName\')]',
      locateStrategy: 'xpath',
    },

    lastNameInput: {
      selector: '//INPUT[contains(@name, \'lastName\')]',
      locateStrategy: 'xpath',
    },

    preferredNameInput: {
      selector: '//INPUT[contains(@name, \'preferredName\')]',
      locateStrategy: 'xpath',
    },

    externalId: {
      selector: '//INPUT[contains(@name, \'externalId)]',
      locateStrategy: 'xpath',
    },

    male: {
      selector: '//INPUT[contains(@value, \'male\')]',
      locateStrategy: 'xpath',
    },

    female: {
      selector: '//INPUT[contains(@value, \'female\')]',
      locateStrategy: 'xpath',
    },

    firstPhoneInput: {
      selector: '//INPUT[contains(@name, \'userPhones-0\')]',
      locateStrategy: 'xpath',
    },

    noteInput: {
      selector: '//INPUT[contains(@name, \'note\')]',
      locateStrategy: 'xpath',
    },

    birthdayInput: {
      selector: '//INPUT[contains(@name, \'birthday\')]',
      locateStrategy: 'xpath',
    },

    // prefix and suffix dropdowns
    prefixDropdown: {
      selector: '//SELECT[contains(@name, \'prefixId\')]',
      locateStrategy: 'xpath',
    },

    suffixDropdown: {
      selector: '//SELECT[contains(@name, \'suffixId\')]',
      locateStrategy: 'xpath',
    },

    // buttons
    createContactButton: {
      selector: '//SPAN[contains(text(), \'Create Contact\')]',
      locateStrategy: 'xpath',
    },
  },
};
