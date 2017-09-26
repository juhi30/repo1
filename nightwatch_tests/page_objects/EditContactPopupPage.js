module.exports = {
  // commands: [patientProfileCommands],
  elements: {
    editProfile: {
      selector: `//div[@class='profile__user']//button[.='Edit Profile']`,
      locateStrategy: 'xpath'
    },
    typeOtherSelect: {
      selector: `//select[@id='contactType']//option[2]`,
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
    middleNameInput: {
      selector: `//input[@id='middleName']`,
      locateStrategy: 'xpath'
    },
    prefixSelect: {
      selector: `//select[@id='prefixId']//option[4]`,
      locateStrategy: 'xpath'
    },
    suffixSelect: {
      selector: `//select[@id='suffixId']//option[3]`,
      locateStrategy: 'xpath'
    },
    externalIdInput: {
      selector: `//input[@id='externalId']`,
      locateStrategy: 'xpath'
    },
    yearSelect: {
      selector: `//select[@id='year']//option[18]`,
      locateStrategy: 'xpath'
    },
    monthSelect: {
      selector: `//select[@id='month']//option[12]`,
      locateStrategy: 'xpath'
    },
    daySelect: {
      selector: `//select[@id='day']//option[19]`,
      locateStrategy: 'xpath'
    },
    connectionTypeDropdown: {
      selector: `//div[@class='edit-profile__connected-parties']//div[.='- Select -']`,
      locateStrategy: 'xpath'
    },
    dependentOption: {
      selector: `//div[@class='edit-profile__connected-parties']//span[.='Dependent']`,
      locateStrategy: 'xpath'
    },
    connectedPartyFirstNameInput: {
      selector: `//div[@class='edit-profile__connected-parties']/div[2]/div/div[2]/div[3]/div[1]/div/input`,
      locateStrategy: 'xpath'
    },
    connectedPartyLastNameInput: {
      selector: `//div[@class='edit-profile__connected-parties']/div[2]/div/div[2]/div[3]/div[2]/div/input`,
      locateStrategy: 'xpath'
    },
  }
  
};
