import { client } from 'nightwatch-api';

const memberFeeder = require('../../toolboxes/feeder/member.feeder');

describe('Members Page', () => {
  test('Adding a new Member with Admin Role', async () => {
    const member = client.page.MembersPage();

    await member.navigate()
      .clickAddMember()
      .enterDetails('@memberFirstName', memberFeeder.memberFirstName)
      .enterDetails('@memberLastName', memberFeeder.memberLastName)
      .enterDetails('@memberUsername', memberFeeder.memberUsername)
      .enterDetails('@memberEmailAddress', memberFeeder.memberEmail)
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
      .enterMemberCreds(memberFeeder.memberUsername, global.TEMP_PASSWORD)
      .submit()
      .validateUrlChange('change-password')
      .fillInPassword(memberFeeder.memberPassword)
      .fillInConfirmPasswordInput(memberFeeder.memberPassword)
      .clickSaveAndContinueButton()
      .validateUrlChange()
      .pause(3000);
  });

  test('Logout as member', async () => {
    const logout = client.page.UniversalElements();

    await logout.clickLogout();
  });
});
