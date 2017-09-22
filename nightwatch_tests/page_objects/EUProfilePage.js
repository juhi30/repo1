module.exports = {
  // commands: [euProfileCommands],
  elements: {
    usernameInput: {
      selector: `//*[@id="username"]`,
      locateStrategy: 'xpath'
    },
    emailAddressInput: {
      selector: `//*[@id="loginEmail"]`,
      locateStrategy: 'xpath'
    },
    changePasswordLink: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div/div[2]/div[3]/button`,
      locateStrategy: 'xpath'
    }
  }
};
