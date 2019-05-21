import { createMember, changePasswordUsingTempPassword } from '../../toolboxes/member.toolbox';
import { logout } from '../../toolboxes/login.toolbox';

const memberFeeder = require('../../feeder/member.feeder');

describe('Members Page', () => {
  test('Adding a new Member with Admin Role', async () => {
    const memberDetails = [{ element: '@memberFirstName', value: memberFeeder.memberFirstName },
      { element: '@memberLastName', value: memberFeeder.memberLastName },
      { element: '@memberUsername', value: memberFeeder.memberUsername },
      { element: '@memberEmailAddress', value: memberFeeder.memberEmail }];
    const roles = ['@adminRole', '@memberRole', '@billingAdminRole'];

    await createMember(memberDetails, roles, 'NEW_CANARY_MEMBER_TEMP_PASSWORD');
  });

  test('Adding another Member with Admin Role', async () => {
    const memberDetails2 = [{ element: '@memberFirstName', value: memberFeeder.memberFirstName2 },
      { element: '@memberLastName', value: memberFeeder.memberLastName2 },
      { element: '@memberUsername', value: memberFeeder.memberUsername2 }];
    const roles = ['@adminRole', '@memberRole'];

    await createMember(memberDetails2, roles, 'NEW_CANARY_MEMBER2_TEMP_PASSWORD');
  });

  test('Logout as CCR', async () => {
    await logout();
  });

  test('Login as second Member with Admin Role', async () => {
    const { memberUsername2, memberPassword } = memberFeeder;
    const tempPassword2 = global.NEW_CANARY_MEMBER2_TEMP_PASSWORD;

    await changePasswordUsingTempPassword(memberUsername2, memberPassword, tempPassword2);
  });

  test('Logout as member 2', async () => {
    await logout();
  });

  test('Login as New Member with Admin Role', async () => {
    const { memberUsername, memberPassword } = memberFeeder;
    const tempPassword = global.NEW_CANARY_MEMBER_TEMP_PASSWORD;

    await changePasswordUsingTempPassword(memberUsername, memberPassword, tempPassword);
  });

  test('Logout as member 1', async () => {
    await logout();
  });
});
