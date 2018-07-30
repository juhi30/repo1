
 /*--------------------------------------------------------------------------------------------------------*/
 // tests for the billing page and elements it contains.
 // User is logged in as Member with Billing Permissions 
 // Member belongs to a billing oeganization
 /*--------------------------------------------------------------------------------------------------------*/
 
 module.exports = {

   //Logs into app to start tests
   'Login Page with Member Credentials': function(client) {
    const login = client.page.LoginPage();

    login.navigate()
      .enterMemberCreds('plm', 'Test@123')
      .submit()
      .validateUrlChange();
  },

  'Navigate to Billing page and verify Billing page accessibility': function(client) {
    const billing = client.page.BillingPageNew();

    billing.navigate()
    .validateUrlChange()  
    .pause(5000)
   },

   'Validate the Plan and various Sections available': function(client) {
    const billing = client.page.BillingPageNew();
    
    billing
    .validateSections()
   },

  'Validate Products in Current Plan Section ': function(client) {
    const billing = client.page.BillingPageNew();

    billing.validateCurrentPlan()
   },

  'Validate Components in Current Usage Section ': function(client) {
    const billing = client.page.BillingPageNew();

    billing.validateCurrentUsage()
    },

  'Validate Estimated Bill Section': function(client){
    const billing = client.page.BillingPageNew();

    billing.validateEstimatedBillSection()
    }
  
 }
