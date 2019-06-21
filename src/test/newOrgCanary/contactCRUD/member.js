import { client } from 'nightwatch-api';
import { createMember, changePasswordUsingTempPassword } from '../../../toolboxes/member.toolbox';
import { logout } from '../../../toolboxes/login.toolbox';

const memberFeeder = require('../../../feeder/member.feeder');
const helper = require('../../../toolboxes/helpers.toolbox');

describe('Contact Crud Suite: Members Page', () => {
  test('Contact Crud Suite: Adding a new Member with Admin Role', async () => {
    const memberDetails = [{ element: '@memberFirstName', value: memberFeeder.contactCrudMemberFirstName },
      { element: '@memberLastName', value: memberFeeder.contactCrudMemberLastName },
      { element: '@memberUsername', value: memberFeeder.contactCrudMemberUsername },
      { element: '@memberEmailAddress', value: `test_${helper.randomNumber}@gmail.com` }];
    const roles = ['@adminRole', '@memberRole'];

    await createMember(memberDetails, roles, 'CONTACT_CRUD_MEMBER_TEMP_PASSWORD');
  });

  test('Logout as CCR', async () => {
    await logout();
  });

  test('Contact Crud Suite: Login as New Member with Admin Role', async () => {
    const { contactCrudMemberUsername, memberPassword } = memberFeeder;
    const tempPassword = global.CONTACT_CRUD_MEMBER_TEMP_PASSWORD;
    const login = client.page.LoginPage();

    await changePasswordUsingTempPassword(contactCrudMemberUsername, memberPassword, tempPassword);
    // Below lines have been added to by pass confirm email modal
    await login.clickConfirmEmailOnEmailModal()
      .pause(1000);
  });
});
