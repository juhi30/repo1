/*--------------------------------------------------------------------------------------------------------*/
// tests for the billing page and elements it contains.
// User is logged in as Member with Billing Permissions 
// Member belongs to a billing organization
/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

  'Login Page with Member Credentials': function (client) {
    const login = client.page.LoginPage();

    login.navigate()
      .enterMemberCreds('mkd', 'Test@123')
      .submit()
      .validateUrlChange();
  },

  'Navigate to Billing page and verify Billing page accessibility': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.navigate()
      .validateUrlChange()
      .pause(5000);
  },

  'Update Payment Method': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.openUpdateModal('@changePaymentMethodLink', '@updatePaymentModal')
      .pause(1000)
      .changePaymentMethod()
      //.updateDetails('@paymentFirstNameInput', 'New FirstName')
      //.updateDetails('@paymentLastNameInput', 'New LastName')
  }
}
