const universalElementsCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  searchForContactAndClick: function(contactName) {
    return this.waitForElementVisible('@searchButton', 5000, 'Search button is visible')
      .click('@searchButton')
      .waitForElementVisible('@searchModalInput', 5000, 'Search dropdoown input is visible')
      .setValue('@searchModalInput', contactName)
      .waitForElementVisible('@searchModalFirstResult', 5000, 'First result is visible')
      .click('@searchModalFirstResult');
  },

  validateUniversalElements: function() {
    return this.waitForElementVisible('@myProfileButton', 3000, 'My Profile button is visible')
      .verify.visible('@myProfileButton', 'Profile button is visible')
      .verify.visible('@inboxDirectButton', 'Inbox direct is visible')
      .verify.visible('@chatDirectButton', 'Chat direct is visible')
      .verify.visible('@contactsButton', 'Contacts button is visible')
      .verify.visible('@searchButton', 'Search button is visible')
      // .verify.visible('@notificationAlertButton', 'Notification button is visible') //been removed as of 2/20/18
      .verify.visible('@settingsButton', 'Settings button is visible')
  },

  validateSearchModal: function(patientName) {
    return this.waitForElementVisible('@searchButton', 5000, 'Search button is visible')
      .click('@searchButton')
      .waitForElementVisible('@searchModalInput', 'Search input is visible on click')
      .setValue('@searchModalInput', patientName)
      .waitForElementVisible('@searchModalFirstResult', 5000, 'First result on search dropdown is visible')
      .verify.visible('@addNewContactButton', 'Add new contact button is visible')
      .click('@searchModalFirstResult')
      .waitForElementNotPresent('@searchModalFirstResult', 'First result is hidden')
  },

  clickAddNewContact: function() {
    return this.click('@searchButton')
      .waitForElementVisible('@addNewContactButton', 1500, 'Add new contact button is visible')
  },

  validateSettingsDropdown: function() {
    return this.waitForElementVisible('@settingsButton', 3000, 'Settings button is visible')
      .pause(1000)
      .click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Profile in settings is visible')
      .waitForElementVisible('@myPreferencesInSettingsDropdown', 'Preferences in settings is visible')
      .waitForElementVisible('@oooInSettingsDropdown', 'Out of Office is visible!')
      // .waitForElementVisible('@billingInSettingsDropdown', 'Billing in settings is visible')//activate when billing is included
      .waitForElementVisible('@channelsInSettingsDropdown', 'Channels is visible')
      .waitForElementVisible('@groupsInSettingsDropdown', 'Groups is visible')
      .waitForElementVisible('@membersInSettingsDropdown', 'Members is visible')
      .waitForElementVisible('@orgPreferencesInSettingsDropdown', 'Org Preferences is visible')
      .waitForElementVisible('@orgProfileInSettingsDropdown', 'Org profile is visible ')
      .waitForElementVisible('@tagsInSettingsDropdown', 'Tags is visible')
      .waitForElementVisible('@templatesInSettingsDropdown', 'templates is visible')
      .waitForElementVisible('@systemDetailsInSettingsDropdown', 'System Details option is visible')
      .waitForElementVisible('@emailSupportInSettingsDropdown', 'Email support is visible')
      .waitForElementVisible('@logoutButton', 'logout button is visible')

  },
