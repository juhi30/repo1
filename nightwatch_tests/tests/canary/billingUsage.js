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
  },
  
  'Verify avaialble Contact Information': function (client) {
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
  
  'Validate Billing History': function (client) {
  const billing = client.page.BillingUsagePage();
  billing.validateBillingHistory();
  },
  
  'Validate Invoice PDF': function (client) {
  const billing = client.page.BillingUsagePage();
  billing.validatePDFOpen();
  
  client.end(2000);
  },
  }
  
  