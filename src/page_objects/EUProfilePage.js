// EU = End User

const euProfileCommands = {
  verifyElements: function() {
    return this.waitForElementVisible('@usernameInput', 'Username input is visible')
      .verify.visible('@usernameInput', 'Username input is visible')
      .verify.visible('@emailAddressInput', 'Email address input is visible')
      .verify.visible('@changePasswordLink', 'Change password link is visible')
      .verify.visible('@saveProfileButton', 'Save Profile button is visible')
      .verify.visible('@settingsDropdown', 'Settings dropdown is visible');
  },

  verifyPasswordUpdatedToast: function() {
    return this.waitForElementVisible('@passwordUpdatedToast', 'Toast: Password Updated Successfully is visible');
  },

  clickChangePassword: function() {
    return this.waitForElementVisible('@changePasswordLink', 'clicked Change Password')
      .click('@changePasswordLink');
  },

  clickSavePassword: function() {
    return this.waitForElementVisible('@savePasswordButton', 'clicked Save Password')
      .click('@savePasswordButton');
  },

  fillInCurrentPasswordInput: function(currentPassword) {
    return this.waitForElementVisible('@currentPasswordInput', `filled in Current Password with ${currentPassword}`)
      .setValue('@currentPasswordInput', currentPassword);
  },

  fillInNewPasswordInput: function(newPassword) {
    return this.waitForElementVisible('@newPasswordInput', `filled in New Password with ${newPassword}`)
      .setValue('@newPasswordInput', newPassword);
  },

  fillInRetypeNewPasswordInput: function(newPassword) {
    return this.waitForElementVisible('@retypeNewPasswordInput', `filled in Retype New Password with ${newPassword}`)
      .setValue('@retypeNewPasswordInput', newPassword);
  }
}

module.exports = {
  url: 'https://dev.dev-rhinogram.com/settings/user/profile',
  commands: [euProfileCommands],
  elements: {
    usernameInput: {
      selector: `//INPUT[contains(@name, 'username')]`,
      locateStrategy: 'xpath'
    },

    emailAddressInput: {
      selector: `//INPUT[contains(@name, 'loginEmail')]`,
      locateStrategy: 'xpath'
    },

    changePasswordLink: {
      selector: `//SPAN[contains(.,'Change password')]`,
      locateStrategy: 'xpath'
    },

    saveProfileButton: {
      selector: `//SPAN[contains(.,'Save Profile)]`,
      locateStrategy: 'xpath'
    },

    currentPasswordInput: {
      selector: `//INPUT[contains(@name, 'oldPass')]`,
      locateStrategy: 'xpath'
    },

    newPasswordInput: {
      selector: `//INPUT[contains(@name, 'newPass')]`,
      locateStrategy: 'xpath'
    },

    retypeNewPasswordInput: {
      selector: `//INPUT[contains(@name, 'newPassAgain')]`,
      locateStrategy: 'xpath'
    },

    savePasswordButton: {
      selector: `//SPAN[contains(.,'Update password')]`,
      locateStrategy: 'xpath'
    },

    settingsDropdown: {
      selector: `//DIV[contains(@id, 'cuke-main-settings')]`,
      locateStrategy: 'xpath'
    },

    logoutButton: {
      selector: `(//SPAN[contains(.,'Log Out')]]`,
      locateStrategy: 'xpath'
    }
  }
};
