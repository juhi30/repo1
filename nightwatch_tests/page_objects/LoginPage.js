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
      .waitForElementVisible('body', 1000)
  },
  validateError: function(errorMessage) {
    return this.verify.visible('@errorPrompt')
      .verify.containsText('@errorPrompt', errorMessage)
      .verify.valueContains('@usernameInput', '')
      .verify.valueContains('@passwordInput', '')
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
      selector: `//div[@class='alert__body']`,
      locateStrategy: 'xpath',
    }
  }
};
