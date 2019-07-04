import logger from 'rhinotilities/lib/loggers/logger';

const helper = require('../toolboxes/helpers.toolbox');

const orgProfileCommands = {

  renderPageElements(logoElement) {
    return this.waitForElementVisible(logoElement, 'Add/Update logo button is visible')
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
      .verify.visible('@saveOrgProfileButton', 'Save profile button is visible');
  },

  renderUploadPhotoPopup() {
    return this.click('@addLogoButton')
      .waitForElementVisible('@uploadPhotoButton', 'Upload photo popup is visible')
      .click('@closeUploadPhotoIcon')
      .waitForElementNotVisible('@uploadPhotoButton', 'Upload photo popup is hidden');
  },

  clearPrefilledValues() {
    return this.waitForElementVisible('@orgNameInput', 'Name input visible ready to be cleared')
      .clearValue('@orgNameInput')
      .clearValue('@addressOneInput')
      .clearValue('@cityInput');
  },

  updateOrgProfileMandatoryFields(name, address, city, state, zip) {
    return this.updateDetails('@orgNameInput', name)
      .updateDetails('@addressOneInput', address)
      .updateDetails('@cityInput', city)
      .setValue('@stateInput', state)
      .updateDetails('@zipInput', zip);
  },

  updateOrgProfileOtherFields(address2, phone, email, contactName, contactPhone, contactEmail) {
    return this.updateDetails('@addressTwoInput', address2)
      .updateDetails('@orgPhoneInput', phone)
      .updateDetails('@orgEmailInput', email)
      .updateDetails('@orgContactNameInput', contactName)
      .updateDetails('@orgContactPhoneInput', contactPhone)
      .updateDetails('@orgContactEmailInput', contactEmail);
  },

  enableDisableToggles(toggleSetup) {
    return this.waitForElementVisible(toggleSetup, `${toggleSetup} toggle is visible.`)
      .click(toggleSetup);
  },


  updateIntegrationValue(integrationType) {
    return this.waitForElementVisible('@integrationDropdown', 'Integration dropdown is visible')
      .setValue('@integrationDropdown', integrationType);
  },

  updateDetails(element, newValue) {
    return this.verify.visible(element, `${element} is visible`)
      .clearValue(element)
      .setValue(element, newValue);
  },

  verifyBillingIdAndIntegrationOptions() {
    return this.verify.visible('@orgContactBillingNumberInput', 'Billing Customer Id is visible')
      .verify.visible('@integrationToggle', 'Enable Integration Option is visible');
  },

  setNewValues(name, address, city) {
    return this.waitForElementVisible('@orgNameInput', 'Name input is visible ready to set new values')
      .setValue('@orgNameInput', name)
      .setValue('@addressOneInput', address)
      .setValue('@cityInput', city);
  },

  clickSaveProfile() {
    return this.click('@saveOrgProfileButton')
      .waitForElementVisible('@orgUpdateSuccessMessage', 'Success message displayed')
      .waitForElementNotPresent('@orgUpdateSuccessMessage', 'Success message is gone');
  },

  checkBillingId() {
    return this.waitForElementVisible('@billingCustomerId', 'Billing Customer Id is present')
      .getValue('@billingCustomerId', (tpObj) => {
        logger.info(`Customer Billing ID ->, ${tpObj.value}`);
      });
  },

  renderValidators() {
    return this.waitForElementVisible('@alertBox', 'Alert box is visible');
  },

  validateSaveToast() {
    return this.waitForElementVisible('@saveToast', 'Save toast is visible');
  },

  async addUpdateLogo(element, fileName) {
    this.waitForElementVisible(element, 'Add/Update Logo button visible')
      .click(element)
      .waitForElementVisible('@uploadPhotoModal', 'Upload Photo modal is open')
      .pause(2000);
    await helper.uploadFile(this, fileName);
    return this.pause(5000)
      .click('@doneUploadPhoto')
      .pause(5000)
      .click('@saveOrgProfileButton')
      .waitForElementVisible('@orgUpdateSuccessMessage', 'Success message displayed');
  },

  enableToggle(toggleSetup) {
    return this.waitForElementVisible(toggleSetup, `${toggleSetup} toggle is visible.`)
      .click(toggleSetup);
  },

  createOrgProfileForm(inputField, newValue) {
    return this.waitForElementVisible(inputField, `${inputField}: is visible`)
      .setValue(inputField, newValue);
  },


  updateEmptyValues(element, newValue) {
    return this.verify.visible(element, `${element} is visible`)
      .click(element)
      .getValue(element, (result) => {
        if (!result.value) {
          element.setValue(element, newValue);
        }
      });
  },
};

