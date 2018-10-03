/*--------------------------------------------------------------------------------------------------------*/
// tests for the billing page and elements it contains.
// User is logged in as Member with Billing Permissions 
// Member belongs to a billing organization
/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

  'Login Page with Member Credentials': function (client) {
    const login = client.page.LoginPage();

    login.navigate()
      .enterMemberCreds('plm', 'Test@123')
      .submit()
      .validateUrlChange();
  },

  'Navigate to Billing page and verify Billing page accessibility': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.navigate()
      .validateUrlChange()
      .pause(5000);
  },

  'Validate the Plan and various Sections available': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateSections();
  },

  'Verify Current Subscription and Subscription Products': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateSubscription();
  },

  'Validate Integrations Component': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateIntegrationsProduct();
  },

  'Validate Current Usage Section': function (client) {
    const billing = client.page.BillingUsagePage();

    let self = billing;
    billing.getText('@planName', function (tpObj) {
      text = tpObj.value;
      if (text && text.match(/Subscription Trial/gi) && text.match(/Subscription Trial/gi).length) {
        self.expect.element('@currentUsageSection').to.not.be.present;
      } else {
        self.expect.element('@currentUsageSection').to.be.present;
        self.validateCurrentUsage()
          .validateColors('@messageAnimator', 'stroke')
          .validateColors('@usedTextMessage', 'fill')
          .validateMessageUpdateAlert()
      }
    });
  },

  'Validate Estimated Bill Section': function (client) {
    const billing = client.page.BillingUsagePage();

    let self = billing;
    billing.getText('@planName', function (tpObj) {
      text = tpObj.value;
      if (text && text.match(/Subscription Trial/gi) && text.match(/Subscription Trial/gi).length) {
        self.expect.element('@estimatedBillSection').to.not.be.present;
      } else {
        self.expect.element('@estimatedBillSection').to.be.present;
        self.validateEstimatedBillSection()
          .validateEstimatedBillNote()
      }
    });
  },

  'Verify available Contact Information': function (client) {
    const contact = client.page.BillingUsagePage();

    contact.verifyContactInformation();
  },

  'Validate Update Billing Contact link availability': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateUpdateLink('@updateBillingContactButton')
  },

  'Update Billing Contact Details': function (client) {
    const contact = client.page.BillingUsagePage();

    contact.openUpdateModal('@updateBillingContactButton', '@updateContactModalHeader')
      .verifyBillingContactModalElements()
      .updateBillingContact();
  },

  'Validate Available Payment Method Details': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateAvailableDetails('@availablePaymentMethodDetails');
  },

  'Validate Update Payment Method link availability': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateUpdateLink('@changePaymentMethodButton');
  },

  'Verify CC Update Modal': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.openUpdateModal('@changePaymentMethodButton', '@updatePaymentModalHeader')
      .pause(1000)
      .changePaymentMethod('@radioCreditCard')
      .pause(1000)
      .validateUpdateModalCC()
      .pause(1000);
  },

  'Verify Bank Account Update Modal': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.openUpdateModal('@changePaymentMethodButton', '@updatePaymentModalHeader')
      .pause(1000)
      .changePaymentMethod('@radioBankAccount')
      .pause(1000)
      .validateUpdateModalBankAccount()
      .pause(1000);
  },

  'Update Payment from Credit Card to Bank Account': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.openUpdateModal('@changePaymentMethodButton', '@updatePaymentModalHeader')
      .pause(1000)
      .changePaymentMethod('@radioBankAccount')
      .pause(1000)
      .updatePaymentToBank();
  },

  'Validate Billing History Section': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.historySection();
    client.end(2000);
  },
}

