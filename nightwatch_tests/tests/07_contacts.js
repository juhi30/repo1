
/*--------------------------------------------------------------------------*/

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
      .pause(1000)
      .clickMemberOption()
      .pause(1000)
      .clickConnectedPartyOption()
      .pause(1000)
      .clickUnknownOption()
      .pause(1000)
      .clickOtherOption()
      // .clickAllContactsOption();

    client.pause();
  },

}
