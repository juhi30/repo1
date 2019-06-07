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

describe('Organisation profile edit as member', () => {
  test('Login as Member (reset Password) and Edit Org Profile ', async () => {
    const { appointmentMemberUsername, memberPassword } = memberFeeder;
    const tempPassword = global.APPOINTMENT_MEMBER_TEMP_PASSWORD;

    await changePasswordUsingTempPassword(appointmentMemberUsername, memberPassword, tempPassword);
  });

  // test('Add Photo', async () => {
  //   const orgProfile = client.page.OrgProfilePage();
  //   const entry = client.page.AuditLogsPage();
  //   const universal = client.page.UniversalElements();

  //   await universal.clickOrgProfile();
  //   await orgProfile.addUpdateLogo('@addLogoButton', 'contact.png');

  //   await entry.navigate()
  //     .pause(1000)
  //     .validateAuditEntry(memberFeeder.appointmentMemberName, 'Org Profile', 'Edit', orgProfileFeeder.orgNewName, '@categoryOrgProfile');
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
      .validateAuditEntry(memberFeeder.appointmentMemberName, 'Org Profile', 'Edit', orgProfileFeeder.orgNewName, '@categoryOrgProfile');
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

  // test('logout as a Member', async () => {
  //   await logout();
  // });
});
