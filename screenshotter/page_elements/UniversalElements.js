const settingsDropdown = {
  xpath: `//div[@id='cuke-main-settings']//span[.='Settings']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(settingsDropdown.xpath));
  },
};

const myProfileInSettingsDropdown = {
  xpath: `//*[@id="cuke-main-settings"]/div/div/div[2]/a/div`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(myProfileInSettingsDropdown.xpath));
  },
};

const orgProfileInSettingsDropdown = {
  xpath: `//*[@id="cuke-main-settings"]/div/div/div[11]/a/div`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(orgProfileInSettingsDropdown.xpath));
  },
};

const orgPreferencesInSettingsDropdown = {
  xpath: `//*[@id="cuke-main-settings"]/div/div/div[10]/a/div`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(orgPreferencesInSettingsDropdown.xpath));
  },
};

const locationsInSettingsDropdown = {
  xpath: `//*[@id="cuke-main-settings"]/div/div/div[8]/a/div`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(locationsInSettingsDropdown.xpath));
  },
};

const channelsInSettingsDropdown = {
  xpath: `//*[@id="cuke-main-settings"]/div/div/div[7]/a/div`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(channelsInSettingsDropdown.xpath));
  },
};

const autoResponseInSettingsDropdown = {
  xpath: `//div[@id='cuke-main-settings']//span[.='Auto-Response']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(autoResponseInSettingsDropdown.xpath));
  },
};

const membersInSettingsDropdown = {
  xpath: `//*[@id="cuke-main-settings"]/div/div/div[9]/a/div`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(membersInSettingsDropdown.xpath));
  },
};

const templatesInSettingsDropdown = {
  xpath: `//*[@id="cuke-main-settings"]/div/div/div[12]/a/div`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(templatesInSettingsDropdown.xpath));
  },
};

const logoutButton = {
  xpath: `//div[@id='cuke-main-settings']/div/div/button`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(logoutButton.xpath));
  },
};

const contactsTab = {
  xpath: `//a[@id='nav-contacts']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(contactsTab.xpath));
  },
};

const chatInboxTab = {
  xpath: `//a[@id='nav-chat-inbox']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(chatInboxTab.xpath));
  },
};

const searchButton = {
  xpath: `//div[@class='app-header__button-group']//button[.='Search']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(searchButton.xpath));
  },
};

const searchDropdownInput = {
  xpath: `//div[@class='app-header__button-group']/div[1]/div/div/div/div[1]/div/input`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(searchDropdownInput.xpath));
  },
};

module.exports = {
  settingsDropdown,
  myProfileInSettingsDropdown,
  orgProfileInSettingsDropdown,
  orgPreferencesInSettingsDropdown,
  locationsInSettingsDropdown,
  channelsInSettingsDropdown,
  autoResponseInSettingsDropdown,
  membersInSettingsDropdown,
  logoutButton,
  contactsTab,
  chatInboxTab,
  templatesInSettingsDropdown,
  searchButton,
  searchDropdownInput
};
