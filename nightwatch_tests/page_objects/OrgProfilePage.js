const addLogoButton = {
  xpath: `//*[@id="app"]/div/div[2]/div/div/div/div[1]/button/span`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(addLogoButton.xpath));
  },
};

const closeUploadPhotoIcon = {
  xpath: `//div[@class='modal__header']/button`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(closeUploadPhotoIcon.xpath));
  },
};

const saveOrgProfileButton = {
  xpath: `//*[@id="app"]/div/div[2]/div/div/div/div[3]/div[4]/button/span`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(saveOrgProfileButton.xpath));
  },
};

const saveToast = {
  xpath: `//*[@id="js-toasts-container"]/div/div/div`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(saveToast.xpath));
  },
};

module.exports = {
  addLogoButton,
  closeUploadPhotoIcon,
  saveOrgProfileButton,
  saveToast,
};
