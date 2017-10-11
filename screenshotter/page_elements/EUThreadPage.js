const messageInput = {
  xpath: `//div[@class='convo__message__compose']/div/textarea`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(messageInput.xpath));
  },
};
const sendButton = {
  xpath: `//div[@class='convo__message__send']//button[.='Send']`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(sendButton.xpath));
  },
};
const logoutButton = {
  xpath: `//div[@class='secure-app__header__branding__logout']//button[.='Logout']`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(logoutButton.xpath));
  },
};

const attachmentButton = {
  xpath: `//*[@id="app"]/div/div[2]/div/div/div[1]/div/div[2]/div[1]/div[1]/div/button`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(attachmentButton.xpath));
  },
};

const addFileButton = {
  xpath: `//*[@id="app"]/div/div[2]/div/div/div[1]/div/div[2]/div[1]/div[1]/div/div/div/div/a/div/div/div[1]`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(addFileButton.xpath));
  },
};

const firstOrgInPanel = {
  xpath: `//*[@id="nav-org-1"]`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(firstOrgInPanel.xpath));
  },
};

const settingsDropdown = {
  xpath: `//*[@id="cuke-main-settings"]/div/button/span/span`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(settingsDropdown.xpath));
  },
};

const profileLinkInSettingsDropdown = {
  xpath: `//*[@id="cuke-main-settings"]/div/div/div/div[2]/a/div/div/div/span`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(profileLinkInSettingsDropdown.xpath));
  },
};

module.exports = {
  messageInput,
  sendButton,
  logoutButton,
  attachmentButton,
  addFileButton,
  firstOrgInPanel,
  settingsDropdown,
  profileLinkInSettingsDropdown,
};
