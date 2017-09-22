module.exports = {
  // commands: [profileCommands],
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
    saveChangesButton: {
      selector: `//div[@class='edit-profile']//button[.='Save Profile']`,
      locateStrategy: 'xpath'
    },
  }
  
};
