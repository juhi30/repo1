import { ccrLogin, logout } from '../../toolboxes/login.toolbox';
import { selectOrganizationByCCR } from '../../toolboxes/organization.toolbox';
import * as channelToolbox from '../../toolboxes/channel.toolbox';

const accountSetupFeeder = require('../../toolboxes/feeder/accountSetup.feeder');
const tagsFeeder = require('../../toolboxes/feeder/tags.feeder');
const channelFeeder = require('../../toolboxes/feeder/channel.feeder');
const memberFeeder = require('../../toolboxes/feeder/member.feeder');
const loginFeeder = require('../../toolboxes/feeder/login.feeder');

describe('Automated Tests: Channels', () => {
  test('login as ccr into the organization', async () => {
    await ccrLogin(loginFeeder.ccrLogin, loginFeeder.ccrPassword);

    await selectOrganizationByCCR(accountSetupFeeder.orgName);
  });

  test('Required Fields and validations', async () => {
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
      memberFirstName: memberFeeder.memberFirstName,
    };

    await channelToolbox.createChannel('@newPhoneType', channelData);
  });

  test('Channel Create - Rhinosecure channel with member route', async () => {
    const channelData = {
      channelName: channelFeeder.rhinoChannelName,
      channelPurpose: channelFeeder.channelPurpose,
      timeZone: channelFeeder.timeZone,
      memberFirstName: memberFeeder.memberFirstName,
    };

    await channelToolbox.createChannel('@rhinoSecureType', channelData);
  });

  test('Channel Edit - New phone type', async () => {
    const channelData = {
      channelName: channelFeeder.newChannelName,
      channelPurpose: channelFeeder.newPurpose,
    };
    const enableToggles = ['@availabilityHoursToggle', '@webFormAddOnnToggle', '@channelForwardingToggle'];

    await channelToolbox.editChannel('@channelName', channelData, enableToggles);
  });

  test('Channel Edit - Rhinosecure', async () => {
    const channelData = {
      channelName: channelFeeder.rhinoChannelNewName,
      channelPurpose: channelFeeder.newPurpose,
    };
    const enableToggles = ['@availabilityHoursToggle', '@channelForwardingToggle'];

    await channelToolbox.editChannel('@rhinoSecureChannelTitle', channelData, enableToggles);
  });

  test('Tags creation for newPhone type and Rhino secure type', async () => {
    await channelToolbox.tagsCreationByChannelEdit('@updatedChannelTitle', tagsFeeder.tagNameNewPhoneType);

    await channelToolbox.tagsCreationByChannelEdit('@updatedRhinoSecureChannelTitle', tagsFeeder.tagNameRhinoType);
  });

  test('validation on Web Form fields', async () => {
    await channelToolbox.validateWebFormFieldsByChannelEdit('@updatedChannelTitle');
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

    await channelToolbox.updateWebFormFieldsByChannelEdit('@updatedChannelTitle', webFormFields);
  });

  // test('Channel Deletion', async () => {
  //   await channelToolbox.deleteChannel('@updatedChannelTitle');
  //   await channelToolbox.deleteChannel('@updatedRhinoSecureChannelTitle');
  // });

  test('logout as CCR', async () => {
    await logout();
  });
});
