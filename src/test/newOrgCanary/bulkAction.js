import { client } from 'nightwatch-api';
import * as contactToolbox from '../../toolboxes/contact.toolbox';
import * as bulkActionToolbox from '../../toolboxes/bulkActions.toolbox';
import * as orgPreferencesToolbox from '../../toolboxes/orgPrefrences.toolbox';
import * as messageToolbox from '../../toolboxes/messaging.toolbox';

const preference = client.page.PreferencesPage();
const chat = client.page.DirectChatInboxPage();
const group = client.page.GroupsPage();
const contactFeeder = require('../../feeder/contact.feeder');
const messageFeeder = require('../../feeder/message.feeder');
const groupFeeder = require('../../feeder/group.feeder');
const channelFeeder = require('../../feeder/channel.feeder');

const contactName = `${contactFeeder.anotherContactFirstName} ${contactFeeder.anotherContactLastName}`;
const bulkContactName1 = `${contactFeeder.bulkContactFirstName1} ${contactFeeder.bulkContactLastName1}`;
const bulkContactName2 = `${contactFeeder.bulkContactFirstName2} ${contactFeeder.bulkContactLastName2}`;
const bulkContactName3 = `${contactFeeder.bulkContactFirstName3} ${contactFeeder.bulkContactLastName3}`;
const bulkContactName4 = `${contactFeeder.bulkContactFirstName4} ${contactFeeder.bulkContactLastName4}`;
const testcontact1 = `${contactFeeder.testingContactFirstName1} ${contactFeeder.testingContactLastName1}`;
const testcontact2 = `${contactFeeder.testingContactFirstName1} ${contactFeeder.testingContactLastName1}`;

const contactDetails1 = [{ element: '@firstNameInput', value: contactFeeder.bulkContactFirstName1 },
  { element: '@lastNameInput', value: contactFeeder.bulkContactLastName1 },
  { element: '@birthDateInput', value: contactFeeder.bulkContactBirthDate1 },
  { element: '@phoneNumberInput', value: contactFeeder.bulkContactFirstPhoneNumber1 },
];

const contactDetails2 = [{ element: '@firstNameInput', value: contactFeeder.bulkContactFirstName2 },
  { element: '@lastNameInput', value: contactFeeder.bulkContactLastName2 },
  { element: '@birthDateInput', value: contactFeeder.bulkContactBirthDate2 },
  { element: '@phoneNumberInput', value: contactFeeder.bulkContactFirstPhoneNumber2 },
];

const contactDetails3 = [{ element: '@firstNameInput', value: contactFeeder.bulkContactFirstName3 },
  { element: '@lastNameInput', value: contactFeeder.bulkContactLastName3 },
  { element: '@birthDateInput', value: contactFeeder.bulkContactBirthDate3 },
  { element: '@phoneNumberInput', value: contactFeeder.bulkContactFirstPhoneNumber3 },
];

const contactDetails4 = [{ element: '@firstNameInput', value: contactFeeder.bulkContactFirstName4 },
  { element: '@lastNameInput', value: contactFeeder.bulkContactLastName4 },
  { element: '@birthDateInput', value: contactFeeder.bulkContactBirthDate4 },
  { element: '@phoneNumberInput', value: contactFeeder.bulkContactFirstPhoneNumber4 },
];

const testContact1 = [{ element: '@firstNameInput', value: contactFeeder.testingContactFirstName1 },
  { element: '@lastNameInput', value: contactFeeder.testingContactLastName1 },
  { element: '@birthDateInput', value: contactFeeder.testingContactBirthDate1 },
  { element: '@phoneNumberInput', value: contactFeeder.testingContactPhoneNumber1 },
];

const testContact2 = [{ element: '@firstNameInput', value: contactFeeder.testingContactFirstName2 },
  { element: '@lastNameInput', value: contactFeeder.testingContactLastName2 },
  { element: '@birthDateInput', value: contactFeeder.testingContactBirthDate2 },
  { element: '@phoneNumberInput', value: contactFeeder.testingContactPhoneNumber2 },
];

