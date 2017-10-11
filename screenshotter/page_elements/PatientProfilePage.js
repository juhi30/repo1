const editProfile = {
  xpath: `//div[@class='profile__user']//button[.='Edit Profile']`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(editProfile.xpath));
  },
};
const typeOtherSelect = {
  xpath: `//select[@id='contactType']//option[2]`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(typeOtherSelect.xpath));
  },
};
const firstNameInput = {
  xpath: `//input[@id='firstName']`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(firstNameInput.xpath));
  },
};
const middleNameInput = {
  xpath: `//input[@id='middleName']`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(middleNameInput.xpath));
  },
};
const lastNameInput = {
  xpath: `//input[@id='lastName']`,  //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(lastNameInput.xpath));
  },
};
const prefixSelect = {
  xpath: `//select[@id='prefixId']//option[4]`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(prefixSelect.xpath));
  },
};
const suffixSelect = {
  xpath: `//select[@id='suffixId']//option[3]`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(suffixSelect.xpath));
  },
};
const externalIdInput = {
  xpath: `//input[@id='externalId']`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(externalIdInput.xpath));
  },
};
const yearSelect = {
  xpath: `//select[@id='year']//option[18]`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(yearSelect.xpath));
  },
};
const monthSelect = {
  xpath: `//select[@id='month']//option[12]`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(monthSelect.xpath));
  },
};
const daySelect = {
  xpath: `//select[@id='day']//option[19]`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(daySelect.xpath));
  },
};
const connectionTypeDropdown = {
  xpath: `//div[@class='edit-profile__connected-parties']//div[.='- Select -']`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(connectionTypeDropdown.xpath));
  },
};
const dependentOption = {
  xpath: `//div[@class='edit-profile__connected-parties']//span[.='Dependent']`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(dependentOption.xpath));
  },
};
const connectedPartyFirstNameInput = {
  xpath: `//div[@class='edit-profile__connected-parties']/div[2]/div/div[2]/div[3]/div[1]/div/input`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(connectedPartyFirstNameInput.xpath));
  },
};
const connectedPartyLastNameInput = {
  xpath: `//div[@class='edit-profile__connected-parties']/div[2]/div/div[2]/div[3]/div[2]/div/input`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(connectedPartyLastNameInput.xpath));
  },
};

module.exports = {
  editProfile,
  typeOtherSelect,
  firstNameInput,
  lastNameInput,
  middleNameInput,
  prefixSelect,
  suffixSelect,
  externalIdInput,
  yearSelect,
  monthSelect,
  daySelect,
  connectionTypeDropdown,
  dependentOption,
  connectedPartyFirstNameInput,
  connectedPartyLastNameInput,
};
