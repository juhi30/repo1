import { client } from 'nightwatch-api';
import { changePasswordUsingTempPassword } from '../../../toolboxes/member.toolbox';
import { logout } from '../../../toolboxes/login.toolbox';

const loginFeeder = require('../../../feeder/login.feeder');
const orgProfileFeeder = require('../../../feeder/orgProfile.feeder');
const memberFeeder = require('../../../feeder/member.feeder');

describe('Organization Profile Edit as CCR', () => {
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
      .validateAuditEntryWithNoDataFound('Edit', 'No Data Found', loginFeeder.appointmentCcrLogin, 'Org Profile', '@categoryOrgProfile');
  });

  test('logout as CCR', async () => {
    await logout();
  });
});

describe('Organization profile edit as member', () => {
  test('Login as Member (reset Password) and Edit Org Profile ', async () => {
    const { memberPassword } = memberFeeder;
    const tempPassword = global.APPOINTMENT_MEMBER_TEMP_PASSWORD;
    const login = client.page.LoginPage();

    await changePasswordUsingTempPassword(global.apptUsername, memberPassword, tempPassword);
    // Below lines have been added to by pass confirm email modal
    await login.clickConfirmEmailOnEmailModal()
      .pause(1000);
  });

  test('Add Photo', async () => {
    const orgProfile = client.page.OrgProfilePage();
    const entry = client.page.AuditLogsPage();
    const universal = client.page.UniversalElements();

    await universal.clickOrgProfile();
    await orgProfile.addUpdateLogo('@addLogoButton', 'contact.png');

    await entry.navigate()
      .pause(1000)
      .validateAuditEntry(memberFeeder.appointmentMemberName, 'Org Profile', 'Edit', orgProfileFeeder.orgNewName, '@categoryOrgProfile');
  });

  test('Edit Organization Profile as member', async () => {
    const orgProfile = client.page.OrgProfilePage();
    const entry = client.page.AuditLogsPage();
    const universal = client.page.UniversalElements();

    await universal.clickOrgProfile();
    await orgProfile.renderPageElements('@updateLogoButton');

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
      .validateAuditEntry(memberFeeder.appointmentMemberName, 'Org Profile', 'Edit', orgProfileFeeder.orgNewName, '@categoryOrgProfile');
  });

  test('Update Photo', async () => {
    const orgProfile = client.page.OrgProfilePage();
    const entry = client.page.AuditLogsPage();
    const universal = client.page.UniversalElements();

    await universal.clickOrgProfile();
    await orgProfile.addUpdateLogo('@updateLogoButton', 'rhinogram.png');

    await entry.navigate()
      .pause(3000)
      .validateAuditEntry(memberFeeder.memberName, 'Org Profile', 'Edit', orgProfileFeeder.orgNewName, '@categoryOrgProfile');
  });
});
