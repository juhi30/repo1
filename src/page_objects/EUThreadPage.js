// EU = End User

const euThreadCommands = {

  pause(milli) {
    this.api.pause(milli);
    return this;
  },

  validatePageElements() {
    return this.waitForElementVisible('@messageInput', 'Compose input is visible')
      .verify.visible('@messageInput', 'Compose input is visible')
      .verify.visible('@attachmentButton', 'Attachment button is visible')
      .verify.visible('@firstOrgInPanel', 'First org tab is visible')
      .verify.visible('@settingsDropdown', 'Settings dropdown is visible')
      .verify.visible('@myProfileButton', 'My profile button is visible');
  },

  fillInMessageInput(messageText) {
    return this.waitForElementVisible('@messageInput', 'Message input is visible')
      .setValue('@messageInput', messageText);
  },

  clickSend() {
    return this.waitForElementVisible('@sendButton', 'Send Button is visible')
      .click('@sendButton');
  },

  clickSettingsDropdown() {
    return this.waitForElementVisible('@settingsDropdown', 'Settings dropdown is visible')
      .click('@settingsDropdown');
  },

  clickProfileInSettingsDropdown() {
    return this.waitForElementVisible('@profileLinkInSettingsDropdown', 'Profile button in Settings dropdown is visible')
      .click('@profileLinkInSettingsDropdown');
  },

  clickLogoutButton() {
    return this.waitForElementVisible('@logoutButton', 'Logout button is visible')
      .click('@logoutButton');
  },

  clickMyProfileButton() {
    return this.waitForElementVisible('@myProfileButton', 'My Profile button is visible')
      .click('@myProfileButton');
  },

};

module.exports = {
  url: 'https://dev.dev-rhinogram.com/secure',
  commands: [euThreadCommands],
  elements: {
    messageInput: {
      selector: '//TEXTAREA[contains(@name, \'message\')]',
      locateStrategy: 'xpath',
    },

    sendButton: {
      selector: '//BUTTON[contains(@class, \'convo__message__send\')]',
      locateStrategy: 'xpath',
    },

    logoutButton: {
      selector: '//SPAN[contains(text(), \'Log Out\')]',
      locateStrategy: 'xpath',
    },

    attachmentButton: {
      selector: '//*[@id="app"]/div/div[2]/div/div/div[1]/div/div[2]/div[1]/div[1]/div/button',
      locateStrategy: 'xpath',
    },

    addFileButton: {
      selector: '//*[@id="app"]/div/div[2]/div/div/div[1]/div/div[2]/div[1]/div[1]/div/div/div/div/a/div/div/div[1]',
      locateStrategy: 'xpath',
    },

    firstOrgInPanel: {
      selector: '//A[@id=\'nav-org-3\']',
      locateStrategy: 'xpath',
    },

    settingsDropdown: {
      selector: '//BUTTON[contains(@class, \'app-header__dropdown__trigger\')]',
      locateStrategy: 'xpath',
    },

    profileLinkInSettingsDropdown: {
      selector: '//*[@id="cuke-main-settings"]/div/div/div/div[2]/a/div/div/div/span',
      locateStrategy: 'xpath',
    },

    myProfileButton: {
      selector: '//A[@title=\'My Profile\']',
      locateStrategy: 'xpath',
    },
  },

};
