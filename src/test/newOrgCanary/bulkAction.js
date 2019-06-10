import { client } from 'nightwatch-api';
import * as loginToolbox from '../../toolboxes/login.toolbox';
import * as bulkActionToolbox from '../../toolboxes/bulkActions.toolbox';
import * as contactToolbox from '../../toolboxes/contact.toolbox';

const memberFeeder = require('../../feeder/member.feeder');
const contactFeeder = require('../../feeder/contact.feeder');
const messageFeeder = require('../../feeder/message.feeder');
const groupFeeder = require('../../feeder/group.feeder');

const chat = client.page.DirectChatInboxPage();

const group = client.page.GroupsPage();
const preference = client.page.PreferencesPage();

describe('Bulk Action automation test cases', () => {
  const contactName = `${contactFeeder.anotherContactFirstName} ${contactFeeder.anotherContactLastName}`;
  const bulkContactName1 = `${contactFeeder.bulkContactFirstName1} ${contactFeeder.bulkContactLastName1}`;
  const bulkContactName2 = `${contactFeeder.bulkContactFirstName2} ${contactFeeder.bulkContactLastName2}`;
  const bulkContactName3 = `${contactFeeder.bulkContactFirstName3} ${contactFeeder.bulkContactLastName3}`;
  const bulkContactName4 = `${contactFeeder.bulkContactFirstName4} ${contactFeeder.bulkContactLastName4}`;

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

  const paginationContactDetail1 = [{ element: '@firstNameInput', value: contactFeeder.paginationFirstContact1 },
    { element: '@lastNameInput', value: contactFeeder.paginationLastName1 },
    { element: '@birthDateInput', value: contactFeeder.paginationBirthDate1 },
    { element: '@phoneNumberInput', value: contactFeeder.paginationFirstPhoneNumber1 },
  ];

  const paginationContactDetail2 = [{ element: '@firstNameInput', value: contactFeeder.paginationFirstContact2 },
    { element: '@lastNameInput', value: contactFeeder.paginationLastName2 },
    { element: '@birthDateInput', value: contactFeeder.paginationBirthDate2 },
    { element: '@phoneNumberInput', value: contactFeeder.paginationFirstPhoneNumber2 },
  ];

  const paginationContactDetail3 = [{ element: '@firstNameInput', value: contactFeeder.paginationFirstContact3 },
    { element: '@lastNameInput', value: contactFeeder.paginationLastName3 },
    { element: '@birthDateInput', value: contactFeeder.paginationBirthDate3 },
    { element: '@phoneNumberInput', value: contactFeeder.paginationFirstPhoneNumber3 },
  ];

  const paginationContactDetail4 = [{ element: '@firstNameInput', value: contactFeeder.paginationFirstContact4 },
    { element: '@lastNameInput', value: contactFeeder.paginationLastName4 },
    { element: '@birthDateInput', value: contactFeeder.paginationBirthDate4 },
    { element: '@phoneNumberInput', value: contactFeeder.paginationFirstPhoneNumber4 },
  ];

  const paginationContactDetail5 = [{ element: '@firstNameInput', value: contactFeeder.paginationFirstContact5 },
    { element: '@lastNameInput', value: contactFeeder.paginationLastName5 },
    { element: '@birthDateInput', value: contactFeeder.paginationBirthDate5 },
    { element: '@phoneNumberInput', value: contactFeeder.paginationFirstPhoneNumber5 },
  ];

  beforeAll(async () => {
    await loginToolbox.memberLogin(memberFeeder.newMemberUsername, memberFeeder.newMemberPassword);

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
    await bulkActionToolbox.messageViaPatientGroup(contactName, messageFeeder.groupPatientMessage, groupFeeder.patientGroupChannel);
    await bulkActionToolbox.messageViaPAndTGroup(bulkContactName1, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaPAndTGroup(bulkContactName2, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaDirect(bulkContactName3, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaDirect(bulkContactName4, messageFeeder.groupPatientMessage);
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
    await bulkActionToolbox.AssignedToMeActionVerification('@assignedToMe', bulkContactName1);
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

    await contactToolbox.createContact(paginationContactDetail1, '@patientOption');
    await chat.fillInMessageInput(messageFeeder.groupPatientMessage)
      .pause(1000);
    await chat.clickSendMessageButton();

    await contactToolbox.createContact(paginationContactDetail2, '@patientOption');
    await chat.fillInMessageInput(messageFeeder.groupPatientMessage)
      .pause(1000);
    await chat.clickSendMessageButton();

    await contactToolbox.createContact(paginationContactDetail3, '@patientOption');
    await chat.fillInMessageInput(messageFeeder.groupPatientMessage)
      .pause(1000);
    await chat.clickSendMessageButton();

    await contactToolbox.createContact(paginationContactDetail4, '@patientOption');
    await chat.fillInMessageInput(messageFeeder.groupPatientMessage)
      .pause(1000);
    await chat.clickSendMessageButton();

    await group.openGroup('@patientAndTeamGroup_PatientInbox')
      .waitForElementPresent('@topPagination_Group', 'Top Pagination for the selected group should be available.')
      .waitForElementNotPresent('@bottomPagination_Group', 'Bottom Pagination should not be present until the thread count crosses 8.');

    await contactToolbox.createContact(paginationContactDetail5, '@patientOption');
    await chat.fillInMessageInput(messageFeeder.groupPatientMessage)
      .pause(1000);
    await chat.clickSendMessageButton();

    await group.openGroup('@patientAndTeamGroup_PatientInbox')
      .waitForElementPresent('@topPagination_Group', 'Top Pagination for the selected group should be available.')
      .waitForElementPresent('@bottomPagination_Group', 'Bottom Pagination should be present.');
  });

  test('Perform Close Conversation Action', async () => {
    await bulkActionToolbox.closeConversationAction('@directInbox');
    await bulkActionToolbox.closeConversationAction('@patientAndTeamGroup_PatientInbox');
    await bulkActionToolbox.closeConversationAction('@patientGroup');
  });

  test('logout as Member', async () => {
    await loginToolbox.logout();
  });
});
