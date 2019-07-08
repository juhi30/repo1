import { ccrLogin, logout } from '../../toolboxes/login.toolbox';
import { selectOrganizationByCCR } from '../../toolboxes/organization.toolbox';
import * as channelToolbox from '../../toolboxes/channel.toolbox';

const accountSetupFeeder = require('../../feeder/accountSetup.feeder');
const tagsFeeder = require('../../feeder/tags.feeder');
const channelFeeder = require('../../feeder/channel.feeder');
const memberFeeder = require('../../feeder/member.feeder');
const loginFeeder = require('../../feeder/login.feeder');

describe('Automated Tests: Channels', () => {
  test('Bandwidth channel setup without provision', async () => {
    const ccr = { userName: loginFeeder.ccrLogin, password: loginFeeder.ccrPassword };
    const userSearchDetails = { userName: memberFeeder.memberFirstName, userType: 'members' };
    await channelToolbox.createBWChannelSkipProvision(ccr, process.env.NEW_CANARY_ORG_ID, userSearchDetails);
  });

  test('login as ccr into the organization', async () => {
    await ccrLogin(loginFeeder.ccrLogin, loginFeeder.ccrPassword);

    await selectOrganizationByCCR(accountSetupFeeder.orgName);
  });

  test('validate channels page element', async () => {
    await channelToolbox.validateChannelPageElements();
  });

  test('Validate required field validation for new phone type channel', async () => {
    await channelToolbox.validateChannelCreationRequiredFields('@newPhoneType');
  });

  test('Validate required field validation for rhinosecure type channel', async () => {
    await channelToolbox.validateChannelCreationRequiredFields('@rhinoSecureType');
  });

  test('Channel Create - Rhinosecure channel with member route', async () => {
    const channelData = {
      channelName: channelFeeder.rhinoChannelName,
      channelPurpose: channelFeeder.channelPurpose,
      timeZone: channelFeeder.timeZone,
      memberFirstName: memberFeeder.memberFirstName,
    };

    await channelToolbox.createChannel('@rhinoSecureType', channelData, memberFeeder.memberName);
  });

  test('Channel Edit - New phone type', async () => {
    const channelData = {
      channelName: channelFeeder.newChannelName,
      channelPurpose: channelFeeder.newPurpose,
    };
    const enableToggles = ['@availabilityHoursToggle', '@webFormAddOnnToggle', '@channelForwardingToggle'];

    await channelToolbox.editChannel(channelFeeder.channelName, channelData, enableToggles);
  });

  test('Channel Edit - Rhinosecure', async () => {
    const channelData = {
      channelName: channelFeeder.rhinoChannelNewName,
      channelPurpose: channelFeeder.newPurpose,
    };
    const enableToggles = ['@availabilityHoursToggle', '@channelForwardingToggle'];

    await channelToolbox.editChannel(channelFeeder.rhinoChannelName, channelData, enableToggles);
  });

  test('Tags creation for newPhone type and Rhino secure type', async () => {
    await channelToolbox.tagsCreationByChannelEdit(channelFeeder.newChannelName, tagsFeeder.tagNameNewPhoneType);

    await channelToolbox.tagsCreationByChannelEdit(channelFeeder.rhinoChannelNewName, tagsFeeder.tagNameRhinoType);
  });

  test('validation on Web Form fields', async () => {
    await channelToolbox.validateWebFormFieldsByChannelEdit(channelFeeder.newChannelName);
  });

  test('Updation on Web Form fields', async () => {
    const webFormFields = [{ element: '@formTitle', value: channelFeeder.formTitleName },
      { element: '@titleSubtext', value: channelFeeder.titleSubtext },
      { element: '@phonePlaceholder', value: channelFeeder.phonePlaceholder },
      { element: '@phoneHelpText', value: channelFeeder.phoneHelpText },
      { element: '@messagePlaceholder', value: channelFeeder.messagePlaceHolder },
      { element: '@submitButton', value: channelFeeder.submitButton },
      { element: '@callToActionButton', value: channelFeeder.callToActionButton },
      { element: '@confirmationText', value: channelFeeder.confirmationText }];

    await channelToolbox.updateWebFormFieldsByChannelEdit(channelFeeder.newChannelName, webFormFields);
  });

  test('logout as CCR', async () => {
    await logout();
  });
});
