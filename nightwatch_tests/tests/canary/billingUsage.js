
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
     .enterMemberCreds('mkd', 'Test@123')
     .submit()
     .validateUrlChange();
 },

 'Case 1 : Navigate to Billing page and verify Billing page accessibility': function(client) {
  const billing = client.page.BillingUsagePage();

  billing.navigate()
  .validateUrlChange()  
  .pause(5000)
 },

 'Case 2 : Validate the Plan and various Sections available': function(client) {
  const billing = client.page.BillingUsagePage();
  
  billing
  .validateSections()
 },

'Case 3 : Validate Products in Current Plan Section ': function(client) {
  const billing = client.page.BillingUsagePage();

  billing.validateCurrentPlan()
 },


 'Case 4 : Validate Integrations Component': function(client){
  const billing = client.page.BillingUsagePage();

  billing.validateIntegrationsProduct()
 },


 'Case 5 : Validate Current Usage Section': function(client){
  const billing = client.page.BillingUsagePage();

  billing.validateCurrentUsage()
  },

  'Case 6 : Validate color of Text Message Animator': function(client){
    const billing = client.page.BillingUsagePage();

    billing.validateColors('@messageAnimator', 'stroke')
   }, 
   
   'Case 7 : Validate color of Text Message Count': function(client){
    const billing = client.page.BillingUsagePage();

    billing.validateColors('@usedTextMessage', 'fill')
   },

   'Case 8 : Validate Add-Ons and Overages Section': function(client){
    const billing = client.page.BillingUsagePage();
    billing.validateAddOnsOveragesSection()
   },

   'Case 9 : Validate Estimated Bill Section': function(client){
      const billing = client.page.BillingUsagePage();

      billing.validateEstimatedBillSection()
   },

   'Case 10 : Validate Note in Estimated Bill Section': function(client){
    const billing = client.page.BillingUsagePage();

    billing.validareEstimatedBillNote()

 },
  

    
}
