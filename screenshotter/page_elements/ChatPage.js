const newChatButton = {
  xpath: `//div[@class='inbox__header']//button[.='New Chat']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(newChatButton.xpath));
  },
};

const newChatSearchInput = {
  xpath: `//div[@class='inbox__header']/div/div/div/div/div/div/input`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(newChatSearchInput.xpath));
  },
};

const newChatSearchResult = {
  xpath: `//div[@class='dropdown__menu__item__content__desc']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(newChatSearchResult.xpath));
  },
};

const chatMessageInput = {
  xpath: `//div[@class='convo__message__compose']/div/textarea`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(chatMessageInput.xpath));
  },
};

const firstChatThread = {
  xpath: `//div[1]/div/div[2]/div/div[1]/div/div[2]/div[1]/div[1]/div[1]`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(firstChatThread.xpath));
  },
};

const sendMessageButton = {
  xpath: `//div[@class='convo__message__send']//button[.='Send']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(sendMessageButton.xpath));
  },
};

module.exports = {
  newChatButton,
  newChatSearchInput,
  newChatSearchResult,
  chatMessageInput,
  firstChatThread,
  sendMessageButton,
};
