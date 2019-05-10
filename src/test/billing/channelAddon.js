import { client } from 'nightwatch-api';
import * as channelToolbox from '../../toolboxes/channel.toolbox';

const memberFeeder = require('../../feeder/member.feeder');
const channelFeeder = require('../../feeder/channel.feeder');

describe('Channels Creation for Billing Org', () => {
  const add = client.page.UniversalElements();
  const channel = client.page.ChannelsPage();

  test('Add Channels according to the current plan', async () => {
    await add.clickChannels();
    await channel.addChannel();


    const channelData = {
      phoneNumber: channelFeeder.numberForNewPhoneChannel,
      forwardingNumber: channelFeeder.forwardingNumber,
      channelName: channelFeeder.channelName,
      channelPurpose: channelFeeder.channelPurpose,
      timeZone: channelFeeder.timeZone,
      memberFirstName: memberFeeder.memberName1,
    };

    await channelToolbox.createChannel('@newPhoneType', channelData);
  });

  test('verifying alert message when adding an Addon channel', async () => {
    const channelData1 = {
      phoneNumber: channelFeeder.numberForNewPhoneChannel,
      forwardingNumber: channelFeeder.forwardingNumber1,
      channelName: channelFeeder.channelName1,
      channelPurpose: channelFeeder.channelPurpose,
      timeZone: channelFeeder.timeZone,
      memberFirstName: memberFeeder.memberName1,
    };

    await channelToolbox.verifyAlertMessagesAddonChannels('@createAlert', '@newPhoneType');

    await channelToolbox.createChannel('@newPhoneType', channelData1);
  });

  test('verifying alert message when deleting an Addon channel', async () => {
    await channelToolbox.verifyAlertDeletingChannel('@billingChannelName', '@deleteAlert');
  });
});
