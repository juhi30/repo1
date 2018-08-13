// /*
// This test uses Secure Messaging to test inbound/outbound messaging between a member and an end user (patient). A message is sent from patient -> member. The member logs in and verifies that the message came through.

// Preconditions/Credentials used:
//   1. kvothe / Kingkiller1! (patient)
//   2. nightkeaton / Chacoz123 (member)
// */

// const helpers = require('../../helpers');
// let num = helpers.randoNum;
// let messageContent = `Just a test ${num}`;

// module.exports = {
//   'Login as a patient': function(client) {
//     const login = client.page.LoginPage();
    
//     login.navigate()
//       .enterPatientCreds('kvothe', 'Kingkiller1!')
//       .submit();
//   },

//   'Send a message as a patient': function(client) {
//     const endUserThread = client.page.EUThreadPage();
    
//     endUserThread.fillInMessageInput(messageContent)
//       .pause(1000) // waiting for Send button to activate
//       .clickSend()
//       .clickSettingsDropdown()
//       .clickLogoutButton();
//   },

//   'Login as a member': function(client) {
//     const login = client.page.LoginPage();

//     login.enterMemberCreds('nightkeaton', 'Chacoz123')
//       .submit();
//   },

//   'Find that thread and view the message from the patient': function(client) {
//     const inbox = client.page.DirectInboxPage();

//     helpers.findTextOnPage(inbox, messageContent);
//     client.end(2000);
//   }
// }