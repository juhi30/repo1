const EUThreadPage = require('../../page_elements/EUThreadPage');
const EUProfile = require('./EUProfile');
const webdriver = require('selenium-webdriver');

const promise = webdriver.promise;
const flow = promise.controlFlow();

function Thread(driver, by, waitFor) {
  flow.execute(() => driver.saveScreenshot('eu_thread_0'));
  flow.execute(() => EUThreadPage.messageInput.find(driver, by).sendKeys('camp sasquatch fund for fun people'));
  flow.execute(() => driver.saveScreenshot('eu_thread_1'));
  flow.execute(() => EUThreadPage.settingsDropdown.find(driver, by).click());
  flow.execute(() => waitFor(EUThreadPage.profileLinkInSettingsDropdown));
  flow.execute(() => EUThreadPage.profileLinkInSettingsDropdown.find(driver, by).click());
  flow.execute(() => EUProfile(driver, by, waitFor));
}

module.exports = Thread;
