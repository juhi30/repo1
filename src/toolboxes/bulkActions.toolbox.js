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
  await bulk.selectMessageThread(contactName)
    .assignToMemberAndGroup();
  await chat.selectMemberAndGroup(searchInputField, assigneeName)
    .clickButton('@followModalButton')
    .clickButton('@assignModalButton')
    .verifySuccessMessage(successMessage);
}
