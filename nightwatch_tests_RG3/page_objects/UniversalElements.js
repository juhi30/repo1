const universalElementsCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  searchForContactAndClick: function(contactName) {
    return this.waitForElementVisible('@searchButton', 5000, 'Search button is visible')
      .click('@searchButton')
      .waitForElementVisible('@searchDropdownInput', 5000, 'Search dropdoown input is visible')
      .setValue('@searchDropdownInput', contactName)
      .waitForElementVisible('@searchDropdownFirstResult', 5000, 'First result is visible')
      .click('@searchDropdownFirstResult');
  },

  validateUniversalElements: function() {
    return this.waitForElementVisible('@myProfileButton', 3000, 'My Profile button is visible')
      .verify.visible('@myProfileButton', 'Top left profile button is visible')
      .verify.visible('@inboxTab', 'Inbox tab is visible')
      .verify.visible('@chatTab', 'Chat tab is visible')
      .verify.visible('@contactsTab', 'Contacts tab is visible')
      .verify.visible('@rhinogramLogo', 'Rhinogram logo is visible')
      .verify.visible('@searchButton', 'Search button is visible')
      .verify.visible('@notificationAlertButton', 'Notification button is visible')
      .verify.visible('@settingsButton', 'Settings button is visible')
  },

  validateSearchDropdown: function(patientName) {
    return this.waitForElementVisible('@searchButton', 5000, 'Search button is visible')
      .click('@searchButton')
      .verify.visible('@searchDropdownInput', 'Search input is visible on click')
      .setValue('@searchDropdownInput', patientName)
      .waitForElementVisible('@searchDropdownFirstResult', 2000, 'First result on search dropdown is visible')
      .verify.visible('@searchDropdownFirstResult', 'First result is visible')
      .verify.visible('@addNewContactButton', 'Add new contact button is visible')
  },

  clickAddNewContact: function() {
    return this.click('@searchButton')
      .waitForElementVisible('@addNewContactButton', 1500, 'Add new contact button is visible')
  },

  validateSettingsDropdown: function() {
    return this.waitForElementVisible('@settingsButton', 3000, 'Settings button is visible')
      .click('@settingsButton')
      .verify.visible('@settingsDropdown', 'Settings dropdown is visible')
      .verify.visible('@myProfileInSettingsDropdown', 'Profile in settings is visible')
      .verify.visible('@myPreferencesInSettingsDropdown', 'Preferences in settings is visible')
      .verify.visible('@autoResponseInSettingsDropdown', 'Otto response is visible!')
      // .verify.visible('@billingInSettingsDropdown', 'Billing in settings is visible')
      .verify.visible('@channelsInSettingsDropdown', 'Channels is visible')
      .verify.visible('@groupsInSettingsDropdown', 'Groups is visible')
      .verify.visible('@membersInSettingsDropdown', 'Members is visible')
      .verify.visible('@orgPreferencesInSettingsDropdown', 'Org Preferences is visible')
      .verify.visible('@orgProfileInSettingsDropdown', 'Org profile is visible ')
      .verify.visible('@tagsInSettingsDropdown', 'Tags is visible')
      .verify.visible('@templatesInSettingsDropdown', 'templates is visible')
      .verify.visible('@systemDetailsInSettingsDropdown', 'System Details option is visible')
      .verify.visible('@emailSupportInSettingsDropdown', 'Email support is visible')
      .verify.visible('@logoutButton', 'logout button is visible')

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

  clickSearchDropdownButtons: function(patientName) {
    return this.click('@searchButton')
      .setValue('@searchDropdownInput', patientName)
      .waitForElementVisible('@searchDropdownFirstResult', 1500, 'First result is present')
      .click('@searchDropdownFirstResult')
      .verify.urlContains('userId', 'Taken to profile summary view')
      .click('@searchButton')
      .setValue('@searchDropdownInput', patientName)
      .waitForElementVisible('@addNewContactButton', 1500, 'Add contact button is present')
      .click('@addNewContactButton')
  },

  clickAddNewContact: function() {
    return this.click('@searchButton')
      .waitForElementVisible('@searchDropdownInput', 2000, 'Search input is present')
      .click('@addNewContactButton')
  },

  clickMyProfile: function() {
    return this.click('@settingsButton')
      .click('@myProfileInSettingsDropdown')
      .verify.urlContains('/profile', 'My profile page is visible')
  },

  clickMyPreferences: function() {
    return this.click('@settingsButton')
      .click('@myPreferencesInSettingsDropdown')
      .verify.urlContains('/preferences', 'My Preferences page is visible')
  },

  clickAutoResponse: function() {
    return this.click('@settingsButton')
      .click('@autoResponseInSettingsDropdown')
      .verify.urlContains('/organization/auto-response', 'Auto-Response page is visible')
  },

  clickBilling: function() {
    return this.click('@settingsButton')
      .click('@billingInSettingsDropdown')
      .verify.urlContains('/organization/billing', 'Billing page is visible')
  },

  clickChannels: function() {
    return this.click('@settingsButton')
      .click('@channelsInSettingsDropdown')
      .verify.urlContains('organization/channels', 'Channels page is visible')
  },

  clickGroups: function() {
    return this.click('@settingsButton')
      .click('@groupsInSettingsDropdown')
      .verify.urlContains('organization/groups', 'Groups page is visible')
  },

  clickMembers: function() {
    return this.click('@settingsButton')
      .click('@membersInSettingsDropdown')
      .verify.urlContains('organization/members', 'Members page is visible')
  },

  clickOrgPreferences: function() {
    return this.click('@settingsButton')
      .click('@orgPreferencesInSettingsDropdown')
      .verify.urlContains('organization/preferences', 'Organization Preferences page is visible')
  },

  clickOrgProfile: function() {
    return this.click('@settingsButton')
      .click('@orgProfileInSettingsDropdown')
      .waitForElementNotVisible('@orgProfileInSettingsDropdown', 5000, 'Org Profile is hidden')
      .verify.urlContains('organization/profile', 'Organization Profile page is visible')
  },

  clickTags: function() {
    return this.click('@settingsButton')
      .click('@tagsInSettingsDropdown')
      .verify.urlContains('organization/tags', 'Tags page is visible')
  },

  clickTemplates: function() {
    return this.click('@settingsButton')
      .click('@templatesInSettingsDropdown')
      .verify.urlContains('organization/templates', 'Templates page is visible')
  },

  clickSystemDetails: function() {
    return this.click('@settingsButton')
      .click('@systemDetailsInSettingsDropdown')
      .verify.urlContains('diagnostics', 'System Detail page is visible')
  },

  clickLogout: function() {
    return this.waitForElementVisible('@settingsButton', 5000, 'Settings button is visible')
      .click('@settingsButton')
      .waitForElementVisible('@logoutButton', 5000, 'Logout button is visible')
      .click('@logoutButton')
      .waitForElementNotPresent('@logoutButton', 1500, 'Logout button no longer present')
      .verify.urlContains('/login', 'Succsessfully logged out')
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

    rhinogramLogo: {
      selector: `//IMG[@class='u-img-fluid']`,
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------*/
    // search bar elements
    /*----------------------------------------------*/

    searchButton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[2]`, // look for better way to grab xpath
      locateStrategy: 'xpath',
    },

    searchDropdownInput: {
      selector: `//INPUT[@id='global-2742b015-6087-4f1e-a1f4-7aad513adbfb']`,
      locateStrategy: 'xpath',
    },

    searchDropdownFirstResult: {
      selector: `(//DIV[@role='button'])[12]`,
      locateStrategy: 'xpath',
    },

    addNewContactButton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[8]`,
      locateStrategy: 'xpath',
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
      selector: `(//SPAN[@class='button__text-wrapper'])[4]`,
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

    autoResponseInSettingsDropdown: {
      selector: `//SPAN[@class='u-text-overflow'][text()='Auto-Response']`,
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
      selector: `(//SPAN[@class='button__text-wrapper'])[5]`,
      locateStrategy: 'xpath',
    },
  }
};
