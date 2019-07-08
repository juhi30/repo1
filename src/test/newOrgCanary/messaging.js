import * as messageToolbox from '../../toolboxes/messaging.toolbox';
import { memberLogin, logout } from '../../toolboxes/login.toolbox';

const memberFeeder = require('../../feeder/member.feeder');
const messageFeeder = require('../../feeder/message.feeder');
const contactFeeder = require('../../feeder/contact.feeder');
const channelFeeder = require('../../feeder/channel.feeder');

describe('Chat Messaging Tests', () => {
  test('Login as a Member1', async () => {
    await memberLogin(global.newCanaryNewUser, memberFeeder.newMemberPassword);
  });

  test('Sending a Direct chat message from member1 to member2', async () => {
    await messageToolbox.directMessageToMember(memberFeeder.memberName2, messageFeeder.directChatMessage);
  });

  test('Sending a Direct chat message from member1 to Group', async () => {
    await messageToolbox.sendChatMessageToGroup('@patientAndTeamGroup_TeamInbox', messageFeeder.groupChatMessage);
  });

  test('logout as Member1', async () => {
    await logout();
  });

  test('Login as a Member2', async () => {
    await memberLogin(global.newCanaryUserTwo, memberFeeder.memberPassword);
  });

  test('Verify if direct chat message is received by Member1', async () => {
    await messageToolbox.verifyReceivingDirectChatMessage(messageFeeder.directChatMessage);
  });

  test('Verify if group chat message is received by Member1', async () => {
    await messageToolbox.verifyReceivingGroupChatMessage('@patientAndTeamGroup_TeamInbox', messageFeeder.groupChatMessage);
  });

  test('logout as Member2', async () => {
    await logout();
  });
});

describe('Direct Messaging Tests', () => {
  const contactName = `${contactFeeder.anotherContactFirstName} ${contactFeeder.anotherContactLastName}`;
  test('Login as a Member1', async () => {
    await memberLogin(global.newCanaryNewUser, memberFeeder.newMemberPassword);
  });

  // Commenting this test as we need another channel setup that is routed to this member only
  // test('Sending a Direct message from member2 to a Contact', async () => {
  //   await messageToolbox.sendADirectMessage('@directMessageInbox', '/inbox/direct','@searchContactModalTitle', contactFeeder.anotherContactFirstName ,
  //   messageFeeder.directPatientMessage);
  // });

  test('Sending a message to a Contact from a Group', async () => {
    await messageToolbox.newMessageToContact(contactName, 'Message', messageFeeder.groupPatientMessage, channelFeeder.channelName);
    await messageToolbox.closeConversation('@patientAndTeamGroup_PatientInbox', '@directMessageInbox');
  });

  test('Sending a message to a Contact with MMS / Attachment', async () => {
  // eslint-disable-next-line max-len
    await messageToolbox.sendAMessageWithAttachment(contactName, 'Message', messageFeeder.directPatientMessage, channelFeeder.channelName);
    await messageToolbox.closeConversation('@patientAndTeamGroup_PatientInbox', '@directMessageInbox');
  });

  test('Sending a message to a Contact using Hipaa Template', async () => {
    await messageToolbox.sendAMessageUsingHipaaTemplate(contactName, 'Message', channelFeeder.channelName);
    await messageToolbox.closeConversation('@patientAndTeamGroup_PatientInbox', '@directMessageInbox');
  });

  test('Sending a message to a Contact using other Template', async () => {
    await messageToolbox.sendADirectMessageUsingOtherTemplate(contactName, 'Message', channelFeeder.channelName);
    await messageToolbox.closeConversation('@patientAndTeamGroup_PatientInbox', '@directMessageInbox');
  });
});
