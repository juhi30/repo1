import { createMember } from '../../../toolboxes/member.toolbox';

const memberFeeder = require('../../../feeder/member.feeder');
const helper = require('../../../toolboxes/helpers.toolbox');

describe('Members Page', () => {
  test('Adding a new Member with Admin Role', async () => {
    global.apptReminderUsername = `${memberFeeder.appointmentReminderMemberUsername}_${helper.randomNumber}`;
    const memberDetails = [{ element: '@memberFirstName', value: memberFeeder.appointmentReminderMemberFirstName },
      { element: '@memberLastName', value: memberFeeder.appointmentReminderMemberLastName },
      { element: '@memberUsername', value: global.apptReminderUsername },
      { element: '@memberEmailAddress', value: `${memberFeeder.email}+${helper.randomNumber}@gmail.com` }];
    const roles = ['@adminRole', '@memberRole'];

    await createMember(memberDetails, roles, 'APPOINTMENT_REMINDER_MEMBER_TEMP_PASSWORD');
  });
});