const testContact3 = [{ element: '@firstNameInput', value: contactFeeder.testingContactFirstName3 },
  { element: '@lastNameInput', value: contactFeeder.testingContactLastName3 },
  { element: '@birthDateInput', value: contactFeeder.testingContactBirthDate3 },
  { element: '@phoneNumberInput', value: contactFeeder.testingContactPhoneNumber3 },
];

const testContact4 = [{ element: '@firstNameInput', value: contactFeeder.testingContactFirstName4 },
  { element: '@lastNameInput', value: contactFeeder.testingContactLastName4 },
  { element: '@birthDateInput', value: contactFeeder.testingContactBirthDate4 },
  { element: '@phoneNumberInput', value: contactFeeder.testingContactPhoneNumber4 },
];

const testContact5 = [{ element: '@firstNameInput', value: contactFeeder.testingContactFirstName5 },
  { element: '@lastNameInput', value: contactFeeder.testingContactLastName5 },
  { element: '@birthDateInput', value: contactFeeder.testingContactBirthDate5 },
  { element: '@phoneNumberInput', value: contactFeeder.testingContactPhoneNumber5 },
];

describe('Bulk Action automation test cases', () => {
  beforeAll(async () => {
    await contactToolbox.createContact(contactDetails1, '@patientOption');
    await contactToolbox.createContact(contactDetails2, '@patientOption');
    await contactToolbox.createContact(contactDetails3, '@patientOption');
    await contactToolbox.createContact(contactDetails4, '@patientOption');
  });

  test('Disable Close By Assignee option', async () => {
    await preference.navigate()
      .waitForElementVisible('@closeByAssignee', 'close by assignee is visible')
      .click('@closeByAssignee')
      .click('@updatePreferences')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible');
  });

  test('Create Threads on the inbox page', async () => {
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(contactName, groupFeeder.patientGroupChannel, messageFeeder.groupPatientMessage);
    await messageToolbox.sendGroupMessageToContact(bulkContactName1, messageFeeder.groupPatientMessage);
    await messageToolbox.sendGroupMessageToContact(bulkContactName2, messageFeeder.groupPatientMessage);
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(bulkContactName3, channelFeeder.rhinoChannelNewName, messageFeeder.groupPatientMessage);
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(bulkContactName4, channelFeeder.rhinoChannelNewName, messageFeeder.groupPatientMessage);
  });

  test('Verify action items according the selection criteria - Direct Inbox', async () => {
    await bulkActionToolbox.actionVerificationDirectInbox('@directInbox', bulkContactName4);
    await bulkActionToolbox.checkActionVerificationForNone();
  });

  test('Assign thread to Group and Verify action items according the selection criteria', async () => {
    await bulkActionToolbox.assignThreadToMemberAndGroup('@patientGroup', contactName, '@assign', '@groupSearchInput', groupFeeder.patientAndTeamType, '@patientAndTeamGroup_PatientInbox');
    await bulkActionToolbox.actionVerificationPatientGroup('@patientAndTeamGroup_PatientInbox', contactName);
  });

  test('Assign to self and Verify action items according the selection criteria', async () => {
    await bulkActionToolbox.assignToSelf('@patientAndTeamGroup_PatientInbox', contactName, '@assignedToMe');
    await bulkActionToolbox.assignedToMeActionVerification('@assignedToMe', bulkContactName1);
  });

  test('Verify action items according the selection criteria - Following Inbox', async () => {
    await bulkActionToolbox.actionVerificationFollowingInbox('@followingInbox', contactName);
    await bulkActionToolbox.checkActionVerificationForNone();
  });

  test('Perform Assignment Complete Action', async () => {
    await bulkActionToolbox.assignmentCompleteAction('@assignedToMe', '@patientAndTeamGroup_PatientInbox', bulkContactName1);
  });

  test('Perform Unfollow Action', async () => {
    await bulkActionToolbox.unfollowAction('@followingInbox');
  });

  test('Check Pagination', async () => {
    await bulkActionToolbox.assignThreadToMemberAndGroup('@patientGroup', contactName, '@assign', '@groupSearchInput', groupFeeder.patientAndTeamType, '@patientAndTeamGroup_PatientInbox');

    await contactToolbox.createContact(testContact1, '@patientOption');
    await chat.fillInMessageInput(messageFeeder.groupPatientMessage)
      .pause(1000);
    await chat.clickSendMessageButton();

    await contactToolbox.createContact(testContact2, '@patientOption');
    await chat.fillInMessageInput(messageFeeder.groupPatientMessage)
      .pause(1000);
    await chat.clickSendMessageButton();

    await contactToolbox.createContact(testContact3, '@patientOption');
    await chat.fillInMessageInput(messageFeeder.groupPatientMessage)
      .pause(1000);
    await chat.clickSendMessageButton();

    await contactToolbox.createContact(testContact4, '@patientOption');
    await chat.fillInMessageInput(messageFeeder.groupPatientMessage)
      .pause(1000);
    await chat.clickSendMessageButton();

    await group.openGroup('@patientAndTeamGroup_PatientInbox')
      .waitForElementPresent('@topPaginationGroup', 'Top Pagination for the selected group should be available.')
      .waitForElementNotPresent('@bottomPaginationGroup', 'Bottom Pagination should not be present until the thread count crosses 8.');

    await contactToolbox.createContact(testContact5, '@patientOption');
    await chat.fillInMessageInput(messageFeeder.groupPatientMessage)
      .pause(1000);
    await chat.clickSendMessageButton();

    await group.openGroup('@patientAndTeamGroup_PatientInbox')
      .waitForElementPresent('@topPaginationGroup', 'Top Pagination for the selected group should be available.')
      .waitForElementPresent('@bottomPaginationGroup', 'Bottom Pagination should be present.');
  });

  test('Perform Close Conversation Action', async () => {
    await bulkActionToolbox.closeConversationAction('@directInbox');
    await bulkActionToolbox.closeConversationAction('@patientAndTeamGroup_PatientInbox');
    await bulkActionToolbox.closeConversationAction('@patientGroup');
  });
});