// needs to be refactored
  // clickAppNavButtons: function() {
  //   return this.waitForElementVisible('@myProfileButton', 3000, 'My Profile button is present')
  //     .click('@myProfileButton')
  //     .verify.containsText('@appHeaderTitle', 'My Profile', 'My Profile title present')
  //     .click('@inboxTab')
  //     .verify.containsText('@appHeaderTitle', 'Inbox', 'Inbox title present')
  //     .click('@chatTab')
  //     .verify.containsText('@appHeaderTitle', 'Chat', 'Chat title present')
  //     .click('@contactsTab')
  //     .verify.containsText('@appHeaderTitle', 'Contacts', 'Contacts title present')
  // },

  clicksearchModalButtons: function(patientName) {
    return this.click('@searchButton')
      .setValue('@searchModalInput', patientName)
      .waitForElementVisible('@searchModalFirstResult', 1500, 'First result is present')
      .click('@searchModalFirstResult')
      .verify.urlContains('50069', 'Taken to profile summary view')// no long 'userID' string but actual ID number
      .click('@searchButton')
      .setValue('@searchModalInput', patientName)
      .waitForElementVisible('@addNewContactButton', 1500, 'Add contact button is present')
      .click('@addNewContactButton')
  },

  clickAddNewContact: function() {
    return this.click('@searchButton')
      .waitForElementVisible('@searchModalInput', 2000, 'Search input is present')
      .click('@addNewContactButton')
  },

  clickMyProfile: function() {
    return this.click('@settingsButton')
      .click('@myProfileInSettingsDropdown')
      .pause(500)
      .verify.urlContains('/profile', 'My profile page is visible')
  },

  clickMyPreferences: function() {
    return this.click('@settingsButton')
      .click('@myPreferencesInSettingsDropdown')
      .pause(1000)
      .verify.urlContains('/preferences', 'My Preferences page is visible')
  },

  clickChannels: function() {
    return this.click('@settingsButton')
      .click('@channelsInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/channels', 'Channels page is visible')
  },

  clickGroups: function() {
    return this.click('@settingsButton')
      .click('@groupsInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/groups', 'Groups page is visible')
  },

  clickMembers: function() {
    return this.click('@settingsButton')
      .click('@membersInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/members', 'Members page is visible')
  },

  clickOOO: function() {
    return this.click('@settingsButton')
      .click('@oooInSettingsDropdown')
      .pause(500)
      .verify.urlContains('/organization/out-of-office', 'Out of Office page is visible')
  },

  clickBilling: function() {
    return this.click('@settingsButton')
      .click('@billingInSettingsDropdown')
      .pause(500)
      .verify.urlContains('/organization/billing', 'Billing page is visible')
  },

  clickOrgPreferences: function() {
    return this.click('@settingsButton')
      .click('@orgPreferencesInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/preferences', 'Organization Preferences page is visible')
  },

  clickOrgProfile: function() {
    return this.click('@settingsButton')
      .click('@orgProfileInSettingsDropdown')
      .pause(500)
      // .waitForElementNotVisible('@orgProfileInSettingsDropdown', 5000, 'Org Profile is hidden')
      .verify.urlContains('organization/profile', 'Organization Profile page is visible')
  },

  clickTags: function() {
    return this.click('@settingsButton')
      .click('@tagsInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/tags', 'Tags page is visible')
  },

  clickTemplates: function() {
    return this.click('@settingsButton')
      .click('@templatesInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/templates', 'Templates page is visible')
  },

  clickSystemDetails: function() {
    return this.click('@settingsButton')
      .click('@systemDetailsInSettingsDropdown')
      .pause(500)
      .verify.urlContains('diagnostics', 'System Detail page is visible')
  },

  clickLogout: function() {
    return this.waitForElementVisible('@settingsButton', 5000, 'Settings button is visible')
      .click('@settingsButton')
      .waitForElementVisible('@logoutButton', 5000, 'Logout button is visible')
      .pause(500)
      .click('@logoutButton')
      .waitForElementNotVisible('@logoutButton', 1500, 'Logout button no longer present')
      .verify.urlContains('/login', 'Successfully logged out')
  }
}

