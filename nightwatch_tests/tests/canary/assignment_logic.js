/*
  The intention of this test is to verify that thread assignment and routing is working as intended.

  Preconditions required for this test are:
    1. 2 members exist (in this case, Keaton Tester and Scott Towels)
    2. a patient exists (in this case, Kvothe Kingkiller)
    3. The secure channel that the patient uses is routed to "member one" (in this case, Keaton Tester)
*/

const helpers = require('../../helpers');
let num = helpers.randoNum;
let messageContent = `Just a test ${num}`;

module.exports = {
  'Login as Kvothe (a patient)': function(client) {
    const login = client.page.LoginPage();

    login.navigate()
      .enterPatientCreds('kvothe', 'Kingkiller1!')
      .submit();
  },

  'Send a test message and logout': function(client) {
    const endUserThread = client.page.EUThreadPage();
    
    endUserThread.fillInMessageInput(messageContent)
      .pause(1000) // waiting for Send button to activate
      .clickSend()
      .clickSettingsDropdown()
      .clickLogoutButton();
  },

  'Login as Keaton (a member) and witness that thread in Direct Inbox': function(client) {
    const login = client.page.LoginPage();
    const direct = client.page.DirectInboxPage();

    login.pause(2000)
      .enterMemberCreds('nightkeaton', 'Chacoz123')
      .submit()
      .validateUrlChange();
    direct.navigate()
      .pause(2000);
    helpers.findTextOnPage(direct, messageContent);
    helpers.clickDivViaText(direct, messageContent);
  },

  'Assign thread to Scott, then logout': function(client) {
    const thread = client.page.ConvoThreadPage();
    const uni = client.page.UniversalElements();

    thread.clickAssignIcon()
      .clickMemberAssign()
      .setValueOfMemberAssignSearchInput('Scott Towels');
    helpers.clickSpanViaText(thread, 'Scott Towels');
    thread.clickAssignButton()
      .pause(2000);
    helpers.findTextOnPage(thread, 'Assignment updated.');
    uni.pause(3000);
    uni.clickLogout();
  },

  'Login as Scott, witness thread in Assigned to Me': function(client) {
    const inbox = client.page.AssignedInboxPage();
    const login = client.page.LoginPage();

    login.pause(2000)
      .enterMemberCreds('towels', 'Towels123')
      .submit()
      .validateUrlChange();
    helpers.findTextOnPage(inbox, 'Kvothe Kingkiller');
    helpers.clickSpanViaText(inbox, 'Kvothe Kingkiller');
  },

  'Mark the thread as unassigned, then logout': function(client) {
    const thread = client.page.ConvoThreadPage();
    const uni = client.page.UniversalElements();

    thread.clickMoreOptionsIcon()
      .pause(1000)
      .clickAssignmentComplete()
      .pause(5000);
    helpers.findTextOnPage(thread, 'Looks like you\'re all caught up!');
    uni.clickLogout();
  },

  'Login again as Keaton and verify that the thread is back in the Direct Inbox': function(client) {
    const login = client.page.LoginPage();
    const direct = client.page.DirectInboxPage();

    login.pause(2000)
      .enterMemberCreds('nightkeaton', 'Chacoz123')
      .submit()
      .validateUrlChange();
    direct.navigate()
      .pause(2000);
    helpers.findTextOnPage(direct, 'Kvothe Kingkiller');
    client.end(1000);
  }
}