/*
This test uses Secure Messaging to test inbound/outbound messaging between a member and an end user (patient). A message is sent from patient -> member. The member logs in and verifies that the message came through. Afterwards, the member sends a Direct Message to another member, who then logs in and verifies that message's successful arrival.

Preconditions/Credentials used:
  1. kvothe / Kingkiller1! (patient)
  2. nightkeaton / Chacoz123 (member)
  3. chatty / Chatty123 (member)
*/

const helpers = require('../../helpers');
let num = helpers.randoNum;
let messageContent = `Just a test ${num}`;

module.exports = {
  'Login as a patient': function(client) {
    const login = client.page.LoginPage();
    
    login.navigate()
      .enterPatientCreds('kvothe', 'Kingkiller1!')
      .submit();
  },

  'Send a message as a patient': function(client) {
    const endUserThread = client.page.EUThreadPage();
    
    endUserThread.fillInMessageInput(messageContent)
      .pause(1000) // waiting for Send button to activate
      .clickSend()
      .clickSettingsDropdown()
      .clickLogoutButton();
  },

  'Login as a member': function(client) {
    const login = client.page.LoginPage();

    login.enterMemberCreds('nightkeaton', 'Chacoz123')
      .submit();
  },

  'Find that thread and view the message from the patient': function(client) {
    const inbox = client.page.DirectInboxPage();

    helpers.findTextOnPage(inbox, messageContent);
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