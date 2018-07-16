module.exports = {
  'Login as a member': function(client) {
    const login = client.page.LoginPage();
    
    login.navigate()
      .enterPatientCreds('nightkeaton', 'Chacoz123')
      .submit()
  },

  'Click add new patient button': function(client) {
    const uni = client.page.UniversalElements();

    uni.clickAddNewContact()
  },

  'Fill out Create Contact form': function(client) {
    const contact = client.page.EditCreateContactPage();

    contact.fillFirstNameInput('Dill')
      .fillLastNameInput('Pickles')
      .fillBirthday('11/22/2000')
      .fillPhoneNumber('8039119111')
      .clickCreateContact()
  },

  'Inside the thread, send a secure message': function(client) {
    
  }
}