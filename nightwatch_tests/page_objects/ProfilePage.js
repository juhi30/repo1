const addPhotoButton = {
  xpath: `//div[@class='edit-profile']//button[.='Add Photo']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(addPhotoButton.xpath));
  },
};

const closeAddPhoto = {
  xpath: `//div[@class='modal__header']/button`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(closeAddPhoto.xpath));
  },
};

const firstNameInput = {
  xpath: `//input[@id='firstName']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(firstNameInput.xpath));
  },
};

const lastNameInput = {
  xpath: `//input[@id='lastName']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(lastNameInput.xpath));
  },
};

const usernameInput = {
  xpath: `//input[@id='username']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(usernameInput.xpath));
  },
};

const changePasswordLink = {
  xpath: `//div[@class='edit-profile']//button[.='Change password']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(changePasswordLink.xpath));
  },
};

const currentPassInput = {
  xpath: `//input[@id='oldPass']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(currentPassInput.xpath));
  },
};

const newPassInput = {
  xpath: `//input[@id='newPass']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(newPassInput.xpath));
  },
};

const confirmPassInput = {
  xpath: `//input[@id='newPassAgain']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(confirmPassInput.xpath));
  },
};

const permissionsDropdown = {
  xpath: `//div[@class='edit-profile']/div[3]/div[4]/span/div[1]/input`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(permissionsDropdown.xpath));
  },
};

const saveChangesButton = {
  xpath: `//div[@class='edit-profile']//button[.='Save Profile']`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(saveChangesButton.xpath));
  },
};

module.exports = {
  addPhotoButton,
  closeAddPhoto,
  firstNameInput,
  lastNameInput,
  usernameInput,
  changePasswordLink,
  currentPassInput,
  newPassInput,
  confirmPassInput,
  permissionsDropdown,
  saveChangesButton,
};
