/**
 * This test is designed to test the Add Member form (but not actually create a member.. this is done in createMember.spec.js)
 */

module.exports = {
  //Logs into app to start tests
  'Login Page with Correct Credentials': function (client) {
    const login = client.page.LoginPage();

    login.navigate().enterMemberCreds().submit().validateUrlChange();
  },

  'Navigate to form': function (client) {
    const members = client.page.MembersPage();

    members.navigate().clickAddMember();
  },

  'Test validators': function (client) {
    const addMember = client.page.AddMemberPopupPage();

    addMember.clickAddMemberButton().testValidators();

    client.end(3000);
  }

};