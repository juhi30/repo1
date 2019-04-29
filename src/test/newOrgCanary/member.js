import { client } from 'nightwatch-api';

const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Members Page', () => {
  test('Adding a new Member with Admin Role', async () => {
    const member = client.page.MembersPage();

    await member.navigate()
      .clickAddMember()
      .enterDetails('@memberFirstName', testConstants.memberFirstName)
      .enterDetails('@memberLastName', testConstants.memberLastName)
      .enterDetails('@memberUsername', testConstants.memberUsername)
      .enterDetails('@memberEmailAddress', testConstants.memberEmail)
      .getTempPassword()
      .setMemberRoles('@adminRole')
      .setMemberRoles('@memberRole')
      .createMember()
      .pause(2000)
      .waitForElementNotPresent('@createSuccessMessage', 'Success message is gone.');
  });

  test('Logout as CCR', async () => {
    const logout = client.page.UniversalElements();

    await logout.clickLogout();
  });

  test('Login as New Member with Admin Role', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .enterMemberCreds(testConstants.memberUsername, global.TEMP_PASSWORD)
      .submit()
      .validateUrlChange('change-password')
      .fillInNewPasswordInput(testConstants.memberPassword)
      .fillInConfirmPasswordInput(testConstants.memberPassword)
      .clickSaveAndContinueButton()
      .validateUrlChange()
      .waitForElementNotPresent('@passwordUpdateSuccessMessage','Success Message is no longer present.')
  });

  test('Logout as member', async () => {
    const logout = client.page.UniversalElements();

    await logout.clickLogout();
  });
});
