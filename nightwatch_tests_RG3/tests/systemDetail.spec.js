
/*---------------------------------------------------------------*/

// These tests just check for simple page elements and user is able
// to navigate from page. Perhaps later tests can be built out to
// test the validity of system details collected by the app

/*---------------------------------------------------------------*/

module.exports = {

  //Logs into app to start tests
  'Login Page with Correct Credentials': function(client) {
    const login = client.page.LoginPage();

    login.navigate()
      .fillInForm('ntester', 'tester')
      .submit()
      .validateUrlChange()

    client.pause(1000)
  },

  'Switch to, render and validate page elements': function(client) {
    const sysDet = client.page.SystemDetailPage();

    sysDet.navigate()
      .validatePageElements()
      .validateMessageToast()

    client.pause(1000)
  },

  'Leave System Detail page and validate back on inbox': function(client) {
    const sysDet = client.page.SystemDetailPage();

    sysDet.leaveSysDetailsPage()

    client.end(5000)
  }
}
