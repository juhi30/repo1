const addContactsCommands = {

  renderAddContactsPage: function() {
    return this.waitForElementVisible('@addContactPopupPage', 2000, 'Add Contacts popup is visible')
      .verify.visible('@addContactPopupPage', 'Add Contacts Popup is visible')
  },

  renderPageElements: function() {
    return this.verify.visible('@avatarPicture', 'Avatar picture is visible')
      .verify.visible('@addPhotoButton', 'Add photo button is visible')
      .verify.visible('@contactTypeDropdown', 'Contact type is visible')
      .verify.visible('@firstNameInput', 'First name input is visible')
      .verify.visible('@middleNameInput', 'Middle name input is visible')
      .verify.visible('@lastNameInput', 'last Name Input is visible')
      .verify.visible('@preferredNameInput', 'preferred Name Inputis visible')
      .verify.visible('@prefixDropdown', 'Prefex dropdown is visible')
      .verify.visible('@suffixDropdown', 'Suffix dropdown is visible')
      .verify.visible('@locationDropdown', 'location Dropdown is visible')
      .verify.visible('@monthDropdown', 'Month dropdown is visible')
      .verify.visible('@dayDropdown', 'day dropdown is visible')
      .verify.visible('@yearDropdown', 'year dropdown is visible')
      .verify.visible('@iDInput', 'ID input is visible')
      .verify.visible('@maleRadioButton', 'Male button is visible')
      .verify.visible('@femaleRadioButton', 'Female button is visible')
      .verify.visible('@phoneNumberInput', 'Phone Number input is visible')
      .verify.visible('@phoneTypedDropdown', 'Phone type is visible')
      .verify.visible('@emailInput', 'Email input is visible')
      .verify.visible('@emailTypdeDropdown', 'Email type dropdown is visible')
      .verify.visible('@noteInput', 'Note input is visible')
      .verify.visible('@hIPAAConsentForm', 'HIPAA form is visible')
      .verify.visible('@unknownConsentButton', 'Unknown choice is visible')
      .verify.visible('@grantedConsentButton', 'Granted choice is visible')
      .verify.visible('@deniedConsentButton', 'Denied choice is visible')
      .verify.visible('@connectedPartyButton', 'Connect party link is visible')
      .verify.visible('@closeButton', 'Close form button is visible')
      .verify.visible('@addContactButton', 'Add contact button is visible')
  },
  testErrorPrompt: function() {
    return this.click('@addContactButton')
      .waitForElementVisible('@requiredInputAlert', 2000, 'Required input alert is visible')
      .verify.containsText('@requiredInputAlert', 'Last name is required, Birthday is required for all patients', 'Alert message is right')
  },

  fillInForm: function(firstName, lastName, month, day, year) {
    return this.clearValue('@firstNameInput')
      .setValue('@firstNameInput', firstName)
      .setValue('@lastNameInput', lastName)
      .setValue('@monthDropdown', month)
      .setValue('@dayDropdown', day)
      .setValue('@yearDropdown', year)

  },

  closeAddContactsPage: function() {
    return this.click('@closeButton')
      .waitForElementNotPresent('@addContactPopupPage', 1500, 'Add Contacts Popup is hidden')
      .verify.elementNotPresent('@addContactPopupPage', 'Add contacts popup is hidden')
    // fails without a verify func ??? no idea why ^^^
  }
}

