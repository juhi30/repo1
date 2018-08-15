/*
This test tests Direct Messaging between two members. A message is sent from member -> member. The second member logs in and verifies that the message came through.

Preconditions/Credentials used:
  1. nightkeaton / Chacoz123 (member)
  2. chatty / Chatty123 (member)
*/

const helpers = require('../../helpers');
let num = helpers.randoNum;
let messageContent = `Just a test ${num}`;

module.exports = {

  'Login as a member': function(client) {
    const login = client.page.LoginPage();

    login.navigate()
      .enterMemberCreds('nightkeaton', 'Chacoz123')
      .submit()
      .pause(3000) // giving the page time to redirect
  },

  'Go to Chatty Members direct chat thread': function(client) {
    const chat = client.page.DirectChatInboxPage();

    chat.navigate()
      .clickChattyMemberThread();
  },

  'Send a message to Chatty': function(client) {
    const chat = client.page.ChatThreadPage();
    const uni = client.page.UniversalElements();

    chat.fillInMessageInput(messageContent)
      .pause(1000) // waiting for the Send button to activate
      .clickSendMessageButton();

    uni.clickLogout();
  },
  
  'Login as Chatty': function(client) {
    const login = client.page.LoginPage();

    login.enterMemberCreds('chatty', 'Chatty123')
      .submit()
      .pause(2000) // giving time for login to complete
  },

  'View the message in Chatty\'s Inbox': function(client) {
    const chat = client.page.DirectChatInboxPage();

    chat.navigate();
    helpers.findTextOnPage(chat, messageContent);

    client.end(2000);
  }
}