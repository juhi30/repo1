// /*--------------------------------------------------------------------------------------------------------*/
// // tests for the billing page and elements it contains.
// // User is logged in as Member with Billing Permissions 
// // Member belongs to a billing organization
// /*--------------------------------------------------------------------------------------------------------*/

// module.exports = {

//   'Login Page with CCR Credentials': function (client) {
//     const login = client.page.LoginPage();

//     login.navigate()
//       .enterMemberCreds('mccr', 'bacon')
//       .pause(1000)
//       .submit()
//       .pause(1000)
//       .validateUrlChangeAdmin();
//   },

//   'Without Billing Org Creation': function (client) {
//     const addOrg = client.page.AccountSetupPage();

//     addOrg.navigate()
//       .pause(2000)
//       .fillInOrgBasicInformation('Without Billing Org', 'line1', 'city', 'Alaska', '12345')
//       .clickBillingToggle()
//       .clickCreateOrganizaton()
//       .pause(2000)
//       .validateUrlChange()
//       .pause(2000)
//   },

//   'Navigate to Audit Logs page and verify Audit Logs page accessibility': function (client) {
//     const auditLogs = client.page.AuditLogsPage();

//     auditLogs.navigate()
//       .validateUrlChange()
//       .pause(5000);
//   },

//   'Verify the UI View of the Audit Log Page': function (client) {
//     const auditLogs = client.page.AuditLogsPage();

//     auditLogs.pause(3000)
//       .verifyPageTitle()
//       .verifyFiltersVisibility()
//       .VerifyPaginationVisibility()
//       .verifyColumnVisibility()
//       .verifyExpandAllVisibility()
//   },

//   'Verify the Audit Log Entry for an organization created using the Without Billing Customer flow'
//     : function (client) {
//       const entry = client.page.AuditLogsPage();

//       entry.checkAuditEntry()
//     },

//   'Logout From Org': function (client) {
//     const logout = client.page.UniversalElements();

//     logout.clickSelectOrganization();
//   }

// }