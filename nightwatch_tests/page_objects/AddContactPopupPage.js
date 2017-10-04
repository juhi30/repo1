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
      .verify.visible('@genderRadioButtons', 'Male button is visible')
      .verify.visible('@phoneNumberInput', 'Phone Number input is visible')
      .verify.visible('@phoneTypedDropdown', 'Phone type is visible')
      .verify.visible('@emailInput', 'Email input is visible')
      .verify.visible('@emailTypeDropdown', 'Email type dropdown is visible')
      .verify.visible('@noteInput', 'Note input is visible')
      .verify.visible('@hIPAAConsentForm', 'HIPAA form is visible')
      .verify.visible('@hIPAAConsentButtons', 'HIPAA radio buttons are visible')
      .verify.visible('@connectedPartyButton', 'Connect party button is visible') //throwing error but working fine in click clickConnectParties()
      .verify.visible('@closeButton', 'Close form button is visible')
      .verify.visible('@addContactButton', 'Add contact button is visible')
  },

  validateErrorPrompt: function() {
    return this.waitForElementVisible('@requiredInputAlert', 2000, 'Required input alert is visible')
      .verify.containsText('@requiredInputAlert', 'First name is required, Last name is required, Birthday is required for all patients', 'Alert message is right')
  },

  validateInputValidators: function() {
    return this.verify.visible('@nullFirstName', 'First name validator is visible')
      .verify.visible('@nullLastName', 'Last name validator is visible')
      .verify.visible('@nullBirthday', 'Birthday validator is visible')
  },

  validatePhotoPopup: function() {
    return this.click('@addPhotoButton')
      .waitForElementVisible('@addPhotoPopup', 1500, 'Add photo popup is visible')
      .verify.visible('@uploadPhotoButton', 'Upload photo button is visible')
      .verify.visible('@addPhotoCloseButton', 'Add Photo close button (X) is visible')
      .verify.visible('@addPhotoDoneButton', 'Done button is visible')
  },

  clickClosePhotoPopup: function() {
    return this.click('@addPhotoCloseButton')
      .waitForElementNotVisible('@addPhotoPopup', 2500, 'Add photo popup is no longer visible')
  },

  clickConnectParties: function() {
    return this.verify.visible('@connectedPartyButton', 'Connect party button is visible')
      .click('@connectedPartyButton')
      .waitForElementVisible('@connectedPartyDropdown', 1500, 'Connect parties dropdown is visible')
  },

  fillInFormPartOne: function(firstName, lastName, preferredName, month, day, year) {
    return this.clearValue('@firstNameInput')
      .setValue('@firstNameInput', firstName)
      .setValue('@middleNameInput', new Date)
      .setValue('@lastNameInput', lastName)
      .setValue('@preferredNameInput', preferredName)
      .setValue('@monthDropdown', month)
      .setValue('@dayDropdown', day)
      .setValue('@yearDropdown', year)
  },

  fillInFormPartTwo: function(iDNum, phoneNum, phoneType, email, emailType, note) {
    return this.setValue('@iDInput', iDNum)
      .setValue('@phoneNumberInput', phoneNum)
      // .setValue('@phoneTypedDropdown', phoneType) not able to set value
      .setValue('@emailInput', email)
      // .setValue('@emailTypeDropdown', emailType) not able to set value
      .setValue('@noteInput', note)
  },

  clickAddContact: function() {
    return this.click('@addContactButton')
  },

  closeAddContactsPage: function() {
    return this.click('@closeButton')
      .waitForElementNotPresent('@addContactPopupPage', 2500, 'Add Contacts Popup is hidden')
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
      selector: `(//DIV[@class='cover__body'])[2]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/
    // error prompt and input validators
    /*-----------------------------------------------------------*/

    requiredInputAlert: {
      selector: `//DIV[@class='alert u-m-b alert--danger']`,
      locateStrategy: 'xpath',
    },

    nullFirstName: {
      selector: `//DIV[@class='form__validation-message'][text()='First name is required']`,
      locateStrategy: 'xpath',
    },

    nullLastName: {
      selector: `//DIV[@class='form__validation-message'][text()='Last name is required']`,
      locateStrategy: 'xpath',
    },

    nullBirthday: {
      selector: `//DIV[@class='form__validation-message'][text()='Birthday is required for all patients']`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/
    // Photo upload section
    /*-----------------------------------------------------------*/

    avatarPicture: {
      selector: `//DIV[@class='edit-profile__user__avatar-wrapper']`,
      locateStrategy: 'xpath',
    },

    addPhotoButton: {
      selector: `//BUTTON[@class='button--reset u-text-small u-text-primary']`,
      locateStrategy: 'xpath',
    },

    addPhotoPopup: {
      selector: `/html/body/div[6]/div/div/div`,
      locateStrategy: 'xpath',
    },

    addPhotoCloseButton: {
      selector: `/html/body/div[6]/div/div/div/div[1]/button`,
      locateStrategy: 'xpath'
    },

    uploadPhotoButton: {
      selector: `//LABEL[@class='avatar-editor__container__upload'][text()='Upload Photo']`,
      locateStrategy: 'xpath',
    },

    addPhotoDoneButton: {
      selector: `/html/body/div[6]/div/div/div/div[3]/button`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/
    // various contact info inputs (lines break up elements on page)
    /*-----------------------------------------------------------*/

    contactTypeDropdown: {
      selector: `//*[@id="contactType"]`,
      locateStrategy: 'xpath',
    },

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

    genderRadioButtons: {
      selector: `(//DIV[@class='u-inline-grid '])[1]`,
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
      selector: `(//*[@id="value"])[2]`,
      locateStrategy: 'xpath',
    },

    emailTypeDropdown: {
      selector: `(//SELECT[@class='rhinoselect__select form__control form__control--chevron'])[8]`,
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

    hIPAAConsentButtons: {
      selector: `(//DIV[@class='u-inline-grid '])[2]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/
    // conntect parties dropdown
    /*-----------------------------------------------------------*/

    connectedPartyButton: {
      selector: `//SPAN[@class='dropdown__toggle__text'][text()='Add a Connected Party']`,
      locateStrategy: 'xpath',
    },

    connectedPartyDropdown: {
      selector: `(//DIV[@class='dropdown__menu__scroll'])[7]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/
    // Bottom bar buttons
    /*-----------------------------------------------------------*/

    addContactButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Add Contact']`,
      locateStrategy: 'xpath',
    },

    closeButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Close']`,
      locateStrategy: 'xpath',
    },
  }
}
