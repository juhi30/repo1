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
