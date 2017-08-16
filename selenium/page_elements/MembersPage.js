const saveMemberButton = {
  xpath: `/html/body/div[1]/div/div/div[3]/div/div/button[2]/span`, //eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(saveMemberButton.xpath));
  },
};

const addMemberButton = {
  xpath: `//*[@id="app"]/div/div[2]/div/div[1]/div[1]/div/div[2]/div/button/span`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(addMemberButton.xpath));
  },
};

const addPhotoButton = {
  xpath: `//*[@id="subtree-container"]/span/div[3]/div[2]/div/div/div/div[1]/button/span`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(addPhotoButton.xpath));
  },
};

const closeAddPhotoButton = {
  xpath: `//div[@id='subtree-container']/span/div[4]/div/div/div[1]/button`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(closeAddPhotoButton.xpath));
  },
};

const firstNameInput = {
  xpath: `//*[@id="firstName"]`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(firstNameInput.xpath));
  },
};

const closeEditMemberFormButton = {
  xpath: `/html/body/div[1]/div/div/div[3]/div/div/button[1]/span`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(closeEditMemberFormButton.xpath));
  },
};

module.exports = {
  saveMemberButton,
  addMemberButton,
  addPhotoButton,
  closeAddPhotoButton,
  firstNameInput,
  closeEditMemberFormButton,
};
