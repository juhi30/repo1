const universalElementsCommands = {

  validateUniversalElements: function() {
    return this.waitForElementVisible('body', 1000)
      // .verify.visible('@appNavigation', 'App navigation is visible')
      .verify.visible('@myProfileButton', 'Top left profile button is visible')
      .verify.visible('@inboxTab', 'Inbox tab is visible')
      .verify.visible('@chatTab', 'Chat tab is visible')
      .verify.visible('@contactsTab', 'Contacts tab is visible')
      .verify.visible('@rhinogramLogo', 'Rhinogram logo is visible')
  },

}

module.exports = {
  commands: [universalElementsCommands],
  url: function() {
    return this.api.launch_url + '/inbox'
  },

  sections: {

    /*----------------------------------------------*/
    // app-navigation buttons. Top to bottom
    /*----------------------------------------------*/

    appNavigation: {
      selector: `//*[@id="app-navigation"]`,
      locateStrategy: 'xpath',
      elements: {

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
      }
    },

    /*----------------------------------------------*/
    // appHeader section
    /*----------------------------------------------*/

    appHeader: {
      selector: `//*[@id="app"]/div/div[2]/header`,
      locateStrategy: 'xpath',
      elements: {

        appHeaderTitle: {
          selector: `//*[@id="app"]/div/div[2]/header/div[2]`,
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
    }
  }
};
