import { client } from 'nightwatch-api';

const chat = client.page.DirectChatInboxPage();
const group = client.page.GroupsPage();
const universal = client.page.UniversalElements();

const helpers = require('../toolboxes/helpers.toolbox');

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
    .pause(1000);
  contact.selectMessageTab(messageTab)
    .pause(1000);
  await chat.fillInMessageInput(message);
  await chat.selectFromRoute(channelName);
  await chat.clickSendMessageButton();
}

export async function sendAMessageWithAttachment(contactName, messageTab, message, channelName) {
  await contact.navigate()
    .openContactChat(contactName)
    .pause(1000);
  await contact.selectMessageTab(messageTab)
    .pause(1000);
  await chat.fillInMessageInput(message);
  await chat.addToMessageOption()
    .addingAttachment();
  await chat.selectFromRoute(channelName);
  await chat.clickSendMessageButton()
    .pause(1000);
}

export async function sendAMessageUsingHipaaTemplate(contactName, messageTab, channelName) {
  await contact.navigate()
    .openContactChat(contactName)
    .pause(1000);
  contact.selectMessageTab(messageTab)
    .pause(1000);
  await chat.addToMessageOption()
    .useTemplate('@hipaaTemplate')
    .pause(2000);
  await chat.selectFromRoute(channelName);
  await chat.clickSendMessageButton()
    .pause(1000);
}

export async function sendADirectMessageUsingOtherTemplate(contactName, messageTab, channelName) {
  await contact.navigate()
    .openContactChat(contactName)
    .pause(1000);
  contact.selectMessageTab(messageTab)
    .pause(1000);
  await chat.addToMessageOption()
    .useTemplate('@useTemplateOption')
    .pause(2000);
  template.click('@editedTemplateTitle')
    .pause(1000);
  await chat.selectFromRoute(channelName);
  await chat.clickSendMessageButton()
    .pause(1000);
}

export async function closeConversation(groupName) {
  await group.openGroup(groupName);
  bulkAction.closeAllConversation();
}

export async function sendMessageToContactUsingRhinosecure(contactName, channelName, message) {
  await contact.navigate()
    .openContactChat(contactName);
  await chat.clickButton('@rhinoSecureTab')
    .channelSelection('@selectedChannel', '@rhinosecureChannelListDropdown', channelName)
    .fillInMessageInput(message)
    .pause(1000);
  await chat.clickSendMessageButton();
}
