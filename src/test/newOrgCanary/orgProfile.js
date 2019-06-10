import { client } from 'nightwatch-api';
import { ccrLogin, memberLogin, logout } from '../../toolboxes/login.toolbox';
import { selectOrganizationByCCR } from '../../toolboxes/organization.toolbox';

const loginFeeder = require('../../feeder/login.feeder');
const orgProfileFeeder = require('../../feeder/orgProfile.feeder');
const memberFeeder = require('../../feeder/member.feeder');

describe('Organisation profile edit as member', () => {
  test('Login as a Member1', async () => {
    await memberLogin(memberFeeder.newMemberUsername, memberFeeder.newMemberPassword);
  });

  // When the org is being updated for the first time
  // test('Add Photo', async () => {
  //   const orgProfile = client.page.OrgProfilePage();
  //   const entry = client.page.AuditLogsPage();
  //   const universal = client.page.UniversalElements();

  //   await universal.clickOrgProfile();
  //   await orgProfile.addUpdateLogo('@addLogoButton', 'contact.png');

  //   await entry.navigate()
  //     .pause(1000)
  //     .validateAuditEntryWithNoDataFound('Edit', 'No Data Found', memberFeeder.memberName, 'Org Profile', '@categoryOrgProfile');
  // });

  test('Edit Organization Profile as member', async () => {
    const orgProfile = client.page.OrgProfilePage();
    const entry = client.page.AuditLogsPage();
    const universal = client.page.UniversalElements();

    await universal.clickOrgProfile();
    await orgProfile.renderPageElements('@addLogoButton');

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
      .validateAuditEntryWithNoDataFound('Edit', 'No Data Found', memberFeeder.memberName, 'Org Profile', '@categoryOrgProfile');
  });

  // test('Update Photo', async () => {
  //   const orgProfile = client.page.OrgProfilePage();
  //   const entry = client.page.AuditLogsPage();
  //   const universal = client.page.UniversalElements();

  //   await universal.clickOrgProfile();
  //   await orgProfile.addUpdateLogo('@updateLogoButton', 'rhinogram.png');

  //   await entry.navigate()
  //     .pause(3000)
  //     .validateAuditEntry(memberFeeder.memberName, 'Org Profile', 'Edit', orgProfileFeeder.orgNewName, '@categoryOrgProfile');
  // });

  test('logout as a Member', async () => {
    await logout();
  });
});

describe('Organization Profile Edit as CCR', () => {
  test('login as CCR into the organization', async () => {
    await ccrLogin(loginFeeder.ccrLogin, loginFeeder.ccrPassword);
    await selectOrganizationByCCR(orgProfileFeeder.orgNewName, '@newOrgSearchResult');
  });

  test('Edit Organization Profile as CCR', async () => {
    const orgProfile = client.page.OrgProfilePage();
    const entry = client.page.AuditLogsPage();
    const universal = client.page.UniversalElements();

    await universal.clickOrgProfile();
    await orgProfile.renderPageElements('@addLogoButton');

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
      .validateAuditEntry(loginFeeder.ccrLogin, 'Org Profile', 'Edit', orgProfileFeeder.orgNewName, '@categoryOrgProfile');
  });

  test('logout as CCR', async () => {
    await logout();
  });
});
