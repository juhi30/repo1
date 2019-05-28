import { client } from 'nightwatch-api';
import {
  changeMemberUserName,
  changePasswordByProfile,
  addRemovePermissionsToMember,
  addTagWithMember,
  addGroupToMember,
  enableAvailabilityHoursToMember,
  addMemberProfilePhoto,
} from '../../toolboxes/member.toolbox';

const memberFeeder = require('../../feeder/member.feeder');
const tagsFeeder = require('../../feeder/tags.feeder');

describe('Automated Tests: Member Profile', () => {
  test('Required fields and validations on the profile page', async () => {
    const profilePage = client.page.MemberProfilePage();

    await profilePage.navigate()
      .clearFields('@firstNameInput')
      .clearFields('@lastNameInput')
      .clearFields('@userNameInput')

      .clickSaveProfileButton()

      .checkForValidation('@nullFirstNameValidator')
      .checkForValidation('@nullLastNameValidator')
      .checkForValidation('@nullUserNameValidator');
  });

  test('Change username and password and on the profile page', async () => {
    await changeMemberUserName(memberFeeder.newMemberUsername);

    await changePasswordByProfile(memberFeeder.memberPassword, memberFeeder.newMemberPassword);
  });

  test('Member permissions on the profile page', async () => {
    const auditLogs = client.page.AuditLogsPage();
    const permissions = ['@billingAdminSettingsCheck', '@memberAdminSettingsCheck', '@memberTemplatesSettingsCheck'];
    await addRemovePermissionsToMember(permissions);

    await auditLogs.navigate()
      .pause(2000)
      .validateAuditEntry(memberFeeder.memberName, 'Member', 'Edit', memberFeeder.memberName, '@categoryMember');
  });

  test('Tags addition or removal on the profile page', async () => {
    const auditLogs = client.page.AuditLogsPage();
    await addTagWithMember(tagsFeeder.tagForMemberPage, '@tagCategory');

    await auditLogs.navigate()
      .pause(2000)
      .validateAuditEntry(memberFeeder.memberName, 'Tag', 'Add', tagsFeeder.tagForMemberPage, '@categoryTag');
  });

  test('Display of channels on the profile page', async () => {
    const profilePage = client.page.MemberProfilePage();

    await profilePage.navigate()
      .displayChannels('@newPhoneTypeChannel')
      .displayChannels('@rhinoSecureTypeChannel');
  });

  test('Group addition on the profile page', async () => {
    const auditLogs = client.page.AuditLogsPage();
    await addGroupToMember('@selectGroup');

    await auditLogs.navigate()
      .pause(2000)
      .verify.urlContains('auditLog', 'Audit Logs Page is opened')
      .pause(1000)
      .validateAuditEntry(memberFeeder.memberName, 'Member', 'Edit', memberFeeder.memberName, '@categoryMember');
  });

  test('Member availability hours on the profile page', async () => {
    const auditLogs = client.page.AuditLogsPage();
    await enableAvailabilityHoursToMember();

    await auditLogs.navigate()
      .pause(2000)
      .validateAuditEntry(memberFeeder.memberName, 'Member', 'Edit', memberFeeder.memberName, '@categoryMember');
  });

  test('Add photo for profile page', async () => {
    await addMemberProfilePhoto();
  });
});
