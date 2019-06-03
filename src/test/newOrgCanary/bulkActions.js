import { client } from 'nightwatch-api';
import * as bulkActionsToolbox from '../../toolboxes/bulkActions.toolbox';

import * as messageToolbox from '../../toolboxes/messaging.toolbox';

import { memberLogin } from '../../toolboxes/login.toolbox';

const memberFeeder = require('../../feeder/member.feeder');
const contactFeeder = require('../../feeder/contact.feeder');
const messageFeeder = require('../../feeder/message.feeder');
const groupFeeder = require('../../feeder/group.feeder');

const contact = client.page.ContactsPage();
const bulkActions = client.page.BulkActionsPage();


describe('Automated Tests: BulkActions', () => {
  test('Login as a Member1', async () => {
    await memberLogin(memberFeeder.newMemberUsername, memberFeeder.newMemberPassword);
  });

  beforeAll(async () => {
    // sending message to contact (when close by assignee is off)
    await messageToolbox.sendADirectMessageToContact(messageFeeder.directChatMessage, '@searchContactModalTitle', contactFeeder.anotherContactFirstName);
    await messageToolbox.sendGroupMessageToContact('@patientAndTeamGroup_PatientInbox', '@searchContactModalTitle', contactFeeder.anotherContactFirstName, messageFeeder.groupPatientMessage);
    await bulkActions.selectActionAgainstCheckboxOption('@PatientTeamGroup', '@assign', contactFeeder.anotherContactFirstName);
  });

  test('PatientTeamGroupInbox select assigned thread and check for the action option', async () => {
    await bulkActionsToolbox.checkForCloseConOptionForPateintTeamForAssignedThread();
  });

  test('PatientTeamGroupInbox select default thread and check for the action option', async () => {
    await bulkActionsToolbox.checkForCloseConOptionForPateintTeamForDefaultThread();
  });

  test('PatientTeamGroupInbox select all threads and check for the action option', async () => {
    await bulkActionsToolbox.checkForCloseConOptionForPateintTeamForAllThreads();
  });

  test('AssignedToMeInbox select all threads and check for the action option', async () => {
    await bulkActionsToolbox.checkForAssignmentCompleteOptionForATMThreads();
  });

  test('DirectInbox select all threads and check for the action option', async () => {
    await bulkActionsToolbox.checkForCloseConOptionForDirectThreads();
  });
});
