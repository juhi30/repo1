
/*--------------------------------------------------------------------------*/

// These tests render and check contacts page elements and make sure the filters
// are working

/*--------------------------------------------------------------------------*/

module.exports = {

  'Login Page with Correct Credentials': function(client) {
    const login = client.page.LoginPage();

    login.navigate()
      .fillInForm('ntester', 'tester')
      .submit()
      .validateUrlChange();
    //better name for this function needed
  },

  'Change to Contacts url, render and verify Page elements': function(client) {
    const contacts = client.page.ContactsPage();

    contacts.navigate()
      .validateContactsElements()
      .clickAddContact();

    client.pause(1000);
  },

  'Click and validate filters are working': function(client) {
    const contacts = client.page.ContactsPage();

    contacts.clickPatientOption()
      .pause(500)
      .clickMemberOption()
      .pause(500)
      .clickConnectedPartyOption()
      .pause(500)
      .clickUnknownOption()
      .pause(500)
      .clickOtherOption()
      .pause(500)
      .clickAllContactsOption();

    client.pause(1000);
  },

  'Search for contact and validate that contacts profile page': function(client) {
    const contacts = client.page.ContactsPage();

    contacts.clickAddContact()
      .searchForContact('fro')

    client.end(3000)
  }
}
