import { client } from 'nightwatch-api';
import * as memberToolbox from '../../toolboxes/login.toolbox';
import * as contactToolbox from '../../toolboxes/contact.toolbox';
import * as bulkActionToolbox from '../../toolboxes/bulkActions.toolbox';
import * as orgPreferencesToolbox from '../../toolboxes/orgPrefrences.toolbox';

const bulkActions = client.page.BulkActionsPage();
const chatInbox = client.page.DirectChatInbox();


const memberFeeder = require('../../feeder/member.feeder');
const contactFeeder = require('../../feeder/contact.feeder');
const messageFeeder = require('../../feeder/message.feeder');
const groupFeeder = require('../../feeder/group.feeder');

const contactName = `${contactFeeder.anotherContactFirstName} ${contactFeeder.anotherContactLastName}`;
const bulkContactName1 = `${contactFeeder.bulkContactFirstName1} ${contactFeeder.bulkContactLastName1}`;
const bulkContactName2 = `${contactFeeder.bulkContactFirstName2} ${contactFeeder.bulkContactLastName2}`;
const bulkContactName3 = `${contactFeeder.bulkContactFirstName3} ${contactFeeder.bulkContactLastName3}`;
const bulkContactName4 = `${contactFeeder.bulkContactFirstName4} ${contactFeeder.bulkContactLastName4}`;
const bulkContactName5 = `${contactFeeder.bulkContactFirstName5} ${contactFeeder.bulkContactLastName5}`;
const bulkContactName6 = `${contactFeeder.bulkContactFirstName6} ${contactFeeder.bulkContactLastName6}`;
const bulkContactName7 = `${contactFeeder.bulkContactFirstName7} ${contactFeeder.bulkContactLastName7}`;

// describe('Bulk Action automated test cases - Part -> 1', () => {
//   beforeAll(async () => {
//     await memberToolbox.memberLogin(memberFeeder.newMemberUsername, memberFeeder.newMemberPassword);

//     const contactDetails1 = [{ element: '@firstNameInput', value: contactFeeder.bulkContactFirstName1 },
//       { element: '@lastNameInput', value: contactFeeder.bulkContactLastName1 },
//       { element: '@birthDateInput', value: contactFeeder.bulkContactBirthDate1 },
//       { element: '@phoneNumberInput', value: contactFeeder.bulkContactFirstPhoneNumber1 },
//     ];

//     const contactDetails2 = [{ element: '@firstNameInput', value: contactFeeder.bulkContactFirstName2 },
//       { element: '@lastNameInput', value: contactFeeder.bulkContactLastName2 },
//       { element: '@birthDateInput', value: contactFeeder.bulkContactBirthDate2 },
//       { element: '@phoneNumberInput', value: contactFeeder.bulkContactFirstPhoneNumber2 },
//     ];

//     const contactDetails3 = [{ element: '@firstNameInput', value: contactFeeder.bulkContactFirstName3 },
//       { element: '@lastNameInput', value: contactFeeder.bulkContactLastName3 },
//       { element: '@birthDateInput', value: contactFeeder.bulkContactBirthDate3 },
//       { element: '@phoneNumberInput', value: contactFeeder.bulkContactFirstPhoneNumber3 },
//     ];

//     const contactDetails4 = [{ element: '@firstNameInput', value: contactFeeder.bulkContactFirstName4 },
//       { element: '@lastNameInput', value: contactFeeder.bulkContactLastName4 },
//       { element: '@birthDateInput', value: contactFeeder.bulkContactBirthDate4 },
//       { element: '@phoneNumberInput', value: contactFeeder.bulkContactFirstPhoneNumber4 },
//     ];
//     await contactToolbox.createContact(contactDetails1, '@patientOption');
//     await contactToolbox.createContact(contactDetails2, '@patientOption');
//     await contactToolbox.createContact(contactDetails3, '@patientOption');
//     await contactToolbox.createContact(contactDetails4, '@patientOption');
//   });

