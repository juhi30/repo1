import { client } from 'nightwatch-api';
import { logout, ccrLogin } from '../../../toolboxes/login.toolbox';
import * as channelToolbox from '../../../toolboxes/channel.toolbox';
import * as organizationToolbox from '../../../toolboxes/organization.toolbox';

const loginFeeder = require('../../../feeder/login.feeder');
const channelFeeder = require('../../../feeder/channel.feeder');
const memberFeeder = require('../../../feeder/member.feeder');
const accountSetupFeeder = require('../../../feeder/accountSetup.feeder');

const channels = client.page.ChannelsPage();

describe('Automated Tests: Channels', () => {
  // test('Login as CCR', async () => {
  //   await ccrLogin(loginFeeder.ccrLogin, loginFeeder.ccrPassword);
  // });
  //
  // test('Select organization', async () => {
  //   await organizationToolbox.selectOrganizationByCCR(accountSetupFeeder.appointmentOrgName);
  // });


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
      memberFirstName: memberFeeder.appointmentMemberFirstName,
    };

    await channelToolbox.createChannel('@newPhoneType', channelData, '@appointmentMemberResult');
  });
});
