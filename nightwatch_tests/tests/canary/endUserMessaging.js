/*
Requirements to pass:
  1. Kvothe Kingkiller (patient) must be assigned to Keaton Tester (member)
  2. Kvothe Kingkiller is a signed-up patient
*/

const helpers = require('../../helpers');
let num = helpers.randoNum;
let messageContent = `Just a test ${num}`;

module.exports = {
  'Login as a patient': function(client) {
    const login = client.page.LoginPage();
    
    login.navigate()
      .enterPatientCreds('kvothe', 'Kingkiller1!')
      .submit()
  },

  'Send a message as a patient': function(client) {
    const endUserThread = client.page.EUThreadPage();
    
    endUserThread.fillInMessageInput(messageContent)
      .pause(1000) // waiting for Send button to become enabled
      .clickSend()
      .clickSettingsDropdown()
      .clickLogoutButton();
  },

  'Login as a member': function(client) {
    const login = client.page.LoginPage();

    login.pause(2000)
      .enterMemberCreds('nightkeaton', 'Chacoz123')
      .submit()
  },

  'Find that thread and view the message from the patient': function(client) {
    const inbox = client.page.InboxPage();

    helpers.findTextOnPage(inbox, messageContent);

    client.end();
  }
}