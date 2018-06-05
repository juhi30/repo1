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
      .waitForElementNotVisible('@uploadPhotoButton', 5000, 'Upload photo popup is hidden')
  },

  clearPrefilledValues: function() {
    return this.waitForElementVisible('@orgNameInput', 'Name input visible ready to be cleared')
      .clearValue('@orgNameInput')
      .clearValue('@addressOneInput')
      .clearValue('@cityInput')
  },

  setNewValues: function(name, address, city) {
    return this.waitForElementVisible('@orgNameInput', 'Name input is visible ready to set new values')
      .setValue('@orgNameInput', name)
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

export default OrgProfilePage = {
  commands: [orgProfileCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/profile'
  },
  elements: {

    addLogoButton: {
      selector: `#app > div > div.app-wrapper > div.app-page__container > div > form > div:nth-child(1) > div.edit-profile__avatar-wrapper > button > span`, //MAKE SURE WORKING
      // locateStrategy: 'xpath'
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
      selector: `//INPUT[contains(@id,'name')]`,
      locateStrategy: 'xpath',
    },

    addressOneInput: {
      selector: `//INPUT[contains(@id,'street1')]`,
      locateStrategy: 'xpath',
    },

    cityInput: {
      selector: `//INPUT[contains(@id,'city')]`,
      locateStrategy: 'xpath',
    },

    stateInput: {
      selector: `//SELECT[contains(@id,'state')]`, //only grabs form group. dropdown and xpath contains not getting along
      locateStrategy: 'xpath',
    },

    zipInput: {
      selector: `//INPUT[contains(@id,'zip')]`,
      locateStrategy: 'xpath',
    },

    orgPhoneInput: {
      selector: `//INPUT[contains(@id,'businessPhone')]`,
      locateStrategy: 'xpath',
    },

    orgEmailInput: {
      selector: `//INPUT[contains(@id,'businessEmail')]`,
      locateStrategy: 'xpath',
    },

    orgContactNameInput: {
      selector: `//INPUT[contains(@id,'contactName')]`,
      locateStrategy: 'xpath',
    },

    orgContactPhoneInput: {
      selector: `//INPUT[contains(@id,'contactPhone')]`,
      locateStrategy: 'xpath',
    },

    orgContactEmailInput: {
      selector: `//INPUT[contains(@id,'contactEmail')]`,
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
      selector: `//DIV[@role='button']`,
      locateStrategy: 'xpath'
    },
  }
};
