// Purpose of this test is to demonstrate how to write a test
// using the Page Objects and show some of the capabilities of 
// Selenium / Nightwatch.

// Nightwatch has some issues with the ES6 method of exporting modules,
// so we still do this the ES5 way for now. 

module.exports = {
  /*
    Nightwatch passes in the "client" object into each test file. This object contains all of
    the Page Objects. These "page objects" contain the functions we'll want to use for each test we write. 
    Generally speaking, we always start at the Login page.
  */
  'Login Page with Correct Credentials': function(client) {
    // this login object contains functions for any action we would want to
    // take, also any elements we want to interact with, on the Login page.
    const login = client.page.LoginPage();

    login.navigate()
      .enterPatientCreds('kvothe', 'Kingkiller1!')
      .submit()
  },
}