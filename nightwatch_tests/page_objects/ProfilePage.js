const profileCommands = {
  verifyElements: function() {
    return this.waitForElementVisible('@firstNameInput', 5000, 'First Name input is visible')
      .verify.visible('@addPhotoButton', 'Add photo button is visible')
      .verify.visible('@firstNameInput', 'First name input is visible')
      .verify.visible('@lastNameInput', 'Last name input is visible')
      .verify.visible('@usernameInput', 'Username input is visible')
      .verify.visible('@changePasswordLink', 'Change Password link is visible')
      .verify.visible('@permissionsDropdown', 'Permissions dropdown is visible')
      .verify.visible('@saveProfileButton', 'Save Profile button is visible');
  }
}

module.exports = {
  commands: [profileCommands],
  url: 'https://dev.dev-rhinogram.com/settings/profile',
  elements: {
    addPhotoButton: {
      selector: `//div[@class='edit-profile']//button[.='Add Photo']`,
      locateStrategy: 'xpath'
    },
    closeAddPhoto: {
      selector: `//div[@class='modal__header']/button`,
      locateStrategy: 'xpath'
    },
    firstNameInput: {
      selector: `//input[@id='firstName']`,
      locateStrategy: 'xpath'
    },
    lastNameInput: {
      selector: `//input[@id='lastName']`,
      locateStrategy: 'xpath'
    },
    usernameInput: {
      selector: `//input[@id='username']`,
      locateStrategy: 'xpath'
    },
    changePasswordLink: {
      selector: `//div[@class='edit-profile']//button[.='Change password']`,
      locateStrategy: 'xpath'
    },
    currentPassInput: {
      selector: `//input[@id='oldPass']`,
      locateStrategy: 'xpath'
    },
    newPassInput: {
      selector: `//input[@id='newPass']`,
      locateStrategy: 'xpath'
    },
    confirmPassInput: {
      selector: `//input[@id='newPassAgain']`,
      locateStrategy: 'xpath'
    },
    permissionsDropdown: {
      selector: `//div[@class='edit-profile']/div[3]/div[4]/span/div[1]/input`,
      locateStrategy: 'xpath'
    },
    saveProfileButton: {
      selector: `//div[@class='edit-profile']//button[.='Save Profile']`,
      locateStrategy: 'xpath'
    },
  }
  
};
