
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
    const contactsPage = client.page.ContactsPage();
    const addContacts = client.page.AddContactPopupPage();

    contactsPage.navigate()
      .clickAddNewContact()

    addContacts.renderAddContactsPage()
      .renderPageElements()

    client.pause(1000)
  },

  'Make sure alert validators is showing on input': function(client) {
    const addContacts = client.page.AddContactPopupPage();

    addContacts.clickAddContact()
      .validateErrorPrompt()
      .validateInputValidators()

    client.pause(1000)
  },

  'Open add photo popup and render elements': function(client) {
    const addContacts = client.page.AddContactPopupPage();

    addContacts.validatePhotoPopup()
      .clickClosePhotoPopup()

    client.pause(1000);
  },

  'Open and verify connect parties dropdown': function(client) {
    const addContacts = client.page.AddContactPopupPage();

    addContacts.clickConnectParties();
    // add more testing functionality, perhaps add a connected party to the new contact

    client.pause(1000);
  },

  'Fill out form and add it as a new contact': function(client) {
    let randoNum = Math.ceil(Math.random() * 100);
    const addContacts = client.page.AddContactPopupPage();

    addContacts.fillInFormPartOne('steve' + randoNum, 'monstermash', 'bash' + randoNum, 'october', '31', '1936')
      .fillInFormPartTwo('12345', '8435559876', 'work', 'steveMM@mooosh.com', 'secondary', 'It was a graveyard bash!')
      .clickAddContact();

    client.pause(2000);
    //
    // maybe create more logic to go in and delete contact after creation
    //
  },

}
