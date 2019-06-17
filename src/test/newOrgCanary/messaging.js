import * as messageToolbox from '../../toolboxes/messaging.toolbox';
import { memberLogin, logout } from '../../toolboxes/login.toolbox';

const memberFeeder = require('../../feeder/member.feeder');
const messageFeeder = require('../../feeder/message.feeder');
const contactFeeder = require('../../feeder/contact.feeder');
const groupFeeder = require('../../feeder/group.feeder');

describe('Chat Messaging Tests', () => {
  test('Login as a Member1', async () => {
    await memberLogin(memberFeeder.newMemberUsername, memberFeeder.newMemberPassword);
  });

  test('Sending a Direct chat message from member1 to member2', async () => {
    await messageToolbox.sendADirectMessage('@directChatInbox', '/chat', '@modalTitle', memberFeeder.memberName2, messageFeeder.directChatMessage);
  });

  test('Sending a Direct chat message from member1 to Group', async () => {
    await messageToolbox.sendChatMessageToGroup('@patientAndTeamGroup_TeamInbox', messageFeeder.groupChatMessage);
  });

  test('logout as Member1', async () => {
    await logout();
  });

  test('Login as a Member2', async () => {
    await memberLogin(memberFeeder.memberUsername2, memberFeeder.memberPassword);
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
    await memberLogin(memberFeeder.newMemberUsername, memberFeeder.newMemberPassword);
  });

  // Commenting this test as we need another channel setup that is routed to this member only
  // test('Sending a Direct message from member2 to a Contact', async () => {
  //   await messageToolbox.sendADirectMessage('@directMessageInbox', '/inbox/direct','@searchContactModalTitle', contactFeeder.anotherContactFirstName ,
  //   messageFeeder.directPatientMessage);
  // });

  test('Sending a message to a Contact from a Group', async () => {
    await messageToolbox.sendMessageToContactUsingRhinosecure(contactName, groupFeeder.patientAndTeamGroupChannel, messageFeeder.groupPatientMessage);
    await messageToolbox.closeConversation('@patientAndTeamGroup_PatientInbox', '@directMessageInbox');
  });

  test('Sending a message to a Contact with MMS / Attachment', async () => {
    await messageToolbox.sendAMessageWithAttachment('@patientAndTeamGroup_PatientInbox', '@searchContactModalTitle', contactFeeder.anotherContactFirstName, messageFeeder.directPatientMessage);
    await messageToolbox.closeConversation('@patientAndTeamGroup_PatientInbox', '@directMessageInbox');
  });

  test('Sending a message to a Contact using Hipaa Template', async () => {
    await messageToolbox.sendAMessageUsingHipaaTemplate('@patientAndTeamGroup_PatientInbox', '@searchContactModalTitle', contactFeeder.anotherContactFirstName);
    await messageToolbox.closeConversation('@patientAndTeamGroup_PatientInbox', '@directMessageInbox');
  });

  test('Sending a message to a Contact using other Template', async () => {
    await messageToolbox.sendADirectMessageUsingOtherTemplate('@patientAndTeamGroup_PatientInbox', '@searchContactModalTitle', contactFeeder.anotherContactFirstName);
    await messageToolbox.closeConversation('@patientAndTeamGroup_PatientInbox', '@directMessageInbox');
  });
});
