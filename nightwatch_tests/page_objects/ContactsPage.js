module.exports = {
  // commands: [contactsCommands],
  elements: {
    filterDropdown: {
      selector: `//*[@id="app"]/div/div[2]/div/div[1]/div[1]/div[2]/div/button/span/span`,
      locateStrategy: 'xpath'
    },
    patientOption: {
      selector: `//*[@id="app"]/div/div[2]/div/div[1]/div[1]/div[2]/div/div/div/div[2]/a/div`,
      locateStrategy: 'xpath'
    },
    memberOption: {
      selector: `//*[@id="app"]/div/div[2]/div/div[1]/div[1]/div[2]/div/div/div/div[3]/a/div`,
      locateStrategy: 'xpath'
    },
    connectedPartyOption: {
      selector: `//div[2]/div/div[2]/div/div[1]/div[1]/div[2]/div/div/div/div[4]/a/div/div/div/span`,
      locateStrategy: 'xpath'
    },
    unknownOption: {
      selector: `//div[2]/div/div[2]/div/div[1]/div[1]/div[2]/div/div/div/div[5]/a/div/div/div/span`,
      locateStrategy: 'xpath'
    },
    otherOption: {
      selector: `//div[2]/div/div[2]/div/div[1]/div[1]/div[2]/div/div/div/div[6]/a/div`,
      locateStrategy: 'xpath'
    },
    firstContact: {
      selector: `//div[1]/div/div[2]/div/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[2]/div`,
      locateStrategy: 'xpath'
    },
    addContactButton: {
      selector: `//div[@class='contacts__header__actions']//span[.='Add Contact']`,
      locateStrategy: 'xpath'
    },
    addContactButtonDropdown: {
      selector: `//div[@class='contacts__header__actions']/div/div/div/div[2]/button`,
      locateStrategy: 'xpath'
    },
    submitNewContactButton: {
      selector: `//div[@class='cover__footer__container']//button[.='Add Contact']`,
      locateStrategy: 'xpath'
    }
  }
};
