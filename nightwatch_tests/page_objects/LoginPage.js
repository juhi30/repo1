const pageCommands = {
  loginAsMember: () => {
    // console.log('this', this);
    return this.waitForElementVisible('@usernameInput', 5000)
      .setValue('@usernameInput', 'tonton')
      .setValue('@passwordInput', 'chacoz')
      .click('@loginButton')
  }
}

module.exports = {
  commands: [pageCommands],
  elements: {
    usernameInput: {
      selector: `//input[@id='username']`,
      locateStrategy: 'xpath',
    },
    passwordInput: {
      selector: `//input[@id='password']`,
      locateStrategy: 'xpath',
    },
    loginButton: {
      selector: `//*[@id="app"]/div/div/div/div[2]/div[3]/button/span`,
      locateStrategy: 'xpath',
    }
  }
};