module.exports = {
  commands: [orgProfileCommands],
  url() {
    return `${this.api.launch_url}/settings/organization/profile`;
  },
  elements: {

    updateLogoButton: {
      selector: '//SPAN[contains(.,\'Update Logo\')]',
      locateStrategy: 'xpath',
    },

    addLogoButton: {
      selector: '//SPAN[contains(.,\'Add Logo\')]',
      locateStrategy: 'xpath',
    },

    doneUploadPhoto: {
      selector: '//SPAN[text()=\'Done\']',
      locateStrategy: 'xpath',
    },

    billingCustomerId: {
      selector: '//input[contains(@id, \'billManagerCustId\')]',
      locateStrategy: 'xpath',
    },

    settingsDropdown: {
      selector: '//*[@id="cuke-main-settings"]/div/button',
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------------------------------------*/

    uploadPhotoButton: {
      selector: '//LABEL[contains(.,\'Upload Photo\')]',
      locateStrategy: 'xpath',
    },

    closeUploadPhotoIcon: {
      selector: '//BUTTON[contains(@title, \'Close\')]',
      locateStrategy: 'xpath',
    },

    uploadPhotoModal: {
      selector: '//*[@style=\'opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);\']',
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------------------------------------*/

    orgNameInput: {
      selector: '//INPUT[contains(@id,\'name\')]',
      locateStrategy: 'xpath',
    },

    addressOneInput: {
      selector: '//INPUT[contains(@id,\'street1\')]',
      locateStrategy: 'xpath',
    },

    addressTwoInput: {
      selector: '//INPUT[contains(@id,\'street2\')]',
      locateStrategy: 'xpath',
    },

    cityInput: {
      selector: '//INPUT[contains(@id,\'city\')]',
      locateStrategy: 'xpath',
    },

    stateInput: {
      selector: '//SELECT[contains(@id,\'state\')]', // only grabs form group. dropdown and xpath contains not getting along
      locateStrategy: 'xpath',
    },

    zipInput: {
      selector: '//INPUT[contains(@id,\'zip\')]',
      locateStrategy: 'xpath',
    },

    orgPhoneInput: {
      selector: '//INPUT[contains(@id,\'businessPhone\')]',
      locateStrategy: 'xpath',
    },

    orgEmailInput: {
      selector: '//INPUT[contains(@id,\'businessEmail\')]',
      locateStrategy: 'xpath',
    },

    orgContactNameInput: {
      selector: '//INPUT[contains(@id,\'contactName\')]',
      locateStrategy: 'xpath',
    },

    orgContactPhoneInput: {
      selector: '//INPUT[contains(@id,\'contactPhone\')]',
      locateStrategy: 'xpath',
    },

    orgContactEmailInput: {
      selector: '//INPUT[contains(@id,\'contactEmail\')]',
      locateStrategy: 'xpath',
    },

    orgContactBillingNumberInput: {
      selector: '//INPUT[contains(@id,\'billManagerCustId\')]',
      locateStrategy: 'xpath',
    },

    integrationToggle: {
      selector: '//LABEL[@class=\'rhinoswitcher__label\'][contains(@for,\'integration\')]',
      locateStrategy: 'xpath',
    },

    integrationDropdown: {
      selector: '//SELECT[contains(@id,\'integrationPartnerType\')]',
      locateStrategy: 'xpath',
    },


    /*----------------------------------------------------------------------------*/

    nullNameInput: {
      selector: '//INPUT[contains(@name, \'name\')]',
      locateStrategy: 'xpath',
    },

    nullAddressInput: {
      selector: '//INPUT[contains(@name, \'street1\')]',
      locateStrategy: 'xpath',
    },

    nullCityInput: {
      selector: '//INPUT[contains(@name, \'street2\')]',
      locateStrategy: 'xpath',
    },

    nullStateInput: {
      selector: '//INPUT[contains(@name, \'city\')]',
      locateStrategy: 'xpath',
    },

    nullZipInput: {
      selector: '//INPUT[contains(@name, \'zip\')]',
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------------------------------------*/

    saveOrgProfileButton: {
      selector: '//SPAN[contains(.,\'Save Profile\')]',
      locateStrategy: 'xpath',
    },

    orgUpdateSuccessMessage: {
      selector: '//DIV[text()=\'Organization updated successfully.\']',
      locateStrategy: 'xpath',
    },

    rhinopayToggle: {
      selector: '//LABEL[@class=\'rhinoswitcher__label\'][contains(@for,\'isRhinopayEnabled\')]',
      locateStrategy: 'xpath',
    },

    merchantIdInput: {
      selector: '//INPUT[contains(@id,\'merchantId\')]',
      locateStrategy: 'xpath',
    },

    merchantTokenInput: {
      selector: '//INPUT[contains(@id,\'merchantToken\')]',
      locateStrategy: 'xpath',
    },

    paymentApiUsernameInput: {
      selector: '//INPUT[contains(@id,\'paymentApiUsername\')]',
      locateStrategy: 'xpath',
    },

    paymentApiPasswordInput: {
      selector: '//INPUT[contains(@id,\'paymentApiPassword\')]',
      locateStrategy: 'xpath',
    },

    paymentGatewayIdInput: {
      selector: '//INPUT[contains(@id,\'paymentGatewayId\')]',
      locateStrategy: 'xpath',
    },
  },
};
