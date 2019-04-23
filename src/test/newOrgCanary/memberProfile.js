import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox')
const profilePage = client.page.MemberProfilePage();
const checkAuditLogs = client.page.AuditLogsPage();
const channel = client.page.ChannelsCreateEditPage();

describe('Automated Tests: Member Profile', () => {

  test('Required fields and validations on the profile page', async () => {

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

    await profilePage.navigate()
      .changeUserName(testConstants.newMemberUsername)
      .clickSaveProfileButton()
      .successMessage('@saveProfileSuccessMessage')

      .pause(1000)

      .changePassword(testConstants.memberPassword, testConstants.newMemberPassword)
      .successMessage('@passwordUpdationSuccessMessage')

    await checkAuditLogs.navigate()
      .validateAuditEntry(testConstants.memberName, 'Member', 'Edit', testConstants.memberName, '')

  });

  test('Member permissions on the profile page', async () => {

    await profilePage.navigate()
      .addRemovePermissions('@billingAdminSettingsCheck')
      .addRemovePermissions('@memberAdminSettingsCheck')
      .addRemovePermissions('@memberTemplatesSettingsCheck')
      .addRemovePermissions('@memberAdminSettingsCheck')
      .clickSaveProfileButton()
      .successMessage('@saveProfileSuccessMessage')

    await checkAuditLogs.navigate()
      .validateAuditEntry(testConstants.memberName, 'Member', 'Edit', testConstants.memberName, '')

  });

  test('Tags addition or removal on the profile page', async () => {

    await profilePage.navigate()
    await channel.addtag(testConstants.tagForMemberPage, '@tagCategory')

    await checkAuditLogs.navigate()
      .validateAuditEntry(testConstants.memberName, 'Tag', 'Add', testConstants.memberName, '')

  });

  test('Display of channels on the profile page', async () => {

    await profilePage.navigate()
      .displayChannels('@newPhoneTypeChannel')
      .displayChannels('@rhinoSecureTypeChannel')
  });

  test('Group addition on the profile page', async () => {

    await profilePage.navigate()
      .addGroup()
      .clickSaveProfileButton()
      .successMessage('@saveProfileSuccessMessage')

    await checkAuditLogs.navigate()
      .validateAuditEntry(testConstants.memberName, 'Member', 'Edit', testConstants.memberName, '')
  });

  test('Member availability hours on the profile page', async () => {

    await profilePage.navigate()
      .addAvailabilityHours('@availabilityHoursButton')
      .clickSaveProfileButton()
      .successMessage('@saveProfileSuccessMessage')

    await checkAuditLogs.navigate()
      .validateAuditEntry(testConstants.memberName, 'Member', 'Edit', testConstants.memberName, '')

  });

  test('Add photo for profile page', async () => {

    await profilePage.navigate()
      .addUpdateLogo('@addPhotoButton')

    await checkAuditLogs.navigate()
      .validateAuditEntry(testConstants.memberName, 'Member', 'Edit', testConstants.memberName, '')

  });
});
