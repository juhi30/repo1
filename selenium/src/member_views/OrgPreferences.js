const OrgPreferencesPage = require('../../page_elements/OrgPreferencesPage');
const OrgProfile = require('./OrgProfile');
const webdriver = require('selenium-webdriver');

const promise = webdriver.promise;
const flow = promise.controlFlow();

function OrgPreferences(driver, by, waitFor) {
  flow.execute(() => driver.get('https://dev.dev-rhinogram.com/settings/organization/preferences'));
  flow.execute(() => waitFor(OrgPreferencesPage.saveButton, OrgProfile));
  flow.execute(() => driver.saveScreenshot('org_preferences_0'));

  flow.execute(() => OrgPreferencesPage.toggleSoundOn.find(driver, by).click());
  flow.execute(() => OrgPreferencesPage.saveButton.find(driver, by).click());
  flow.execute(() => waitFor(OrgPreferencesPage.saveToast, OrgProfile));
  flow.execute(() => driver.saveScreenshot('org_preferences_1'));

  flow.execute(() => OrgPreferencesPage.toggleSoundOff.find(driver, by).click());
  flow.execute(() => OrgPreferencesPage.saveButton.find(driver, by).click());
  flow.execute(() => waitFor(OrgPreferencesPage.saveToast, OrgProfile));
  flow.execute(() => driver.saveScreenshot('org_preferences_2'));

  flow.execute(() => OrgProfile(driver, by, waitFor));
}

module.exports = OrgPreferences;