describe('Bulk Actions: Close conversation logic', () => {
  test('Reopen conversation', async () => {
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(bulkContactName1, groupFeeder.patientAndTeamGroupChannel, messageFeeder.groupPatientMessage);
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(bulkContactName2, groupFeeder.patientAndTeamGroupChannel, messageFeeder.groupPatientMessage);
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(contactName, groupFeeder.patientAndTeamGroupChannel, messageFeeder.groupPatientMessage);
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(testcontact1, channelFeeder.rhinoChannelNewName, messageFeeder.groupPatientMessage);
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(testcontact2, channelFeeder.rhinoChannelNewName, messageFeeder.groupPatientMessage);
    // eslint-disable-next-line max-len
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(contactFeeder.contactNewFirstName, channelFeeder.rhinoChannelNewName, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.assignThreadToMemberAndGroup('@directInbox', contactFeeder.contactNewFirstName, '@assign', '@groupSearchInput', groupFeeder.patientAndTeamType, '@patientAndTeamGroup_PatientInbox');
  });


  // ----- When close By assignee is OFF -------
  test('Direct Inbox select default type threads and check for the action option', async () => {
    await bulkActionToolbox.selectThreadAndVerifyResult('@directInbox', '@all', 'All');
  });

  test('PatientTeamGroupInbox select assigned thread and check for the action option', async () => {
    await bulkActionToolbox.selectThreadAndVerifyResult('@patientAndTeamGroup_PatientInbox', '@assigned', 'AssignedGroup');
  });

  test('PatientTeamGroupInbox select default thread and check for the action option', async () => {
    await bulkActionToolbox.selectThreadAndVerifyResult('@patientAndTeamGroup_PatientInbox', '@notAssigned', 'NotAssignedGroup');
    await bulkActionToolbox.assignToSelf('@patientAndTeamGroup_PatientInbox', bulkContactName2, '@assignedToMe');
  });

  test('AssignedToMeInbox select all threads and check for the action option', async () => {
    await bulkActionToolbox.selectThreadAndVerifyResult('@assignedToMe', '@all', 'All');
  });

  test('perform the operation of assignment complete for ATM Inbox', async () => {
    await bulkActionToolbox.performAction('@assignedToMe', '@all', '@assignmentComplete');
  });

  test('PatientTeamGroupInbox select default and assigned threads and check for the action option', async () => {
    await bulkActionToolbox.selectThreadAndVerifyResult('@patientAndTeamGroup_PatientInbox', '@all', 'All');
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
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(contactName, groupFeeder.patientAndTeamGroupChannel, messageFeeder.groupPatientMessage);
    // eslint-disable-next-line max-len
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(contactFeeder.contactNewFirstName, channelFeeder.rhinoChannelNewName, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.assignThreadToMemberAndGroup('@directInbox', contactFeeder.contactNewFirstName, '@assign', '@groupSearchInput', groupFeeder.patientAndTeamType, '@patientAndTeamGroup_PatientInbox');
    await bulkActionToolbox.performAction('@patientAndTeamGroup_PatientInbox', '@all', '@closeConversations');
  });

  // ------ When close by assignee is ON --------

  test('Enable Close by Assignee option', async () => {
    await orgPreferencesToolbox.enableCloseByAssignee();
  });

  test('Reopen conversation when CBA is On', async () => {
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(bulkContactName1, groupFeeder.patientAndTeamGroupChannel, messageFeeder.groupPatientMessage);
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(bulkContactName2, groupFeeder.patientAndTeamGroupChannel, messageFeeder.groupPatientMessage);
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(contactName, groupFeeder.patientAndTeamGroupChannel, messageFeeder.groupPatientMessage);
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(testcontact1, channelFeeder.rhinoChannelNewName, messageFeeder.groupPatientMessage);
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(testcontact2, channelFeeder.rhinoChannelNewName, messageFeeder.groupPatientMessage);
    // eslint-disable-next-line max-len
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(contactFeeder.contactNewFirstName, channelFeeder.rhinoChannelNewName, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.assignToSelf('@patientAndTeamGroup_PatientInbox', contactFeeder.bulkContactFirstName2, '@assignedToMe');
    await bulkActionToolbox.assignThreadToMemberAndGroup('@directInbox', contactFeeder.contactNewFirstName, '@assign', '@groupSearchInput', groupFeeder.patientAndTeamType, '@patientAndTeamGroup_PatientInbox');
  });

  test('Direct Inbox select default threads and check for the action option when CBA is On', async () => {
    await bulkActionToolbox.selectThreadAndVerifyResult('@directInbox', '@all', 'All');
  });

  test('PatientTeamGroupInbox select assigned thread and check for the action option CBA is On', async () => {
    await bulkActionToolbox.selectThreadAndVerifyResult('@patientAndTeamGroup_PatientInbox', '@assigned', 'AssignedGroup');
  });

  test('PatientTeamGroupInbox select default thread and check for the action option CBA is On', async () => {
    await bulkActionToolbox.selectThreadAndVerifyResult('@patientAndTeamGroup_PatientInbox', '@notAssigned', 'NotAssignedGroup');
  });

  test('AssignedToMeInbox select all threads and check for the action option CBA is On', async () => {
    await bulkActionToolbox.selectThreadAndVerifyResult('@assignedToMe', '@all', 'All');
  });

  test('PatientTeamGroupInbox select all threads and check for the action option CBA is On', async () => {
    await bulkActionToolbox.selectThreadAndVerifyResult('@patientAndTeamGroup_PatientInbox', '@all', 'All');
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
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(contactName, groupFeeder.patientAndTeamGroupChannel, messageFeeder.groupPatientMessage);
    // eslint-disable-next-line max-len
    await messageToolbox.sendGroupMessageToContactUsingRhinosecure(contactFeeder.contactNewFirstName, channelFeeder.rhinoChannelNewName, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.assignThreadToMemberAndGroup('@directInbox', contactFeeder.contactNewFirstName, '@assign', '@groupSearchInput', groupFeeder.patientAndTeamType, '@patientAndTeamGroup_PatientInbox');
    await bulkActionToolbox.performAction('@patientAndTeamGroup_PatientInbox', '@all', '@closeConversations');
  });
});
