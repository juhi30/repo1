import { client } from 'nightwatch-api';
import { logout } from '../../toolboxes/login.toolbox';
import {
  verifyAlertMessages, activateDeactivateMember, createMember,
  changePasswordUsingTempPassword,
} from '../../toolboxes/member.toolbox';

const memberFeeder = require('../../feeder/member.feeder');
const helper = require('../../toolboxes/helpers.toolbox');

describe('Member Creation test Cases for Billing Organization', () => {
  const member = client.page.MembersPage();

  test('Adding Members according to the plan', async () => {
    const memberDetails1 = [{ element: '@memberFirstName', value: memberFeeder.memberFirstName1 },
      { element: '@memberLastName', value: memberFeeder.memberLastName1 },
      { element: '@memberUsername', value: memberFeeder.memberUsername1 },
      { element: '@memberEmailAddress', value: `${memberFeeder.email}+${helper.randomNumber}@gmail.com` }];
    const roles1 = ['@adminRole', '@memberRole', '@billingAdminRole'];

    const memberDetails2 = [{ element: '@memberFirstName', value: memberFeeder.firstMemberName2 },
      { element: '@memberLastName', value: memberFeeder.lastMemberName2 },
      { element: '@memberUsername', value: memberFeeder.username2 }];
    const roles2 = ['@adminRole', '@memberRole', '@billingAdminRole'];

    const memberDetails3 = [{ element: '@memberFirstName', value: memberFeeder.memberFirstName3 },
      { element: '@memberLastName', value: memberFeeder.memberLastName3 },
      { element: '@memberUsername', value: memberFeeder.memberUsername3 }];
    const roles3 = ['@adminRole', '@memberRole', '@billingAdminRole'];

    const memberDetails4 = [{ element: '@memberFirstName', value: memberFeeder.memberFirstName4 },
      { element: '@memberLastName', value: memberFeeder.memberLastName4 },
      { element: '@memberUsername', value: memberFeeder.memberUsername4 }];
    const roles4 = ['@adminRole', '@memberRole', '@billingAdminRole'];

    const memberDetails5 = [{ element: '@memberFirstName', value: memberFeeder.memberFirstName5 },
      { element: '@memberLastName', value: memberFeeder.memberLastName5 },
      { element: '@memberUsername', value: memberFeeder.memberUsername5 }];
    const roles5 = ['@adminRole', '@memberRole', '@billingAdminRole'];

    await createMember(memberDetails1, roles1, 'BILLING_MEMBER_TEMP_PASSWORD');
    await createMember(memberDetails2, roles2);
    await createMember(memberDetails3, roles3);
    await createMember(memberDetails4, roles4);
    await createMember(memberDetails5, roles5);
  });

  test('verifying alert message on a member addon', async () => {
    await member.navigate()
      .clickAddMember();

    verifyAlertMessages('@createAlertMessage');

    const memberDetails6 = [{ element: '@memberFirstName', value: memberFeeder.memberFirstName6 },
      { element: '@memberLastName', value: memberFeeder.memberLastName6 },
      { element: '@memberUsername', value: memberFeeder.memberUsername6 }];
    const roles6 = ['@adminRole', '@memberRole', '@billingAdminRole'];

    await createMember(memberDetails6, roles6);
  });

  test('verifying alert message on deactivating a member', async () => {
    await activateDeactivateMember(memberFeeder.memberName6, '@deactivateMemberButton', '@deleteAlertMessage', '@deactivateInModal', '@updateSuccessMessage');
  });

  test('verifying alert message on reactivating a member', async () => {
    await activateDeactivateMember(memberFeeder.memberName6, '@activateMember', '@reactivateAlertMessage', '@reactivateInModal', '@updateSuccessMessage');
  });

  test('logout as CCR', async () => {
    await logout();
  });

  test('Login as New Member with Admin Roles', async () => {
    const { memberUsername1, memberPassword } = memberFeeder;
    const tempPassword = global.BILLING_MEMBER_TEMP_PASSWORD;
    const login = client.page.LoginPage();

    await changePasswordUsingTempPassword(memberUsername1, memberPassword, tempPassword);
    // Below lines have been added to by pass confirm email modal
    await login.clickConfirmEmailOnEmailModal()
      .pause(1000);
  });

  test('logout as Member', async () => {
    await logout();
  });
});
