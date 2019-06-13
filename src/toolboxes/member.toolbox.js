import { client } from 'nightwatch-api';

const member = client.page.MembersPage();
const login = client.page.LoginPage();
const profilePage = client.page.MemberProfilePage();
const channel = client.page.ChannelsCreateEditPage();

/**
 * Used to create member with some roles
 * @param  {Array} memberDetails It will contain elements and values to create member like: [{element: form element, value: field value}]
 * @param  {Array} roles Roles elements that needs to be added while creating member
 */
export async function createMember(memberDetails, roles, globalVariable) {
  member.navigate()
    .clickAddMember();
  memberDetails.map(field => member.enterDetails(field.element, field.value));
  if (globalVariable) {
    member.getTempPassword(globalVariable);
  }
  roles.map(role => member.setMemberRoles(role));
  await member.clickCreateMemberButton()
    .pause(2000)
    .waitForElementNotPresent('@createSuccessMessage', 'Success message is gone.');
}

/**
 * Change member password by using member's temporary password
 * @param  {string} memberUsername Member's username
 * @param  {string} memberPassword Member's new password
 * @param  {string} tempPassword Member's temporary password
 */
export async function changePasswordUsingTempPassword(memberUsername, memberPassword, tempPassword) {
  await login.navigate()
    .enterMemberCreds(memberUsername, tempPassword)
    .submit()
    .validateUrlChange('change-password')
    .fillInPassword(memberPassword)
    .fillInConfirmPasswordInput(memberPassword)
    .clickSaveAndContinueButton()
    .validateUrlChange()
    .waitForElementNotPresent('@passwordUpdateSuccessMessage')
    .pause(1000);
}

export async function createTempPasswordByCCR(memberName, globalVariable) {
  await member.navigate()
    .pause(1000)
    .selectMember(memberName)
    .createTempPassword()
    .getTempPassword(globalVariable)
    .waitForElementNotPresent('@updateSuccessMessage')
    .pause(1000);
}

export async function changeMemberUserName(newUserName) {
  await profilePage.navigate()
    .changeUserName(newUserName)
    .clickSaveProfileButton()
    .successMessage('@saveProfileSuccessMessage')
    .waitForElementNotPresent('@saveProfileSuccessMessage');
}

export async function changePasswordByProfile(oldPassword, newPassword) {
  await profilePage.navigate()
    .changePassword(oldPassword, newPassword)
    .successMessage('@passwordUpdationSuccessMessage')
    .waitForElementNotPresent('@passwordUpdationSuccessMessage');
}

export async function addRemovePermissionsToMember(permissions) {
  await profilePage.navigate();
  permissions.map(permission => profilePage.addRemovePermissions(permission));
  await profilePage.clickSaveProfileButton()
    .successMessage('@saveProfileSuccessMessage')
    .waitForElementNotPresent('@saveProfileSuccessMessage');
}

export async function addTagWithMember(tagName, tagCategory) {
  await profilePage.navigate();
  await channel.addTag(tagName, tagCategory)
    .pause(1000);
}

export async function addGroupToMember(groupElement) {
  await profilePage.navigate()
    .addGroup(groupElement)
    .pause(1000)
    .clickSaveProfileButton();
}

export async function enableAvailabilityHoursToMember() {
  await profilePage.navigate()
    .addAvailabilityHours('@availabilityHoursButton')
    .clickSaveProfileButton()
    .successMessage('@saveProfileSuccessMessage')
    .waitForElementNotPresent('@saveProfileSuccessMessage');
}

export async function addMemberProfilePhoto() {
  await profilePage.navigate()
    .addUpdateLogo('@addPhotoButton');
}

export async function activateDeactivateMember(memberName, button, alertMessage, confirmButton, successMessage) {
  await member.navigate()
    .selectMember(memberName)
    .reactivateDeactivateMember(button)
    .verifyAlerts(alertMessage)
    .confirmReactivateDeactivateMember(confirmButton)
    .waitForElementVisible(successMessage, 'Member is updated successfully and Deactivated/Reactivated as well.')
    .waitForElementNotPresent(successMessage);
}

export async function verifyAlertMessages(alertMessage) {
  member.verifyAlerts(alertMessage);
}
