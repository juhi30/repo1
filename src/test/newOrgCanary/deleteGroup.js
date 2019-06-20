import * as groupToolbox from '../../toolboxes/group.toolbox';
import * as messageToolbox from '../../toolboxes/messaging.toolbox';
import * as channelToolbox from '../../toolboxes/channel.toolbox';
import * as bulkActionToolbox from '../../toolboxes/bulkActions.toolbox';
import * as contactToolbox from '../../toolboxes/contact.toolbox';

const groupFeeder = require('../../feeder/group.feeder');
const memberFeeder = require('../../feeder/member.feeder');
const channelFeeder = require('../../feeder/channel.feeder');
const contactFeeder = require('../../feeder/contact.feeder');
const messageFeeder = require('../../feeder/message.feeder');

describe('Automated test cases for Group Deletion', () => {
  const contactName = `${contactFeeder.anotherContactFirstName} ${contactFeeder.anotherContactLastName}`;
  test('Create Patient type Groups', async () => {
    const groupDetails = {
      name: groupFeeder.patientTypeGroupD,
      purpose: groupFeeder.purpose,
      memberName: memberFeeder.memberName,
      anotherMember: memberFeeder.memberName2,
    };

    const routeDetails = [{ memberName: groupDetails.memberName, element: memberFeeder.memberName },
      { memberName: groupDetails.anotherMember, element: memberFeeder.memberName2 }];

    await groupToolbox.createGroup(groupDetails, '@patientOption', groupFeeder.patientTypeGroup, routeDetails);
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

    await groupToolbox.createGroup(groupDetails, '@teamOption', groupFeeder.teamTypeGroupD, routeDetails);
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

    await groupToolbox.createGroup(groupDetails, '@patientAndTeamOption', groupFeeder.patientAndTeamType, routeDetails);
  });

  test('Delete Patient and Team Type Group', async () => {
    await groupToolbox.verifyGroupDeletion(groupFeeder.patientAndTeamTypeD, '@successMessage');
  });

  test('Delete Patient and Team Type Group', async () => {
    await groupToolbox.verifyGroupDeletion(groupFeeder.teamTypeGroupD, '@successMessage');
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

    await groupToolbox.createGroup(groupDetails, '@teamOption', groupFeeder.teamTypeGroup, routeDetails);
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

    await groupToolbox.createGroup(groupDetails, '@patientAndTeamOption', groupFeeder.patientAndTeamType, routeDetails);
  });

  test('Create Delete Conditions for patient Group ', async () => {
    const groupDetails = {
      channelName: groupFeeder.pGroupChannel,
      purpose: groupFeeder.newGroupPurpose,
      timeZone: channelFeeder.timeZone,
      groupName: groupFeeder.patientTypeGroup,
    };

    await groupToolbox.addChannelRouteToGroup(groupDetails, groupFeeder.patientTypeGroupD, '@rhinoSecureType', groupFeeder.patientTypeGroupD);
    await messageToolbox.sendMessageToContactUsingRhinosecure(contactName, groupFeeder.pGroupChannel, messageFeeder.groupPatientMessage);
    await messageToolbox.sendMessageToContactUsingRhinosecure(contactName, groupFeeder.ptGroupChannel, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.assignThreadToMemberAndGroup('@deletePTGroup', contactName, '@assign', '@groupSearchInput', groupFeeder.patientTypeGroupD, '@deletePGroup');
    await contactToolbox.enableContactForwarding('@contactNameTitle', '@groupOption', groupFeeder.patientTypeGroupD);
  });

  test('Verify if the Patient Group can be deleted', async () => {
    await groupToolbox.closeDeleteGroupModal(groupFeeder.patientTypeGroupD);
  });
});

// await channelToolbox.deleteChannel(channelFeeder.newChannelName);
