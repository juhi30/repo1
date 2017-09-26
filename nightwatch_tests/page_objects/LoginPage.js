//coding based off Matthew roach's example @ http://matthewroach.me/ui-testing-with-nightwatch-js/

const loginCommands = {
  validateForm: function() {
    return this.waitForElementVisible('body', 1000, 'Body is visible')
      .verify.visible('@usernameInput', 'Username input is visible')
      .verify.visible('@passwordInput', 'password input is visible')
      .verify.containsText('@loginButton', 'Log In', 'Login button is visible')
  },
  fillInForm: function(username, password) {
    return this.waitForElementVisible('body', 1000, 'Body is visible')
      .setValue('@usernameInput', username)
      .setValue('@passwordInput', password)
  },
  submit: function() {
    return this.waitForElementVisible('body', 1000, 'Body is visible')
      .click('@loginButton')
  },

  validateError: function() {
    return this.waitForElementVisible('@errorPrompt', 1000, 'Error logging in prompt is visible')
      .verify.valueContains('@usernameInput', '', 'username input testing ')
      .verify.valueContains('@passwordInput', '', 'password input testing')
  },

  //need more appropiate name or refactor
  validateUrlChange: function() {
    return this.waitForElementVisible('body', 1000, 'Body is visible')
      .waitForElementNotPresent('@loginButton', 6000, 'login button is no longer visible, page changes to inbox')
      .verify.urlContains('inbox')  // maybe some timeout issues happening here working as of 9/20/1
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
    }
  }
};
