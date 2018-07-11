// Purpose of this test is to demonstrate how to write a test
// using the Page Objects and show some of the capabilities of 
// Selenium / Nightwatch.

const helpers = require('../helpers');
let num = helpers.randoNum;
let messageContent = `Just a test ${num}`;

module.exports = {
  /*
    Nightwatch passes in the "client" object into each test file. This object contains all of
    the Page Objects. These "page objects" contain the functions we'll want to use for each test we write. 
    Generally speaking, we always start at the Login page.
  */
  'Login as a patient': function(client) {
    // this login object contains functions for any action we would want to
    // take, also any elements we want to interact with, on the Login page.
    const login = client.page.LoginPage();

    // navigate() and submit() are native Nightwatch functions, where as enterPatientCreds() is one we wrote ourselves in the LoginPage.js page object.
    // PageObjects will always have access to both. 
    
    login.navigate()
      .enterPatientCreds()
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
      .enterMemberCreds()
      .submit()
  }, 

  'Verify Inbox contains inboxes': function(client) {
    const inbox = client.page.InboxPage();

    helpers.findTextOnPage(inbox, 'MY TASKS');
    helpers.findTextOnPage(inbox, 'PATIENT MESSAGES');
    helpers.findTextOnPage(inbox, 'TEAM MESSAGES');
  },

  'Find that thread and view the message from the patient': function(client) {
    const inbox = client.page.InboxPage();

    

    client.end();
  }
}