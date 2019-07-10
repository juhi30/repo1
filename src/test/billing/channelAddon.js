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

  test('Add First BW Channel according to the current plan', async () => {
    const ccr = { userName: loginFeeder.billingCcrLogin, password: loginFeeder.billingCcrPassword };
    const userSearchDetails = { userName: memberFeeder.memberName1, userType: 'members' };
    const channelData = {
      channelName: channelFeeder.channelName,
      channelPurpose: channelFeeder.channelPurpose,
      phoneNumber: process.env.NEW_CANARY_PROVISIONED_BW_CHANNEL_NUMBER,
      forwardingPhone: '+15555555555',
    };
    await channelToolbox.createBWChannelSkipProvision(ccr, process.env.BILLING_ORG_ID, userSearchDetails, channelData);
  });

  test('Add Second BW Channel according to the current plan', async () => {
    const ccr = { userName: loginFeeder.billingCcrLogin, password: loginFeeder.billingCcrPassword };
    const userSearchDetails = { userName: memberFeeder.memberName1, userType: 'members' };
    const channelData = {
      channelName: channelFeeder.channelName1,
      channelPurpose: channelFeeder.channelPurpose,
      phoneNumber: process.env.NEW_CANARY_PROVISIONED_BW_CHANNEL_NUMBER,
      forwardingPhone: '+15555555555',
    };
    await channelToolbox.createBWChannelSkipProvision(ccr, process.env.BILLING_ORG_ID, userSearchDetails, channelData);
  });

  test('login as ccr into the organization', async () => {
    await ccrLogin(loginFeeder.billingCcrLogin, loginFeeder.billingCcrPassword);

    await selectOrganizationByCCR(accountSetupFeeder.billingOrgName, '@billingOrgSearchResult');
  });

  test('verifying alert message when adding an Addon channel', async () => {
    const channelData = {
      channelName: channelFeeder.rhinosecureChannelName,
      channelPurpose: channelFeeder.channelPurpose,
      timeZone: channelFeeder.timeZone,
      memberFirstName: memberFeeder.memberName1,
    };
    await universal.clickChannels()
      .pause(1000);

    await channelToolbox.verifyAlertMessagesAddonChannels('@createAlert', '@newPhoneType');

    await channelToolbox.createChannel('@rhinoSecureType', channelData, memberFeeder.memberName1, true);
  });

  test('verifying alert message when deleting an Addon channel', async () => {
    await channelToolbox.verifyAlertDeletingChannel(channelFeeder.channelName1, '@deleteAlert');
  });

  test('logout as CCR', async () => {
    await logout();
  });
});