//   test('Create Threads on the inbox page', async () => {
//     await bulkActionToolbox.messageViaPatientGroup(contactName, messageFeeder.groupPatientMessage, groupFeeder.patientGroupChannel);
//     await bulkActionToolbox.messageViaPAndTGroup(bulkContactName1, messageFeeder.groupPatientMessage);
//     await bulkActionToolbox.messageViaPAndTGroup(bulkContactName2, messageFeeder.groupPatientMessage);
//     await bulkActionToolbox.messageViaDirect(bulkContactName3, messageFeeder.groupPatientMessage);
//     await bulkActionToolbox.messageViaDirect(bulkContactName4, messageFeeder.groupPatientMessage);
//   });

//   test('Verify action items according the selection criteria - Direct Inbox', async () => {
//     await bulkActionToolbox.actionVerificationDirectInbox('@directInbox', bulkContactName4);
//     await bulkActionToolbox.checkActionVerificationForNone();
//   });

//   test('Assign thread to Group and Verify action items according the selection criteria', async () => {
//     await bulkActionToolbox.assignThreadToMemberAndGroup('@patientGroup', contactName, '@assign', '@groupSearchInput', groupFeeder.patientAndTeamType, '@patientAndTeamGroup_PatientInbox');
//     await bulkActionToolbox.actionVerificationPatientGroup('@patientAndTeamGroup_PatientInbox', contactName);
//   });

//   test('Assign to self and Verify action items according the selection criteria', async () => {
//     await bulkActionToolbox.assignToSelf('@patientAndTeamGroup_PatientInbox', contactName, '@assignedToMe');
//     await bulkActionToolbox.AssignedToMeActionVerification('@assignedToMe', bulkContactName1);
//   });

//   test('Verify action items according the selection criteria - Following Inbox', async () => {
//     await bulkActionToolbox.actionVerificationFollowingInbox('@followingInbox', contactName);
//     await bulkActionToolbox.checkActionVerificationForNone();
//   });

//   await contactToolbox.openClosedContact(bulkContactName1, messageFeeder.noteMessage);
//   await contactToolbox.openClosedContact(bulkContactName2, messageFeeder.noteMessage);
//   await contactToolbox.openClosedContact(bulkContactName3, messageFeeder.noteMessage);
//   await contactToolbox.openClosedContact(bulkContactName4, messageFeeder.noteMessage);
// });

