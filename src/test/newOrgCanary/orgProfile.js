import { client } from 'nightwatch-api';

const loginFeeder = require('../../toolboxes/feeder/login.feeder');
const orgProfileFeeder = require('../../toolboxes/feeder/orgProfile.feeder');
const memberFeeder = require('../../toolboxes/feeder/member.feeder');

describe('Organisation profile edit as member', () => {
  // When the org is being updated for the first time
  test('Edit Organization Profile as member', async () => {
    const orgProfile = client.page.OrgProfilePage();
    const entry = client.page.AuditLogsPage();

    await orgProfile.navigate()
      .renderPageElements('@addLogoButton');

    await orgProfile
      .updateOrgProfileMandatoryFields(orgProfileFeeder.orgNewName,
        orgProfileFeeder.orgNewAddress,
        orgProfileFeeder.orgNewCity,
        orgProfileFeeder.orgNewState,
        orgProfileFeeder.orgNewZip)
      .updateOrgProfileOtherFields(orgProfileFeeder.orgNewAddress2,
        orgProfileFeeder.orgNewPhone,
        orgProfileFeeder.orgNewEmail,
        orgProfileFeeder.orgNewcontactName,
        orgProfileFeeder.orgNewcontactPhone,
        orgProfileFeeder.orgNewcontactEmail)
      .clickSaveProfile()
      .pause(1000);

    await entry.navigate()
      .pause(1000)
      .validateAuditEntryWithNoDataFound('Edit', 'No Data Found', memberFeeder.memberName, 'Org Profile');
  });

  test('Add Photo', async () => {
    const orgProfile = client.page.OrgProfilePage();
    const entry = client.page.AuditLogsPage();

    await orgProfile.navigate()
      .addUpdateLogo('@addLogoButton');
    orgProfile.pause(1000);

    await entry.navigate()
      .pause(1000)
      .validateAuditEntry(memberFeeder.memberName, 'Org Profile', 'Edit', orgProfileFeeder.orgNewName);
  });

  test('Update Photo', async () => {
    const orgProfile = client.page.OrgProfilePage();
    const entry = client.page.AuditLogsPage();

    await orgProfile.navigate()
      .addUpdateLogo('@updateLogoButton');

    await entry.navigate()
      .pause(3000)
      .validateAuditEntry(memberFeeder.memberName, 'Org Profile', 'Edit', orgProfileFeeder.orgNewName);
  });

  test('logout as a Member', async () => {
    const logout = client.page.UniversalElements();

    await logout.clickLogout();
  });
});

describe('Organization Profile Edit as CCR', () => {
  test('login as CCR into the organization', async () => {
    const login = client.page.LoginPage();
    const org = client.page.UniversalElements();
    const setup = client.page.AccountSetupPage();

    await login.navigate()
      .enterCSRCreds(loginFeeder.ccrLogin, loginFeeder.ccrPassword)
      .submit()
      .pause(2000)
      .validateUrlChange('/selectorg');

    org.waitForElementVisible('@searchInputForOrg', 'Search Input is visible');

    org.searchForOrganization(orgProfileFeeder.orgNewName, '@newOrgSearchResult')
      .ccrOrgLogin('@newOrgSearchResult');

    setup.pause(1000)
      .getOrgId();
  });

  test('Edit Organization Profile as CCR', async () => {
    const orgProfile = client.page.OrgProfilePage();
    const entry = client.page.AuditLogsPage();

    await orgProfile.navigate()
      .renderPageElements('@updateLogoButton');

    await orgProfile.verifyBillingIdAndIntegrationOptions()
      .updateOrgProfileMandatoryFields(orgProfileFeeder.orgNewName,
        orgProfileFeeder.orgNewAddress,
        orgProfileFeeder.orgNewCity,
        orgProfileFeeder.orgNewState,
        orgProfileFeeder.orgNewZip)
      .updateOrgProfileOtherFields(orgProfileFeeder.orgNewAddress2,
        orgProfileFeeder.orgNewPhone,
        orgProfileFeeder.orgNewEmail,
        orgProfileFeeder.orgNewcontactName,
        orgProfileFeeder.orgNewcontactPhone,
        orgProfileFeeder.orgNewcontactEmail)
      .enableDisableToggles('@integrationToggle')
      .updateIntegrationValue(orgProfileFeeder.orgNewIntegration)
      .clickSaveProfile();

    await entry.navigate()
      .pause(3000)
      .validateAuditEntry(loginFeeder.ccrLogin, 'Org Profile', 'Edit', orgProfileFeeder.orgNewName);
  });

  test('logout as CCR', async () => {
    const logout = client.page.UniversalElements();

    await logout.clickLogout();
  });
});
