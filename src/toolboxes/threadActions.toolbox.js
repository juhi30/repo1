import { client } from 'nightwatch-api/lib';

const messageFeeder = require('../feeder/message.feeder');

const group = client.page.GroupsPage();
const chat = client.page.DirectChatInboxPage();
const thread = client.page.ConvoThreadPage();
const follow = client.page.followingPage();

export async function verifyAssigningWithNoteAndFollowAction(groupName, contactName, searchInputField, assigneeName, successMessage) {
  await group.openGroup(groupName);

  await chat.openMessageThread(contactName);

  await thread.clickOnIcon('@assignmentIcon');

  await chat.selectMemberAndGroup(searchInputField, assigneeName);
  chat.clickButton('@addNoteButton')
    // .pause(1000)
    .addNote(messageFeeder.noteMessage)
    // .pause(1000)
    .clickButton('@followModalButton')
    // .pause(1000)
    .clickButton('@assignModalButton')
    // .pause(1000)
    .verifySuccessMessage(successMessage);
}

export async function verifyAssignToSelf(groupName, contactName, successMessage) {
  await group.openGroup(groupName);

  await chat.openMessageThread(contactName);

  await thread.clickOnIcon('@moreOptionsIcon');
  await chat.clickButton('@assignToMeButton')
    .verifySuccessMessage(successMessage);
}

export async function verifyAssignmentComplete(groupName, contactName, successMessage) {
  await group.openGroup(groupName);

  await chat.openMessageThread(contactName);

  await thread.pause(1000)
    .clickOnIcon('@moreOptionsIcon');
  thread.pause(1000)
    .clickAssignmentComplete();

  await chat.verifySuccessMessage(successMessage);
}

export async function verifySearchMessage(groupName, contactName, textMessage, searchResult, message) {
  await group.openGroup(groupName);
  await chat.openMessageThread(contactName);
  await thread.clickOnIcon('@searchConversationIcon')
    .searchMessageAndNote(textMessage, searchResult, message)
    .pause(1000);
}

export async function verifySearchNote(groupName, contactName, note, searchResult, message) {
  await group.openGroup(groupName);
  await chat.openMessageThread(contactName);
  await thread.clickOnIcon('@searchConversationIcon')
    .searchMessageAndNote(note, searchResult, message);
}

export async function verifyMarkConversationComplete(groupName, contactName) {
  await group.openGroup(groupName);
  await chat.openMessageThread(contactName);
  await thread.clickOnIcon('@moreOptionsIcon')
    .clickElement('@closeConversationOption')
    .waitForElementVisible('@closeConversationSuccessMessage', 'Conversation Closed Successfully.');
}

export async function verifyMarkAsUnread(groupName, contactName) {
  await group.openGroup(groupName);
  await chat.openMessageThread(contactName);
  await thread.clickOnIcon('@moreOptionsIcon')
    .clickElement('@markUnreadOption')
    .verifyUnreadMessage(contactName);
}

export async function verifyChannelFilteringWithOneChannel(groupName, message, channelName) {
  await group.openGroup(groupName);
  await chat.openMessageThread(message);
  await thread.clickOnIcon('@filterIcon')
    .waitForElementVisible('@filterByModalTitle', 'Conversation filter section is opened.')
    .applyChannelFilter(channelName)
    .clickApplyFiltersButton();
}

export async function verifyFollowedThread(ContactName, chatContact) {
  await follow.navigate()
    .verifyFollowedThread(ContactName, chatContact);
}

export async function validateUnfollowAction() {
  await follow.clickOnIcon('@moreOptionsIcon')
    .clickElement('@unFollowOption')
    .pause(1000)
    .navigate()
    .verifyDefaultState();
// this function is verifying if the unfollow action is performed successfully
// and checking out the default state of the following page as well.
}
