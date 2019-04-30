// This profile page also serves double duty as containing elements for member create and edit pages

const profileCommands = {

  clearAllRequiredFields() {
    return this.waitForElementVisible('@firstNameInput', 'First name input is visible')
      .clearValue('@firstNameInput')
      .clearValue('@lastNameInput')
      .clearValue('@usernameInput');
  },

  clickSaveProfileButton() {
    return this.click('@saveProfileButton');
  },
};

module.exports = {
  commands: [profileCommands],
  url() {
    return `${this.api.launch_url}/settings/profile`;
  },
  elements: {

    backButton: {
      selector: '//BUTTON[contains(@title, \'Go Back\')]',
      locateStrategy: 'xpath',
    },

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
      selector: '//LABEL[@class=\'avatar-editor__container__upload\'][text()=\'Upload Photo\']',
      locateStrategy: 'xpath',
    },

    donePhotoButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Done\']',
      locateStrategy: 'xpath',
    },

    /*-------------------------------------------------------*/
    // General information inputs
    /*-------------------------------------------------------*/

    firstNameInput: {
      selector: '//INPUT[contains(@id, \'firstName\')',
      locateStrategy: 'xpath',
    },

    middleNameInput: {
      selector: '//INPUT[contains(@id, \'middleName\')]',
      locateStrategy: 'xpath',
    },

    lastNameInput: {
      selector: '//INPUT[contains(@id, \'lastName\')',
      locateStrategy: 'xpath',
    },

    preferredName: {
      selector: '//INPUT[contains(@id, \'preferredName\')',
      locateStrategy: 'xpath',
    },

    prefixDropdown: {
      selector: '//SELECT[contains(@id, \'prefixId\')',
      locateStrategy: 'xpath',
    },

    suffixDropdown: {
      selector: '//SELECT[contains(@id, \'suffixId\')',
      locateStrategy: 'xpath',
    },

    jobTitleInput: {
      selector: '//INPUT[contains(@id, \'businessTitle\')',
      locateStrategy: 'xpath',
    },

    /*-------------------------------------------------------*/
    // Login information
    /*-------------------------------------------------------*/

    usernameInput: {
      selector: '//INPUT[contains(@id, \'username\')',
      locateStrategy: 'xpath',
    },

    emailAddressInput: {
      selector: '//INPUT[contains(@id, \'loginEmail\')',
      locateStrategy: 'xpath',
    },

    changePasswordButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Change Password\']',
      locateStrategy: 'xpath',
    },

    currentPassInput: {
      selector: '//INPUT[contains(@id, \'oldPass\')',
      locateStrategy: 'xpath',
    },

    newPassInput: {
      selector: '//INPUT[contains(@id, \'newPass\')',
      locateStrategy: 'xpath',
    },

    confirmPassInput: {
      selector: '//INPUT[contains(@id, \'newPassAgain\')',
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

    memberSettingsCheck: {
      selector: '//SPAN[@class=\'form__block-group__label\'][text()=\'Member Settings\']',
      locateStrategy: 'xpath',
    },

    administrativeSettingsCheck: {
      selector: '//SPAN[@class=\'form__block-group__label\'][text()=\'Administrative Settings\']',
      locateStrategy: 'xpath',
    },

    billingSettingsCheck: {
      selector: '//SPAN[@class=\'form__block-group__label\'][text()=\'Billing Settings\']',
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

    nullUsernameValidator: {
      selector: '//DIV[@class=\'form__validation-message\'][text()=\'Invalid username\']',
      locateStrategy: 'xpath',
    },

  },

};
