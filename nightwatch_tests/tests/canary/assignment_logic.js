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

    thread.searchForMemberToAssign('Scott Towels');
    client.end();
  }
}