module.exports = {
  commands: [universalElementsCommands],
  url: function() {
    return this.api.launch_url + '/inbox'
  },

  elements: {

    // appHeaderTitle: {
    //   selector: `//*[@id="app"]/div/div[2]/header/div[2]`,
    //   locateStrategy: 'xpath',
    // },
    // could be removed

    /*-------------------------------------------------------------------------*/
    //Left hand column navigation buttons. Top to bottom.
    /*-------------------------------------------------------------------------*/

    assignedToMeButton: {
      selector: `//SPAN[@class='app-navigation__nav__button__text'][text()='Assigned To Me']`,
      locateStrategy: 'xpath',
    },

    followingButton: {
      selector: `//SPAN[@class='app-navigation__nav__button__text'][text()='Following']`,
      locateStrategy: 'xpath',
    },

    inboxDirectButton: {
      selector: `(//SPAN[@class='app-navigation__nav__button__text'][text()='Direct'][text()='Direct'])[1]`,
      locateStrategy: 'xpath',
    },

    chatDirectButton: {
      selector: `(//SPAN[@class='app-navigation__nav__button__text'][text()='Direct'][text()='Direct'])[2]`,
      locateStrategy: 'xpath',
    },

    contactsButton: {
        selector: `//SPAN[@class='app-navigation__nav__button__text'][text()='Contacts']`,
        locateStrategy: 'xpath'
    },

    orgTitle: {
      selector: `//DIV[@class='app-navigation__org']`,
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------*/
    // search bar elements
    /*----------------------------------------------*/

    searchButton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[1]`, // look for better way to grab xpath
      locateStrategy: 'xpath',
    },

    searchModalInput: {
      selector: `//INPUT[starts-with(@id, global)]`,
      locateStrategy: 'xpath',
    },

    searchModalFirstResult: {
      selector: `//DIV[@role='button']`,
      locateStrategy: 'xpath',
    },

    addNewContactButton: {
      selector: `/html/body/div[3]/div/div/div[2]/div[1]/button/span`, //refactor xpath
      locateStrategy: 'xpath',
    },

    closeSearchModal: {
      selector: `/html/body/div[3]/div/div/div[1]/button/span`,
    },

    /*----------------------------------------------*/
    // Profile Button and former Notification xpaths
    /*----------------------------------------------*/

    myProfileButton: { //profile now moved to circular button by settings
      selector: `//A[@title='My Profile']`,
      locateStrategy: 'xpath',
    },

    // notificationAlertButton: {
    //   selector: `(//SPAN[@class='button__text-wrapper'])[3]`,
    //   locateStrategy: 'xpath'
    // },
    //
    // notificationDropdown: {
    //   selector:`//DIV[@class='dropdown__menu__container'][text()='Notifications here!']`, // test to see what happens when notifications are in
    //   locateStrategy: 'xpath',
    // },

    /*----------------------------------------------*/
    // Settings dropdown elements
    /*----------------------------------------------*/

    settingsButton: {
      selector: `//*[@id="cuke-main-settings"]/div/button`, //svg icons are trouble for xpaths
      locateStrategy: 'xpath',
    },

    myProfileInSettingsDropdown: {
      selector: `(//SPAN[@class='u-text-overflow'][text()='Profile'][text()='Profile'])[1]`,
      locateStrategy: 'xpath',
    },

    myPreferencesInSettingsDropdown: {
      selector: `(//SPAN[@class='u-text-overflow'][text()='Preferences'][text()='Preferences'])[1]`,
      locateStrategy: 'xpath',
    },

    oooInSettingsDropdown: {
      selector: `//SPAN[@class='u-text-overflow'][text()='Out of Office']`,
      locateStrategy: 'xpath',
    },

    // billingInSettingsDropdown: {
    //   selector: `//SPAN[@class='u-text-overflow'][text()='Billing']`, // not built into RG3 yet
    //   locateStrategy: 'xpath',
    // },

    channelsInSettingsDropdown: {
      selector: `//SPAN[@class='u-text-overflow'][text()='Channels']`,
      locateStrategy: 'xpath',
    },

    groupsInSettingsDropdown: {
      selector: `//SPAN[@class='u-text-overflow'][text()='Groups']`,
      locateStrategy: 'xpath',
    },

    membersInSettingsDropdown: {
      selector: `//SPAN[@class='u-text-overflow'][text()='Members']`,
      locateStrategy: 'xpath',
    },

    orgPreferencesInSettingsDropdown: {
      selector: `(//SPAN[@class='u-text-overflow'][text()='Preferences'][text()='Preferences'])[2]`,
      locateStrategy: 'xpath',
    },

    orgProfileInSettingsDropdown: {
      selector: `(//SPAN[@class='u-text-overflow'][text()='Profile'][text()='Profile'])[2]`,
      locateStrategy: 'xpath',
    },

    tagsInSettingsDropdown: {
      selector: `//SPAN[@class='u-text-overflow'][text()='Tags']`,
      locateStrategy: 'xpath',
    },

    templatesInSettingsDropdown: {
      selector: `//SPAN[@class='u-text-overflow'][text()='Templates']`,
      locateStrategy: 'xpath',
    },

    systemDetailsInSettingsDropdown: {
      selector: `//SPAN[@class='u-text-overflow'][text()='System Details']`,
      locateStrategy: 'xpath',
    },

    emailSupportInSettingsDropdown: {
      selector: `//SPAN[@class='u-text-overflow'][text()='Email Support']`,
      locateStrategy: 'xpath',
    },

    logoutButton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[3]`,
      locateStrategy: 'xpath',
    },
  }
};
