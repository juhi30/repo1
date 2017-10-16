const preferencesCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  renderPageElements: function() {
    return this.waitForElementVisible('@desktopInboxToggle', 5000, 'Desktop inbox toggle is visible')
      .verify.visible('@desktopChatToggle', 'Desktop chat toggle is visible')
      // .verify.visible('@mobileInboxToggle', 'Mobile inbox toggle is visible')
      // .verify.visible('@mobileChatToggle', 'Mobile Chat toggle is visible')
      // these have been removed from desktop view. expand tests to include mobile view
      .verify.visible('@savePreferencesButton', 'Save preferences button is visible')
      .verify.visible('@appStoreButton', 'App store button is visible')
      .verify.visible('@googlePlayButton', 'Google play button is visible')
  },

  changeDesktopToggles: function() {
    return this.click('@desktopInboxToggle')
      .click('@desktopChatToggle')
  },

  // changeMobileToggles: function() {
  //   return this.click('@mobileInboxToggle')
  //     .click('@mobileChatToggle')
  // },

  validateToggleChange: function() {
    return this.verify.cssProperty('@desktopInboxToggle', 'background-color', 'rgba(131, 196, 0, 1)', 'Desktop inbox toggle color is green and on')
      .verify.cssProperty('@desktopChatToggle', 'background-color', 'rgba(131, 196, 0, 1)', 'Desktop chat toggle is green and on')
      // .verify.cssProperty('@mobileInboxToggle', 'background-color', 'rgba(128, 128, 128, 1)', 'Mobile inbox toggle is gray and off')
      // .verify.cssProperty('@mobileChatToggle', 'background-color', 'rgba(128, 128, 128, 1)', 'Mobile chat toggle is gray and on')
  },

  clickSavePreferences: function() {
    return this.click('@savePreferencesButton')
      .waitForElementVisible('@saveToast', 5000, 'Save preferences toast is visible')
  }
}

module.exports = {
  commands: [preferencesCommands],
  url: function() {
    return this.api.launch_url + '/settings/preferences'
  },
  elements: {

    desktopInboxToggle: {
      selector: `(//LABEL[@class='rhinoswitcher__label'])[1]`,
      locateStrategy: 'xpath',
    },
    desktopChatToggle: {
      selector: `(//LABEL[@class='rhinoswitcher__label'])[2]`,
      locateStrategy: 'xpath',
    },

    mobileInboxToggle: {
      selector: `(//LABEL[@class='rhinoswitcher__label'])[3]`,
      locateStrategy: 'xpath',
    },

    mobileChatToggle: {
      selector: `(//LABEL[@class='rhinoswitcher__label'])[4]`,
      locateStrategy: 'xpath',
    },

    savePreferencesButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Preferences']`,
      locateStrategy: 'xpath',
    },

    appStoreButton: {
      selector: `(//IMG[@class='member-preferences__app-svg'])[1]`,
      locateStrategy: 'xpath',
    },

    googlePlayButton: {
      selector: `(//IMG[@class='member-preferences__app-svg'])[2]`,
      locateStrategy: 'xpath',
    },

    saveToast: {
      selector: `//DIV[@class='toast__text'][text()='Preferences updated successfully.']`,
      locateStrategy: 'xpath',
    }
  }
};
