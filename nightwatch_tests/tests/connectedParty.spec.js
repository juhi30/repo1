
function findConnectedParty(client, text) {
  client.verify.containsText('body', text);
}

module.exports = {
  'Login with valid member creds': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
    .fillInForm('kfoster', 'chacoz')
    .submit()
    .validateUrlChange()
  },

  'Connect an existing contact with a new contact': function(client) {
    let uni = client.page.UniversalElements();
    let profileSum = client.page.ProfileSummaryPage();
    let editCon = client.page.EditContactPopupPage();
    let randoNum = Math.ceil(Math.random() * 1000);

    uni.searchForContactAndClick('Broccoli Boy');

    profileSum.clickEditProfile();

    editCon.createNewContactAndCP(`Pewpew${randoNum}`, `Pubgagrub${randoNum}`)
      .clickSaveContact();

    client.pause(1000);

    findConnectedParty(profileSum, `Pewpew${randoNum} Pubgagrub${randoNum}`);
    
    client.end(1000);
  },

  'Connect two contacts and delete one of the contact': function(client) {

  },
}