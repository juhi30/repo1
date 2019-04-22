// This profile page also serves double duty as containing elements for member create and edit pages
const testConstants = require('../toolboxes/feeder.toolbox');
const helper = require('../toolboxes/helpers.toolbox');
const profileCommands = {

  clearAllRequiredFields: function (element) {
    return this.waitForElementVisible(element, element + ' : is visible')
      .clearValue(element)
      .setValue(element, ' ')
  },

  checkForValidation: function (validationMessage) {
    return this.waitForElementVisible(validationMessage, validationMessage + ': is visible')
  },

  changeUserName: function (newUserName) {
    return this.waitForElementVisible('@loginInformationTitle', 'login information title is visible')
      .clearValue('@userNameInput')
      .setValue('@userNameInput', newUserName)
  },

  changePassword: function (currentPass, newPass) {
    return this.waitForElementVisible('@changePasswordButton', 'change password button is visible')
      .click('@changePasswordButton')
      .setValue('@currentPassInput', currentPass)
      .setValue('@newPassInput', newPass)
      .setValue('@confirmPassInput', newPass)
      .waitForElementVisible('@updatePassButton', 'Update password button is visible')
      .click('@updatePassButton')
  },

  checkMemberPermissions: function (element) {
    return this.waitForElementVisible(element, element + ': is visible')
      .click(element)
  },

  addTag: function (name, category) {
    return this.waitForElementVisible('@createNewTag', 'create new tag button is visible')
      .click('@createNewTag')
      .waitForElementVisible('@tagNameInput', 'Add tag modal is open')
      .setValue('@tagNameInput', name)
      .click(category)
      .waitForElementVisible('@createTagButton', 'Create tag Button is visible.')
      .click('@createTagButton')
      .pause(1000)
      .waitForElementVisible('@addCreatedTag', 'created tag is visible')
  },

  displayChannels: function (element) {
    return this.waitForElementVisible(element, element + ': is visible and routed to member')
  },

  addGroup: function () {
    return this.waitForElementVisible('@addMoreGroups', 'add groups option is visible')
      .click('@addMoreGroups')
      .waitForElementVisible('@selectGroup', 'select group is visible')
      .click('@selectGroup')

  },

  addAvailabilityHours: function () {
    return this.waitForElementVisible('@availabilityHoursButton', 'availability hours button is visible')
      .click('@availabilityHoursButton')
      .waitForElementVisible('@timezoneDropdown', 'timezone drop down is visible')
      .setValue('@timezoneDropdown', testConstants.timeZone)
  },

  addUpdateLogo: async function (element) {
    this.waitForElementVisible(element, 'Add/Update Logo button visible')
      .click(element)
      .waitForElementNotVisible('@uploadPhotoButton', 'Upload Photo modal is open')
      .pause(2000)
    await helper.uploadFile(this, 'rhinogram.png')
    return this.pause(5000)
      .click('@doneUploadPhoto')
      .pause(5000)
      .click('@saveOrgProfileButton')
  },

  clickSaveProfileButton: function () {
    return this.waitForElementVisible('@saveProfileButton', 'Save profile button is visible')
      .click('@saveProfileButton');
  },

  successMessage: function (element) {
    return this.waitForElementVisible(element, element + 'element is visible')
  },
}