module.exports = {
  commands: [addContactsCommands],
  url: function() {
    return this.api.launch_url
  },
  elements: {

    addContactPopupPage: {
      selector: `/html/body/div[8]/div`,
      locateStrategy: 'xpath',
    },

    requiredInputAlert: {
      selector: `//DIV[@class='alert u-m-b alert--danger']`,
      locateStrategy: 'xpath',
    },

    avatarPicture: {
      selector: `//DIV[@class='edit-profile__user__avatar-wrapper']`,
      locateStrategy: 'xpath',
    },

    addPhotoButton: {
      selector: `//BUTTON[@class='button--reset u-text-small u-text-primary']`,
      locateStrategy: 'xpath',
    },

    contactTypeDropdown: {
      selector: `//*[@id="contactType"]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/

    firstNameInput: {
      selector: `//*[@id="firstName"]`,
      locateStrategy: 'xpath',
    },

    middleNameInput: {
      selector: `//*[@id="middleName"]`,
      locateStrategy: 'xpath',
    },

    lastNameInput: {
      selector: `//*[@id="lastName"]`,
      locateStrategy: 'xpath',
    },

    preferredNameInput: {
      selector: `//*[@id="preferredName"]`,
      locateStrategy: 'xpath',
    },

    prefixDropdown: {
      selector: `//*[@id="prefixId"]`,
      locateStrategy: 'xpath',
    },

    suffixDropdown: {
      selector: `//*[@id="suffixId"]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/

    locationDropdown: {
      selector: `(//INPUT[@type='text'])[7]`,
      locateStrategy: 'xpath',
    },

    locationDropdownFirstResult: {
      selector: `/html/body/div[6]/div/div[2]/div/div/div/div[3]/div[2]/span[2]/div[1]/div/div/div/a`,
      locateStrategy: 'xpath',
    },

    monthDropdown: {
      selector: `//*[@id="month"]`,
      locateStrategy: 'xpath',
    },

    dayDropdown: {
      selector: `//*[@id="day"]`,
      locateStrategy: 'xpath',
    },

    yearDropdown: {
      selector: `//*[@id="year"]`,
      locateStrategy: 'xpath',
    },

    iDInput: {
      selector: `//*[@id="externalId"]`,
      locateStrategy: 'xpath',
    },

    maleRadioButton: {
      selector: `/html/body/div[8]/div/div[2]/div/div/div/div[3]/div[4]/div/div[2]/div/div/div[1]/div`,
      locateStrategy: 'xpath',
    },

    femaleRadioButton: {
      selector: `/html/body/div[8]/div/div[2]/div/div/div/div[3]/div[4]/div/div[2]/div/div/div[2]/div`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/

    phoneNumberInput: {
      selector: `//*[@id="value"]`,
      locateStrategy: 'xpath',
    },

    phoneTypedDropdown: {
      selector: `(//SELECT[@class='rhinoselect__select form__control form__control--chevron'])[7]`,
      locateStrategy: 'xpath',
    },

    emailInput: {
      selector: `//*[@id="value"]`,
      locateStrategy: 'xpath',
    },

    emailTypdeDropdown: {
      selector: `(//SELECT[@class='rhinoselect__select form__control form__control--chevron'])[7]`,
      locateStrategy: 'xpath',
    },

    noteInput: {
      selector: `//*[@id="note"]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/

    hIPAAConsentForm: {
      selector: `//DIV[@class='hipaa-status hipaa-status--profile hipaa-status--off']`,
      locateStrategy: 'xpath',
    },

    unknownConsentButton: {
      selector: `/html/body/div[8]/div/div[2]/div/div/div/div[6]/div/div/div/div[1]/div`,
      locateStrategy: 'xpath',
    },

    grantedConsentButton: {
      selector: `/html/body/div[8]/div/div[2]/div/div/div/div[6]/div/div/div/div[2]/div`,
      locateStrategy: 'xpath',
    },

    deniedConsentButton: {
      selector: `/html/body/div[8]/div/div[2]/div/div/div/div[6]/div/div/div/div[3]/div`,
      locateStrategy: 'xpath',
    },

    connectedPartyButton: {
      selector: `//DIV[@class='hipaa-status hipaa-status--profile hipaa-status--off']`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/
    // Bottom bar buttons
    /*-----------------------------------------------------------*/

    addContactButton: {
      selector: `/html/body/div[8]/div/div[3]/div/div/button[2]`,
      locateStrategy: 'xpath',
    },

    closeButton: {
      selector: `/html/body/div[8]/div/div[1]/div/button`,
      locateStrategy: 'xpath',
    },
  }
}
