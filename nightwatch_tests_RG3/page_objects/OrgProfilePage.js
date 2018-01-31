const orgProfileCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  renderPageElements: function() {
    return this.waitForElementVisible('@addLogoButton', 5000, 'Add logo button is visible')
      .verify.visible('@orgNameInput', 'Name input is visible')
      .verify.visible('@addressOneInput', 'Address input is visible')
      .verify.visible('@cityInput', 'City input is visible')
      .verify.visible('@stateInput', 'State input is visible')
      .verify.visible('@zipInput', 'Zip Input is visible')
      .verify.visible('@orgPhoneInput', 'Org phone input is visible')
      .verify.visible('@orgEmailInput', 'Org email input is visible')
      .verify.visible('@orgContactNameInput', 'Contact name is visible')
      .verify.visible('@orgContactPhoneInput', 'Contact number is visible')
      .verify.visible('@orgEmailInput', 'Contact email is visible')
      .verify.visible('@saveOrgProfileButton', 'Save profile button is visible')
  },

  renderUploadPhotoPopup: function() {
    return this.click('@addLogoButton')
      .waitForElementVisible('@uploadPhotoButton', 5000, 'Upload photo popup is visible')
      .click('@closeUploadPhotoIcon')
      .waitForElementNotPresent('@uploadPhotoButton', 5000, 'Upload photo popup is hidden')
  },

  clearPrefilledValues: function() {
    return this.clearValue('@orgNameInput')
      .clearValue('@addressOneInput')
      .clearValue('@cityInput')
  },

  setNewValues: function(name, address, city) {
    return this.setValue('@orgNameInput', name)
      .setValue('@addressOneInput', address)
      .setValue('@cityInput', city)
  },

  clickSaveProfile: function() {
    return this.click('@saveOrgProfileButton')
  },

  renderValidators: function() {
    return this.waitForElementVisible('@alertBox', 5000, 'Alert box is visible')
  },

  validateSaveToast: function() {
    return this.waitForElementVisible('@saveToast', 5000, 'Save toast is visible')
  },
}

module.exports = {
  commands: [orgProfileCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/profile'
  },
  elements: {

    addLogoButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Add Logo']`, //MAKE SURE WORKING
      locateStrategy: 'xpath'
    },

    /*----------------------------------------------------------------------------*/

    uploadPhotoButton: {
      selector: `//LABEL[@class='avatar-editor__container__upload'][text()='Upload Photo']`,
      locateStrategy: 'xpath',
    },

    closeUploadPhotoIcon: {
      selector: `/html/body/div[4]/div/div/div[1]/button`,
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------------------------------------*/

    orgNameInput: {
      selector: `//INPUT[@id='name-27b23a3c-7a47-457b-be0d-6562270297a9']`,
      locateStrategy: 'xpath',
    },

    addressOneInput: {
      selector: `//INPUT[@id='street1-07d34c02-4000-4821-ac75-39be96364fff']`,
      locateStrategy: 'xpath',
    },

    cityInput: {
      selector: `//INPUT[@id='city-ce498470-e94e-492b-b144-2796e1c3e713']`,
      locateStrategy: 'xpath',
    },

    stateInput: {
      selector: `//INPUT[@id='state-7565b4ee-a3ad-49e7-a8ff-58d4e4f8a2b4']`,
      locateStrategy: 'xpath',
    },

    zipInput: {
      selector: `//INPUT[@id='zip-1ec419ed-a623-40de-87de-8321870705ca']`,
      locateStrategy: 'xpath',
    },

    orgPhoneInput: {
      selector: `//INPUT[@id='businessPhone-f42476f2-fe97-4ab4-8dd2-f7365b84b6d2']`,
      locateStrategy: 'xpath',
    },

    orgEmailInput: {
      selector: `//INPUT[@id='businessEmail-41043022-d8d0-44d9-bab1-3a3ab21becc9']`,
      locateStrategy: 'xpath',
    },

    orgContactNameInput: {
      selector: `//INPUT[@id='contactName-3d77665b-62a7-4fae-8f3d-b3d3ba5dbbca']`,
      locateStrategy: 'xpath',
    },

    orgContactPhoneInput: {
      selector: `//INPUT[@id='contactPhone-d06ca5bf-01e4-4225-8aae-a3a28176a5ff']`,
      locateStrategy: 'xpath',
    },

    orgContactEmailInput: {
      selector: `//INPUT[@id='contactEmail-1ea93ca2-c44f-4428-9d0a-8cd69db2c540']`,
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------------------------------------*/

    nullNameInput: {
      selector: `//DIV[@class='form__validation-message'][text()='Name is required']`,
      locateStrategy: 'xpath',
    },

    nullAddressInput: {
      selector: `//DIV[@class='form__validation-message'][text()='Street is required']`,
      locateStrategy: 'xpath',
    },

    nullCityInput: {
      selector: `//DIV[@class='form__validation-message'][text()='City is required']`,
      locateStrategy: 'xpath',
    },

    nullStateInput: {
      selector: `//DIV[@class='form__validation-message'][text()='State is required']`,
      locateStrategy: 'xpath',
    },

    nullZipInput: {
      selector: `//DIV[@class='form__validation-message'][text()='Zip is required']`,
      locateStrategy: 'xpath',
    },

    alertBox: {
      selector: `//DIV[@class='alert u-m-b alert--danger']`,
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------------------------------------*/

    saveOrgProfileButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Profile']`,
      locateStrategy: 'xpath'
    },
    saveToast: {
      selector: `//*[@id="js-toasts-container"]/div/div/div`,
      locateStrategy: 'xpath'
    },
  }
};
