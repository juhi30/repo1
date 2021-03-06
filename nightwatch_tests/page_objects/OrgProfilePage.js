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

module.exports = {
  commands: [orgProfileCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/profile'
  },
  elements: {

    addLogoButton: {
      selector: `//SPAN[contains(.,'Update')]`,
      locateStrategy: 'xpath'
    },

    /*----------------------------------------------------------------------------*/

    uploadPhotoButton: {
      selector: `//LABEL[contains(.,'Upload Photo')]`,
      locateStrategy: 'xpath',
    },

    closeUploadPhotoIcon: {
      selector: `//BUTTON[contains(@title, 'Close')]`,
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
      selector: `//INPUT[contains(@name, 'name')]`,
      locateStrategy: 'xpath',
    },

    nullAddressInput: {
      selector: `//INPUT[contains(@name, 'street1')]`,
      locateStrategy: 'xpath',
    },

    nullCityInput: {
      selector: `//INPUT[contains(@name, 'street2')]`,
      locateStrategy: 'xpath',
    },

    nullStateInput: {
      selector: `//INPUT[contains(@name, 'city')]`,
      locateStrategy: 'xpath',
    },

    nullZipInput: {
      selector: `//INPUT[contains(@name, 'zip')]`,
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------------------------------------*/

    saveOrgProfileButton: {
      selector: `//SPAN[contains(.,'Save Profile')]`,
      locateStrategy: 'xpath'
    }
  }
};
