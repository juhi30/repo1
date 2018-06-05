// THIS TEST CANNOT HAPPEN (YET?). We have a way to switch windows, but 
// not the ability to create a new one on command, so there isn't another
// window to switch to. Keeping this file in case we figure out a way to continue this.


/*--------------------------------------------------------------------------------------------------------*/

// The purpose of this test: to test the functionality of typing indicators and, indirectly, pubnub. Doing
// so via Chat threads.

/*--------------------------------------------------------------------------------------------------------*/

// module.exports = {
//   'Login with valid creds (window 1)': function(client) {
//     let login = client.page.LoginPage();

//     login.navigate()
//       .fillInForm('ntester', 'tester')
//       .submit()
//       .validateUrlChange()
//   },

//   'Navigate to the Chat page (window 1)': function(client) {
//     let chat = client.page.ChatPage();

//     chat.navigate();
//   },

//   'Open a chat thread for Keaton Foster (window 1)': function(client) {
//     let chat = client.page.ChatPage();

//     chat.clickNewChatButton()
//       .fillInNewChatSearchInput('Keaton Foster')
//       .clickFirstChatSearchResult();
//   },

//   'Login with valid creds (window 2)': function(client) {
//     client.window_handles(function(result) {

//       let keatonsWindow = result.value[1];

//       client.switchWindow(keatonsWindow);
//     });

//     let login = client.page.LoginPage();

//     login.navigate()
//       .fillInForm('kfoster', 'chacoz')
//       .submit()
//       .validateUrlChange()
//   }
// }
"use strict";