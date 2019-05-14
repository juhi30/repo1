// This profile page also serves double duty as containing elements for member create and edit pages
const channelFeeder = require('../feeder/channel.feeder');
const tagsFeeder = require('../feeder/tags.feeder');
const groupFeeder = require('../feeder/group.feeder');

const helper = require('../toolboxes/helpers.toolbox');

const profileCommands = {

  clearFields(element) {
    return this.waitForElementVisible(element, `${element} is visible`)
      .clearValue(element)
      .setValue(element, ' ');
  },

  checkForValidation(validationMessage) {
    return this.waitForElementVisible(validationMessage, `${validationMessage} is visible`);
  },

  changeUserName(newUserName) {
    return this.waitForElementVisible('@loginInformationTitle', 'login information title is visible')
      .clearValue('@userNameInput')
      .setValue('@userNameInput', newUserName);
  },

  changePassword(currentPass, newPass) {
    return this.waitForElementVisible('@changePasswordButton', 'change password button is visible')
      .click('@changePasswordButton')
      .setValue('@currentPassInput', currentPass)
      .setValue('@newPassInput', newPass)
      .setValue('@confirmPassInput', newPass)
      .waitForElementVisible('@updatePassButton', 'Update password button is visible')
      .click('@updatePassButton');
  },

  addRemovePermissions(element) {
    return this.waitForElementVisible(element, `${element} is visible`)
      .click(element);
  },

  displayChannels(element) {
    return this.waitForElementVisible(element, `${element} is visible and routed to member`);
  },

  addGroup(groupElement) {
    return this.waitForElementVisible('@addMoreGroups', 'add groups option is visible')
      .click('@addMoreGroups')
      .waitForElementVisible(groupElement, 'select/deselect group is visible')
      .click(groupElement);
  },

  addAvailabilityHours() {
    return this.waitForElementVisible('@availabilityHoursButton', 'availability hours button is visible')
      .click('@availabilityHoursButton')
      .waitForElementVisible('@timezoneDropdown', 'timezone drop down is visible')
      .setValue('@timezoneDropdown', channelFeeder.timeZone);
  },

  async addUpdateLogo(element) {
    this.waitForElementVisible(element, 'Add/Update Logo button visible')
      .click(element)
      .waitForElementNotVisible('@uploadPhotoButton', 'Upload Photo modal is open')
      .pause(2000);
    await helper.uploadFile(this, 'rhinogram.png');
    return this.pause(5000)
      .click('@doneUploadPhoto')
      .pause(5000)
      .click('@saveProfileButton');
  },

  clickSaveProfileButton() {
    return this.waitForElementVisible('@saveProfileButton', 'Save profile button is visible')
      .click('@saveProfileButton');
  },

  successMessage(element) {
    return this.waitForElementVisible(element, `${element} is visible`);
  },
};

