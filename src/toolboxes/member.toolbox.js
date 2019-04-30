/**
 * Used to create member with some roles
 * @param  {client}  client
 * @param  {Array}  [{element: form element, value: field value}] It will contain elements and values to create member
 * @param  {Array} [roleElement]
 */
export function createMember(client, memberDetails, roles, globalVariable) {
  client.navigate()
    .clickAddMember();
  memberDetails.map(field => client.enterDetails(field.element, field.value));
  client.getTempPassword(globalVariable);
  roles.map(role => client.setMemberRoles(role));
  client.createMember()
    .pause(2000)
    .waitForElementNotPresent('@createSuccessMessage', 'Success message is gone.');
}

export function changePasswordUsingTempPassword(client, memberUsername, memberPassword, tempPassword) {
  client.navigate()
    .enterMemberCreds(memberUsername, tempPassword)
    .submit()
    .validateUrlChange('change-password')
    .fillInPassword(memberPassword)
    .fillInConfirmPasswordInput(memberPassword)
    .clickSaveAndContinueButton()
    .validateUrlChange()
    .pause(3000);
}
