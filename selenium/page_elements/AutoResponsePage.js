const eventNameInput = {
  xpath: `//input[@id='title']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(eventNameInput.xpath));
  },
};

const allDayCheckbox = {
  xpath: `//label[@for='allDayOOO']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(allDayCheckbox.xpath));
  },
};

const channelsDropdown = {
  xpath: `//div[@class='form']/div[5]/span[2]/div/input`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(channelsDropdown.xpath));
  },
};

const firstChannelInDropdown = {
  xpath: `//div[@class='form']/div[5]/span[2]/div/div/div/div[1]/a/div`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(firstChannelInDropdown.xpath));
  },
};

const deleteButton = {
  xpath: `//div[@class='app-page__container']//button[.='Delete']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(deleteButton.xpath));
  },
};

const deleteButtonFinal = {
  xpath: `//div[@class='modal__footer']//button[.='Delete']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(deleteButtonFinal.xpath));
  },
};

const scheduleEventButton = {
  xpath: `//div[@class='app-page__lead__button-group']//button[.='Schedule Event']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(scheduleEventButton.xpath));
  },
};

const submitEventButton = {
  xpath: `//div[@class='modal__footer']//button[.='Schedule Event']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(submitEventButton.xpath));
  },
};

const cancelButtonInNewOOOForm = {
  xpath: `//div[@class='modal__footer']//button[.='Cancel']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(cancelButtonInNewOOOForm.xpath));
  },
};

module.exports = {
  eventNameInput,
  allDayCheckbox,
  channelsDropdown,
  firstChannelInDropdown,
  deleteButton,
  deleteButtonFinal,
  scheduleEventButton,
  submitEventButton,
  cancelButtonInNewOOOForm,
};