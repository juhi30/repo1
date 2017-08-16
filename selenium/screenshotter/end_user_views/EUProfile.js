const EUProfilePage = require('../../page_elements/EUProfilePage');
const webdriver = require('selenium-webdriver');

const promise = webdriver.promise;
const flow = promise.controlFlow();

function EUProfile(driver, by, waitFor) {
  flow.execute(() => waitFor(EUProfilePage.usernameInput));
  flow.execute(() => driver.saveScreenshot('eu_profile_0'));
  flow.execute(() => driver.quit());
}

module.exports = EUProfile;
