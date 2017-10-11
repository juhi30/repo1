// Purpose of this test is to verify the ability to delete contacts
// who have no thread history.

module.exports = {
  'Login with valid credentials': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
    .fillInForm('ntester', 'tester')
    .submit()
    .validateUrlChange();
  },

  'Create new contact': function(client) {
    let inbox = client.page.InboxPage();
    let addContact = client.page.AddContactPopupPage();

    // start at /inbox after logging in
    inbox.newMessageClick()
      .clickAddNewContact();
    
    addContact.fillInFormPartOne('Darrensickle', 'Funbaggins', 'THE BEST', 'october', '31', '1936')
      .clickAddContact();
  }, 

  'Delete the new contact': function(client) {
    let profileSum = client.page.ProfileSummaryPage();

    // after creating the contact, you are redirected to the contacts page
    // with that profile summary in view (including the delete button)
    profileSum.deleteContact()
      .seeDeleteToast();

    client.end(1000)
    
  }
}