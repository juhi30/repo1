import { createMember } from '../../../toolboxes/member.toolbox';

const memberFeeder = require('../../../feeder/member.feeder');
const helper = require('../../../toolboxes/helpers.toolbox');

describe('Members Page', () => {
  test('Adding a new Member with Admin Role', async () => {
    const memberDetails = [{ element: '@memberFirstName', value: memberFeeder.appointmentReminderMemberFirstName },
      { element: '@memberLastName', value: memberFeeder.appointmentReminderMemberLastName },
      { element: '@memberUsername', value: memberFeeder.appointmentReminderMemberUsername },
      { element: '@memberEmailAddress', value: `test_${helper.randomNumber}@gmail.com` }];
    const roles = ['@adminRole', '@memberRole'];

    await createMember(memberDetails, roles, 'APPOINTMENT_REMINDER_MEMBER_TEMP_PASSWORD');
  });
});
