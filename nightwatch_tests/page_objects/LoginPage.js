//coding based off Matthew roach's example @ http://matthewroach.me/ui-testing-with-nightwatch-js/

const loginCommands = {
  validateForm: function() {
    return this.waitForElementVisible('body', 1000)
      .verify.visible('@usernameInput')
      .verify.visible('@passwordInput')
      .verify.containsText('@loginButton', 'Log In')
  },
  fillInForm: function(username, password) {
    return this.waitForElementVisible('body', 1000)
      .setValue('@usernameInput', username)
      .setValue('@passwordInput', password)
  },
  submit: function() {
    return this.waitForElementVisible('body', 1000)
      .click('@loginButton')
  },

  validateError: function() {
    return this.waitForElementVisible('@errorPrompt', 1000)
      .verify.valueContains('@usernameInput', '')
      .verify.valueContains('@passwordInput', '')

  },

  //need more appropiate name or refactor
  validateUrlChange: function() {
    return this.waitForElementVisible('body', 1000)
      .waitForElementNotPresent('@loginButton', 5000)
      .verify.urlContains('inbox')  // maybe some timeout issues happening here working as of 9/20/17

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
