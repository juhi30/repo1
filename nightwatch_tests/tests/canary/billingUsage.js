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

  'Validate the Plan and various Sections available': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateSections();
  },

  'Validate Products in Current Plan Section ': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateCurrentPlan();
  },


  'Validate Integrations Component': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateIntegrationsProduct();
  },


  'Validate Current Usage Section': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateCurrentUsage();
  },

  'Validate color of Text Message Animator': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateColors('@messageAnimator', 'stroke');
  },

  'Validate color of Text Message Count': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateColors('@usedTextMessage', 'fill');
  },

  'Validate Add-Ons and Overages Section': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateAddOnsOveragesSection();
  },

  'Validate Estimated Bill Section': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateEstimatedBillSection();
  },

  'Validate Note in Estimated Bill Section': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateEstimatedBillNote();
    //client.end(2000);
  },

  'verify contact information': function (client) {
    const contact = client.page.BillingUsagePage();

    contact.verifyContactInformation();
  },

  'Open and verify Billing Contact Modal': function (client) {
    const contact = client.page.BillingUsagePage();

    contact.openUpdateModal('@updateContactDetails', '@updateContactModal')
    contact.verifyBillingContactModalElement();
    contact.updateDetails('@contactFirstNameInput', 'Munish')
    contact.updateDetails('@contactLastNameInput', 'Dutta')
    contact.updateDetails('@phoneNumberInput', '9876543210')
    contact.updateDetails('@emailAddrInput', 'email@fake.com')
    contact.updateDetails('@billingLine1Input', 'Line1')
    contact.updateDetails('@billingLine2Input', 'Line2')
    contact.updateDetails('@cityInput', 'City')
    contact.updateDetails('@stateInput', 'Alaska')
    contact.updateDetails('@contactZipInput', '13245')

    contact.saveContactDetails();
  },

  'Validate Available Payment Method Details': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateAvailableDetails('@paymentMethodDetails')
      .validateUpdateLink('@changePaymentMethodLink')
  },

  'Validate Update Payment Method link availability': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.validateUpdateLink('@changePaymentMethodLink')
  },
}
