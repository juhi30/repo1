import * as messageToolbox from '../../toolboxes/messaging.toolbox';
import { memberLogin, logout } from '../../toolboxes/login.toolbox';

const memberFeeder = require('../../feeder/member.feeder');
const messageFeeder = require('../../feeder/message.feeder');
const contactFeeder = require('../../feeder/contact.feeder');

describe('Chat Messaging Tests', () => {
  test('Login as a Member2', async () => {
    await memberLogin(memberFeeder.memberUsername2, memberFeeder.memberPassword);
  });

  test('Sending a Direct chat message from member2 to member1', async () => {
    await messageToolbox.sendADirectMessage('@directChatInbox', '/chat', '@modalTitle', memberFeeder.memberName, messageFeeder.directChatMessage);
  });

  test('Sending a Direct chat message from member2 to Group', async () => {
    await messageToolbox.sendChatMessageToGroup('@updatedPatientAndTeamGroup_TeamInbox', messageFeeder.groupChatMessage);
  });

  test('logout as Member2', async () => {
    await logout();
  });

  test('Login as a Member1', async () => {
    await memberLogin(memberFeeder.memberUsername, memberFeeder.memberPassword);
  });

  test('Verify if direct chat message is received by Member1', async () => {
    await messageToolbox.verifyReceivingDirectChatMessage(messageFeeder.directChatMessage)
  });

  test('Verify if group chat message is received by Member1', async () => {
    await messageToolbox.verifyReceivingGroupChatMessage('@updatedPatientAndTeamGroup_TeamInbox', messageFeeder.groupChatMessage)
  });
});

describe('Direct Messaging Tests', () => {
  test('Login as a Member2', async () => {
    await memberLogin(memberFeeder.memberUsername2, memberFeeder.memberPassword);
  });


  // Commenting this test as we need another channel setup that is routed to this member only
  // test('Sending a Direct message from member2 to a Contact', async () => {
  //   await messageToolbox.sendADirectMessage('@directMessageInbox', '/inbox/direct', '@searchContactModalTitle', 'P1Test Patient' , messageFeeder.directPatientMessage);
  // });

  test('Sending a message to a Contact from a Group', async () => {
    await messageToolbox.sendGroupMessageToContact('@updatedPatientAndTeamGroup_PatientInbox', '@searchContactModalTitle', contactFeeder.anotherContactFirstName , messageFeeder.groupPatientMessage);
    await messageToolbox.closeConversation('@updatedPatientAndTeamGroup_PatientInbox', '@directMessageInbox');
  }); 

  test('Sending a message to a Contact with MMS / Attachment', async () => {
    await messageToolbox.sendAMessageWithAttachment('@updatedPatientAndTeamGroup_PatientInbox', '@searchContactModalTitle', contactFeeder.anotherContactFirstName , messageFeeder.directPatientMessage);
     await messageToolbox.closeConversation('@updatedPatientAndTeamGroup_PatientInbox', '@directMessageInbox');
  });

  test('Sending a message to a Contact using Hipaa Template', async () => {
    await messageToolbox.sendAMessageUsingHipaaTemplate('@updatedPatientAndTeamGroup_PatientInbox', '@searchContactModalTitle', contactFeeder.anotherContactFirstName);
    await messageToolbox.closeConversation('@updatedPatientAndTeamGroup_PatientInbox', '@directMessageInbox');
  });

  test('Sending a message to a Contact using other Template', async () => {
    await messageToolbox.sendADirectMessageUsingOtherTemplate('@updatedPatientAndTeamGroup_PatientInbox', '@searchContactModalTitle', contactFeeder.anotherContactFirstName);
    await messageToolbox.closeConversation('@updatedPatientAndTeamGroup_PatientInbox', '@directMessageInbox');
  }); 
});