module.exports = {
  commands: [profileCommands],
  url: function () {
    return this.api.launch_url + '/settings/profile'
  },
  elements: {
    /*-------------------------------------------------------*/
    // add photo modal elements
    /*-------------------------------------------------------*/

    addPhotoButton: {
      selector: `//SPAN[contains(.,'Add Photo')]`,
      locateStrategy: 'xpath',
    },

    closeAddPhoto: {
      selector: `//BUTTON[contains(@title, 'Close')]`,
      locateStrategy: 'xpath',
    },

    uploadPhotoButton: {
      selector: `//LABEL[contains(.,'Upload Photo')]`,
      locateStrategy: 'xpath',
    },

    doneUploadPhoto: {
      selector: `//SPAN[text()='Done']`,
      locateStrategy: 'xpath',
    },

    updateLogoButton: {
      selector: `//SPAN[contains(.,'Update Logo')]`,
      locateStrategy: 'xpath'
    },

    saveOrgProfileButton: {
      selector: `//SPAN[contains(.,'Save Profile')]`,
      locateStrategy: 'xpath'
    },

    /*-------------------------------------------------------*/
    // General information inputs
    /*-------------------------------------------------------*/

    firstNameInput: {
      selector: `//INPUT[contains(@id, 'firstName')]`,
      locateStrategy: 'xpath',
    },

    middleNameInput: {
      selector: `//INPUT[contains(@id, 'middleName')]`,
      locateStrategy: 'xpath',
    },

    lastNameInput: {
      selector: `//INPUT[contains(@id, 'lastName')]`,
      locateStrategy: 'xpath',
    },

    /*-------------------------------------------------------*/
    // Login information 
    /*-------------------------------------------------------*/

    loginInformationTitle: {
      selector: `//DIV[text()='Login Information']`,
      locateStrategy: 'xpath',
    },

    userNameInput: {
      selector: `//INPUT[contains(@id, 'username')]`,
      locateStrategy: 'xpath',
    },

    changePasswordButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Change Password']`,
      locateStrategy: 'xpath',
    },

    currentPassInput: {
      selector: `//INPUT[contains(@id, 'oldPass')]`,
      locateStrategy: 'xpath',
    },

    newPassInput: {
      selector: `//INPUT[contains(@id, 'newPass')]`,
      locateStrategy: 'xpath',
    },

    confirmPassInput: {
      selector: `//INPUT[contains(@name,'newPasswordConfirm')]`,
      locateStrategy: 'xpath',
    },

    updatePassButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Update password']`,
      locateStrategy: 'xpath',
    },

    cancelUpdatePassbutton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Cancel']`,
      locateStrategy: 'xpath',
    },

    resetPasswordButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Reset password']`, //available Edit member pages
      locateStrategy: 'xpath',
    },

    copyTempPassword: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Copy']`,  // available Create/Edit member pages
      locateStrategy: 'xpath',
    },

    /*-------------------------------------------------------*/
    // Admin Settings
    /*-------------------------------------------------------*/

    adminSettingsCheck: {
      selector: `//SPAN[@class='form__block-group__label'][text()='Admin']`,
      locateStrategy: 'xpath',
    },

    billingAdminSettingsCheck: {
      selector: `//SPAN[@class='form__block-group__label'][text()='Billing Admin']`,
      locateStrategy: 'xpath',
    },

    memberSettingsCheck: {
      selector: `//SPAN[@class='form__block-group__label'][text()='Member']`,
      locateStrategy: 'xpath',
    },

    memberAdminSettingsCheck: {
      selector: `//SPAN[@class='form__block-group__label'][text()='Member Admin']`,
      locateStrategy: 'xpath',
    },

    memberTemplatesSettingsCheck: {
      selector: `//SPAN[@class='form__block-group__label'][text()='Member Templates']`,
      locateStrategy: 'xpath',
    },

    saveProfileButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Profile']`,
      locateStrategy: 'xpath',
    },

    // ------------ Validator display elements -----------//

    nullFirstNameValidator: {
      selector: `//DIV[@class='form__validation-message'][text()='First name is required']`,
      locateStrategy: 'xpath',
    },

    nullLastNameValidator: {
      selector: `//DIV[@class='form__validation-message'][text()='Last name is required']`,
      locateStrategy: 'xpath'
    },

    nullUsernameValidator: {
      selector: `//DIV[@class='form__validation-message'][text()='Invalid username']`,
      locateStrategy: 'xpath',
    },

    profileButton: {
      selector: `//BUTTON[@class='button--reset dropdown__toggle app-header__dropdown__trigger button__text-wrapper']`,
      locateStrategy: 'xpath',
    },

    myProfileTitle: {
      selector: `//DIV[@class='app-page__header__title']`,
      locateStrategy: 'xpath',
    },

    passwordUpdationSuccessMessage: {
      selector: `//DIV[text()='Password updated successfully.']`,
      locateStrategy: 'xpath',
    },

    saveProfileSuccessMessage: {
      selector: `//DIV[text()='Member updated successfully.']`,
      locateStrategy: 'xpath',
    },

    //-----------For tags creation ------------//

    createNewTag: {
      selector: `//SPAN[@class='button__text-wrapper'][contains(text(),'Create New Tag')]`,
      locateStrategy: 'xpath',
    },

    tagNameInput: {
      selector: `//INPUT[contains(@id,'tagName')]`,
      locateStrategy: 'xpath',
    },

    customTag: {
      selector: `//LABEL[@class='rhinodio__label'][contains(text(),'${testConstants.tagCategory}')]`,
      locateStrategy: 'xpath',
    },

    createTagButton: {
      selector: `//SPAN[@class='button__text-wrapper'][contains(text(),'Create Tag')]`,
      locateStrategy: 'xpath',
    },

    addCreatedTag: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='${testConstants.createdTag}']`,
      locateStrategy: 'xpath',
    },

    //------For  groups addition or removal--------//

    addMoreGroups: {
      selector: `//SPAN[contains(text(),'Add to More Groups')]`,
      locateStrategy: 'xpath',
    },

    selectGroup: {
      selector: `//SPAN[@class='resource__intro__title__content'][text()='${testConstants.patientTypeGroup}']`,
      locateStrategy: 'xpath',
    },

    availabilityHoursButton: {
      selector: `//LABEL[@class='rhinoswitcher__label'][contains(@for,'afterHoursEnabled')]`,
      locateStrategy: 'xpath',
    },

    timezoneDropdown: {
      selector: `//SELECT[contains(@id,'timeZoneId')]`,
      locateStrategy: 'xpath',
    },

    newPhoneTypeChannel: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][text()='${testConstants.newChannelName}']`,
      locateStrategy: 'xpath',
    },

    rhinoSecureTypeChannel: {
      selector: `//SPAN[@class='resource__intro__title__content'][text()='${testConstants.rhinoChannelNewName}']`,
      locateStrategy: 'xpath',
    },

  }

};
