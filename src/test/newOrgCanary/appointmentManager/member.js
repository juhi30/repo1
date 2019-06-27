import { createMember } from '../../../toolboxes/member.toolbox';

const memberFeeder = require('../../../feeder/member.feeder');
const helper = require('../../../toolboxes/helpers.toolbox');

describe('Members Page', () => {
  test('Adding a new Member with Admin Role', async () => {
    const memberDetails = [{ element: '@memberFirstName', value: memberFeeder.appointmentMemberFirstName },
      { element: '@memberLastName', value: memberFeeder.appointmentMemberLastName },
      { element: '@memberUsername', value: memberFeeder.appointmentMemberUsername },
      { element: '@memberEmailAddress', value: `${memberFeeder.email}+${helper.randomNumber}@gmail.com` }];
    const roles = ['@adminRole', '@memberRole'];

    await createMember(memberDetails, roles, 'APPOINTMENT_MEMBER_TEMP_PASSWORD');
  });
});
