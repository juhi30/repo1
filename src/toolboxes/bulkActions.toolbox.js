import { client } from 'nightwatch-api';

const contact = client.page.ContactsPage();
const chat = client.page.DirectChatInboxPage();
const bulk = client.page.BulkActionsPage();
const group = client.page.GroupsPage();

export async function messageViaGroup(contactName, message) {
  await contact.navigate()
    .openContactChat(contactName);
  await chat.fillInMessageInput(message)
    .pause(1000);
  await chat.clickSendMessageButton();
}

export async function messageViaDirect(contactName, message) {
  await contact.navigate()
    .openContactChat(contactName);
  await chat.clickButton('@rhinoSecureTab')
    .fillInMessageInput(message)
    .pause(1000);
  await chat.clickSendMessageButton();
}

export async function assignThreadToMemberAndGroup(groupName, contactName, searchInputField, assigneeName, successMessage) {
  await group.openGroup(groupName);
  await bulk.selectMessageThread(contactName);
  bulk.assignToMemberAndGroup();
  await chat.selectMemberAndGroup(searchInputField, assigneeName);
  chat.clickButton('@followModalButton')
    .clickButton('@assignModalButton')
    .verifySuccessMessage(successMessage);
}

// check the action option for the selected option for AssignedToMe inbox when CBA is OFF
export async function checkForAssignmentCompleteOptionForATMThreads() {
  await bulk
    .selectOption('@all')
    .actionForSelection('All')
    .performActionForSelection('@assignmentComplete');
}

// check the action option for the selected option for Direct inbox when CBA is OFF
export async function checkForCloseConOptionForDirectThreads() {
  await group.openGroup('@directInbox');
  await bulk.selectOption('@all')
    .actionForSelection('All')
    .performActionForSelection('@closeConversations');
}

// check the action option for the selected option for Patient Team Inbox when CBA is OFF
export async function checkForCloseConOptionForPateintTeamForAssignedThread() {
  await group.openGroup('@patientAndTeamGroup_PatientInbox');
  await bulk.selectOption('@assigned')
    .actionForSelection('AssignedGroup')
    .performActionForSelection('@assignmentComplete');
}

export async function checkForCloseConOptionForPateintTeamForDefaultThread() {
  await group.openGroup('@patientAndTeamGroup_PatientInbox');
  await bulk.selectOption('@notAssigned')
    .actionForSelection('NotAssignedGroup')
    .performActionForSelection('@closeConversations');
}

export async function checkForCloseConOptionForPateintTeamForAllThreads() {
  await group.openGroup('@patientAndTeamGroup_PatientInbox');
  await bulk.selectOption('@all')
    .actionForSelection('All')
    .performActionForSelection('@closeConversations');
}

// check the action option for the selected option for AssignedToMe inbox when CBA is ON
export async function checkForAssignmentCompleteOptionForATMThreadsCBAOn() {
  await bulk
    .navigateToInboxGroup('@assignedToMe')
    .selectOption('@all')
    .actionForSelection('@assignmentComplete');
}

// check the action option for the selected option for Direct inbox when CBA is ON
export async function checkForCloseConOptionForDirectThreadsCBAOn() {
  await bulk
    .navigateToInboxGroup('@directInbox')
    .selectOption('@all')
    .actionForSelection('@closeConversations');
}

// check the action option for the selected option for patient team inbox group when CBA is ON

export async function checkForCloseConOptionForPateintTeamForAssignedThreadCBAOn() {
  await bulk
    .navigateToInboxGroup('@PatientTeamGroup')
    .selectOption('@assigned')
    .actionForSelection('@assignmentComplete');
}

export async function checkForCloseConOptionForPateintTeamForDefaultThreadCBAOn() {
  await bulk
    .navigateToInboxGroup('@PatientTeamGroup')
    .selectOption('@notAssigned')
    .actionForSelection('@closeConversations');
}

export async function checkForCloseConOptionForPateintTeamForAllThreadsCBAOn() {
  await bulk
    .navigateToInboxGroup('@PatientTeamGroup')
    .selectOption('@all')
    .actionForSelection('@closeConversations');
}
