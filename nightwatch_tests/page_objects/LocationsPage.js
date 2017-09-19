const locationNameInput = {
  xpath: `//input[@id='name']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(locationNameInput.xpath));
  },
};

const streetOneInput = {
  xpath: `//input[@id='street1']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(streetOneInput.xpath));
  },
};

const cityInput = {
  xpath: `//input[@id='city']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(cityInput.xpath));
  },
};

const stateInput = {
  xpath: `//input[@id='state']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(stateInput.xpath));
  },
};

const zipInput = {
  xpath: `//input[@id='zip']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(zipInput.xpath));
  },
};

const editLocationButton = {
  xpath: `//div[@class='org-settings-bucket']//button[.='Edit']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(editLocationButton.xpath));
  },
};

const cancelEditButton = {
  xpath: `/html/body/div[1]/div/div/div/div/div[3]/div/button[1]/span`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(cancelEditButton.xpath));
  },
};

module.exports = {
  locationNameInput,
  streetOneInput,
  cityInput,
  stateInput,
  zipInput,
  editLocationButton,
  cancelEditButton,
};
