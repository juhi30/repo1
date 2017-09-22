module.exports = {
  // commands: [orgPreferencesCommands],
  elements: {
    toggleSoundOn: {
      selector: `//label[@class='rhinoswitcher__label']`,
      locateStrategy: 'xpath'
    },
    toggleSoundOff: {
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
