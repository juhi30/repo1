const toggleSoundOn = {
  xpath: `//label[@class='rhinoswitcher__label']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(toggleSoundOn.xpath));
  },
};

const toggleSoundOff = {
  xpath: `//label[@class='rhinoswitcher__label']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(toggleSoundOff.xpath));
  },
};

const saveButton = {
  xpath: `//div[@class='app-page__container']//button[.='Save Preferences']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(saveButton.xpath));
  },
};

const saveToast = {
  xpath: `//*[@id="js-toasts-container"]/div/div/div`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(saveToast.xpath));
  },
};

module.exports = {
  toggleSoundOn,
  toggleSoundOff,
  saveButton,
  saveToast,
};
