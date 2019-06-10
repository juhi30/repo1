const accountSetupFeeder = require('../feeder/accountSetup.feeder');
const orgProfileFeeder = require('../feeder/orgProfile.feeder');

const universalElementsCommands = {

  validateUniversalElements() {
    return this.waitForElementVisible('@myProfileButton', 'My Profile button is visible')
      .verify.visible('@myProfileButton', 'Profile button is visible')
      .verify.visible('@inboxDirectButton', 'Inbox direct is visible')
      .verify.visible('@chatDirectButton', 'Chat direct is visible')
      .verify.visible('@contactsButton', 'Contacts button is visible')
      .verify.visible('@searchButton', 'Search button is visible')
      .verify.visible('@helpDropdown', 'Help button is visible')
      .verify.visible('@settingsButton', 'Settings button is visible');
  },

  validateSearchModal(patientName) {
    return this.waitForElementVisible('@searchButton', 'Search button is visible')
      .click('@searchButton')
      .waitForElementVisible('@searchModalInput', 'Search input is visible on click')
      .setValue('@searchModalInput', patientName)
      .waitForElementVisible('@searchResultFrodoBaggins', 'First result on search dropdown is visible')
      .verify.visible('@addNewContactButton', 'Add new contact button is visible')
      .click('@searchResultFrodoBaggins')
      .waitForElementNotPresent('@searchResultFrodoBaggins', 'First result is hidden');
  },

  validateSettingsDropdown() {
    return this.waitForElementVisible('@settingsButton', 'Settings button is visible')
      .pause(500)
      .click('@settingsButton')
      .waitForElementPresent('@logoutButton', 'logout button is visible')
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
      .pause(500)
      .click('@settingsButton');
  },

  validateHelpDropdown() {
    return this.waitForElementVisible('@helpDropdown', 'Help button is visible')
      .pause(500)
      .click('@helpDropdown')
      .waitForElementVisible('@supportDeskButton', 'Support desk is visible')
      .waitForElementVisible('@knowledgeBaseButton', 'Knowledge base is visible')
      .waitForElementVisible('@submitAnIssueButton', 'Submit an issue is visible')
      .waitForElementVisible('@ideaSubmissionButton', 'Idea submission is visible')
      .waitForElementVisible('@systemDetailsButton', 'System details is visible');
  },

  /* ----------perhaps add more to test for groups in Inbox/Chat-----------*/
  clickAppNavButtons() {
    return this.waitForElementVisible('@assignedToMeButton', 'Assigned to Me button is shown')
      .click('@assignedToMeButton')
      .pause(500)
      .verify.containsText('@appHeaderTitle', 'Assigned to Me', 'Inbox Assigned title present')
      .click('@followingButton')
      .pause(500)
      .verify.containsText('@appHeaderTitle', 'Following', 'Inbox following title present')
      .click('@inboxDirectButton')
      .pause(500)
      .verify.containsText('@appHeaderTitle', 'Patient - Direct', 'Inbox Direct title present')
      .click('@chatDirectButton')
      .pause(500)
      .verify.containsText('@appHeaderTitle', 'Team - Direct', 'Chat Direct title present')
      .click('@contactsButton')
      .pause(500)
      .verify.containsText('@appHeaderTitle', 'Contacts', 'Contacts title present');
  },

  clickHelpDropdownButtons() {
    return this.waitForElementPresent('@helpDropdown', 'Help dropdown is visible')
      .click('@helpDropdown')
      .waitForElementPresent('@supportDeskButton', 'Support desk button is visible')
      .click('@supportDeskButton')
      .click('@knowledgeBaseButton')
      .click('@submitAnIssueButton')
      .click('@ideaSubmissionButton');
  },

  clickSystemDetailsButton() {
    return this.waitForElementPresent('@helpDropdown', 'Help dropdown is visible')
      .waitForElementVisible('@systemDetailsButton', 'System Details button is visible')
      .click('@systemDetailsButton');
  },

  clickSearchModalButtons(patientName) {
    return this.click('@assignedToMeButton')
      .waitForElementVisible('@searchButton', 'Search button is visible')
      .click('@searchButton')
      .waitForElementVisible('@searchModalInput', 'Search input is visible on click')
      .setValue('@searchModalInput', patientName)
      .waitForElementVisible('@searchResultFrodoBaggins', 'First result on search dropdown is visible')
      .verify.visible('@addNewContactButton', 'Add new contact button is visible')
      .click('@searchResultFrodoBaggins')
      .waitForElementNotPresent('@searchResultFrodoBaggins', 'First result is hidden')
      .verify.urlContains('50069', 'Taken to profile summary view');// no long 'userID' string but actual ID number
  },

  clickAddNewContact() {
    return this.waitForElementVisible('@searchButton')
      .click('@searchButton')
      .waitForElementVisible('@searchModalInput', 'Search input is present')
      .click('@addNewContactButton');
  },

  clickMyProfile() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@myProfileInSettingsDropdown')
      .pause(500)
      .verify.urlContains('/profile', 'My profile page is visible');
  },

  clickMyPreferences() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@myPreferencesInSettingsDropdown')
      .pause(500)
      .verify.urlContains('/preferences', 'My Preferences page is visible');
  },

  clickChannels() {
    return this.click('@settingsButton')
      .waitForElementVisible('@channelsInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@channelsInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/channels', 'Channels page is visible')
      .click('@rhinogramLogo');
  },

  clickGroups() {
    return this.click('@settingsButton')
      .waitForElementVisible('@groupsInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@groupsInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/groups', 'Groups page is visible')
      .click('@rhinogramLogo');
  },

  clickMembers() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@membersInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/members', 'Members page is visible')
      .click('@rhinogramLogo');
  },

  clickOOO() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@oooInSettingsDropdown')
      .pause(500)
      .verify.urlContains('/organization/out-of-office', 'Out of Office page is visible')
      .click('@rhinogramLogo');
  },

  clickBilling() {
    return this.click('@settingsButton')
      .waitForElementVisible('@billingInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@billingInSettingsDropdown')
      .pause(500)
      .verify.urlContains('/organization/billing', 'Billing page is visible')
      .click('@rhinogramLogo');
  },

  clickOrgPreferences() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@orgPreferencesInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/preferences', 'Organization Preferences page is visible')
      .click('@rhinogramLogo');
  },

  clickOrgProfile() {
    return this.click('@settingsButton')
      .waitForElementVisible('@orgProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@orgProfileInSettingsDropdown')
      .pause(500)
      // .waitForElementNotVisible('@orgProfileInSettingsDropdown', 'Org Profile is hidden')
      .verify.urlContains('organization/profile', 'Organization Profile page is visible')
      .click('@rhinogramLogo');
  },

  clickTags() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@tagsInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/tags', 'Tags page is visible')
      .click('@rhinogramLogo');
  },

  clickTemplates() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@templatesInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/templates', 'Templates page is visible')
      .click('@rhinogramLogo');
  },

  clickSystemDetails() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@systemDetailsInSettingsDropdown')
      .pause(500)
      .verify.urlContains('diagnostics', 'System Detail page is visible')
      .click('@rhinogramLogo');
  },

  clickLogout() {
    return this.waitForElementVisible('@logoutButton', 'Logout button is visible')
      .click('@logoutButton')
      .waitForElementNotPresent('@logoutButton', 'Logout button no longer present');
  },

  searchByName(name) {
    return this.waitForElementVisible('@searchButton', 'Search field is visible')
      .click('@searchButton')
      .waitForElementVisible('@searchModalInput', 'Search input is visible')
      .setValue('@searchModalInput', name);
  },

  searchForOrganization(orgName, orgName2SearchResult) {
    const clickableElement = orgName2SearchResult || '@organizationSearchResult';
    return this.waitForElementVisible('@searchInputForOrg', 'Search Input is visible')
      .setValue('@searchInputForOrg', orgName)
      .waitForElementVisible(clickableElement, 'First result is visible');
  },

  ccrOrgLogin(orgName2SearchResult) {
    const clickableElement = orgName2SearchResult || '@organizationSearchResult';
    return this.click(clickableElement)
      .pause(1000)
      .waitForElementVisible('@goBackToSelectNewOrg', 'CCR login to Org successful')
      .verify.urlContains('contacts', 'Contacts page is visible');
  },

  clickContacts() {
    return this.waitForElementVisible('@contactsButton', 'Contacts button is visible')
      .click('@contactsButton')
      .pause(500)
      .verify.urlContains('contacts', 'Contacts page is visible');
  },

  selectOrganization() {
    return this.waitForElementVisible('@goBackToSelectNewOrg', 'Select Organization button is visible')
      .click('@goBackToSelectNewOrg')
      .waitForElementVisible('@searchInputForOrg', 'User landed back on Org listing page');
  },

  validatePageError(ele, url) {
    return this.waitForElementNotPresent(ele, 'Page Cannot be Accessible after logout')
      .verify.urlContains(url);
  },

  clickAuditLogs() {
    return this.click('@settingsButton')
      .waitForElementVisible('@auditInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@auditInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/auditLog', 'Audit Logs page is visible')
      .click('@rhinogramLogo');
  },
};

