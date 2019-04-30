
const orgPreferencesCommands = {

  pause(time) {
    this.api.pause(time);
    return this;
  },

  validatePageElements() {
    return this.waitForElementVisible('@toggleSound', 'Toggle sound is visible')
      .verify.visible('@saveButton', 'Save Preferences button is visible');
  },

  toggleSoundOn() {
    return this.click('@toggleSound');
  },

  toggleSoundOff() {
    return this.click('@toggleSound');
  },

  clickSave() {
    return this.click('@saveButton');
  },

  validateSaveToast() {
    return this.waitForElementVisible('@saveToast', 'Save toast is visible');
  },
};

module.exports = {
  commands: [orgPreferencesCommands],
  url() {
    return `${this.api.launch_url}/settings/organization/preferences`;
  },
  elements: {
    toggleSound: {
      selector: '//*[@id="app"]/div/div[2]/div/div/div[1]/div/div[2]/div/div/label',
      locateStrategy: 'xpath',
    },

    saveButton: {
      selector: '//div[@class=\'app-page__container\']//button[.=\'Save Preferences\']',
      locateStrategy: 'xpath',
    },

    saveToast: {
      selector: '//*[@id="js-toasts-container"]/div/div/div',
      locateStrategy: 'xpath',
    },
  },
};
