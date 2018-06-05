'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const euProfileCommands = {
  verifyElements: function () {
    return this.waitForElementVisible('@usernameInput', 5000, 'Username input is visible').verify.visible('@usernameInput', 'Username input is visible').verify.visible('@emailAddressInput', 'Email address input is visible').verify.visible('@changePasswordLink', 'Change password link is visible').verify.visible('@saveProfileButton', 'Save Profile button is visible').verify.visible('@settingsDropdown', 'Settings dropdown is visible');
  },

  verifyPasswordUpdatedToast: function () {
    return this.waitForElementVisible('@passwordUpdatedToast', 5000, 'Toast: Password Updated Successfully is visible');
  },

  clickChangePassword: function () {
    return this.waitForElementVisible('@changePasswordLink', 1000, 'clicked Change Password').click('@changePasswordLink');
  },

  clickSavePassword: function () {
    return this.waitForElementVisible('@savePasswordButton', 1000, 'clicked Save Password').click('@savePasswordButton');
  },

  fillInCurrentPasswordInput: function (currentPassword) {
    return this.waitForElementVisible('@currentPasswordInput', 1000, `filled in Current Password with ${currentPassword}`).setValue('@currentPasswordInput', currentPassword);
  },

  fillInNewPasswordInput: function (newPassword) {
    return this.waitForElementVisible('@newPasswordInput', 1000, `filled in New Password with ${newPassword}`).setValue('@newPasswordInput', newPassword);
  },

  fillInRetypeNewPasswordInput: function (newPassword) {
    return this.waitForElementVisible('@retypeNewPasswordInput', 1000, `filled in Retype New Password with ${newPassword}`).setValue('@retypeNewPasswordInput', newPassword);
  }
};

const EUProfilePage = {
  url: 'https://dev.dev-rhinogram.com/settings/user/profile',
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
    },

    passwordUpdatedToast: {
      selector: `//DIV[@class='toast__text'][text()='Password updated successfully.']`,
      locateStrategy: 'xpath'
    }

  }
};

exports.default = EUProfilePage;