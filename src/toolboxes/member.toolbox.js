import { client } from 'nightwatch-api';

const member = client.page.MembersPage();

/**
 * Used to create member with some roles
 * @param  {Array}  memberDetails It will contain elements and values to create member like: [{element: form element, value: field value}]
 * @param  {Array} roles Roles elements that needs to be added while creating member
 */
export async function createMember(memberDetails, roles, globalVariable) {
  member.navigate()
    .clickAddMember();
  memberDetails.map(field => member.enterDetails(field.element, field.value));
  if (globalVariable !== undefined) {
    member.getTempPassword(globalVariable);
  }
  roles.map(role => member.setMemberRoles(role));
  await member.clickCreateMemberButton()
    .pause(2000)
    .waitForElementNotPresent('@createSuccessMessage', 'Success message is gone.');
}

/**
 * Change member password by using member's temporary password
 * @param  {string}  memberUsername Member's username
 * @param  {string} memberPassword Member's new password
 * @param  {string} tempPassword Member's temporary password
 */
export async function changePasswordUsingTempPassword(memberUsername, memberPassword, tempPassword) {
  const login = client.page.LoginPage();

  await login.navigate()
    .enterMemberCreds(memberUsername, tempPassword)
    .submit()
    .validateUrlChange('change-password')
    .fillInPassword(memberPassword)
    .fillInConfirmPasswordInput(memberPassword)
    .clickSaveAndContinueButton()
    .validateUrlChange()
    .pause(3000);
}
