const addMemberCommands = {
  verifyElements: function() {
    return this.waitForElementVisible('@firstNameInput', 5000, 'First Name input is visible')
      .verify.visible('@addPhotoButton', 'Add photo button is visible')
      .verify.visible('@firstNameInput', 'First name input is visible')
      .verify.visible('@lastNameInput', 'Last name input is visible')
      .verify.visible('@usernameInput', 'Username input is visible')
      .verify.visible('@permissionsDropdown', 'Permissions dropdown is visible')
      .verify.visible('@addMemberButton', 'Add member button is visible');
  },

  clickAddMemberButton: function() {
    return this.waitForElementVisible('@addMemberButton', 5000, 'Add Member button visible')
      .click('@addMemberButton');
  },

  testValidators: function() {
    return this.waitForElementVisible('@nullFirstNameValidator', 5000, 'Null first name validator visible')
      .verify.visible('@nullLastNameValidator', 'Null last name validator visible')
      .verify.visible('@nullUsernameValidator', 'Null username validator visible')
      .verify.visible('@nullLocationValidator', 'Null location validator visible');
  },

  setRandomUsername: function(name) {
    let randoNum = Math.ceil(Math.random() * 1000);

    return this.waitForElementVisible('@usernameInput', 5000, 'Username input is visible')
      .clearValue('@usernameInput')
      .setValue('@usernameInput', name + randoNum);
  },

  selectFirstLocation: function() {
    return this.waitForElementVisible('@locationDropdown', 5000, 'Location dropdown is visible')
      .click('@locationDropdown')
      .waitForElementPresent('@firstLocationInDropdown', 5000, 'First location is visible')
      .click('@firstLocationInDropdown');
  },

  fillInFirstNameInput: function(name) {
    return this.waitForElementVisible('@firstNameInput', 5000, 'First name input is visible')
      .setValue('@firstNameInput', name);
  },

  fillInLastNameInput: function(name) {
    return this.waitForElementVisible('@lastNameInput', 5000, 'Last name input is visible')
      .setValue('@lastNameInput', name);
  },
}

module.exports = {
  commands: [addMemberCommands],
  elements: {
    addPhotoButton: {
      selector: `//BUTTON[@class='button--reset u-text-small u-text-primary']`,
      locateStrategy: 'xpath'
    },

    closeAddPhoto: {
      selector: `//div[@class='modal__header']/button`,
      locateStrategy: 'xpath'
    },

    firstNameInput: {
      selector: `//input[@id='firstName']`,
      locateStrategy: 'xpath'
    },

    middleNameInput: {
      selector: `//INPUT[@id='middleName']`,
      locateStrategy: 'xpath',
    },

    lastNameInput: {
      selector: `//input[@id='lastName']`,
      locateStrategy: 'xpath'
    },

    preferredName: {
      selector: `//INPUT[@id='preferredName']`,
      locateStrategy: 'xpath'
    },

    prefixDropdown: {
      selector: `//SELECT[@id='prefixId']`,
      locateStrategy: 'xpath'
    },

    suffixDropdown: {
      selector: `//SELECT[@id='suffixId']`,
      locateStrategy: 'xpath'
    },

    usernameInput: {
      selector: `//input[@id='username']`,
      locateStrategy: 'xpath'
    },

    jobTitleInput: {
      selector: `//INPUT[@id='businessTitle']`,
      locateStrategy: 'xpath'
    },

    emailAddressInput: {
      selector: `//INPUT[@id='loginEmail']`,
      locateStrategy: 'xpath'
    },

    permissionsDropdown: {
      selector: `//div[@class='edit-profile']/div[3]/div[4]/span/div[1]/input`,
      locateStrategy: 'xpath'
    },

    locationDropdown: {
      selector: `(//INPUT[@type='text'])[9]`,
      locateStrategy: 'xpath'
    },

    addMemberButton: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Add Member'][text()='Add Member'])[2]`,
      locateStrategy: 'xpath'
    },

    closeButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Close']`,
      locateStrategy: 'xpath'
    },

    temporaryPasswordBox: {
      selector: `//div[@class='cover__body']/div/div/div/div[3]/div[3]/div/div`,
      locateStrategy: 'xpath'
    },

    // ------------ Dropdown elements ---------//

    firstLocationInDropdown: {
      selector: `(//DIV[@class='dropdown__menu__item__content'])[15]`,
      locateStrategy: 'xpath'
    },

    // ------------ Validator display elements -----------//

    nullFirstNameValidator: {
      selector: `//DIV[@class='form__validation-message'][text()='First name is required']`,
      locateStrategy: 'xpath'
    },

    nullLastNameValidator: {
      selector: `//DIV[@class='form__validation-message'][text()='Last name is required']`,
      locateStrategy: 'xpath'
    },

    nullUsernameValidator: {
      selector: `//DIV[@class='form__validation-message'][text()='Invalid username']`,
      locateStrategy: 'xpath'
    },

    nullLocationValidator: {
      selector: `//DIV[@class='form__validation-message'][text()='Location is required']`,
      locateStrategy: 'xpath'
    },
  }

};
