const usernameInput = {
  xpath: `//input[@id='username']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(usernameInput.xpath));
  },
};

const passwordInput = {
  xpath: `//input[@id='password']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(passwordInput.xpath));
  },
};

const loginButton = {
  xpath: `//*[@id="app"]/div/div/div/div[2]/div[3]/button/span`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(loginButton.xpath));
  },
};

module.exports = {
  usernameInput,
  passwordInput,
  loginButton,
};
