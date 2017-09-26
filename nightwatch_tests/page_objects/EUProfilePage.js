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
    },

    saveProfileButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Profile']`,
      locateStrategy: 'xpath'
    },

    currentPasswordInput: {
      selector: `//INPUT[@id='oldPass']`,
      locateStrategy: 'xpath'
    },

    newPasswordInput: {
      selector: `//INPUT[@id='newPass']`,
      locateStrategy: 'xpath'
    },

    retypeNewPasswordInput: {
      selector: `//INPUT[@id='newPassAgain']`,
      locateStrategy: 'xpath'
    },

    savePasswordButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Password']`,
      locateStrategy: 'xpath'
    }

  }
};
