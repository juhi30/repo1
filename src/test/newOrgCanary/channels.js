import { client } from 'nightwatch-api';
import { ccrLogin, logout } from '../../toolboxes/login.toolbox';
import { selectOrganizationByCCR } from '../../toolboxes/organization.toolbox';
import * as channelToolbox from '../../toolboxes/channel.toolbox';

const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Automated Tests: Channels', () => {
  test('login as ccr into the organization', async () => {
    await ccrLogin(testConstants.ccrLogin, testConstants.ccrPassword);

    await selectOrganizationByCCR(testConstants.orgName);
  });

  test('Required Fields and validations', async () => {
    await channelToolbox.validateChannelPageElements();

    await channelToolbox.validateChannelCreationRequiredFields('@newPhoneType');

    await channelToolbox.validateChannelCreationRequiredFields('@rhinoSecureType');
  });

  test('Channel Create - New Phone type with member Route', async () => {
    const channelData = {
      phoneNumber: testConstants.numberForNewPhoneChannel,
      forwardingNumber: testConstants.forwardingNumber,
      channelName: testConstants.channelName,
      channelPurpose: testConstants.channelPurpose,
      timeZone: testConstants.timeZone,
      memberFirstName: testConstants.memberFirstName,
    };

    await channelToolbox.createChannel('@newPhoneType', channelData);
  });

  test('Channel Create - Rhinosecure channel with member route', async () => {
    const channelData = {
      channelName: testConstants.rhinoChannelName,
      channelPurpose: testConstants.channelPurpose,
      timeZone: testConstants.timeZone,
      memberFirstName: testConstants.memberFirstName,
    };

    await channelToolbox.createChannel('@rhinoSecureType', channelData);
  });

  test('Channel Edit - New phone type', async () => {
    const channelData = {
      channelName: testConstants.newChannelName,
      channelPurpose: testConstants.newPurpose,
    };
    const enableToggles = ['@availabilityHoursToggle', '@webFormAddOnnToggle', '@channelForwardingToggle'];

    await channelToolbox.editChannel('@channelName', channelData, enableToggles);
  });

  test('Channel Edit - Rhinosecure', async () => {
    const channelData = {
      channelName: testConstants.rhinoChannelNewName,
      channelPurpose: testConstants.newPurpose,
    };
    const enableToggles = ['@availabilityHoursToggle', '@channelForwardingToggle'];

    await channelToolbox.editChannel('@rhinoSecureChannelTitle', channelData, enableToggles);
  });

  test('Tags creation for newPhone type and Rhino secure type', async () => {
    await channelToolbox.tagsCreationByChannelEdit('@updatedChannelTitle', testConstants.tagNameNewPhoneType);

    await channelToolbox.tagsCreationByChannelEdit('@updatedRhinoSecureChannelTitle', testConstants.tagNameRhinoType);
  });

  test('validation on Web Form fields', async () => {
    await channelToolbox.validateWebFormFieldsByChannelEdit('@updatedChannelTitle');
  });

  test('Updation on Web Form fields', async () => {
    const webFormFields = [{ element: '@formTitle', value: testConstants.formTitleName },
      { element: '@titleSubtext', value: testConstants.titleSubtext },
      { element: '@phonePlaceholder', value: testConstants.phonePlaceholder },
      { element: '@phoneHelpText', value: testConstants.phoneHelpText },
      { element: '@messagePlaceholder', value: testConstants.messagePlaceHolder },
      { element: '@submitButton', value: testConstants.submitButton },
      { element: '@callToActionButton', value: testConstants.callToActionButton },
      { element: '@confirmationText', value: testConstants.confirmationText }];

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
