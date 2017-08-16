const filterDropdown = {
  xpath: `//*[@id="app"]/div/div[2]/div/div[1]/div[1]/div[2]/div/button/span/span`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(filterDropdown.xpath));
  },
};
const patientOption = {
  xpath: `//*[@id="app"]/div/div[2]/div/div[1]/div[1]/div[2]/div/div/div/div[2]/a/div`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(patientOption.xpath));
  },
};
const memberOption = {
  xpath: `//*[@id="app"]/div/div[2]/div/div[1]/div[1]/div[2]/div/div/div/div[3]/a/div`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(memberOption.xpath));
  },
};
const connectedPartyOption = {
  xpath: `//div[2]/div/div[2]/div/div[1]/div[1]/div[2]/div/div/div/div[4]/a/div/div/div/span`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(connectedPartyOption.xpath));
  },
};
const unknownOption = {
  xpath: `//div[2]/div/div[2]/div/div[1]/div[1]/div[2]/div/div/div/div[5]/a/div/div/div/span`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(unknownOption.xpath));
  },
};
const otherOption = {
  xpath: `//div[2]/div/div[2]/div/div[1]/div[1]/div[2]/div/div/div/div[6]/a/div`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(otherOption.xpath));
  },
};
const firstContact = {
  xpath: `//div[1]/div/div[2]/div/div[1]/div[2]/div[1]/div[1]/div[1]`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(firstContact.xpath));
  },
};
const addContactButton = {
  xpath: `//div[@class='contacts__header__actions']//span[.='Add Contact']`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(addContactButton.xpath));
  },
};
const addContactButtonDropdown = {
  xpath: `//div[@class='contacts__header__actions']/div/div/div/div[2]/button`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(addContactButtonDropdown.xpath));
  },
};
const submitNewContactButton = {
  xpath: `//div[@class='cover__footer__container']//button[.='Add Contact']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(submitNewContactButton.xpath));
  },
};

module.exports = {
  filterDropdown,
  patientOption,
  memberOption,
  connectedPartyOption,
  unknownOption,
  otherOption,
  firstContact,
  addContactButton,
  addContactButtonDropdown,
  submitNewContactButton,
};
