
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

  'Open Add Contact Page': function(client) {
    const universalElements = client.page.UniversalElements();
    const addContacts = client.page.AddContactPopupPage();

    universalElements.clickSearchDropdownButtons('keaton');
    addContacts.renderAddContactsPage()
      .renderPageElements()
  },
}
