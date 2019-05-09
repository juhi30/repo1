import { verifyBillingPageForStandardPlan } from '../../toolboxes/billing.toolbox';
import { createMember } from '../../toolboxes/member.toolbox';
import { logout } from '../../toolboxes/login.toolbox';

const memberFeeder = require('../../feeder/member.feeder');


describe('Automated Tests - Billing', () => {
  test('Verifying billing UI', async () => {
    await verifyBillingPageForStandardPlan();
  });

  // test('Verifying Estimated Bill Section', async () => {
  //   await verifyEstimatedBillSection();
  // });

  test('Adding Members according to the plan', async () => {
    const memberDetails1 = [{ element: '@memberFirstName', value: memberFeeder.memberFirstName1 },
      { element: '@memberLastName', value: memberFeeder.memberLastName1 },
      { element: '@memberUsername', value: memberFeeder.memberUsername1 }];
    const roles1 = ['@adminRole', '@memberRole', '@billingAdminRole', '@memberAdminRole'];

    await createMember(memberDetails1, roles1);

    const memberDetails2 = [{ element: '@memberFirstName', value: memberFeeder.memberFirstName2 },
      { element: '@memberLastName', value: memberFeeder.memberLastName2 },
      { element: '@memberUsername', value: memberFeeder.memberUsername2 }];
    const roles2 = ['@adminRole', '@memberRole', '@billingAdminRole', '@memberAdminRole'];

    await createMember(memberDetails2, roles2);

    const memberDetails3 = [{ element: '@memberFirstName', value: memberFeeder.memberFirstName3 },
      { element: '@memberLastName', value: memberFeeder.memberLastName3 },
      { element: '@memberUsername', value: memberFeeder.memberUsername3 }];
    const roles3 = ['@adminRole', '@memberRole', '@billingAdminRole', '@memberAdminRole'];

    await createMember(memberDetails3, roles3);

    const memberDetails4 = [{ element: '@memberFirstName', value: memberFeeder.memberFirstName4 },
      { element: '@memberLastName', value: memberFeeder.memberLastName4 },
      { element: '@memberUsername', value: memberFeeder.memberUsername4 }];
    const roles4 = ['@adminRole', '@memberRole', '@billingAdminRole', '@memberAdminRole'];

    await createMember(memberDetails4, roles4);

    const memberDetails5 = [{ element: '@memberFirstName', value: memberFeeder.memberFirstName5 },
      { element: '@memberLastName', value: memberFeeder.memberLastName5 },
      { element: '@memberUsername', value: memberFeeder.memberUsername5 }];
    const roles5 = ['@adminRole', '@memberRole', '@billingAdminRole', '@memberAdminRole'];

    await createMember(memberDetails5, roles5);
  });

  test('Logout as CCR', async () => {
    await logout();
  });
});
