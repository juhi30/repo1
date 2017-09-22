module.exports = {
  // commands: [autoResponseCommands],
  elements: {
    eventNameInput: {
      selector: `//input[@id='title']`,
      locateStrategy: 'xpath',
    },
    allDayCheckbox: {
      selector: `//label[@for='allDayOOO']`,
      locateStrategy: 'xpath'
    },
    channelsDropdown: {
      selector: `//div[@class='form']/div[5]/span[2]/div/input`,
      locateStrategy: 'xpath'
    },
    firstChannelInDropdown: {
      selector: `//div[@class='form']/div[5]/span[2]/div/div/div/div[1]/a/div`,
      locateStrategy: 'xpath'
    },
    deleteButton: {
      selector: `//div[@class='app-page__container']//button[.='Delete']`,
      locateStrategy: 'xpath'
    },
    deleteButtonFinal: {
      selector: `//div[@class='modal__footer']//button[.='Delete']`,
      locateStrategy: 'xpath'
    },
    scheduleEventButton: {
      selector: `//div[@class='app-page__lead__button-group']//button[.='Schedule Event']`,
      locateStrategy: 'xpath'
    },
    submitEventButton: {
      selector: `//div[@class='modal__footer']//button[.='Schedule Event']`,
      locateStrategy: 'xpath'
    },
    cancelButtonInNewOOOForm: {
      selector: `//div[@class='modal__footer']//button[.='Cancel']`,
      locateStrategy: 'xpath'
    }
  }
};
