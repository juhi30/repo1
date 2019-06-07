import { client } from 'nightwatch-api';

const contact = client.page.ContactsPage();
const chat = client.page.DirectChatInboxPage();
const bulk = client.page.BulkActionsPage();
const group = client.page.GroupsPage();

export async function messageViaPAndTGroup(contactName, message) {
  await contact.navigate()
    .openContactChat(contactName);
  await chat.fillInMessageInput(message)
    .pause(1000);
  await chat.clickSendMessageButton();
}

export async function messageViaPatientGroup(contactName, message, channelName) {
  await contact.navigate()
    .openContactChat(contactName);
  await chat.clickButton('@rhinoSecureTab')
    .channelSelection('@preselectedSecureChannelName', '@rhinosecureChannelListDropdown', channelName, '@newSelectedSecureChannel')
    .fillInMessageInput(message)
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

export async function assignThreadToMemberAndGroup(source, contactName, actionName, searchInputField, assigneeName, destination) {
  await group.openGroup(source);
  await bulk.selectMessageThread(contactName);
  bulk.selectAnAction(actionName);
  await chat.selectMemberAndGroup(searchInputField, assigneeName);
  await chat.clickButton('@followModalButton')
    .clickButton('@assignModalButton')
    .verifySuccessMessage('@successToast');
  await group.openGroup(destination)
    .verifyAssignedThread(contactName);
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
  await group.openGroup('@assignedToMe');
  await bulk
    .selectOption('@all')
    .actionForSelection('All')
    .performActionForSelection('@assignmentComplete');
}

// check the action option for the selected option for Direct inbox when CBA is ON
export async function checkForCloseConOptionForDirectThreadsCBAOn() {
  await group.openGroup('@directInbox');
  await bulk
    .selectOption('@all')
    .actionForSelection('All')
    .performActionForSelection('@closeConversations');
}

// check the action option for the selected option for patient team inbox group when CBA is ON

export async function checkForCloseConOptionForPateintTeamForAssignedThreadCBAOn() {
  await group.openGroup('@PatientTeamGroup');
  await bulk
    // .navigateToInboxGroup('@PatientTeamGroup')
    .selectOption('@assigned')
    .actionForSelection('AssignedGroup')
    .performActionForSelection('@assignmentComplete');
}

export async function checkForCloseConOptionForPateintTeamForDefaultThreadCBAOn() {
  await group.openGroup('@PatientTeamGroup');
  await bulk
  //  .navigateToInboxGroup('@PatientTeamGroup')
    .selectOption('@notAssigned')
    .actionForSelection('NotAssignedGroup')
    .performActionForSelection('@closeConversations');
}

export async function checkForCloseConOptionForPateintTeamForAllThreadsCBAOn() {
  await group.openGroup('@PatientTeamGroup');
  await bulk
  //  .navigateToInboxGroup('@PatientTeamGroup')
    .selectOption('@all')
    .actionForSelection('All')
    .performActionForSelection('@closeConversations');
}

export async function actionVerificationPatientGroup(groupName) {
  await group.openGroup(groupName);
  await bulk.verifyActionDropdown()
    .selectOption('@all')
    .actionForSelection('All')
    .selectOption('@read')
    .actionForSelection('Read')
    .selectOption('@unread')
    .actionForSelection('Unread')
    .selectOption('@assigned')
    .actionForSelection('AssignedGroup')
    .selectOption('@notAssigned')
    .actionForSelection('NotAssignedGroup')
    .selectOption('@following')
    .actionForSelection('Following')
    .selectOption('@notFollowing')
    .actionForSelection('NotFollowing');
}

export async function assignToSelf(source, contactName, destination) {
  await group.openGroup(source);
  await bulk.selectMessageThread(contactName);
  bulk.selectAnAction('@assignToSelf')
    .verifySuccessMessage('@successToast');
  await group.openGroup(destination)
    .verifyAssignedThread(contactName);
}

export async function AssignedToMeActionVerification(groupName, contactName) {
  await group.openGroup(groupName);
  await bulk.selectMessageThread(contactName);
  bulk.selectAnAction('@markAsRead')
    .verifySuccessMessage('@successToast');
  await bulk.verifyActionDropdown()
    .selectOption('@all')
    .actionForSelection('All')
    .selectOption('@read')
    .actionForSelection('Read')
    .selectOption('@unread')
    .actionForSelection('Unread')
    .selectOption('@following')
    .actionForSelection('Following')
    .selectOption('@notFollowing')
    .actionForSelection('NotFollowing');
}

export async function actionVerificationDirectInbox(groupName, contactName) {
  await group.openGroup(groupName);
  await bulk.selectMessageThread(contactName);
  bulk.selectAnAction('@markAsUnRead', '@successToast')
    .verifySuccessMessage('@successToast')
    .selectMessageThread(contactName);
  bulk.selectAnAction('@follow')
    .verifySuccessMessage('@successToast');
  await bulk.verifyActionDropdown()
    .selectOption('@all')
    .actionForSelection('All')
    .selectOption('@read')
    .actionForSelection('Read')
    .selectOption('@unread')
    .actionForSelection('Unread')
    .selectOption('@following')
    .actionForSelection('Following')
    .selectOption('@notFollowing')
    .actionForSelection('NotFollowing');
}

export async function checkActionVerificationForNone() {
  await bulk.noneSelection();
}

export async function actionVerificationFollowingInbox(groupName, contactName) {
  await group.openGroup(groupName);
  await bulk.selectMessageThread(contactName);
  bulk.selectAnAction('@markAsRead')
    .verifySuccessMessage('@successToast');
  await bulk.verifyActionDropdown()
    .selectOption('@all')
    .actionForSelection('All')
    .selectOption('@read')
    .actionForSelection('Read')
    .selectOption('@unread')
    .actionForSelection('Unread');
}
