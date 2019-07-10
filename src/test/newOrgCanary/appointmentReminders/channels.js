import { client } from 'nightwatch-api';
import * as channelToolbox from '../../../toolboxes/channel.toolbox';

const channelFeeder = require('../../../feeder/channel.feeder');
const memberFeeder = require('../../../feeder/member.feeder');
const loginFeeder = require('../../../feeder/login.feeder');

describe('Appointment Reminder Tests: Channels', () => {
  test('Channel Create - New BW Phone type channel with member Route', async () => {
    const ccr = { userName: loginFeeder.appointmentReminderCcrLogin, password: loginFeeder.appointmentReminderCcrPassword };
    const userSearchDetails = { userName: memberFeeder.appointmentReminderMemberFirstName, userType: 'members' };
    const channelData = {
      channelName: channelFeeder.aptChannelName,
      channelPurpose: channelFeeder.channelPurpose,
      phoneNumber: process.env.NEW_CANARY_PROVISIONED_BW_CHANNEL_NUMBER,
      forwardingPhone: '+15555555555',
    };
    await channelToolbox.createBWChannelSkipProvision(ccr, process.env.APPOINTMENT_REMINDER_ORG_ID, userSearchDetails, channelData);
  });
});
