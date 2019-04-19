import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox')
const profilePage = client.page.MemberProfilePage();
const logout = client.page.UniversalElements();

describe('Automated Tests: Member Profile', () => {

  test('check required fields and validations on the profile page', async () => {

    await profilePage.navigate()
      .clearAllRequiredFields('@firstNameInput')
      .clearAllRequiredFields('@lastNameInput')
      .clearAllRequiredFields('@usernameInput')

      .clickSaveProfileButton()

      .checkForValidation('@nullFirstNameValidator')
      .checkForValidation('@nullLastNameValidator')
      .checkForValidation('@nullUsernameValidator')
  });

  test('check for change username and password and on the profile page', async () => {

    await profilePage.navigate()
      .changeUsername()

      .clickSaveProfileButton()
      .successMessage('@saveProfileSuccessMessage')
      .pause(1000)
      .changePassword()
      .successMessage('@passwordUpdationSuccessMessage')
  });

  test('check for member permissions on the profile page', async () => {

    await profilePage.navigate()
      .checkMemberPermissions('@billingAdminSettingsCheck')
      .checkMemberPermissions('@memberAdminSettingsCheck')
      .checkMemberPermissions('@memberTemplatesSettingsCheck')
      .checkMemberPermissions('@memberAdminSettingsCheck')
      .clickSaveProfileButton()
      .successMessage('@saveProfileSuccessMessage')
  });

  test('check for tags addition or removal on the profile page', async () => {

    await profilePage.navigate()
      .addTag(testConstants.tagNameNewPhoneType, '@customTag')
  });

  test('check for display of channels on the profile page', async () => {

    await profilePage.navigate()
      .displayChannels('@newPhoneTypeChannel')
      .displayChannels('@rhinoSecureTypeChannel')
  });

  test('check for group addition or removal on the profile page', async () => {

    await profilePage.navigate()
      .addGroups()
      .clickSaveProfileButton()
      .successMessage('@saveProfileSuccessMessage')
  });

  test('check for member availability hours on the profile page', async () => {

    await profilePage.navigate()
      .addAvailabilityHours('@availabilityHoursButton')
      .clickSaveProfileButton()
      .successMessage('@saveProfileSuccessMessage')
  });

  test('Update photo for profile page', async () => {

    await profilePage.navigate()
      .addUpdateLogo('@addPhotoButton')

  });
});
