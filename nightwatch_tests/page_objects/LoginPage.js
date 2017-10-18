//coding based off Matthew roach's example @ http://matthewroach.me/ui-testing-with-nightwatch-js/

const loginCommands = {
  validateForm: function() {
    return this.waitForElementVisible('@usernameInput', 5000, 'Username input is visible')
      .verify.visible('@usernameInput', 'Username input is visible')
      .verify.visible('@passwordInput', 'password input is visible')
      .verify.containsText('@loginButton', 'Log In', 'Login button is visible')
  },

  fillInForm: function(username, password) {
    return this.waitForElementVisible('@usernameInput', 5000, 'Username input is visible')
      .setValue('@usernameInput', username)
      .setValue('@passwordInput', password)
  },

  submit: function() {
    return this.waitForElementVisible('@loginButton', 5000, 'Login button is visible')
      .click('@loginButton')
  },

  submitForFirstTime: function() {
    return this.waitForElementVisible('@loginButton', 5000, 'Login button is visible')
      .click('@loginButton')
      .waitForElementNotPresent('@usernameInput', 5000, 'Username input no longer present');
  },

  validateError: function() {
    return this.waitForElementVisible('@errorPrompt', 5000, 'Error logging in prompt is visible')
      .verify.valueContains('@usernameInput', '', 'username input testing ')
      .verify.valueContains('@passwordInput', '', 'password input testing')
  },

  //need more appropiate name or refactor
  validateUrlChange: function() {
    return this.waitForElementNotPresent('@loginButton', 6000, false, null, 'Login button is no longer visible, page changes to inbox')
      .verify.urlContains('inbox')  // maybe some timeout issues happening here working as of 9/20/1
  },

  fillInNewPasswordInput: function(password) {
    return this.waitForElementVisible('@newPasswordInput', 5000, 'New password input is visible')
      .setValue('@newPasswordInput', password);
  },

  fillInConfirmPasswordInput: function(password) {
    return this.waitForElementVisible('@confirmPasswordInput', 5000, 'Confirm password input is visible')
      .setValue('@confirmPasswordInput', password);
  },

  clickSaveAndContinueButton: function() {
    return this.waitForElementVisible('@saveAndContinueButton', 5000, 'Save and Continue button is visible')
      .click('@saveAndContinueButton');
  }
}

module.exports = {
  commands: [loginCommands],
  url: function() {
    return this.api.launch_url + '/login'
  },
  elements: {
    usernameInput: {
      selector: `//*[@id="username"]`,
      locateStrategy: 'xpath',
    },
    passwordInput: {
      selector: `//input[@id='password']`,
      locateStrategy: 'xpath',
    },
    loginButton: {
      selector: `//*[@id="app"]/div/div/div/div[2]/div[3]/button/span`,
      locateStrategy: 'xpath',
    },
    errorPrompt: {
      selector: `//*[@id="app"]/div/div/div/div[2]/div[5]/div`,
      locateStrategy: 'xpath',
    },

    //------ below are elements found when logging in with a temporary password -----//

    newPasswordInput: {
      selector: `//INPUT[@id='password']`,
      locateStrategy: 'xpath'
    },

    confirmPasswordInput: {
      selector: `//INPUT[@id='confirmPassword']`,
      locateStrategy: 'xpath'
    },

    saveAndContinueButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save and Continue']`,
      locateStrategy: 'xpath'
    },
  }
};
