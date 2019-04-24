import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox')
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
      .checkForValidation('@nullUserNameValidator')
  });

  test('Change username and password and on the profile page', async () => {

    const profilePage = client.page.MemberProfilePage();
    const auditLogs = client.page.AuditLogsPage();

    await profilePage.navigate()
      .changeUserName(testConstants.newMemberUsername)
      .clickSaveProfileButton()
      .successMessage('@saveProfileSuccessMessage')

      .pause(1000)

      .changePassword(testConstants.memberPassword, testConstants.newMemberPassword)
      .successMessage('@passwordUpdationSuccessMessage')

    await auditLogs.navigate()
      .validateAuditEntry(testConstants.memberName, 'Member', 'Edit', testConstants.memberName, '')

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
      .successMessage('@saveProfileSuccessMessage')

    await auditLogs.navigate()
      .validateAuditEntry(testConstants.memberName, 'Member', 'Edit', testConstants.memberName, '')

  });

  test('Tags addition or removal on the profile page', async () => {

    const profilePage = client.page.MemberProfilePage();
    const auditLogs = client.page.AuditLogsPage();
    const channel = client.page.ChannelsCreateEditPage();

    await profilePage.navigate()
    await channel.addtag(testConstants.tagForMemberPage, '@tagCategory')

    await auditLogs.navigate()
      .validateAuditEntry(testConstants.memberName, 'Tag', 'Add', testConstants.memberName, '')

  });

  test('Display of channels on the profile page', async () => {

    const profilePage = client.page.MemberProfilePage();

    await profilePage.navigate()
      .displayChannels('@newPhoneTypeChannel')
      .displayChannels('@rhinoSecureTypeChannel')
  });

  test('Group addition on the profile page', async () => {

    const profilePage = client.page.MemberProfilePage();
    const auditLogs = client.page.AuditLogsPage();

    await profilePage.navigate()
      .addGroup()
      .clickSaveProfileButton()
      .successMessage('@saveProfileSuccessMessage')

    await auditLogs.navigate()
      .validateAuditEntry(testConstants.memberName, 'Member', 'Edit', testConstants.memberName, '')
  });

  test('Member availability hours on the profile page', async () => {

    const profilePage = client.page.MemberProfilePage();
    const auditLogs = client.page.AuditLogsPage();

    await profilePage.navigate()
      .addAvailabilityHours('@availabilityHoursButton')
      .clickSaveProfileButton()
      .successMessage('@saveProfileSuccessMessage')

    await auditLogs.navigate()
      .validateAuditEntry(testConstants.memberName, 'Member', 'Edit', testConstants.memberName, '')

  });

  test('Add photo for profile page', async () => {

    const profilePage = client.page.MemberProfilePage();
    const auditLogs = client.page.AuditLogsPage();

    await profilePage.navigate()
      .addUpdateLogo('@addPhotoButton')

    await auditLogs.navigate()
      .validateAuditEntry(testConstants.memberName, 'Member', 'Edit', testConstants.memberName, '')

  });
});
