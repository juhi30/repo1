
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

  'Make sure alert validator is showing on input': function(client) {
    const addContacts = client.page.AddContactPopupPage();

    addContacts.clickAddContact()
      .testErrorPrompt()

    client.pause(2000)
  },

  'Fill out form and add it as a new contact': function(client) {
    const addContacts = client.page.AddContactPopupPage();

    addContacts.fillInFormPartOne('steve', 'monstermash', 'bash', 'october', '31', '1936')
      .fillInFormPartTwo('12345', '8435559876', 'work', 'steveMM@mooosh.com', 'secondary', 'It was a graveyard bash!')
      .clickAddContact()
    client.pause()
  },

}
