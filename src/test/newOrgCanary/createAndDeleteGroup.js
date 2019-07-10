import * as groupToolbox from '../../toolboxes/group.toolbox';
import * as messageToolbox from '../../toolboxes/messaging.toolbox';
import * as channelToolbox from '../../toolboxes/channel.toolbox';

const groupFeeder = require('../../feeder/group.feeder');
const memberFeeder = require('../../feeder/member.feeder');
const channelFeeder = require('../../feeder/channel.feeder');
const messageFeeder = require('../../feeder/message.feeder');

describe('Automated test cases for Group Deletion', () => {
  test('Create Patient type Groups', async () => {
    const groupDetails = {
      name: groupFeeder.patientTypeGroupD,
      purpose: groupFeeder.purpose,
      memberName: memberFeeder.memberName,
      anotherMember: memberFeeder.memberName2,
    };

    const routeDetails = [{ memberName: groupDetails.memberName, element: memberFeeder.memberName }];

    await groupToolbox.createGroup(groupDetails, '@patientOption', groupFeeder.patientTypeGroup, routeDetails);
  });

  test('Create Team type Groups', async () => {
    const groupDetails = {
      name: groupFeeder.teamTypeGroupD,
      purpose: groupFeeder.purpose,
      memberName: memberFeeder.memberName,
      anotherMember: memberFeeder.memberName2,
    };

    const routeDetails = [{ memberName: groupDetails.memberName, element: memberFeeder.memberName }];

    await groupToolbox.createGroup(groupDetails, '@teamOption', groupFeeder.teamTypeGroupD, routeDetails);
  });

  test('Create Patient and Team type Groups', async () => {
    const groupDetails = {
      name: groupFeeder.patientAndTeamTypeD,
      purpose: groupFeeder.purpose,
      memberName: memberFeeder.memberName,
      anotherMember: memberFeeder.memberName2,
    };

    const routeDetails = [{ memberName: groupDetails.memberName, element: memberFeeder.memberName }];

    await groupToolbox.createGroup(groupDetails, '@patientAndTeamOption', groupFeeder.patientAndTeamType, routeDetails);
  });

  test('Delete Patient and Team Type Group', async () => {
    const groupDetails = {
      name: groupFeeder.patientAndTeamTypeD,
      purpose: groupFeeder.purpose,
      memberName: memberFeeder.memberName,
      anotherMember: memberFeeder.memberName2,
    };

    await groupToolbox.verifyGroupDeletion(groupDetails, groupFeeder.patientAndTeamTypeD, '@successMessage');
  });

  test('Delete Team Type Group', async () => {
    const groupDetails = {
      name: groupFeeder.teamTypeGroupD,
      purpose: groupFeeder.purpose,
      memberName: memberFeeder.memberName,
      anotherMember: memberFeeder.memberName2,
    };

    await groupToolbox.verifyGroupDeletion(groupDetails, groupFeeder.teamTypeGroupD, '@successMessage');
  });

  test('Create Team type Groups', async () => {
    const groupDetails = {
      name: groupFeeder.teamTypeGroupD,
      purpose: groupFeeder.purpose,
      memberName: memberFeeder.memberName,
      anotherMember: memberFeeder.memberName2,
    };

    const routeDetails = [{ memberName: groupDetails.memberName, element: memberFeeder.memberName }];

    await groupToolbox.createGroup(groupDetails, '@teamOption', groupFeeder.teamTypeGroup, routeDetails);
  });

  test('Create Patient and Team type Groups', async () => {
    const groupDetails = {
      name: groupFeeder.patientAndTeamTypeD,
      purpose: groupFeeder.purpose,
      memberName: memberFeeder.memberName,
      anotherMember: memberFeeder.memberName2,
    };

    const routeDetails = [{ memberName: groupDetails.memberName, element: memberFeeder.memberName }];

    await groupToolbox.createGroup(groupDetails, '@patientAndTeamOption', groupFeeder.patientAndTeamType, routeDetails);
  });

  test('Create Delete Conditions for patient Group ', async () => {
    const groupDetails = {
      channelName: groupFeeder.pGroupChannel,
      purpose: groupFeeder.newGroupPurpose,
      timeZone: channelFeeder.timeZone,
      groupName: groupFeeder.patientTypeGroupD,
    };

    await groupToolbox.addChannelRouteToGroup(groupDetails, groupFeeder.patientTypeGroupD, '@rhinoSecureType', groupFeeder.patientTypeGroupD);
  });

  test('Verify if the Patient Group can be deleted', async () => {
    await groupToolbox.verifyGroupCouldNotBeDeletedModal(groupFeeder.patientTypeGroupD);
  });

  test('Removing Group Delete Conditions', async () => {
    await channelToolbox.deleteChannel(groupFeeder.pGroupChannel);
  });

  test('Deleting Patient Group', async () => {
    const groupDetails = {
      channelName: groupFeeder.pGroupChannel,
      purpose: groupFeeder.newGroupPurpose,
      memberName: memberFeeder.memberName,
      name: groupFeeder.patientTypeGroupD,
    };

    await groupToolbox.verifyGroupDeletion(groupDetails, groupFeeder.patientTypeGroupD, '@successMessage');
  });

  test('Create Delete Conditions for Patient and Team Group', async () => {
    const groupDetails = {
      channelName: groupFeeder.ptGroupChannel,
      purpose: groupFeeder.newGroupPurpose,
      timeZone: channelFeeder.timeZone,
      groupName: groupFeeder.patientAndTeamTypeD,
    };

    await groupToolbox.addChannelRouteToGroup(groupDetails, groupFeeder.patientAndTeamTypeD, '@rhinoSecureType', groupFeeder.patientAndTeamTypeD);
  });

  test('Verify if the Patient and team Group can be deleted', async () => {
    await groupToolbox.verifyGroupCouldNotBeDeletedModal(groupFeeder.patientAndTeamTypeD);
  });

  test('Removing Group Delete Conditions', async () => {
    await channelToolbox.deleteChannel(groupFeeder.ptGroupChannel);
  });

  test('Deleting Patient and Team Group', async () => {
    const groupDetails = {
      channelName: groupFeeder.pGroupChannel,
      purpose: groupFeeder.newGroupPurpose,
      memberName: memberFeeder.memberName,
      name: groupFeeder.patientAndTeamTypeD,
    };

    await groupToolbox.verifyGroupDeletion(groupDetails, groupFeeder.patientAndTeamTypeD, '@successMessage');
  });

  test('Create Delete Conditions for Team Group', async () => {
    await messageToolbox.sendChatMessageToGroup('@deleteTGroup', messageFeeder.groupChatMessage);
  });

  test('Verify if the Patient Group can be deleted', async () => {
    await groupToolbox.verifyGroupCouldNotBeDeletedModal(groupFeeder.teamTypeGroupD);
  });
});
