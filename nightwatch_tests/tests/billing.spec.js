
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
      .validateContactEls()
      .validatePaymentEls()
      .validateCCEls()
      .validateBankAcctEls()
      .validateHistoryEls()

    client.pause(1000)
  },

  'Update and save Billing contact': function(client) {
    let billing = client.page.BillingPage();

    billing.navigate()
      .validateContactEls()
      .fillInContactForm('jam', 'jeerot', '8435551551', 'jj@jamboree.jimail');

    client.pause(1000);
  },

  'Update and save payment methods': function(client) {
    let billing = client.page.BillingPage();

    billing.navigate()
      .validatePaymentEls()
      .fillInPaymentMethod('Donny', 'Boondoggle', '1 way', 'Chs', 'SC', 29403)
      .fillInCreditCardForm()
      .savePaymentMethod()
      .pause(1000)
      .fillInPaymentMethod('Donny', 'Boondoggle', '1 way', 'Chs', 'SC', 29403)
      .fillInBankAcctForm()
      .savePaymentMethod();

    client.pause();
  }
}
