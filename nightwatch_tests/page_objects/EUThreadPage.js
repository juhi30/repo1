const euThreadCommands = {
  validatePageElements: function() {
    return this.waitForElementVisible('body', 1000)
      .verify.visible('@messageInput', 'Compose input is visible')
      .verify.visible('@attachmentButton', 'Attachment button is visible')
      .verify.visible('@firstOrgInPanel', 'First org tab is visible')
      .verify.visible('@settingsDropdown', 'Settings dropdown is visible')
      .verify.visible('@myProfileButton', 'My profile button is visible')
  },

  fillInMessageInput: function(messageText) {
    return this.waitForElementVisible('@messageInput', 1000)
      .setValue('@messageInput', messageText)
  },

  clickSettingsDropdown: function() {
    return this.waitForElementVisible('@settingsDropdown', 1000)
      .click('@settingsDropdown')
  },

  clickProfileInSettingsDropdown: function() {
    return this.waitForElementVisible('@profileLinkInSettingsDropdown', 1000)
      .click('@profileLinkInSettingsDropdown')
  },

  clickLogoutButton: function() {
    return this.waitForElementVisible('@logoutButton', 1000)
      .click('@logoutButton')
  }

}

module.exports = {
  // commands: [euThreadCommands],
  elements: {
    messageInput: {
      selector: `//div[@class='convo__message__compose']/div/textarea`,
      locateStategy: 'xpath'
    },

    sendButton: {
      selector: `//div[@class='convo__message__send']//button[.='Send']`,
      locateStategy: 'xpath'
    },

    logoutButton: {
      selector: `//div[@class='secure-app__header__branding__logout']//button[.='Logout']`,
      locateStategy: 'xpath'
    },

    attachmentButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[1]/div/div[2]/div[1]/div[1]/div/button`,
      locateStategy: 'xpath'
    },

    addFileButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[1]/div/div[2]/div[1]/div[1]/div/div/div/div/a/div/div/div[1]`,
      locateStategy: 'xpath'
    },

    firstOrgInPanel: {
      selector: `//*[@id="nav-org-1"]`,
      locateStategy: 'xpath'
    },

    settingsDropdown: {
      selector: `//*[@id="cuke-main-settings"]/div/button/span/span`,
      locateStategy: 'xpath'
    },

    profileLinkInSettingsDropdown: {
      selector: `//*[@id="cuke-main-settings"]/div/div/div/div[2]/a/div/div/div/span`,
      locateStategy: 'xpath'
    },

    myProfileButton: {
      selector: `//A[@title='My Profile']`,
      locateStrategy: 'xpath'
    }
  }
  
};
