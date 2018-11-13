// /*
//   The intention of this test is to verify that thread assignment and routing is working as intended.

//   Preconditions required for this test are:
//     1. 2 members exist (in this case, Memberone AssignTest and Membertwo AssignTest)
//     2. a patient exists (in this case, Tom Patientforassigntest)
//     3. The secure channel that the patient uses is routed to "member one" (in this case, Memberone Assigned)
// */

// const helpers = require('../../helpers');
// let num = helpers.randoNum;
// let messageContent = `Just a test ${num}`;

// module.exports = {
//   'Login as a patient': function(client) {
//     const login = client.page.LoginPage();

//     login.navigate()
//       .enterPatientCreds('tompatient', 'Tompatient123')
//       .submit();
//   },

//   'Send a test message and logout': function(client) {
//     const endUserThread = client.page.EUThreadPage();
    
//     helpers.clickSpanViaText(endUserThread, 'Routing test secure channel');
//     endUserThread.pause(1000)
//       .fillInMessageInput(messageContent)
//       .pause(1000) // waiting for Send button to activate
//       .clickSend()
//       .pause(1000)
//       .clickLogoutButton();
//   },

//   'Login as a member (Memberone AssignTest) and witness that thread in Direct Inbox': function(client) {
//     const login = client.page.LoginPage();
//     const direct = client.page.DirectInboxPage();

//     login.pause(2000)
//       .enterMemberCreds('assignmember1', 'Assignone123')
//       .submit()
//       .validateUrlChange();
//     direct.navigate()
//       .pause(2000);
//     helpers.findTextOnPage(direct, messageContent);
//     helpers.clickDivViaText(direct, messageContent);
//   },

//   'Assign thread to Membertwo, then logout': function(client) {
//     const thread = client.page.ConvoThreadPage();
//     const uni = client.page.UniversalElements();

//     thread.clickAssignIcon()
//       .clickMemberAssign()
//       .setValueOfMemberAssignSearchInput('Membertwo AssignTest');
//     helpers.clickSpanViaText(thread, 'Membertwo AssignTest');
//     thread.clickAssignButton()
//       .pause(2000);
//     helpers.findTextOnPage(thread, 'Assignment updated.');
//     uni.pause(3000);
//     uni.clickLogout();
//   },

//   'Login as Membertwo, witness thread in Assigned to Me': function(client) {
//     const inbox = client.page.AssignedInboxPage();
//     const login = client.page.LoginPage();

//     login.pause(2000)
//       .enterMemberCreds('assignmember2', 'Pickledcats123')
//       .submit()
//       .validateUrlChange();
//     helpers.findTextOnPage(inbox, 'Tom Patientforassigntest');
//     helpers.clickSpanViaText(inbox, 'Tom Patientforassigntest');
//   },

//   'Mark the thread as unassigned, then logout': function(client) {
//     const thread = client.page.ConvoThreadPage();
//     const uni = client.page.UniversalElements();

//     thread.clickMoreOptionsIcon()
//       .pause(1000)
//       .clickAssignmentComplete()
//       .pause(5000);
//     helpers.findTextOnPage(thread, 'Looks like you\'re all caught up!');
//     uni.clickLogout();
//   },

//   'Login again as Memberone and verify that the thread is back in the Direct Inbox': function(client) {
//     const login = client.page.LoginPage();
//     const direct = client.page.DirectInboxPage();

//     login.pause(2000)
//       .enterMemberCreds('assignmember1', 'Assignone123')
//       .submit()
//       .validateUrlChange();
//     direct.navigate()
//       .pause(2000);
//     helpers.findTextOnPage(direct, 'Tom Patientforassigntest');
//     client.end(1000);
//   }
// }