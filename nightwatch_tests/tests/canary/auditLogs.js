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
  
    'Navigate to Audit Logs page and verify Audit Logs page accessibility': function (client) {
      const auditLogs = client.page.AuditLogsPage();
  
      auditLogs.navigate()
        .validateUrlChange()
        .pause(5000);
    },
  }