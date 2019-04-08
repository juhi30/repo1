//coding based off Matthew roach's example @ http://matthewroach.me/ui-testing-with-nightwatch-js/
const helpers = require('../toolboxes/helpers.toolbox');

const loginCommands = {

  fillInUsername: function(username) {
    return this.waitForElementVisible('@usernameInput', 'Username input visible')
      .setValue('@usernameInput', username)
  },

  fillInPassword: function(password) {
    return this.waitForElementVisible('@passwordInput', 'Password input visible')
      .setValue('@passwordInput', password)
  },

  
}

module.exports = {
  commands: [loginCommands],
  url: function() {
    return this.api.launch_url + '/login'
  },
  
  elements: {
    usernameInput: {
      selector: `//INPUT[@autocomplete = 'username']`,
      locateStrategy: 'xpath',
    },

    nextFromUsername: {
        selector: `//*[@id="identifierNext"]`,
        locateStrategy: 'xpath',
      },

      passwordInput: {
        selector: `//INPUT[@autocomplete = 'current-password']`,
        locateStrategy: 'xpath',
      },

      nextFromPassword: {
        selector: `//*[@id="passwordNext"]`,
        locateStrategy: 'xpath',
      },

      primaryInbox: {
        selector: `//*[@title='Inbox']`,
        locateStrategy: 'xpath',
      },
    
      firstInboxMail: {
        selector: `//table//tr//td//span[contains(text(),'Hello')]`,
        locateStrategy: 'xpath',
      },
  }
};