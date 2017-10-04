
const contactsCommands = {

  clickAddNewContact: function() {
    return this.waitForElementVisible('@addContactButton', 1500, 'Add contact button is visible')
      .click('@addContactButton')
      .waitForElementVisible('@addContactButtonDropdown', 1500, 'Add new contact button is visible')
      .click('@addNewContactButton')
  },
}

module.exports = {
  commands: [contactsCommands],
  url: function() {
    return this.api.launch_url + '/contacts'
  },
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
      selector: `//*[@id="app"]/div/div[2]/div/div[1]/div[1]/div[3]/div/button`,
      locateStrategy: 'xpath'
    },
    addContactButtonDropdown: {
      selector: `//div[@class='contacts__header__actions']/div/div/div/div[2]/button`,
      locateStrategy: 'xpath'
    },
    addNewContactButton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[8]`,
      locateStrategy: 'xpath'
    }
  }
};
