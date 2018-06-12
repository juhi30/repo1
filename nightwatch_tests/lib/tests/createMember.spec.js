/* Marking this test as unnecessary for now - keaton

// This test will create a new member, login as that member,
// and have that member be deactivated afterwards.
let tempPassword = '';
let username = '';

const getTempPassword = function(client) {
  return client.waitForElementVisible('@temporaryPasswordBox', 5000, 'Temp password is visible')
    .getText('@temporaryPasswordBox', function(tpObj) {
      tempPassword = tpObj.value.slice(20);
    });
};

const getUsername = function(client) {
  return client.getValue('@usernameInput', function(usernameObj) {
    username = usernameObj.value;
  });
};

module.exports = {
  //Logs into app to start tests
  'Login Page with Correct Credentials': function(client) {
    const login = client.page.LoginPage();

    login.navigate()
      .enterMemberCreds()
      .submit()
      .validateUrlChange();
  },

  'Navigate to Members page and click Add Member': function(client) {
    const members = client.page.MembersPage();

    members.navigate()
      .clickAddMember();

    client.pause(1000);
  },

  'Fill out Add Member form': function(client) {
    const addMember = client.page.AddMemberPopupPage();

    getTempPassword(addMember);

    addMember.fillInFirstNameInput('Triple')
      .fillInLastNameInput('AAA')
      .setRandomUsername('ferriswheeler')
      .selectFirstLocation();

    getUsername(addMember);

    addMember.clickAddMemberButton();
  },

  'Login as new member': function(client) {
    const uni = client.page.UniversalElements();
    const login = client.page.LoginPage();

    client.pause(2000);
    uni.clickLogout();
    login.fillInForm(username, tempPassword)
      .submitForFirstTime()
      .fillInNewPasswordInput('chacoz')
      .fillInConfirmPasswordInput('chacoz')
      .clickSaveAndContinueButton();
  },

  'Login as original member': function(client) {
    const uni = client.page.UniversalElements();
    const login = client.page.LoginPage();

    uni.clickLogout();

    login.fillInForm('kfoster', 'chacoz')
      .submit()
      .validateUrlChange();
  },

  'Deactivate the new member': function(client) {
    const members = client.page.MembersPage();

    members.navigate()
      .deactivateMember();

    client.end(3000);
  }

}

*/