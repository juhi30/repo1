const universalElementsCommands = {

  validateUniversalElements: function() {
    return this.waitForElementVisible('body', 1000)
      .verify.visible('@myProfileButton', 'Top left profile button is visible')
      .verify.visible('@chatInboxTab', '')
  },

}

module.exports = {
  // commands: [universalElementsCommands],
  url: function() {
    return this.api.launch_url + '/inbox'
  },

  elements: {

    /*----------------------------------------------*/
    // app-navigation buttons. Top to bottom
    /*----------------------------------------------*/

    myProfileButton: {
      selector: `//*[@id="app-navigation"]/div/a`,
      locateStrategy: 'xpath',
    },

    inboxTab: {
      selector:  `//*[@id="nav-office-inbox"]`,
      locateStrategy: 'xpath',
    },

    chatTab: {
      selector: `//*[@id="nav-chat-inbox"]`,
      locateStrategy: 'xpath',
    },

    contactsTab: {
      selector: `//a[@id='nav-contacts']`,
      locateStrategy: 'xpath',
    },

    rhinogramLogo: {
      selector: `//*[@id="app-navigation"]/div/div/div/a`,
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------*/
    // search bar elements
    /*----------------------------------------------*/

    searchButton: {
      selector: `//div[@class='app-header__button-group']//button[.='Search']`,
      locateStrategy: 'xpath',
    },

    searchDropdownInput: {
      selector: `//div[@class='app-header__button-group']/div[1]/div/div/div/div[1]/div/input`,
      locateStrategy: 'xpath',
    },

    searchDropdownFirstResult: {
      selector: `//*[@id="app"]/div/div[2]/header/div[3]/div[1]/div/div/div/div[2]/a`,
      locateStrategy: 'xpath',
    }

    addNewContactButton: {
      selector: `//*[@id="app"]/div/div[2]/header/div[3]/div[1]/div/div/div/div[3]/button`,
      locateStrategy: 'xpath',
    }

    /*----------------------------------------------*/
    // Below are all elements in the settings dropdown
    /*----------------------------------------------*/

    settingsDropdown: {
      selector: `//div[@id='cuke-main-settings']//span[.='Settings']`,
      locateStrategy: 'xpath',
    },

    myProfileInSettingsDropdown: {
      selector: `//*[@id="cuke-main-settings"]/div/div/div[2]/a/div`,
      locateStrategy: 'xpath',
    },

    orgPreferencesInSettingsDropdown: {
      selector: `//*[@id="cuke-main-settings"]/div/div/div[10]/a/div`,
      locateStrategy: 'xpath',
    },

    locationsInSettingsDropdown: {
      selector: `//*[@id="cuke-main-settings"]/div/div/div[8]/a/div`,
      locateStrategy: 'xpath',
    },

    channelsInSettingsDropdown: {
      selector: `//*[@id="cuke-main-settings"]/div/div/div[7]/a/div`,
      locateStrategy: 'xpath',
    },

    autoResponseInSettingsDropdown: {
      selector: `//div[@id='cuke-main-settings']//span[.='Auto-Response']`,
      locateStrategy: 'xpath',
    },

    membersInSettingsDropdown: {
      selector: `//*[@id="cuke-main-settings"]/div/div/div[9]/a/div`,
      locateStrategy: 'xpath',
    },

    templatesInSettingsDropdown: {
      selector: `//*[@id="cuke-main-settings"]/div/div/div[12]/a/div`,
      locateStrategy: 'xpath',
    },

    logoutButton: {
      selector: `//div[@id='cuke-main-settings']/div/div/button`,
      locateStrategy: 'xpath',
    },

  }
};

// const settingsDropdown = {
//   xpath: `//div[@id='cuke-main-settings']//span[.='Settings']`,
//   find: (driver, by) => {
//     return driver.findElement(by.xpath(settingsDropdown.xpath));
//   },
// };
//
// const myProfileInSettingsDropdown = {
//   xpath: `//*[@id="cuke-main-settings"]/div/div/div[2]/a/div`,
//   find: (driver, by) => {
//     return driver.findElement(by.xpath(myProfileInSettingsDropdown.xpath));
//   },
// };
//
// const orgProfileInSettingsDropdown = {
//   xpath: `//*[@id="cuke-main-settings"]/div/div/div[11]/a/div`,
//   find: (driver, by) => {
//     return driver.findElement(by.xpath(orgProfileInSettingsDropdown.xpath));
//   },
// };
//
// const orgPreferencesInSettingsDropdown = {
//   xpath: `//*[@id="cuke-main-settings"]/div/div/div[10]/a/div`,
//   find: (driver, by) => {
//     return driver.findElement(by.xpath(orgPreferencesInSettingsDropdown.xpath));
//   },
// };
//
// const locationsInSettingsDropdown = {
//   xpath: `//*[@id="cuke-main-settings"]/div/div/div[8]/a/div`,
//   find: (driver, by) => {
//     return driver.findElement(by.xpath(locationsInSettingsDropdown.xpath));
//   },
// };
//
// const channelsInSettingsDropdown = {
//   xpath: `//*[@id="cuke-main-settings"]/div/div/div[7]/a/div`,
//   find: (driver, by) => {
//     return driver.findElement(by.xpath(channelsInSettingsDropdown.xpath));
//   },
// };
//
// const autoResponseInSettingsDropdown = {
//   xpath: `//div[@id='cuke-main-settings']//span[.='Auto-Response']`,
//   find: (driver, by) => {
//     return driver.findElement(by.xpath(autoResponseInSettingsDropdown.xpath));
//   },
// };
//
// const membersInSettingsDropdown = {
//   xpath: `//*[@id="cuke-main-settings"]/div/div/div[9]/a/div`,
//   find: (driver, by) => {
//     return driver.findElement(by.xpath(membersInSettingsDropdown.xpath));
//   },
// };
//
// const templatesInSettingsDropdown = {
//   xpath: `//*[@id="cuke-main-settings"]/div/div/div[12]/a/div`,
//   find: (driver, by) => {
//     return driver.findElement(by.xpath(templatesInSettingsDropdown.xpath));
//   },
// };
//
// const logoutButton = {
//   xpath: `//div[@id='cuke-main-settings']/div/div/button`,
//   find: (driver, by) => {
//     return driver.findElement(by.xpath(logoutButton.xpath));
//   },
// };
//
// const contactsTab = {
//   xpath: `//a[@id='nav-contacts']`,
//   find: (driver, by) => {
//     return driver.findElement(by.xpath(contactsTab.xpath));
//   },
// };
//
// const chatInboxTab = {
//   xpath: `//a[@id='nav-chat-inbox']`,
//   find: (driver, by) => {
//     return driver.findElement(by.xpath(chatInboxTab.xpath));
//   },
// };
//
// const searchButton = {
//   xpath: `//div[@class='app-header__button-group']//button[.='Search']`,
//   find: (driver, by) => {
//     return driver.findElement(by.xpath(searchButton.xpath));
//   },
// };
//
// const searchDropdownInput = {
//   xpath: `//div[@class='app-header__button-group']/div[1]/div/div/div/div[1]/div/input`,
//   find: (driver, by) => {
//     return driver.findElement(by.xpath(searchDropdownInput.xpath));
//   },
// };
