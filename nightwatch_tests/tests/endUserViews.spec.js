/*--------------------------------------------------------------------------------------------------------*/

// The purpose of these tests are to verify the correct views for End Users and that all necessary
// functionality is possible.

/*--------------------------------------------------------------------------------------------------------*/
const dateString = require("../helpers").dateString;

module.exports = {
  //Logs into app to start tests
  "Login Page with Correct Credentials": function(client) {
    const login = client.page.LoginPage();

    login
      .navigate()
      .fillInForm("pbetter", "chacoz")
      .submit();
  },

  "Test presence of elements": function(client) {
    const EUThread = client.page.EUThreadPage();

    EUThread.validatePageElements();
  },

  "Changing the password": function(client) {
    const EUProfile = client.page.EUProfilePage();

    EUProfile.navigate()
      .clickChangePassword()
      .fillInCurrentPasswordInput("chacoz")
      .fillInNewPasswordInput("chacoz")
      .fillInRetypeNewPasswordInput("chacoz")
      .clickSavePassword()
      .verifyPasswordUpdatedToast();
  },

  "Sending a message": function(client) {
    const EUThread = client.page.EUThreadPage();

    EUThread.navigate().fillInMessageInput(dateString);

    client.pause(500);

    EUThread.clickSend();

    client.end(3000);
  }
};
