module.exports = {
  // commands: [pageCommands],
  elements: {
    eventNameInput: `//input[@id='title']`,
    allDayCheckbox: `//label[@for='allDayOOO']`,
    channelsDropdown: `//div[@class='form']/div[5]/span[2]/div/input`,
    firstChannelInDropdown: `//div[@class='form']/div[5]/span[2]/div/div/div/div[1]/a/div`,
    deleteButton: `//div[@class='app-page__container']//button[.='Delete']`,
    deleteButtonFinal: `//div[@class='modal__footer']//button[.='Delete']`,
    scheduleEventButton: `//div[@class='app-page__lead__button-group']//button[.='Schedule Event']`,
    submitEventButton: `//div[@class='modal__footer']//button[.='Schedule Event']`,
    cancelButtonInNewOOOForm: `//div[@class='modal__footer']//button[.='Cancel']`
  }
};
