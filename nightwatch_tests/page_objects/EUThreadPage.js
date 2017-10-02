const theDateObj = new Date;
const dateString = theDateObj.toDateString();

const euThreadCommands = {
  validatePageElements: function() {
    return this.waitForElementVisible('@messageInput', 5000, 'Compose input is visible')
      .verify.visible('@messageInput', 'Compose input is visible')
      .verify.visible('@attachmentButton', 'Attachment button is visible')
      .verify.visible('@firstOrgInPanel', 'First org tab is visible')
      .verify.visible('@settingsDropdown', 'Settings dropdown is visible')
      .verify.visible('@myProfileButton', 'My profile button is visible');
  },

  fillInMessageInput: function(messageText) {
    return this.waitForElementVisible('@messageInput', 1000)
      .setValue('@messageInput', messageText);
  },

  fillMessageInputWithDate: function() {
    return this.waitForElementVisible('@messageInput', 1000, 'Compose Message input is visible')
      .setValue('@messageInput', dateString);
  },

  clickSend: function() {
    return this.waitForElementVisible('@sendButton', 1000, 'Send Button is visible')
      .click('@sendButton');
  },

  clickSettingsDropdown: function() {
    return this.waitForElementVisible('@settingsDropdown', 1000)
      .click('@settingsDropdown');
  },

  clickProfileInSettingsDropdown: function() {
    return this.waitForElementVisible('@profileLinkInSettingsDropdown', 1000)
      .click('@profileLinkInSettingsDropdown');
  },

  clickLogoutButton: function() {
    return this.waitForElementVisible('@logoutButton', 1000)
      .click('@logoutButton');
  },

  clickMyProfileButton: function() {
    return this.waitForElementVisible('@myProfileButton', 1000)
      .click('@myProfileButton');
  }

}

module.exports = {
  url: 'https://dev.dev-rhinogram.com/secure',
  commands: [euThreadCommands],
  elements: {
    messageInput: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[1]/div/div[2]/div[1]/div[2]/div/textarea`,
      locateStrategy: 'xpath',
    },

    sendButton: {
      selector: `//div[@class='convo__message__send']//button[.='Send']`,
      locateStrategy: 'xpath',
    },

    logoutButton: {
      selector: `//div[@class='secure-app__header__branding__logout']//button[.='Logout']`,
      locateStrategy: 'xpath',
    },

    attachmentButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[1]/div/div[2]/div[1]/div[1]/div/button`,
      locateStrategy: 'xpath',
    },

    addFileButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[1]/div/div[2]/div[1]/div[1]/div/div/div/div/a/div/div/div[1]`,
      locateStrategy: 'xpath',
    },

    firstOrgInPanel: {
      selector: `//*[@id="nav-org-1"]`,
      locateStrategy: 'xpath',
    },

    settingsDropdown: {
      selector: `//*[@id="cuke-main-settings"]/div/button/span/span`,
      locateStrategy: 'xpath',
    },

    profileLinkInSettingsDropdown: {
      selector: `//*[@id="cuke-main-settings"]/div/div/div/div[2]/a/div/div/div/span`,
      locateStrategy: 'xpath',
    },

    myProfileButton: {
      selector: `//A[@title='My Profile']`,
      locateStrategy: 'xpath',
    }
  }
  
};
