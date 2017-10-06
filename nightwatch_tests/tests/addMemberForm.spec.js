module.exports = {
//Logs into app to start tests
'Login Page with Correct Credentials': function(client) {
  const login = client.page.LoginPage();

  login.navigate()
    .fillInForm('kfoster', 'chacoz')
    .submit()
    .validateUrlChange();
},

  'Navigate to form': function(client) {
    const members = client.page.MembersPage();

    members.navigate()
      .clickAddMember();
  },

  'Test validators': function(client) {
    const addMember = client.page.AddMemberPopupPage();

    addMember.clickAddMemberButton()
      .testValidators();
  },
  
}