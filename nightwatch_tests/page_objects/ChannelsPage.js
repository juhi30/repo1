const bizHoursOnSelector = {
  xpath: `//div[5]/div/div/div/div[2]/div[2]/div/div/div[1]/div/label`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(bizHoursOnSelector.xpath));
  },
};

const bizHoursOffSelector = {
  xpath: `//div[5]/div/div/div/div[2]/div[2]/div/div/div[2]/div/input`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(bizHoursOffSelector.xpath));
  },
};

const editChannel = {
  xpath: `//div[@class='app-page__container']//button[.='Edit']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(editChannel.xpath));
  },
};

const saveChannelButton = {
  xpath: `//div[@class='modal__footer']//button[.='Save Channel']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(saveChannelButton.xpath));
  },
};

const closeEditChannelFormButton = {
  xpath: `//div[1]/div/div/div/div/div[1]/button`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(closeEditChannelFormButton.xpath));
  },
};

module.exports = {
  bizHoursOnSelector,
  bizHoursOffSelector,
  editChannel,
  saveChannelButton,
  closeEditChannelFormButton,
};