module.exports = {
  commands: [universalElementsCommands],
  url() {
    return `${this.api.launch_url}/inbox`;
  },

  elements: {

    rhinogramLogo: {
      selector: '//DIV[@class=\'app-navigation__logo\']',
      locateStrategy: 'xpath',
    },

    appHeaderTitle: {
      selector: '//DIV[@class=\'app-page__header__title\']',
      locateStrategy: 'xpath',
    },

    /*-------------------------------------------------------------------------*/
    // Left hand column navigation buttons. Top to bottom.
    /*-------------------------------------------------------------------------*/

    assignedToMeButton: {
      selector: '//BUTTON[contains(text(), \'Assigned to Me\')]',
      locateStrategy: 'xpath',
    },

    followingButton: {
      selector: '//BUTTON[contains(text(), \'Following\')]',
      locateStrategy: 'xpath',
    },

    inboxDirectButton: {
      selector: '(//SPAN[@class=\'app-navigation__nav__button__text\'][text()=\'Direct\'][text()=\'Direct\'])[1]',
      locateStrategy: 'xpath',
    },

    chatDirectButton: {
      selector: '(//SPAN[@class=\'app-navigation__nav__button__text\'][text()=\'Direct\'][text()=\'Direct\'])[2]',
      locateStrategy: 'xpath',
    },

    contactsButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Contacts\']',
      locateStrategy: 'xpath',
    },

    orgTitle: {
      selector: '//BUTTON[contains(text(), \'Organization\')]',
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------*/
    // global search bar elements
    /*----------------------------------------------*/

    searchButton: {
      selector: '//SPAN[contains(text(), \'Search users\')]',
      locateStrategy: 'xpath',
    },

    searchModalInput: {
      selector: '//INPUT[starts-with(@id, global)]',
      locateStrategy: 'xpath',
    },

    searchResultFrodoBaggins: {
      selector: '//SPAN[@class=\'resource__intro__title__content has-subtitle\'][text()=\'Frodo  Baggins\']', // specific to Frodo test case
      locateStrategy: 'xpath',
    },

    addNewContactButton: {
      selector: '//BUTTON[contains(text(), \'Add New Contact\')]',
      locateStrategy: 'xpath',
    },

    closeSearchModal: {
      selector: '//BUTTON[contains(@title, \'Close\')]',
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------*/
    // Profile Button and former Notification xpaths
    /*----------------------------------------------*/

    myProfileButton: {
      selector: '//A[@title=\'My Profile\']',
      locateStrategy: 'xpath',
    },
    /*----------------------------------------------*/
    // Help Button dropdown
    /*----------------------------------------------*/

    helpDropdown: {
      selector: '//BUTTON[contains(@title, \'Help\')]',
      locateStrategy: 'xpath',
    },

    supportDeskButton: {
      selector: '//BUTTON[contains(text(), \'Support Desk\')]',
      locateStrategy: 'xpath',
    },

    knowledgeBaseButton: {
      selector: '//BUTTON[contains(text(), \'Knowledge Base\')]',
      locateStrategy: 'xpath',
    },

    submitAnIssueButton: {
      selector: '//BUTTON[contains(text(), \'Submit an Issue\')]',
      locateStrategy: 'xpath',
    },

    ideaSubmissionButton: {
      selector: '//BUTTON[contains(text(), \'Idea Submission\')]',
      locateStrategy: 'xpath',
    },

    systemDetailsButton: {
      selector: '//BUTTON[contains(text(), \'System Details\')]',
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------*/
    // Settings dropdown elements
    /*----------------------------------------------*/

    settingsButton: {
      selector: '//BUTTON[contains(@title, \'Settings\')]',
      locateStrategy: 'xpath',
    },

    myProfileInSettingsDropdown: {
      selector: '(//SPAN[@class=\'u-text-overflow\'][text()=\'Profile\'][text()=\'Profile\'])[1]',
      locateStrategy: 'xpath',
    },

    myPreferencesInSettingsDropdown: {
      selector: '(//SPAN[@class=\'u-text-overflow\'][text()=\'Preferences\'][text()=\'Preferences\'])[1]',
      locateStrategy: 'xpath',
    },

    oooInSettingsDropdown: {
      selector: '//SPAN[contains(text(), \'Out of Office\')]',
      locateStrategy: 'xpath',
    },

    billingInSettingsDropdown: {
      selector: '//SPAN[contains(text(), \'Billing\')]',
      locateStrategy: 'xpath',
    },

    channelsInSettingsDropdown: {
      selector: '//SPAN[contains(text(), \'Channels\')]',
      locateStrategy: 'xpath',
    },

    groupsInSettingsDropdown: {
      selector: '//SPAN[contains(text(), \'Groups\')]',
      locateStrategy: 'xpath',
    },

    auditInSettingsDropdown: {
      selector: '//SPAN[contains(text(), \'Audit Log\')]',
      locateStrategy: 'xpath',
    },

    membersInSettingsDropdown: {
      selector: '//SPAN[contains(text(), \'Members\')]',
      locateStrategy: 'xpath',
    },

    orgPreferencesInSettingsDropdown: {
      selector: '(//SPAN[@class=\'u-text-overflow\'][text()=\'Preferences\'][text()=\'Preferences\'])[2]',
      locateStrategy: 'xpath',
    },

    orgProfileInSettingsDropdown: {
      selector: '//DIV[@class=\'dropdown__menu dropdown__menu--right dropdown__menu--wide\']//*[text()=\'Profile\']',
      locateStrategy: 'xpath',
    },

    tagsInSettingsDropdown: {
      selector: '//SPAN[contains(text(), \'Tags\')]',
      locateStrategy: 'xpath',
    },

    templatesInSettingsDropdown: {
      selector: '//SPAN[contains(text(), \'Templates\')]',
      locateStrategy: 'xpath',
    },

    logoutButton: {
      selector: '(//SPAN[@class=\'button__text-wrapper\' and contains(text(), \'Log Out\')])',
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------*/
    // Select Organization Page elements
    /*----------------------------------------------*/

    searchInputForOrg: {
      selector: '//input[@placeholder=\'Search organizations\']',
      locateStrategy: 'xpath',
    },

    organizationSearchResult: {
      selector: `//SPAN[contains(@class, 'resource__intro__title__content') and text() = '${accountSetupFeeder.orgName}' ]`,
      locateStrategy: 'xpath',
    },

    billingOrgSearchResult: {
      selector: `//SPAN[contains(@class, 'resource__intro__title__content') and text() = '${accountSetupFeeder.billingOrgName}' ]`,
      locateStrategy: 'xpath',
    },

    org2SearchResult: {
      selector: `//SPAN[contains(@class, 'resource__intro__title__content') and text() = '${accountSetupFeeder.orgName2}' ]`,
      locateStrategy: 'xpath',
    },

    newOrgSearchResult: {
      selector: `//SPAN[contains(@class, 'resource__intro__title__content') and text() = '${orgProfileFeeder.orgNewName}' ]`,
      locateStrategy: 'xpath',
    },

    noSearchResult: {
      selector: '//SPAN[text()=\'No organizations found\']',
      locateStrategy: 'xpath',
    },

    goBackToSelectNewOrg: {
      selector: '//SPAN[text()=\'Select Organization\']',
      locateStrategy: 'xpath',
    },
  },
};
