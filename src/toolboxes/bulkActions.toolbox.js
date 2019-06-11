import { client } from 'nightwatch-api';

const contact = client.page.ContactsPage();
const chat = client.page.DirectChatInboxPage();
const bulk = client.page.BulkActionsPage();
const group = client.page.GroupsPage();
const unfollow = client.page.followingPage();

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

export async function assignedToMeActionVerification(groupName, contactName) {
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

export async function assignmentCompleteAction(source, destination, contactName) {
  await group.openGroup(source);
  await bulk.selectOption('@all');
  bulk.selectAnAction('@assignmentComplete')
    .verifySuccessMessage('@successToast');
  await group.openGroup(destination)
    .verifyThreadVisibility(contactName);
}

export async function unfollowAction(source) {
  await group.openGroup(source);
  await bulk.selectOption('@all');
  bulk.selectAnAction('@unFollow')
    .verifySuccessMessage('@successToast');
  await unfollow.verifyDefaultState();
}

export async function closeConversationAction(source) {
  await group.openGroup(source);
  await bulk.selectOption('@all');
  bulk.selectAnAction('@closeConversations')
    .verifySuccessMessage('@successToast');
  await unfollow.verifyDefaultState();
}

export async function verifyPagination(source) {
  await group.openGroup(source);
}
