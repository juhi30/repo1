import { createMember, changePasswordUsingTempPassword } from '../../toolboxes/member.toolbox';
import { logout } from '../../toolboxes/login.toolbox';

const memberFeeder = require('../../toolboxes/feeder/member.feeder');

describe('Members Page', () => {
  test('Adding a new Member with Admin Role', async () => {
    const memberDetails = [{ element: '@memberFirstName', value: memberFeeder.memberFirstName },
      { element: '@memberLastName', value: memberFeeder.memberLastName },
      { element: '@memberUsername', value: memberFeeder.memberUsername },
      { element: '@memberEmailAddress', value: memberFeeder.memberEmail }];
    const roles = ['@adminRole', '@memberRole'];

    await createMember(memberDetails, roles, 'NEW_CANARY_MEMBER_TEMP_PASSWORD');
  });

  test('Logout as CCR', async () => {
    await logout();
  });

  test('Login as New Member with Admin Role', async () => {
    const { memberUsername, memberPassword } = memberFeeder;
    const tempPassword = global.NEW_CANARY_MEMBER_TEMP_PASSWORD;

    await changePasswordUsingTempPassword(memberUsername, memberPassword, tempPassword);
  });

  test('Logout as member', async () => {
    await logout();
  });
});