module.exports = {
  commands: [profileCommands],
  url() {
    return `${this.api.launch_url}/settings/profile`;
  },
  elements: {
    /*-------------------------------------------------------*/
    // add photo modal elements
    /*-------------------------------------------------------*/

    addPhotoButton: {
      selector: '//SPAN[contains(.,\'Add Photo\')]',
      locateStrategy: 'xpath',
    },

    closeAddPhoto: {
      selector: '//BUTTON[contains(@title, \'Close\')]',
      locateStrategy: 'xpath',
    },

    uploadPhotoButton: {
      selector: '//LABEL[contains(.,\'Upload Photo\')]',
      locateStrategy: 'xpath',
    },

    doneUploadPhoto: {
      selector: '//SPAN[text()=\'Done\']',
      locateStrategy: 'xpath',
    },

    updateLogoButton: {
      selector: '//SPAN[contains(.,\'Update Logo\')]',
      locateStrategy: 'xpath',
    },

    /*-------------------------------------------------------*/
    // General information inputs
    /*-------------------------------------------------------*/

    firstNameInput: {
      selector: '//INPUT[contains(@id, \'firstName\')]',
      locateStrategy: 'xpath',
    },

    middleNameInput: {
      selector: '//INPUT[contains(@id, \'middleName\')]',
      locateStrategy: 'xpath',
    },

    lastNameInput: {
      selector: '//INPUT[contains(@id, \'lastName\')]',
      locateStrategy: 'xpath',
    },
    // -----Login information -----

    loginInformationTitle: {
      selector: '//DIV[text()=\'Login Information\']',
      locateStrategy: 'xpath',
    },

    userNameInput: {
      selector: '//INPUT[contains(@id, \'username\')]',
      locateStrategy: 'xpath',
    },

    changePasswordButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Change Password\']',
      locateStrategy: 'xpath',
    },

    currentPassInput: {
      selector: '//INPUT[contains(@id, \'oldPass\')]',
      locateStrategy: 'xpath',
    },

    newPassInput: {
      selector: '//INPUT[contains(@id, \'newPass\')]',
      locateStrategy: 'xpath',
    },

    confirmPassInput: {
      selector: '//INPUT[contains(@name,\'newPasswordConfirm\')]',
      locateStrategy: 'xpath',
    },

    updatePassButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Update password\']',
      locateStrategy: 'xpath',
    },

    cancelUpdatePassbutton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Cancel\']',
      locateStrategy: 'xpath',
    },

    resetPasswordButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Reset password\']', // available Edit member pages
      locateStrategy: 'xpath',
    },

    copyTempPassword: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Copy\']', // available Create/Edit member pages
      locateStrategy: 'xpath',
    },

    /*-------------------------------------------------------*/
    // Admin Settings
    /*-------------------------------------------------------*/

    adminSettingsCheck: {
      selector: '//SPAN[@class=\'form__block-group__label\'][text()=\'Admin\']',
      locateStrategy: 'xpath',
    },

    billingAdminSettingsCheck: {
      selector: '//SPAN[@class=\'form__block-group__label\'][text()=\'Billing Admin\']',
      locateStrategy: 'xpath',
    },

    memberSettingsCheck: {
      selector: '//SPAN[@class=\'form__block-group__label\'][text()=\'Member\']',
      locateStrategy: 'xpath',
    },

    memberAdminSettingsCheck: {
      selector: '//SPAN[@class=\'form__block-group__label\'][text()=\'Member Admin\']',
      locateStrategy: 'xpath',
    },

    memberTemplatesSettingsCheck: {
      selector: '//SPAN[@class=\'form__block-group__label\'][text()=\'Member Templates\']',
      locateStrategy: 'xpath',
    },

    saveProfileButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Save Profile\']',
      locateStrategy: 'xpath',
    },

    // ------------ Validator display elements -----------//

    nullFirstNameValidator: {
      selector: '//DIV[@class=\'form__validation-message\'][text()=\'First name is required\']',
      locateStrategy: 'xpath',
    },

    nullLastNameValidator: {
      selector: '//DIV[@class=\'form__validation-message\'][text()=\'Last name is required\']',
      locateStrategy: 'xpath',
    },

    nullUserNameValidator: {
      selector: '//DIV[@class=\'form__validation-message\'][text()=\'Invalid username\']',
      locateStrategy: 'xpath',
    },

    profileButton: {
      selector: '//BUTTON[@class=\'button--reset dropdown__toggle app-header__dropdown__trigger button__text-wrapper\']',
      locateStrategy: 'xpath',
    },

    myProfileTitle: {
      selector: '//DIV[@class=\'app-page__header__title\']',
      locateStrategy: 'xpath',
    },

    passwordUpdationSuccessMessage: {
      selector: '//DIV[text()=\'Password updated successfully.\']',
      locateStrategy: 'xpath',
    },

    saveProfileSuccessMessage: {
      selector: '//DIV[text()=\'Member updated successfully.\']',
      locateStrategy: 'xpath',
    },

    // -----------For tags creation ------------

    createNewTag: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][contains(text(),\'Create New Tag\')]',
      locateStrategy: 'xpath',
    },

    tagNameInput: {
      selector: '//INPUT[contains(@id,\'tagName\')]',
      locateStrategy: 'xpath',
    },

    customTag: {
      selector: `//LABEL[@class='rhinodio__label'][contains(text(),'${tagsFeeder.tagCategory}')]`,
      locateStrategy: 'xpath',
    },

    createTagButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][contains(text(),\'Create Tag\')]',
      locateStrategy: 'xpath',
    },

    // ------For  groups addition or removal--------

    addMoreGroups: {
      selector: '//SPAN[contains(text(),\'Add to More Groups\')]',
      locateStrategy: 'xpath',
    },

    selectGroup: {
      selector: `//SPAN[@class='resource__intro__title__content'][text()='${groupFeeder.patientTypeGroup}']`,
      locateStrategy: 'xpath',
    },

    availabilityHoursButton: {
      selector: '//LABEL[@class=\'rhinoswitcher__label\'][contains(@for,\'afterHoursEnabled\')]',
      locateStrategy: 'xpath',
    },

    timezoneDropdown: {
      selector: '//SELECT[contains(@id,\'timeZoneId\')]',
      locateStrategy: 'xpath',
    },

    newPhoneTypeChannel: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][text()='${channelFeeder.newChannelName}']`,
      locateStrategy: 'xpath',
    },

    rhinoSecureTypeChannel: {
      selector: `//SPAN[@class='resource__intro__title__content'][text()='${channelFeeder.rhinoChannelNewName}']`,
      locateStrategy: 'xpath',
    },
  },

};
