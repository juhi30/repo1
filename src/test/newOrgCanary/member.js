import { createMember, changePasswordUsingTempPassword } from '../../toolboxes/member.toolbox';
import { logout } from '../../toolboxes/login.toolbox';

const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Members Page', () => {
  test('Adding a new Member with Admin Role', async () => {
    const memberDetails = [{ element: '@memberFirstName', value: testConstants.memberFirstName },
      { element: '@memberLastName', value: testConstants.memberLastName },
      { element: '@memberUsername', value: testConstants.memberUsername },
      { element: '@memberEmailAddress', value: testConstants.memberEmail }];
    const roles = ['@adminRole', '@memberRole'];

    await createMember(memberDetails, roles, 'NEW_CANARY_MEMBER_TEMP_PASSWORD');
  });

  test('Logout as CCR', async () => {
    await logout();
  });

  test('Login as New Member with Admin Role', async () => {
    const { memberUsername, memberPassword } = testConstants;
    const tempPassword = global.NEW_CANARY_MEMBER_TEMP_PASSWORD;

    await changePasswordUsingTempPassword(memberUsername, memberPassword, tempPassword);
  });

  test('Logout as member', async () => {
    await logout();
  });
});
