/*--------------------------------------------------------------------------------------------------------*/

// The purpose of these tests are to verify the correct view for End Users, that sending a message is 
// possible, the Profile page is accessible and editable, and that logging in and out works properly. 

/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

  //Logs into app to start tests
  'Login Page with Correct Credentials': function(client) {
    const login = client.page.LoginPage();

    login.navigate()
      .fillInForm('pbetter', 'chacoz')
      .submit()
      .validateUrlChange()
  },

  'Test presence of elements': function(client) {
    const EUThread = client.page.EUThreadPage();

    // organization tabs
    // setting dropdown
    // profile link in settings dropdown
    // name in top left
    // attachment button
    // add file button
    // go to profile, verify elements there
  },

  'Changing the password': function(client) {
    const EUProfile = client.page.EUProfilePage();

    // change the password, save, logout, login, change it back, login, logout, done
  },

  'Sending a message': function(client) {
    const EUProfile = client.page.EUProfilePage();
    
    // send a message in
    // view it on the page afterwards
  }
}