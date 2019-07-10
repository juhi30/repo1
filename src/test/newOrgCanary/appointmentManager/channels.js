import * as channelToolbox from '../../../toolboxes/channel.toolbox';

const channelFeeder = require('../../../feeder/channel.feeder');
const memberFeeder = require('../../../feeder/member.feeder');
const loginFeeder = require('../../../feeder/login.feeder');

describe('Appointment Manager Tests: Channels', () => {
  test('Channel Create - New Phone type with member Route', async () => {
    const ccr = { userName: loginFeeder.appointmentCcrLogin, password: loginFeeder.appointmentCcrPassword };
    const userSearchDetails = { userName: memberFeeder.appointmentMemberFirstName, userType: 'members' };
    const channelData = {
      channelName: channelFeeder.aptChannelName,
      channelPurpose: channelFeeder.channelPurpose,
      phoneNumber: process.env.NEW_CANARY_PROVISIONED_BW_CHANNEL_NUMBER,
      forwardingPhone: '+15555555555',
    };
    await channelToolbox.createBWChannelSkipProvision(ccr, process.env.APPOINTMENT_ORG_ID, userSearchDetails, channelData);
  });
});
