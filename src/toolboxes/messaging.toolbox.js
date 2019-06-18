import { client } from 'nightwatch-api';

const chat = client.page.DirectChatInboxPage();
const group = client.page.GroupsPage();
const universal = client.page.UniversalElements();

const helpers = require('../toolboxes/helpers.toolbox');

const msg = client.page.DirectInboxPage();
const bulkAction = client.page.BulkActionsPage();
const template = client.page.TemplatesPage();
const contact = client.page.ContactsPage();
const members = client.page.MembersPage();

/**
 * Used to send messages to a Patent or Member
 */

export async function directMessageToMember(memberName, message) {
  await universal.clickMembers();
  await members.selectMember(memberName);
  await members.goToConversation()
    .pause(1000);
  await chat.fillInMessageInput(message)
    .pause(1000);
  await chat.clickSendMessageButton();
}

// Can be used to send a direct chat message to a member or to a Contact
// export async function sendADirectMessage(inboxElement, url, ModaltitleElement, memberName, message) {
//   await group.navigateToInbox(inboxElement, url);
//   await chat.clickAddIcon()
//     .searchMemberAndOpenThread(ModaltitleElement, memberName);
//   await chat.fillInMessageInput(message)
//     .pause(1000);
//   await chat.clickSendMessageButton();
// }

export async function sendChatMessageToGroup(groupName, message) {
  await group.openGroup(groupName);
  await chat.fillInMessageInput(message)
    .pause(1000)
    .clickSendMessageButton();
}

export async function verifyReceivingDirectChatMessage(message) {
  await chat.navigate();
  helpers.findTextOnPage(chat, message);
}

export async function verifyReceivingGroupChatMessage(groupName, message) {
  await group.openGroup(groupName);
  helpers.findTextOnPage(chat, message);
}

export async function newMessageToContact(contactName, messageTab, message, channelName) {
  await contact.navigate()
    .openContactChat(contactName)
    .pause(1000)
    .selectMessageTab(messageTab)
    .pause(1000);
  await chat.fillInMessageInput(message);
  await chat.selectFromRoute(channelName);
  await chat.clickSendMessageButton()
    .waitForElementNotPresent('@failedMessage', 'Message Failure alert not present');
}

export async function sendAMessageWithAttachment(contactName, messageTab, message, channelName) {
  await contact.navigate()
    .openContactChat(contactName)
    .pause(1000)
    .selectMessageTab(messageTab)
    .pause(1000);
  await chat.fillInMessageInput(message);
  await chat.selectFromRoute(channelName)
    .addToMessageOption()
    .addingAttachment();
  await chat.clickSendMessageButton()
    .pause(1000)
    .waitForElementNotPresent('@failedMessage', 'Message Failure alert not present');
}

export async function sendAMessageUsingHipaaTemplate(contactName, messageTab, message, channelName) {
  await contact.navigate()
    .openContactChat(contactName)
    .pause(1000)
    .selectMessageTab(messageTab)
    .pause(1000);
  await chat.fillInMessageInput(message);
  await chat.selectFromRoute(channelName);
  await chat.addToMessageOption()
    .useTemplate('@hipaaTemplate')
    .pause(2000);
  await chat.clickSendMessageButton()
    .pause(1000)
    .waitForElementNotPresent('@failedMessage', 'Message Failure alert not present');
}

export async function sendADirectMessageUsingOtherTemplate(contactName, messageTab, message, channelName) {
  await contact.navigate()
    .openContactChat(contactName)
    .pause(1000)
    .selectMessageTab(messageTab)
    .pause(1000);
  await chat.fillInMessageInput(message);
  await chat.selectFromRoute(channelName);
  await chat.addToMessageOption()
    .useTemplate('@useTemplateOption')
    .pause(2000);
  template.click('@editedTemplateTitle')
    .pause(1000);
  await chat.clickSendMessageButton()
    .pause(1000)
    .waitForElementNotPresent('@failedMessage', 'Message Failure alert not present');
}

export async function closeConversation(groupName, directInbox) {
  await group.openGroup(groupName);
  bulkAction.closeAllConversation();
  await group.openGroup(directInbox);
}

export async function sendGroupMessageToContactUsingRhinosecure(contactName, channelName, message) {
  await contact.navigate()
    .openContactChat(contactName);
  await chat.clickButton('@rhinoSecureTab')
    .channelSelection('@selectedChannel', '@rhinosecureChannelListDropdown', channelName)
    .fillInMessageInput(message)
    .pause(1000);
  await chat.clickSendMessageButton();
}
