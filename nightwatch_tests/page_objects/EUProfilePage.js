const euProfileCommands = {
  verifyElements: function() {
    return waitForElementVisible('@usernameInput', 5000)
      .verify.visible('@usernameInput', 'Username input is visible')
      .verify.visible('@emailAddressInput', 'Email address input is visible')
      .verify.visible('@changePasswordLink', 'Change password link is visible')
      .verify.visible('@saveProfileButton', 'Save Profile button is visible')
      .verify.visible('@settingsDropdown', 'Settings dropdown is visible')
  },

  clickChangePassword: function() {
    return waitForElementVisible('@changePasswordLink', 1000)
      .click('@changePasswordLink')
  },

  clickSavePassword: function() {
    return waitForElementVisible('@savePasswordButton', 1000)
      .click('@savePasswordButton')
  },

  fillInCurrentPassword: function(currentPassword) {
    return waitForElementVisible('@currentPasswordInput', 1000)
      .setValue('@currentPasswordInput', currentPassword)
  },

  fillInNewPassword: function(newPassword) {
    return waitForElementVisible('@newPasswordInput', 1000)
      .setValue('@newPasswordInput', newPassword)
  },

  fillInRetypeNewPasswordInput: function(newPassword) {
    return waitForElementVisible('@retypeNewPasswordInput', 1000)
      .setValue('@retypeNewPasswordInput', newPassword)
  }
}

module.exports = {
  commands: [euProfileCommands],
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
    },

    settingsDropdown: {
      selector: `//SPAN[@class='dropdown__toggle__text'][text()='Settings']`,
      locateStrategy: 'xpath'
    },

    logoutButton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[2]`,
      locateStrategy: 'xpath'
    }

  }
};
