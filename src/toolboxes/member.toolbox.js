import { client } from 'nightwatch-api';

const member = client.page.MembersPage();

/**
 * Used to create member with some roles
 * @param  {client}  client
 * @param  {Array}  [{element: form element, value: field value}] It will contain elements and values to create member
 * @param  {Array} [roleElement]
 */
export function createMember(memberDetails, roles, globalVariable) {
  member.navigate()
    .clickAddMember();
  memberDetails.map(field => client.enterDetails(field.element, field.value));
  member.getTempPassword(globalVariable);
  roles.map(role => client.setMemberRoles(role));
  member.createMember()
    .pause(2000)
    .waitForElementNotPresent('@createSuccessMessage', 'Success message is gone.');
}

export function changePasswordUsingTempPassword(memberUsername, memberPassword, tempPassword) {
  const login = client.page.LoginPage();

  login.navigate()
    .enterMemberCreds(memberUsername, tempPassword)
    .submit()
    .validateUrlChange('change-password')
    .fillInPassword(memberPassword)
    .fillInConfirmPasswordInput(memberPassword)
    .clickSaveAndContinueButton()
    .validateUrlChange()
    .pause(3000);
}
