import { client } from 'nightwatch-api';
import * as channelToolbox from '../../../toolboxes/channel.toolbox';

const channelFeeder = require('../../../feeder/channel.feeder');
const memberFeeder = require('../../../feeder/member.feeder');

const channels = client.page.ChannelsPage();

describe('Automated Tests: Channels', () => {
  test('Required Fields and validations', async () => {
    await channels.navigate();
    await channelToolbox.validateChannelPageElements();

    await channelToolbox.validateChannelCreationRequiredFields('@newPhoneType');

    await channelToolbox.validateChannelCreationRequiredFields('@rhinoSecureType');
  });

  test('Channel Create - New Phone type with member Route', async () => {
    const channelData = {
      phoneNumber: channelFeeder.numberForNewPhoneChannel,
      forwardingNumber: channelFeeder.forwardingNumber,
      channelName: channelFeeder.channelName,
      channelPurpose: channelFeeder.channelPurpose,
      timeZone: channelFeeder.timeZone,
      memberFirstName: memberFeeder.appointmentReminderMemberFirstName,
    };

    await channelToolbox.createChannel('@newPhoneType', channelData, memberFeeder.appointmentReminderMemberFirstName);
  });
});
