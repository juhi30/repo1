const firstThread = {
  xpath: '//div[1]/div/div[2]/div/div[1]/div/div[2]/div[1]/div[1]/div[2]/div[1]',
  find: (driver, by) => {
    return driver.findElement(by.xpath(firstThread.xpath));
  },
};

const newMessageButton = {
  xpath: `//div[@class='inbox__header']//button[.='New Message']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(newMessageButton.xpath));
  },
};

const newMessageSearchInput = {
  xpath: `//div[@class='inbox__header']/div/div/div/div/div[1]/div/input`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(newMessageSearchInput.xpath));
  },
};

const firstResultNewMessageSearch = {
  xpath: `//div[@class='dropdown__menu__item__content__desc']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(firstResultNewMessageSearch.xpath));
  },
};

const newContactButtonWithinNewMessage = {
  xpath: `//div[@class='inbox__header']/div/div/div/div/div[2]/button`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(newContactButtonWithinNewMessage.xpath));
  },
};

module.exports = {
  firstThread,
  newMessageButton,
  newMessageSearchInput,
  firstResultNewMessageSearch,
  newContactButtonWithinNewMessage,
};
