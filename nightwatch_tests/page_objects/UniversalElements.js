const universalElementsCommands = {

  validateUniversalElements: function() {
    return this.waitForElementVisible('body', 1000)
      .verify.visible('@myProfileButton', 'Top left profile button is visible')
      .verify.visible('@inboxTab', 'Inbox tab is visible')
      .verify.visible('@chatTab', 'Chat tab is visible')
      .verify.visible('@contactsTab', 'Contacts tab is visible')
      .verify.visible('@rhinogramLogo', 'Rhinogram logo is visible')
      .verify.visible('@appHeaderTitle', 'Page title is visible')
      .verify.containsText('@appHeaderTitle', 'Inbox', 'Title is properly on Inbox')
      .verify.visible('@searchButton', 'Search button is visible')
      .verify.visible('@settingsButton', 'Settings button is visible')
  },

  validateSearchDropdown: function(patientName) {
    return this.waitForElementVisible('body', 1000)
      .click('@searchButton')
      .verify.visible('@searchDropdownInput', 'Search input is visible on click')
      .setValue('@searchDropdownInput', patientName)
      .waitForElementVisible('@searchDropdownFirstResult', 1000)
      .verify.visible('@searchDropdownFirstResult', 'First result is visible')
      .verify.visible('@addNewContactButton', 'Add new contact button is visible')
  },

  validateSettingsDropdown: function() {
    return this.waitForElementVisible('body', 1000)
      .click('@settingsButton')
      .verify.visible('@settingsDropdown', 'Settings dropdown is visible')
      .verify.visible('@myProfileInSettingsDropdown', 'Profile in settings is visible')
      .verify.visible('@myPreferencesInSettingsDropdown', 'Preferences in settings is visible')
      .verify.visible('@autoResponseInSettingsDropdown', 'Otto response is visible!')
      .verify.visible('@channelsInSettingsDropdown', 'Channels is visible')
      .verify.visible('@membersInSettingsDropdown', 'Members is visible')
      .verify.visible('@orgPreferencesInSettingsDropdown', 'Org Preferences is visible')
      .verify.visible('@orgProfileInSettingsDropdown', 'Org profile is visible ')
      .verify.visible('@templatesInSettingsDropdown', 'templates is visible')
      .verify.visible('@logoutButton', 'logout button is visible')

  },

  clickAppNavButtons: function() {
    return this.waitForElementVisible('body',1000)
      .click('@myProfileButton')
      .verify.containsText('@appHeaderTitle', 'My Profile', 'My Profile title present')
      .click('@inboxTab')
      .verify.containsText('@appHeaderTitle', 'Inbox', 'Inbox title present')
      .click('@chatTab')
      .verify.containsText('@appHeaderTitle', 'Chat', 'Chat title present')
      .click('@contactsTab')
      .verify.containsText('@appHeaderTitle', 'Contacts', 'Contacts title present')
  },

  clickSearchDropdownButtons: function(patientName) {
    return this.click('@searchButton')
      .setValue('@searchDropdownInput', patientName)
      .waitForElementVisible('@searchDropdownFirstResult', 1000, 'First result is present')
      .click('@searchDropdownFirstResult')
      .verify.urlContains('userId', 'Taken to profile summary view')
      .click('@searchButton')
      .setValue('@searchDropdownInput', patientName)
      .waitForElementVisible('@addNewContactButton', 1000, 'Add contact button is present')
      .click('@addNewContactButton')
  },
}

module.exports = {
  commands: [universalElementsCommands],
  url: function() {
    return this.api.launch_url + '/inbox'
  },

  elements: {

    appHeaderTitle: {
      selector: `//*[@id="app"]/div/div[2]/header/div[2]`,
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------*/
    // app-navigation buttons. Top to bottom
    /*----------------------------------------------*/

    myProfileButton: {
      selector: `//*[@id="app-navigation"]/div/a`,
      locateStrategy: 'xpath',
    },

    inboxTab: {
      selector: `//*[@id="nav-office-inbox"]`,
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
    },

    addNewContactButton: {
      selector: `//*[@id="app"]/div/div[2]/header/div[3]/div[1]/div/div/div/div[3]/button`,
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------*/
    // Settings dropdown elements
    /*----------------------------------------------*/

    settingsButton: {
      selector: `//*[@id="cuke-main-settings"]/div/button`,
      locateStrategy: 'xpath',
    },

    settingsDropdown: {
      selector: `//div[@id='cuke-main-settings']//span[.='Settings']`,
      locateStrategy: 'xpath',
    },

    myProfileInSettingsDropdown: {
      selector: `//*[@id="cuke-main-settings"]/div/div/div[2]/a/div`,
      locateStrategy: 'xpath',
    },

    myPreferencesInSettingsDropdown: {
      selector: `//*[@id="cuke-main-settings"]/div/div/div[3]/a`,
      locateStrategy: 'xpath',
    },

    autoResponseInSettingsDropdown: {
      selector: `//div[@id='cuke-main-settings']//span[.='Auto-Response']`,
      locateStrategy: 'xpath',
    },

    channelsInSettingsDropdown: {
      selector: `//*[@id="cuke-main-settings"]/div/div/div[7]/a/div`,
      locateStrategy: 'xpath',
    },

    membersInSettingsDropdown: {
      selector: `//*[@id="cuke-main-settings"]/div/div/div[9]/a/div`,
      locateStrategy: 'xpath',
    },

    orgPreferencesInSettingsDropdown: {
      selector: `//*[@id="cuke-main-settings"]/div/div/div[10]/a/div`,
      locateStrategy: 'xpath',
    },

    orgProfileInSettingsDropdown: {
        selector: `//*[@id="cuke-main-settings"]/div/div/div[11]/a`,
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
