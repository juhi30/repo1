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

export async function performAction(source, selection, actionName) {
  await group.openGroup(source);
  await bulk.selectOption(selection);
  bulk.selectAnAction(actionName)
    .verifySuccessMessage('@successToast');
}

// check the action option for the selected option for Direct inbox when CBA is OFF
export async function closeConOptionForDirectThreads() {
  await group.openGroup('@directInbox');
  await bulk.selectOption('@all')
    .actionForSelection('All');
}

// check the action option for the selected option for Patient Team Inbox when CBA is OFF
export async function closeConOptionForPateintTeamForAssignedThreads() {
  await group.openGroup('@patientAndTeamGroup_PatientInbox');
  await bulk.selectOption('@assigned')
    .actionForSelection('AssignedGroup');
}

export async function closeConOptionForPateintTeamForDefaultThreads() {
  await group.openGroup('@patientAndTeamGroup_PatientInbox');
  await bulk.selectOption('@notAssigned')
    .actionForSelection('NotAssignedGroup');
}

export async function closeConOptionForPateintTeamForAllThreads() {
  await group.openGroup('@patientAndTeamGroup_PatientInbox');
  await bulk.selectOption('@all')
    .actionForSelection('All');
}

// check the action option for the selected option for AssignedToMe inbox when CBA is OFF
export async function assignmentCompleteOptionForATMThreads() {
  await group.openGroup('@assignedToMe');
  await bulk.selectOption('@all')
    .actionForSelection('All');
}

// -------------CBA is ON ---------------------
// check the action option for the selected option for AssignedToMe inbox when CBA is ON

// check the action option for the selected option for Direct inbox when CBA is ON
// export async function closeConOptionForDirectThreadsCBAOn() {
//   await group.openGroup('@directInbox');
//   await bulk.selectOption('@all')
//     .actionForSelection('All');
// }

// check the action option for the selected option for patient team inbox group when CBA is ON

// export async function closeConOptionForPateintTeamForAssignedThreadsCBAOn() {
//   await group.openGroup('@patientAndTeamGroup_PatientInbox');
//   await bulk.selectOption('@assigned')
//     .actionForSelection('AssignedGroup');
// }

// export async function closeConOptionForPateintTeamForDefaultThreadCBAOn() {
//   await group.openGroup('@patientAndTeamGroup_PatientInbox');
//   await bulk.selectOption('@notAssigned')
//     .actionForSelection('NotAssignedGroup');
// }

// export async function closeConOptionForPateintTeamForAllThreadsCBAOn() {
//   await group.openGroup('@patientAndTeamGroup_PatientInbox');
//   await bulk.selectOption('@all')
//     .actionForSelection('All');
// }

// export async function assignmentCompleteOptionForATMThreadsCBAOn() {
//   await group.openGroup('@assignedToMe');
//   await bulk.selectOption('@all')
//     .actionForSelection('All');
// }

// Munish's functions

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