describe('Bulk Action automation test cases - Part -> 2', () => {
  test('login as a member', async () => {
    await memberToolbox.memberLogin(memberFeeder.newMemberUsername, memberFeeder.newMemberPassword);
  });

  test('ReOpen conversation', async () => {
    await bulkActionToolbox.messageViaPAndTGroup(bulkContactName1, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaPAndTGroup(bulkContactName2, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaPAndTGroup(bulkContactName5, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaDirect(bulkContactName3, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaDirect(bulkContactName4, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaDirect(bulkContactName6, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.assignToSelf('@patientAndTeamGroup_PatientInbox', contactFeeder.bulkContactFirstName2, '@assignedToMe');
    await bulkActionToolbox.assignThreadToMemberAndGroup('@directInbox', contactFeeder.bulkContactFirstName6, '@assign', '@groupSearchInput', groupFeeder.patientAndTeamType, '@patientAndTeamGroup_PatientInbox');
  });

  // ----- When close By assignee is OFF -------
  test('Direct Inbox select all threads and check for the action option', async () => {
    await bulkActionToolbox.closeConOptionForDirectThreads();
  });

  test('PatientTeamGroupInbox select assigned thread and check for the action option', async () => {
    await bulkActionToolbox.closeConOptionForPateintTeamForAssignedThreads();
  });

  test('PatientTeamGroupInbox select default thread and check for the action option', async () => {
    await bulkActionToolbox.checkForCloseConOptionForPateintTeamForDefaultThread();
  });

  test('AssignedToMeInbox select all threads and check for the action option', async () => {
    await bulkActionToolbox.assignmentCompleteOptionForATMThreads();
  });

  test('PatientTeamGroupInbox select all threads and check for the action option', async () => {
    await bulkActionToolbox.closeConOptionForPateintTeamForAllThreads();
  });

  test('perform the operation of assignment complete for ATM Inbox', async () => {
    await bulkActionToolbox.performAction('@assignedToMe', '@all', '@assignmentComplete');
  });

  test('perform the operation of close converstaion for Direct Inbox', async () => {
    await bulkActionToolbox.performAction('@directInbox', '@all', '@closeConversations');
  });

  test('perform the operation of close converstaion for assigned threads for P&T Inbox', async () => {
    await bulkActionToolbox.performAction('@patientAndTeamGroup_PatientInbox', '@assigned', '@assignmentComplete');
  });

  test('perform the operation of close converstaion for default threads for P&T Inbox', async () => {
    await bulkActionToolbox.performAction('@patientAndTeamGroup_PatientInbox', '@notAssigned', '@closeConversations');
  });

  test('perform the operation of close converstaion for all threads for P&T Inbox', async () => {
    await bulkActionToolbox.messageViaPAndTGroup(bulkContactName5, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaDirect(bulkContactName6, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.assignThreadToMemberAndGroup('@directInbox', contactFeeder.bulkContactFirstName6, '@assign', '@groupSearchInput', groupFeeder.patientAndTeamType, '@patientAndTeamGroup_PatientInbox');
    await bulkActionToolbox.performAction('@patientAndTeamGroup_PatientInbox', '@all', '@closeConversations');
  });


  // ------- When close by assignee is ON --------

  test('Enable the close by assignee', async () => {
    await orgPreferencesToolbox.enableCloseByAssignee();
  });

  test('ReOpen conversation when CBA is On', async () => {
    await bulkActionToolbox.messageViaPAndTGroup(bulkContactName1, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaPAndTGroup(bulkContactName2, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaPAndTGroup(bulkContactName5, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaDirect(bulkContactName3, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaDirect(bulkContactName4, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.assignToSelf('@patientAndTeamGroup_PatientInbox', contactFeeder.bulkContactFirstName5, '@assignedToMe');
    await bulkActionToolbox.assignThreadToMemberAndGroup('@directInbox', contactFeeder.bulkContactFirstName3, '@assign', '@groupSearchInput', groupFeeder.patientAndTeamType, '@patientAndTeamGroup_PatientInbox');
  });

  test('Direct Inbox select all threads and check for the action option when CBA is On', async () => {
    await bulkActionToolbox.closeConOptionForDirectThreads();
  });

  test('PatientTeamGroupInbox select assigned thread and check for the action option CBA is On', async () => {
    await bulkActionToolbox.closeConOptionForPateintTeamForAssignedThreads();
  });

  test('PatientTeamGroupInbox select default thread and check for the action option CBA is On', async () => {
    await bulkActionToolbox.closeConOptionForPateintTeamForDefaultThreadCBAOn();
  });

  test('AssignedToMeInbox select all threads and check for the action option CBA is On', async () => {
    await bulkActionToolbox.assignmentCompleteOptionForATMThreads();
  });

  test('PatientTeamGroupInbox select all threads and check for the action option CBA is On', async () => {
    await bulkActionToolbox.closeConOptionForPateintTeamForAllThreads();
  });

  test('perform the operation of assignment complete for ATM Inbox CBA is On', async () => {
    await bulkActionToolbox.performAction('@assignedToMe', '@all', '@assignmentComplete');
  });

  test('perform the operation of close converstaion for Direct Inbox CBA is On', async () => {
    await bulkActionToolbox.performAction('@directInbox', '@all', '@closeConversations');
  });

  test('perform the operation of close converstaion for assigned threads for P&T Inbox CBA is On', async () => {
    await bulkActionToolbox.performAction('@patientAndTeamGroup_PatientInbox', '@assigned', '@assignmentComplete');
  });

  test('perform the operation of close converstaion for default threads for P&T Inbox CBA is On', async () => {
    await bulkActionToolbox.performAction('@patientAndTeamGroup_PatientInbox', '@notAssigned', '@closeConversations');
  });

  test('perform the operation of close converstaion for all threads for P&T Inbox CBA is On', async () => {
    await bulkActionToolbox.messageViaPAndTGroup(bulkContactName4, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaDirect(bulkContactName6, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.assignThreadToMemberAndGroup('@directInbox', contactFeeder.bulkContactFirstName6, '@assign', '@groupSearchInput', groupFeeder.patientAndTeamType, '@patientAndTeamGroup_PatientInbox');
    await bulkActionToolbox.performAction('@patientAndTeamGroup_PatientInbox', '@all', '@closeConversations');
  });
});
