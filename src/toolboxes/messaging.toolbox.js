import { client } from 'nightwatch-api';

const chat = client.page.DirectChatInboxPage();
const group = client.page.GroupsPage();
const helpers = require('../toolboxes/helpers.toolbox');

const msg = client.page.DirectInboxPage();
const bulkAction = client.page.BulkActionsPage();
const template = client.page.TemplatesPage();
const contact = client.page.ContactsPage();

/**
 * Used to send messages to a Patent or Member
 */

// Can be used to send a direct chat message to a member or to a Contact
export async function sendADirectMessage(inboxElement, url, ModaltitleElement, memberName, message) {
  await group.navigateToInbox(inboxElement, url);
  await chat.clickAddIcon()
    .searchMemberAndOpenThread(ModaltitleElement, memberName);
  await chat.fillInMessageInput(message)
    .pause(1000);
  await chat.clickSendMessageButton();
}

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

export async function sendAMessageWithAttachment(groupName, titleElement, ContactName, message) {
  await group.openGroup(groupName);
  await msg.waitForElementVisible('@patientInboxPageTitle', 'Page loaded successfully');
  await chat.clickAddIcon()
    .searchMemberAndOpenThread(titleElement, ContactName);
  await chat.fillInMessageInput(message)
    .addToMessageOption()
    .addingAttachment();
  await chat.clickSendMessageButton()
    .pause(1000)
    .waitForElementNotPresent('@failedMessage', 'Message Failure alert not present');
}

export async function sendAMessageUsingHipaaTemplate(groupName, titleElement, ContactName) {
  await group.openGroup(groupName);
  await msg.waitForElementVisible('@patientInboxPageTitle', 'Page loaded successfully');
  await chat.clickAddIcon()
    .searchMemberAndOpenThread(titleElement, ContactName);
  await chat.addToMessageOption()
    .useTemplate('@hipaaTemplate')
    .pause(2000);
  await chat.clickSendMessageButton()
    .pause(1000)
    .waitForElementNotPresent('@failedMessage', 'Message Failure alert not present');
}

export async function sendADirectMessageUsingOtherTemplate(groupName, titleElement, ContactName) {
  await group.openGroup(groupName);
  await msg.waitForElementVisible('@patientInboxPageTitle', 'Page loaded successfully');
  await chat.clickAddIcon()
    .searchMemberAndOpenThread(titleElement, ContactName);
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
