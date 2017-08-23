const ProfilePage = require('../../page_elements/ProfilePage');
const Preferences = require('./Preferences');
const webdriver = require('selenium-webdriver');

const promise = webdriver.promise;
const flow = promise.controlFlow();

function Profile(driver, by, waitFor) {
  flow.execute(() => driver.get('https://dev.dev-rhinogram.com/settings/profile'));
  flow.execute(() => waitFor(ProfilePage.firstNameInput, Preferences));
  flow.execute(() => driver.saveScreenshot('profile_0'));

  flow.execute(() => ProfilePage.firstNameInput.find(driver, by).click());
  flow.execute(() => ProfilePage.firstNameInput.find(driver, by).clear());
  flow.execute(() => ProfilePage.changePasswordLink.find(driver, by).click());
  flow.execute(() => waitFor(ProfilePage.newPassInput, Preferences));
  flow.execute(() => driver.saveScreenshot('profile_1'));

  flow.execute(() => ProfilePage.saveChangesButton.find(driver, by).click());
  flow.execute(() => driver.sleep(1000));
  flow.execute(() => driver.saveScreenshot('profile_2'));

  flow.execute(() => Preferences(driver, by, waitFor));
}

module.exports = Profile;
