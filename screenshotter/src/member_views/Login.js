const LoginPage = require('../../page_elements/LoginPage');
const InboxPage = require('../../page_elements/InboxPage');
const Inbox = require('./Inbox');
const webdriver = require('selenium-webdriver');

const promise = webdriver.promise;
const flow = promise.controlFlow();


function Login(driver, by, waitFor) {
  flow.execute(() => driver.get('https://dev.dev-rhinogram.com/login'));
  flow.execute(() => waitFor(LoginPage.loginButton, driver.quit));
  flow.execute(() => driver.saveScreenshot('login_0'));

  flow.execute(() => waitFor(LoginPage.usernameInput, driver.quit));
  flow.execute(() => LoginPage.usernameInput.find(driver, by).clear());
  flow.execute(() => LoginPage.usernameInput.find(driver, by).sendKeys('tonton'));
  flow.execute(() => LoginPage.passwordInput.find(driver, by).clear());
  flow.execute(() => LoginPage.passwordInput.find(driver, by).sendKeys('chacoz'));
  flow.execute(() => driver.saveScreenshot('login_1'));

  flow.execute(() => LoginPage.loginButton.find(driver, by).click());
  flow.execute(() => driver.saveScreenshot('login_2'));

  flow.execute(() => waitFor(InboxPage.firstThread, driver.quit));
  flow.execute(() => Inbox(driver, by, waitFor));
}

module.exports = Login;
