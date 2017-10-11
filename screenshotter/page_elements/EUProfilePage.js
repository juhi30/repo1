const usernameInput = {
  xpath: `//*[@id="username"]`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(usernameInput.xpath));
  },
};

const emailAddressInput = {
  xpath: `//*[@id="loginEmail"]`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(emailAddressInput.xpath));
  },
};

const changePasswordLink = {
  xpath: `//*[@id="app"]/div/div[2]/div/div/div/div[2]/div[3]/button`,
  find: (driver, by) => {
    return driver.findElement(by.xpath(changePasswordLink.xpath));
  },
};

module.exports = {
  usernameInput,
  emailAddressInput,
  changePasswordLink,
};
