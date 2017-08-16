const PreferencesPage = require('../../page_elements/PreferencesPage');
const AutoResponse = require('./AutoResponse');
const webdriver = require('selenium-webdriver');

const promise = webdriver.promise;
const flow = promise.controlFlow();

function Preferences(driver, by, waitFor) {
  flow.execute(() => driver.get('https://dev.dev-rhinogram.com/settings/preferences'));
  flow.execute(() => waitFor(PreferencesPage.saveChangesButton, AutoResponse));
  flow.execute(() => driver.saveScreenshot('preferences_0'));
  flow.execute(() => AutoResponse(driver, by, waitFor));
}

module.exports = Preferences;
