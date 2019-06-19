import * as group from '../../toolboxes/group.toolbox';

const groupFeeder = require('../../feeder/group.feeder');
const memberFeeder = require('../../feeder/member.feeder');
const channelFeeder = require('../../feeder/channel.feeder');

describe('Automated test cases for Group Deletion', () => {
  test('Create Patient type Groups', async () => {
    const groupDetails = {
      name: groupFeeder.patientTypeGroupD,
      purpose: groupFeeder.purpose,
      memberName: memberFeeder.memberName,
      anotherMember: memberFeeder.memberName2,
    };

    const routeDetails = [{ memberName: groupDetails.memberName, element: memberFeeder.memberName },
      { memberName: groupDetails.anotherMember, element: memberFeeder.memberName2 }];

    await group.createGroup(groupDetails, '@patientOption', groupFeeder.patientTypeGroup, routeDetails);
  });

  test('Add Channel Routes to patient Type Group and check delete conditions', async () => {
    const groupDetails = {
      channelName: groupFeeder.patientGroupChannel,
      purpose: groupFeeder.newGroupPurpose,
      timeZone: channelFeeder.timeZone,
      groupName: groupFeeder.patientTypeGroup,
    };

    await group.addChannelRouteToGroup(groupDetails, groupFeeder.patientTypeGroupD, '@rhinoSecureType', groupFeeder.patientTypeGroupD);
    await group.verifyGroupDeleteConditions(groupFeeder.patientTypeGroupD, groupFeeder.activeChannelMessage);
  });

  test('Create a message and assign to Patient Group', async () => {
      
  });

  test('Create Team type Groups', async () => {
    const groupDetails = {
      name: groupFeeder.teamTypeGroupD,
      purpose: groupFeeder.purpose,
      memberName: memberFeeder.memberName,
      anotherMember: memberFeeder.memberName2,
    };

    const routeDetails = [{ memberName: groupDetails.memberName, element: memberFeeder.memberName },
      { memberName: groupDetails.anotherMember, element: memberFeeder.memberName2 }];

    await group.createGroup(groupDetails, '@teamOption', groupFeeder.teamTypeGroupD, routeDetails);
  });

  test('Create Patient and Team type Groups', async () => {
    const groupDetails = {
      name: groupFeeder.patientAndTeamTypeD,
      purpose: groupFeeder.purpose,
      memberName: memberFeeder.memberName,
      anotherMember: memberFeeder.memberName2,
    };

    const routeDetails = [{ memberName: groupDetails.memberName, element: memberFeeder.memberName },
      { memberName: groupDetails.anotherMember, element: memberFeeder.memberName2 }];

    await group.createGroup(groupDetails, '@teamOption', groupFeeder.patientAndTeamType, routeDetails);
  });

  test('Delete Patient and Team Type Group', async () => {
    await group.verifyGroupDeletion(groupFeeder.patientAndTeamTypeD, '@successMessage');
  });

  test('Delete Patient and Team Type Group', async () => {
    await group.verifyGroupDeletion(groupFeeder.teamTypeGroupD, '@successMessage');
  });

  test('Create Team type Groups', async () => {
    const groupDetails = {
      name: groupFeeder.teamTypeGroupD,
      purpose: groupFeeder.purpose,
      memberName: memberFeeder.memberName,
      anotherMember: memberFeeder.memberName2,
    };

    const routeDetails = [{ memberName: groupDetails.memberName, element: memberFeeder.memberName },
      { memberName: groupDetails.anotherMember, element: memberFeeder.memberName2 }];

    await group.createGroup(groupDetails, '@teamOption', groupFeeder.teamTypeGroup, routeDetails);
  });

  test('Create Patient and Team type Groups', async () => {
    const groupDetails = {
      name: groupFeeder.patientAndTeamTypeD,
      purpose: groupFeeder.purpose,
      memberName: memberFeeder.memberName,
      anotherMember: memberFeeder.memberName2,
    };

    const routeDetails = [{ memberName: groupDetails.memberName, element: memberFeeder.memberName },
      { memberName: groupDetails.anotherMember, element: memberFeeder.memberName2 }];

    await group.createGroup(groupDetails, '@teamOption', groupFeeder.patientAndTeamType, routeDetails);
  });

  test('');
});
