import * as messageToolbox from '../../toolboxes/messaging.toolbox';
import * as actionToolbox from '../../toolboxes/threadActions.toolbox';

const contactFeeder = require('../../feeder/contact.feeder');
const messageFeeder = require('../../feeder/message.feeder');
const groupFeeder = require('../../feeder/group.feeder');

describe('Thread Actions Automated Tests', () => {
  const contactName = `${contactFeeder.anotherContactFirstName} ${contactFeeder.anotherContactLastName}`;
  test('Send a Direct group Message to a Contact', async () => {
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure('@contactNameTitle', messageFeeder.groupPatientMessage);
  });

  test('Assign Message thread to another group', async () => {
    await actionToolbox.verifyAssigningWithNoteAndFollowAction('@patientGroup', contactName, '@groupSearchInput', groupFeeder.patientAndTeamType, '@assignUpdateSuccessMessage');
  });

  test('Verifying Assigning to self action', async () => {
    await actionToolbox.verifyAssignToSelf('@patientAndTeamGroup_PatientInbox', contactName, '@assignUpdateSuccessMessage');
  });

  test('Verify Assignment Complete', async () => {
    await actionToolbox.verifyAssignmentComplete('@assignedToMe', contactName, '@assignmentCompleteSuccessMessage');
  });

  test('Search Message and Note Within the thread', async () => {
    await actionToolbox.verifySearchMessage('@patientGroup', contactName, messageFeeder.groupPatientMessage, '@messageSearchResult', '@messsage');
    await actionToolbox.verifySearchNote('@patientGroup', contactName, messageFeeder.noteMessage, '@noteSearchResult', '@note');
  });

  test('Verify Mark the thread as unread', async () => {
    await actionToolbox.verifyMarkAsUnread('@patientGroup', contactName);
  });

  test('Verify if the thread is being followed', async () => {
    await actionToolbox.verifyFollowedThread('@contactNameList', '@contactChatBoxTitle');
  });

  test('Verify Unfollow action', async () => {
    await actionToolbox.validateUnfollowAction();
  });

  test('Close the conversation', async () => {
    await actionToolbox.verifyMarkConversationComplete('@patientGroup', contactName);
  });
});
