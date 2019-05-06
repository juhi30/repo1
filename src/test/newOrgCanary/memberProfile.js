import { client } from 'nightwatch-api';

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
    const profilePage = client.page.MemberProfilePage();
    const auditLogs = client.page.AuditLogsPage();

    await profilePage.navigate()
      .changeUserName(memberFeeder.newMemberUsername)
      .clickSaveProfileButton()
      .successMessage('@saveProfileSuccessMessage')

      .pause(1000)

      .changePassword(memberFeeder.memberPassword, memberFeeder.newMemberPassword)
      .successMessage('@passwordUpdationSuccessMessage');

    await auditLogs.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Member', 'Edit', memberFeeder.memberName, '');
  });

  test('Member permissions on the profile page', async () => {
    const profilePage = client.page.MemberProfilePage();
    const auditLogs = client.page.AuditLogsPage();

    await profilePage.navigate()
      .addRemovePermissions('@billingAdminSettingsCheck')
      .addRemovePermissions('@memberAdminSettingsCheck')
      .addRemovePermissions('@memberTemplatesSettingsCheck')
      .addRemovePermissions('@memberAdminSettingsCheck')
      .clickSaveProfileButton()
      .successMessage('@saveProfileSuccessMessage');

    await auditLogs.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Member', 'Edit', memberFeeder.memberName, '');
  });

  test('Tags addition or removal on the profile page', async () => {
    const profilePage = client.page.MemberProfilePage();
    const auditLogs = client.page.AuditLogsPage();
    const channel = client.page.ChannelsCreateEditPage();

    await profilePage.navigate();
    await channel.addtag(tagsFeeder.tagForMemberPage, '@tagCategory');

    await auditLogs.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Tag', 'Add', memberFeeder.memberName, '');
  });

  test('Display of channels on the profile page', async () => {
    const profilePage = client.page.MemberProfilePage();

    await profilePage.navigate()
      .displayChannels('@newPhoneTypeChannel')
      .displayChannels('@rhinoSecureTypeChannel');
  });

  test('Group addition on the profile page', async () => {
    const profilePage = client.page.MemberProfilePage();
    const auditLogs = client.page.AuditLogsPage();

    await profilePage.navigate()
      .addGroup()
      .pause(1000)
      .clickSaveProfileButton()
      .successMessage('@saveProfileSuccessMessage');

    await auditLogs.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Member', 'Edit', memberFeeder.memberName, '');
  });

  test('Member availability hours on the profile page', async () => {
    const profilePage = client.page.MemberProfilePage();
    const auditLogs = client.page.AuditLogsPage();

    await profilePage.navigate()
      .addAvailabilityHours('@availabilityHoursButton')
      .clickSaveProfileButton()
      .successMessage('@saveProfileSuccessMessage');

    await auditLogs.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Member', 'Edit', memberFeeder.memberName, '');
  });

  test('Add photo for profile page', async () => {
    const profilePage = client.page.MemberProfilePage();
    const auditLogs = client.page.AuditLogsPage();

    await profilePage.navigate()
      .addUpdateLogo('@addPhotoButton');

    await auditLogs.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Member', 'Edit', memberFeeder.memberName, '');
  });
});
