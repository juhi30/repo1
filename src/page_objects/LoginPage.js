const helpers = require('../toolboxes/helpers.toolbox');

const loginCommands = {

  validateForm() {
    return this.waitForElementVisible('@usernameInput', 'Username input is visible')
      .verify.visible('@usernameInput', 'Username input is visible')
      .verify.visible('@passwordInput', 'password input is visible')
      .waitForElementVisible('@loginButton', 'Login button is visible')
      .verify.containsText('@loginButton', 'Log In', 'Login button is visible');
  },

  fillInUsername(username) {
    return this.waitForElementVisible('@usernameInput', 'Username input visible')
      .setValue('@usernameInput', username);
  },

  fillInPassword(password) {
    return this.waitForElementVisible('@passwordInput', 'Password input visible')
      .setValue('@passwordInput', password);
  },

  enterCSRCreds(username, password) {
    return this.waitForElementVisible('@usernameInput', 'Username input visible')
      .setValue('@usernameInput', username || helpers.csrCreds.username)
      .setValue('@passwordInput', password || helpers.csrCreds.password);
  },

  enterMemberCreds(username, password) {
    return this.waitForElementVisible('@usernameInput', 'Username input visible')
      .setValue('@usernameInput', username || helpers.memberCreds.username)
      .setValue('@passwordInput', password || helpers.memberCreds.password);
  },

  enterPatientCreds(username, password) {
    return this.waitForElementVisible('@usernameInput', 'Username input visible')
      .setValue('@usernameInput', username || helpers.patientCreds.username)
      .setValue('@passwordInput', password || helpers.patientCreds.password);
  },

  clearUsernameInput() {
    return this.waitForElementVisible('@usernameInput', 'Username input is visible')
      .clearValue('@usernameInput');
  },

  clearPasswordInput() {
    return this.waitForElementVisible('@passwordInput', 'Password input is visible')
      .clearValue('@passwordInput');
  },

  submit() {
    return this.waitForElementVisible('@loginButton', 'Login button is visible')
      .click('@loginButton');
  },

  submitForFirstTime() {
    return this.waitForElementVisible('@loginButton', 'Login button is visible')
      .click('@loginButton')
      .waitForElementNotPresent('@usernameInput', 'Username input no longer present');
  },

  validateError() {
    return this.waitForElementVisible('@errorPrompt', 'Error logging in prompt is visible')
      .verify.valueContains('@usernameInput', '', 'username input testing ')
      .verify.valueContains('@passwordInput', '', 'password input testing');
  },

  validateUrlChange(url) {
    const nextPageUrl = url || 'inbox';
    return this.waitForElementNotPresent('@loginButton', false, null, `Login button is no longer visible, page changes to ${nextPageUrl}`)
      .verify.urlContains(nextPageUrl);
  },

  fillInNewPasswordInput(password) {
    return this.waitForElementVisible('@newPasswordInput', 'New password input is visible')
      .click('@newPasswordInput')
      .setValue('@newPasswordInput', password);
  },

  fillInConfirmPasswordInput(password) {
    return this.waitForElementVisible('@confirmPasswordInput', 'Confirm password input is visible')
      .setValue('@confirmPasswordInput', password);
  },

  clickSaveAndContinueButton() {
    return this.waitForElementVisible('@saveAndContinueButton', 'Save and Continue button is visible')
      .click('@saveAndContinueButton');
  },

  resetPassword(inputValue) {
    return this.waitForElementVisible('@forgotPasswordLink', 'Forgot password button is visible')
      .click('@forgotPasswordLink')
      .waitForElementVisible('@getNewPassword', 'User landed on Forgot Password page')
      .setValue('@usernameInput', inputValue)
      .click('@getNewPassword');
  },
};

module.exports = {
  commands: [loginCommands],
  url() {
    return `${this.api.launch_url}/login`;
  },
  elements: {
    // works for the forgotten password page
    usernameInput: {
      selector: '//INPUT[contains(@name, \'username\')]',
      locateStrategy: 'xpath',
    },
    passwordInput: {
      selector: '//INPUT[contains(@id, \'password\')]',
      locateStrategy: 'xpath',
    },

    loginButton: {
      selector: '//SPAN[contains(.,\'Log In\')]', // Will change after Alpha
      locateStrategy: 'xpath',
    },

    logOutButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Log Out\']',
      locateStrategy: 'xpath',
    },

    errorPrompt: {
      selector: '//DIV[@class=\'alert__body\'][contains(text(),\'Username and password did not match\')]',
      locateStrategy: 'xpath',
    },

    missingCredentialErrorPrompt: {
      selector: '//DIV[@class=\'alert__body\'][contains(text(),\'Missing credentials\')]',
      locateStrategy: 'xpath',
    },

    failedLoginAttemptPrompt: {
      selector: '//DIV[@class=\'alert__body\'][text()=\'You have reached the maximum number of invalid login attempts. Please select the Forgot Password link to reset your password.\']',
      locateStrategy: 'xpath',
    },

    forgotPasswordLink: {
      selector: '//SPAN[contains(.,\'Forgot password?\')]',
      locateStrategy: 'xpath',
    },

    getNewPassword: {
      selector: '//SPAN[contains(.,\'Get New Password\')]',
      locateStrategy: 'xpath',
    },

    contactAdminMsg: {
      selector: '//P[text()=\'Please contact your office administrator to reset your password.\']',
      locateStrategy: 'xpath',
    },

    successEmailMessage: {
      selector: '//P[contains(text(),\'Success! An email was sent to \')]',
      locateStrategy: 'xpath',
    },

    // ------ below are elements found when logging in with a temporary password -----//

    newPasswordInput: {
      selector: '//INPUT[contains(@name, \'newPassword\')]',
      locateStrategy: 'xpath',
    },

    confirmPasswordInput: {
      selector: '//INPUT[contains(@name, \'confirmPassword\')]',
      locateStrategy: 'xpath',
    },

    saveAndContinueButton: {
      selector: '//SPAN[contains(.,\'Save and Continue\')]',
      locateStrategy: 'xpath',
    },

    passwordUpdateSuccessMessage: {
      selector: '//DIV[text()=\'Password updated successfully.\']',
      locateStrategy: 'xpath',
    },
  },
};
