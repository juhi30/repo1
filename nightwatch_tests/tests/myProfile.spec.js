module.exports = {
//Logs into app to start tests
'Login Page with Correct Credentials': function(client) {
  const login = client.page.LoginPage();
  const myProfile = client.page.ProfilePage();

  login.navigate()
    .fillInForm('tonton', 'chacoz')
    .submit()
    .validateUrlChange();
},

  'Validate presence of elements': function(client) {
    const myProfile = client.page.ProfilePage();

    myProfile.navigate()
      .verifyElements();
  }
  // 'Test validator messages':
}