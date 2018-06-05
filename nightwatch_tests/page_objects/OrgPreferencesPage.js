const orgPreferencesCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  validatePageElements: function() {
    return this.waitForElementVisible('@toggleSound', 'Toggle sound is visible')
      .verify.visible('@saveButton', 'Save Preferences button is visible')
  },

  toggleSoundOn: function() {
    return this.click('@toggleSound')
  },

  toggleSoundOff: function() {
    return this.click('@toggleSound')
  },

  clickSave: function() {
    return this.click('@saveButton')
  },

  validateSaveToast: function() {
    return this.waitForElementVisible('@saveToast', 5000, 'Save toast is visible')
  }
}

export default OrgPreferencesPage = {
  commands: [orgPreferencesCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/preferences'
  },
  elements: {
    toggleSound: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[1]/div/div[2]/div/div/label`,
      locateStrategy: 'xpath'
    },

    saveButton: {
      selector: `//div[@class='app-page__container']//button[.='Save Preferences']`,
      locateStrategy: 'xpath'
    },

    saveToast: {
      selector: `//*[@id="js-toasts-container"]/div/div/div`,
      locateStrategy: 'xpath'
    },
  }
};
