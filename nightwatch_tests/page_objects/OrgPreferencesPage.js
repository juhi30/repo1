
const orgPreferencesCommands = {

  validatePageElements: function() {
    return this.waitForElementVisible('@toggleSoundOn', 'Toggle sound is visible')
      .verify.visible('@saveButton', 'Save Preferences button is visible')
  },

  toggleSound: function() {
    return this.click('@toggleSound')
  },

  clickSave: function() {
    return this.click('@saveButton')
  },

  validateSaveToast: function() {
    return this.waitForElementVisible('@saveToast', 1000, 'Save toast is visible')
      .waitForElementNotVisible('@saveToast', 5000, 'Save toast is now hidden')
  }
}

module.exports = {
  commands: [orgPreferencesCommands, {
    pause: function(time) {
      this.api.pause(time);
      return this;
    }
  }],
  url: function() {
    return this.api.launch_url + '/settings/organization/preferences'
  },
  elements: {
    toggleSound: {
      selector: `//label[@class='rhinoswitcher__label']`,
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
