const helper = require('../toolboxes/helpers.toolbox')

const orgProfileCommands = {

  renderPageElements: function(logoElement) {
    return this.waitForElementVisible(logoElement, 'Update logo button is visible')
      .verify.visible('@orgNameInput', 'Name input is visible')
      .verify.visible('@addressOneInput', 'Address input is visible')
      .verify.visible('@addressTwoInput', 'Address Line 2 input is visible')
      .verify.visible('@cityInput', 'City input is visible')
      .verify.visible('@stateInput', 'State input is visible')
      .verify.visible('@zipInput', 'Zip Input is visible')
      .verify.visible('@orgPhoneInput', 'Org phone input is visible')
      .verify.visible('@orgEmailInput', 'Org email input is visible')
      .verify.visible('@orgContactNameInput', 'Contact name is visible')
      .verify.visible('@orgContactPhoneInput', 'Contact number is visible')
      .verify.visible('@orgContactEmailInput', 'Contact email is visible')
      .verify.visible('@saveOrgProfileButton', 'Save profile button is visible')
  },

  renderUploadPhotoPopup: function() {
    return this.click('@addLogoButton')
      .waitForElementVisible('@uploadPhotoButton', 'Upload photo popup is visible')
      .click('@closeUploadPhotoIcon')
      .waitForElementNotVisible('@uploadPhotoButton', 'Upload photo popup is hidden')
  },

  clearPrefilledValues: function() {
    return this.waitForElementVisible('@orgNameInput', 'Name input visible ready to be cleared')
      .clearValue('@orgNameInput')
      .clearValue('@addressOneInput')
      .clearValue('@cityInput')
  },

  updateOrgProfileMandatoryFields: function (name, address, city, state, zip) {
    return this.updateDetails('@orgNameInput', name)
      .updateDetails('@addressOneInput', address)
      .updateDetails('@cityInput', city)
      .setValue('@stateInput', state)
      .updateDetails('@zipInput', zip)
    },

  updateOrgProfileOtherFields: function (address2, phone, email, contactName, contactPhone, contactEmail) {
    return this.updateDetails('@addressTwoInput', address2)
      .updateDetails('@orgPhoneInput', phone)
      .updateDetails('@orgEmailInput', email)
      .updateDetails('@orgContactNameInput', contactName)
      .updateDetails('@orgContactPhoneInput', contactPhone)
      .updateDetails('@orgContactEmailInput', contactEmail)
    },

  enableDisableToggles: function (toggleSetup) {
    return this.waitForElementVisible(toggleSetup, toggleSetup + ' toggle is visible.')
      .click(toggleSetup)
  },


  updateIntegrationValue: function(integrationType) {
    return this.verify.visible('@integrationDropdown', 'Integration dropdown is visible')
    .setValue('@integrationDropdown', integrationType)
  },

  updateDetails: function (element, newValue) {
    return this.verify.visible(element, element + ' is visible')
      .clearValue(element)
      .setValue(element, newValue)
  },

  verifyBillingIdAndIntegrationOptions: function () {
     return this.verify.visible('@orgContactBillingNumberInput', 'Billing Customer Id is visible')
     .verify.visible('@integrationToggle', 'Enable Integration Option is visible')
  },

  setNewValues: function(name, address, city) {
    return this.waitForElementVisible('@orgNameInput', 'Name input is visible ready to set new values')
      .setValue('@orgNameInput', name)
      .setValue('@addressOneInput', address)
      .setValue('@cityInput', city)
  },

  clickSaveProfile: function() {
    return this.click('@saveOrgProfileButton')
    .waitForElementVisible('@orgUpdateSuccessMessage', 'Success message displayed')
  },

  renderValidators: function() {
    return this.waitForElementVisible('@alertBox', 'Alert box is visible')
  },

  validateSaveToast: function() {
    return this.waitForElementVisible('@saveToast', 'Save toast is visible')
  },

  addUpdateLogo: async function(element) {
    this.waitForElementVisible(element, 'Add/Update Logo button visible')
    .click(element)
    .waitForElementNotVisible('@uploadPhotoButton', 'Upload Photo modal is open')
    .pause(2000)
    await helper.uploadFile(this, 'rhinogram.png')
    return this.pause(5000)
    .click('@doneUploadPhoto')
    .pause(5000)
    .click('@saveOrgProfileButton')
    .waitForElementVisible('@orgUpdateSuccessMessage', 'Success message displayed')
  }
}

module.exports = {
  commands: [orgProfileCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/profile'
  },
  elements: {

    updateLogoButton: {
      selector: `//SPAN[contains(.,'Update Logo')]`,
      locateStrategy: 'xpath'
    },

    addLogoButton : {
      selector: `//SPAN[contains(.,'Add Logo')]`,
      locateStrategy : 'xpath',
    },

    doneUploadPhoto: {
      selector: `//SPAN[text()='Done']`,
      locateStrategy: 'xpath',
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

    addressTwoInput: {
      selector: `//INPUT[contains(@id,'street2')]`,
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

    orgContactBillingNumberInput: {
      selector: `//INPUT[contains(@id,'billManagerCustId')]`,
      locateStrategy: 'xpath',
    },

    integrationToggle: {
      selector: `//LABEL[@class='rhinoswitcher__label'][contains(@for,'integration')]`,
      locateStrategy: 'xpath',
    },

    integrationDropdown: {
      selector: `//SELECT[contains(@id,'integrationPartnerType')]`,
      locateStrategy: 'xpath',
    },

    rhinopayToggle: {
      selector: `//LABEL[@class='rhinoswitcher__label'][contains(@for,'isRhinopayEnabled')]`,
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
    },

    orgUpdateSuccessMessage: {
      selector: `//DIV[text()='Organization updated successfully.']`,
      locateStrategy: 'xpath',
    },
  }
};
