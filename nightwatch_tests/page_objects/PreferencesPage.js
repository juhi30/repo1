const saveChangesButton = {
  xpath: `//div[@class='app-page__container']//button[.='Save Preferences']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(saveChangesButton.xpath));
  },
};

module.exports = {
  saveChangesButton,
};
