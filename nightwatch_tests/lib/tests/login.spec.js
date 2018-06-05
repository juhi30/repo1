'use strict';

/*--------------------------------------------------------------------------------------------------------*/

// These tests are to check the functionality of the login page, make sure the form shows up, validates
// properly and shows error when login incorrectly and transfers properly when login is correct

/*--------------------------------------------------------------------------------------------------------*/

module.exports = {
  'Login Page Initial Render': function (client) {
    const login = client.page.LoginPage();

    login.navigate().validateForm();

    client.pause(1000);
  },

  'Try to login with NO name and NO password': function (client) {
    const login = client.page.LoginPage();

    login.navigate().submit().validateError();

    client.pause(1000);
  },

  'Try to login WITH name and NO password': function (client) {
    const login = client.page.LoginPage();

    login.navigate().fillInUsername('nightmember').submit().validateError();

    client.pause(1000);
  },

  'Try to login WITH NO name and password': function (client) {
    const login = client.page.LoginPage();

    login.navigate().fillInPassword('justsomepassword').submit().validateError();

    client.pause(1000);
  },

  'Login Page with Correct Credentials': function (client) {
    const login = client.page.LoginPage();

    login.navigate().enterMemberCreds().submit().validateUrlChange();
    ///need step to validate that it transfered to inbox view here

    client.end(3000);
  }
};