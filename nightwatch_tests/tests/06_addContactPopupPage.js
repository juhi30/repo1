
/*--------------------------------------------------------------------------------------------------------*/


/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

  'Login Page with Correct Credentials': function(client) {
    const login = client.page.LoginPage();

    login.navigate()
      .fillInForm('ntester', 'tester')
      .submit()
      .validateUrlChange();
  },

  'Open Add Contact Page and render elements': function(client) {
    const universalElements = client.page.UniversalElements();
    const addContacts = client.page.AddContactPopupPage();

    universalElements.clickSearchDropdownButtons('keaton');
    addContacts.renderAddContactsPage()
      .renderPageElements()
  },

  'Test alert box firing': function(client) {
    const addContacts = client.page.AddContactPopupPage();

    addContacts.testErrorPrompt()

    client.pause(2000)
  },

  'Fill out form': function(client) {
    const addContacts = client.page.AddContactPopupPage();

    addContacts.fillInForm('steve', 'monstermash', 'october', '31', '1936')

    client.pause()
  },

}
