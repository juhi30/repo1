
/*--------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

  //Logs into app to start tests
  'Login Page with Correct Credentials': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .fillInForm('ntester', 'tester')
      .submit()
      .validateUrlChange()
  },

  'Render and validate page elements in all tabs': function(client) {
    let billing = client.page.BillingPage();

    billing.navigate()
      .validateBillingContactEls()
      .validateBillingPaymentEls()
      .validateCCEls()
      .validateBankAcctEls()
      .validateHistoryEls();

    client.pause()
  },
}
