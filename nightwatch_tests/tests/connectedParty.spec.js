module.exports = {
  'Login with valid member creds': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
    .fillInForm('ntester', 'tester')
    .submit()
    .validateUrlChange()
  },

  'Connect two existing contacts, then remove': function(client) {
    let uni = client.page.UniversalElements();
    let profileSum = client.page.ProfileSummaryPage();

    uni.searchForContactAndClick('Broccoli Boy');
    profileSum.clickEditProfile();

  },

  'Connect two contacts and delete one': function(client) {

  },
}