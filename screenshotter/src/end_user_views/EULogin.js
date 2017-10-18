const LoginPage = require('../../page_elements/LoginPage');
const EUThreadPage = require('../../page_elements/EUThreadPage');
const EUThread = require('./EUThread');
const webdriver = require('selenium-webdriver');

const promise = webdriver.promise;
const flow = promise.controlFlow();


function EULogin(driver, by, waitFor) {
  flow.execute(() => driver.get('https://dev.dev-rhinogram.com/login'));
  flow.execute(() => waitFor(LoginPage.usernameInput, driver.quit));
  flow.execute(() => LoginPage.usernameInput.find(driver, by).clear());
  flow.execute(() => LoginPage.usernameInput.find(driver, by).sendKeys('dogboy'));
  flow.execute(() => LoginPage.passwordInput.find(driver, by).clear());
  flow.execute(() => LoginPage.passwordInput.find(driver, by).sendKeys('chacoz'));
  flow.execute(() => LoginPage.loginButton.find(driver, by).click());
  flow.execute(() => waitFor(EUThreadPage.messageInput, driver.quit));
  flow.execute(() => flow.execute(() => EUThread(driver, by, waitFor)));
}

module.exports = EULogin;
