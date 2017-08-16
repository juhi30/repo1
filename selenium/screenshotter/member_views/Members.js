const MembersPage = require('../../page_elements/MembersPage');
const OrgPreferences = require('./OrgPreferences');
const webdriver = require('selenium-webdriver');

const promise = webdriver.promise;
const flow = promise.controlFlow();

function Members(driver, by, waitFor) {
  flow.execute(() => driver.get('https://dev.dev-rhinogram.com/settings/organization/members'));
  flow.execute(() => waitFor(MembersPage.addMemberButton, OrgPreferences));
  flow.execute(() => driver.saveScreenshot('members_0'));

  flow.execute(() => MembersPage.addMemberButton.find(driver, by).click());
  flow.execute(() => waitFor(MembersPage.addPhotoButton, OrgPreferences));
  flow.execute(() => driver.saveScreenshot('members_1'));

  flow.execute(() => MembersPage.addPhotoButton.find(driver, by).click());
  flow.execute(() => waitFor(MembersPage.closeAddPhotoButton, OrgPreferences));
  flow.execute(() => driver.saveScreenshot('members_2'));

  flow.execute(() => MembersPage.closeAddPhotoButton.find(driver, by).click());
  flow.execute(() => waitFor(MembersPage.addMemberButton, OrgPreferences));
  flow.execute(() => MembersPage.firstNameInput.find(driver, by).sendKeys('Walterborothingtonstreet'));
  flow.execute(() => driver.saveScreenshot('members_3'));

  flow.execute(() => OrgPreferences(driver, by, waitFor));
}

module.exports = Members;
