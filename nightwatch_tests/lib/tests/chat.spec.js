/**
 * This test entails one member sending a chat (direct) message to another member,
 *  then logging in as the second member to verify the message exists on both sides. 
 */

const findTextOnPage = require('../helpers').findTextOnPage;
const dateString = require('../helpers').dateString;

module.exports = {
  'Login as Night Tester (member A)': function (client) {
    let login = client.page.LoginPage();

    login.navigate().enterMemberCreds().submit().validateUrlChange();
  },

  'Navigate to the Chat page': function (client) {
    let chat = client.page.ChatPage();

    chat.navigate();
  },

  'Open a chat thread for Keaton Foster': function (client) {
    let chat = client.page.ChatPage();

    chat.clickNewChatButton().fillInNewChatSearchInput('Keaton Foster').clickFirstChatSearchResult();
  },

  'Send a message to Keaton Foster (member B)': function (client) {
    let chat = client.page.ChatPage();

    chat.fillInChatMessageInput(dateString).pause(1000).clickSendMessageButton();
  },

  'Logout': function (client) {
    let universal = client.page.UniversalElements();

    universal.clickLogout();
  },

  'Login as Keaton Foster (member B)': function (client) {
    let login = client.page.LoginPage();

    login.fillInForm('kfoster', 'chacoz').submit().validateUrlChange();
  },

  'Navigate to that thread and view the message': function (client) {
    let chat = client.page.ChatPage();

    chat.navigate().clickFirstChatThread().pause(1500);

    findTextOnPage(chat, dateString);

    client.end(5000);
  }
};