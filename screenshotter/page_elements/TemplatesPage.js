const createTemplateButton = {
  xpath: `//div[@class='app-page__lead__button-group']//button[.='Create Template']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(createTemplateButton.xpath));
  },
};

const cancelCreationButton = {
  xpath: `//div[5]/div/div/div/div/div[1]/button`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(cancelCreationButton.xpath));
  },
};

module.exports = {
  createTemplateButton,
  cancelCreationButton,
};
