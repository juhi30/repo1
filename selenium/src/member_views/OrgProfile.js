const OrgProfilePage = require('../../page_elements/OrgProfilePage');
const Templates = require('./Templates');
const webdriver = require('selenium-webdriver');

const promise = webdriver.promise;
const flow = promise.controlFlow();

function OrgProfile(driver, by, waitFor) {
  flow.execute(() => driver.get('https://dev.dev-rhinogram.com/settings/organization/profile'));
  flow.execute(() => waitFor(OrgProfilePage.addLogoButton, Templates));
  flow.execute(() => driver.saveScreenshot('org_profile_0'));

  flow.execute(() => OrgProfilePage.addLogoButton.find(driver, by).click());
  flow.execute(() => waitFor(OrgProfilePage.closeUploadPhotoIcon, Templates));
  flow.execute(() => driver.saveScreenshot('org_profile_1'));

  flow.execute(() => OrgProfilePage.closeUploadPhotoIcon.find(driver, by).click());
  flow.execute(() => waitFor(OrgProfilePage.addLogoButton, Templates));
  flow.execute(() => OrgProfilePage.saveOrgProfileButton.find(driver, by).click());
  flow.execute(() => waitFor(OrgProfilePage.saveToast, Templates));
  flow.execute(() => driver.saveScreenshot('org_profile_2'));

  flow.execute(() => Templates(driver, by, waitFor));
}

module.exports = OrgProfile;
