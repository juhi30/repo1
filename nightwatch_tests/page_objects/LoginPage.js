//coding based off Matthew roach's example @ http://matthewroach.me/ui-testing-with-nightwatch-js/
const helpers = require('../helpers');

const loginCommands = {

  pause: function (time) {
    this.api.pause(time);
    return this;
  },
  
  validateForm: function() {
    return this.waitForElementVisible('@usernameInput', 'Username input is visible')
      .verify.visible('@usernameInput', 'Username input is visible')
      .verify.visible('@passwordInput', 'password input is visible')
      .verify.containsText('@loginButton', 'Log In', 'Login button is visible')
  },

  fillInUsername: function(username) {
    return this.waitForElementVisible('@usernameInput', 'Username input visible')
      .setValue('@usernameInput', username)
  },

  fillInPassword: function(password) {
    return this.waitForElementVisible('@passwordInput', 'Password input visible')
      .setValue('@passwordInput', password)
  },

  enterMemberCreds: function(username, password) {
    return this.waitForElementVisible('@usernameInput','Username input visible')
      .setValue('@usernameInput', username ? username : helpers.memberCreds.username)
      .setValue('@passwordInput', password ? password : helpers.memberCreds.password)
  },

  enterPatientCreds: function(username, password) {
    return this.waitForElementVisible('@usernameInput', 'Username input visible')
      .setValue('@usernameInput', username ? username : helpers.patientCreds.username)
      .setValue('@passwordInput', password ? password : helpers.patientCreds.password)
  },

  clearUsernameInput: function() {
    return this.waitForElementVisible('@usernameInput', 'Username input is visible')
      .clearValue('@usernameInput')
  },

  clearPasswordInput: function() {
    return this.waitForElementVisible('@passwordInput', 'Password input is visible')
      .clearValue('@passwordInput')
  },

  submit: function() {
    return this.waitForElementVisible('@loginButton', 'Login button is visible')
      .click('@loginButton')
  },

  submitForFirstTime: function() {
    return this.waitForElementVisible('@loginButton', 'Login button is visible')
      .click('@loginButton')
      .waitForElementNotPresent('@usernameInput', 'Username input no longer present');
  },

  validateError: function() {
    return this.waitForElementVisible('@errorPrompt', 'Error logging in prompt is visible')
      .verify.valueContains('@usernameInput', '', 'username input testing ')
      .verify.valueContains('@passwordInput', '', 'password input testing')
  },

  //need more appropiate name or refactor
  validateUrlChange: function() {
    return this.waitForElementNotPresent('@loginButton', 6000, false, null, 'Login button is no longer visible, page changes to inbox')
      .verify.urlContains('inbox')  // maybe some timeout issues happening here working as of 9/20/1
  },

  fillInNewPasswordInput: function(password) {
    return this.waitForElementVisible('@newPasswordInput', 'New password input is visible')
      .setValue('@newPasswordInput', password);
  },

  fillInConfirmPasswordInput: function(password) {
    return this.waitForElementVisible('@confirmPasswordInput', 'Confirm password input is visible')
      .setValue('@confirmPasswordInput', password);
  },

  clickSaveAndContinueButton: function() {
    return this.waitForElementVisible('@saveAndContinueButton', 'Save and Continue button is visible')
      .click('@saveAndContinueButton');
  }
}

module.exports = {
  commands: [loginCommands],
  url: function() {
    return this.api.launch_url + '/login'
  },
  elements: {
    // works for the forgotten password page
    usernameInput: {
      selector: `//INPUT[contains(@name, 'username')]`,
      locateStrategy: 'xpath',
    },
    passwordInput: {
      selector: `//INPUT[contains(@name, 'password')]`,      
      locateStrategy: 'xpath',
    },
    loginButton: {
      selector: `//SPAN[contains(.,'Log In')]`, //Will change after Alpha
      locateStrategy: 'xpath',
    },
    errorPrompt: {
      selector: `//DIV[@class='alert__body'][text()='Username and password did not match']`,
      locateStrategy: 'xpath',
    },

    forgotPasswordLink: {
      selector: `//SPAN[contains(.,'Forgot password?')]`,
      locateStrategy: 'xpath',
    },

    getNewPassword: {
      selector: `//SPAN[contains(.,'Get New Password')]`,
      locateStrategy: 'xpath',
    },

    //------ below are elements found when logging in with a temporary password -----//

    newPasswordInput: {
      selector: `//INPUT[contains(@name, 'password')]`,
      locateStrategy: 'xpath'
    },

    confirmPasswordInput: {
      selector: `//INPUT[contains(@name, 'confirmPassword')]`,
      locateStrategy: 'xpath'
    },

    saveAndContinueButton: {
      selector: `//SPAN[contains(.,'Save and Continue')]`,
      locateStrategy: 'xpath'
    },
  }
};
