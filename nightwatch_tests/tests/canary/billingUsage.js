// /*--------------------------------------------------------------------------------------------------------*/
// // tests for the billing page and elements it contains.
// // User is logged in as Member with Billing Permissions 
// // Member belongs to a billing organization
// /*--------------------------------------------------------------------------------------------------------*/

// module.exports = {

//   'Login Page with Member Credentials': function (client) {
//     const login = client.page.LoginPage();

//     login.navigate()
//       .enterMemberCreds('mkd', 'Test@123')
//       .submit()
//       .validateUrlChange();
//   },

//   'Navigate to Billing page and verify Billing page accessibility': function (client) {
//     const billing = client.page.BillingUsagePage();

//     billing.navigate()
//       .validateUrlChange()
//       .pause(5000);
//   },

//   'Validate the Plan and various Sections available': function (client) {
//     const billing = client.page.BillingUsagePage();

//     billing.validateSections();
//   },

//   'Validate Products in Current Plan Section ': function (client) {
//     const billing = client.page.BillingUsagePage();

//     billing.validateCurrentPlan();
//   },


//   'Validate Integrations Component': function (client) {
//     const billing = client.page.BillingUsagePage();

//     billing.validateIntegrationsProduct();
//   },


//   'Validate Current Usage Section': function (client) {
//     const billing = client.page.BillingUsagePage();

//     billing.validateCurrentUsage();
//   },

//   'Validate color of Text Message Animator': function (client) {
//     const billing = client.page.BillingUsagePage();

//     billing.validateColors('@messageAnimator', 'stroke');
//   },

//   'Validate color of Text Message Count': function (client) {
//     const billing = client.page.BillingUsagePage();

//     billing.validateColors('@usedTextMessage', 'fill');
//   },

//   'Validate Add-Ons and Overages Section': function (client) {
//     const billing = client.page.BillingUsagePage();

//     billing.validateAddOnsOveragesSection();
//   },

//   'Validate Estimated Bill Section': function (client) {
//     const billing = client.page.BillingUsagePage();

//     billing.validateEstimatedBillSection();
//   },

//   'Validate Note in Estimated Bill Section': function (client) {
//     const billing = client.page.BillingUsagePage();

//     billing.validateEstimatedBillNote();
//     client.end(2000);
//  }
// }
