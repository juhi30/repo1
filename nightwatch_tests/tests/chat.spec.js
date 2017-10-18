const theDateObj = new Date;
const dateString = theDateObj.toLocaleTimeString() + ', ' + theDateObj.toLocaleDateString();

const verifyLatestMessage = function(client) {
  client.verify.containsText('body', dateString);
}

module.exports = {
  'Login as Night Tester (member A)': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .fillInForm('ntester', 'tester')
      .submit()
      .validateUrlChange()
  },

  'Navigate to the Chat page': function(client) {
    let chat = client.page.ChatPage();

    chat.navigate();
  },

  'Open a chat thread for Keaton Foster': function(client) {
    let chat = client.page.ChatPage();

    chat.clickNewChatButton()
      .fillInNewChatSearchInput('Keaton Foster')
      .clickFirstChatSearchResult();
  },

  'Send a message to Keaton Foster (member B)': function(client) {
    let chat = client.page.ChatPage();

    chat.fillInChatMessageInput(dateString)
      .pause(1000)
      .clickSendMessageButton()
  },

  'Logout': function(client) {
    let universal = client.page.UniversalElements();

    universal.clickLogout();
  },

  'Login as Keaton Foster (member B)': function(client) {
    let login = client.page.LoginPage();

    login.fillInForm('kfoster', 'chacoz')
      .submit()
      .validateUrlChange()
  },

  'Navigate to that thread and view the message': function(client) {
    let chat = client.page.ChatPage();

    chat.navigate()
      .clickFirstChatThread()
      .pause(1500);

    verifyLatestMessage(chat);

    client.end(5000)
  },
}
