import { client } from 'nightwatch-api';
import * as channelToolbox from '../../toolboxes/channel.toolbox';
import { ccrLogin, logout } from '../../toolboxes/login.toolbox';
import { selectOrganizationByCCR } from '../../toolboxes/organization.toolbox';


const memberFeeder = require('../../feeder/member.feeder');
const channelFeeder = require('../../feeder/channel.feeder');
const loginFeeder = require('../../feeder/login.feeder');
const accountSetupFeeder = require('../../feeder/accountSetup.feeder');

describe('Channels Creation for Billing Org', () => {
  const universal = client.page.UniversalElements();
  const channel = client.page.ChannelsPage();

  test('login as ccr into the organization', async () => {
    await ccrLogin(loginFeeder.billingCcrLogin, loginFeeder.billingCcrPassword);

    await selectOrganizationByCCR(accountSetupFeeder.billingOrgName, '@billingOrgSearchResult');
  });

  test('Add Channels according to the current plan', async () => {
    await universal.clickChannels()
      .pause(1000);
    await channel.addChannel();

    const channelData = {
      phoneNumber: channelFeeder.numberForNewPhoneChannel,
      forwardingNumber: channelFeeder.forwardingNumber,
      channelName: channelFeeder.channelName,
      channelPurpose: channelFeeder.channelPurpose,
      timeZone: channelFeeder.timeZone,
      memberFirstName: memberFeeder.memberName1,
    };

    await channelToolbox.createChannel('@newPhoneType', channelData, memberFeeder.memberName1);
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

    await channelToolbox.createChannel('@newPhoneType', channelData1, memberFeeder.memberName1);
  });

  test('verifying alert message when deleting an Addon channel', async () => {
    await channelToolbox.verifyAlertDeletingChannel('@billingChannelName', '@deleteAlert');
  });

  test('logout as CCR', async () => {
    await logout();
  });
});
