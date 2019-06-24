import * as channelToolbox from '../../../toolboxes/channel.toolbox';

const channelFeeder = require('../../../feeder/channel.feeder');
const memberFeeder = require('../../../feeder/member.feeder');

describe('Appointment Manager Tests: Channels', () => {
  test('Channel Create - New Phone type with member Route', async () => {
    const channelData = {
      phoneNumber: channelFeeder.numberForNewPhoneChannel,
      forwardingNumber: channelFeeder.forwardingNumber,
      channelName: channelFeeder.aptChannelName,
      channelPurpose: channelFeeder.channelPurpose,
      timeZone: channelFeeder.timeZone,
      memberFirstName: memberFeeder.appointmentMemberName,
    };

    await channelToolbox.createChannel('@newPhoneType', channelData, '@apptMemberResult');
  });
});
