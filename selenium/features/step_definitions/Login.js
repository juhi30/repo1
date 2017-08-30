'use strict';

const LoginPage = require('./page_elements/LoginPage');

module.exports = {
  login: function login(driver, by, username, password, callback) {
    LoginPage.usernameInput(driver, by).clear()
    .then(() => LoginPage.usernameInput(driver, by).sendKeys(username))
    .then(() => LoginPage.passwordInput(driver, by).clear())
    .then(() => LoginPage.passwordInput(driver, by).sendKeys(password))
    .then(() => LoginPage.loginButton(driver, by).click())
    .then(() => callback())
    .catch(() => {
      setTimeout(() => login(driver, by, username, password, callback), 1000);
    });
  },
};

/* This pattern is not desirable, but Selenium Webdriver currently uses its own promise class, and
until they update to use JS's promises (this is planned), this is the best option I've found. For
info on this, see: http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/promise.html */
