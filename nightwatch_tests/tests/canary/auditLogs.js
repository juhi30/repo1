/*--------------------------------------------------------------------------------------------------------*/
// tests for the billing page and elements it contains.
// User is logged in as Member with Billing Permissions 
// Member belongs to a billing organization
/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

  'Login Page with Member Credentials': function (client) {
    const login = client.page.LoginPage();

    login.navigate()
      .enterMemberCreds()
      .submit()
      .validateUrlChange();
  },

  'Validate the audit log option is available on setting Menu': function (client) {
    const auditLogs = client.page.AuditLogsPage();

    auditLogs.clickSettingsDropdown()
      .validateAuditLogsMenuOption();
  },

  'Navigate to Audit Log page after Clicking on audit log option is available on setting Menu': function (client) {
    const auditLogs = client.page.AuditLogsPage();

    auditLogs.clickSettingsDropdown()
      .clickAuditLogsMenuOption()
      .verify.urlContains('auditLog');
  },

  'Navigate to Audit Logs page and verify Audit Logs page accessibility': function (client) {
    const auditLogs = client.page.AuditLogsPage();

    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000);
  },

  'Verify the UI View of the Audit Log Page' : function (client){
    const auditLogs = client.page.AuditLogsPage();

    auditLogs.verifyPageTitle()
    .verifyFiltersVisibility()
    .VerifyPaginationVisibility()
    .verifyColumnVisibility()
    .verifyExpandAllVisibility()
  },

  // Test cases for auditing New Tag entry
  'Go to Tags page and validate elements': function (client) {
    const tags = client.page.TagsPage();

    tags.navigate()
      .validateTagPageElements();
  },

  'Validate new Tag modal and create new Tag': function (client) {
    const tags = client.page.TagsPage();

    tags.validateCreateTagModal()
      .createNewTag();

  },

  'Verify the Audit log entry for new added tag': function (client) {
    const auditLogs = client.page.AuditLogsPage();

    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateAddedTagEntry();
  },

  // Test cases for auditing edition of existing Tag

  'Validate edit Tag modal': function (client) {
    const tags = client.page.TagsPage();

    tags.navigate()
      .editTag()
  },

  'Verify the Audit log entry for edition of existing tag': function (client) {
    const auditLogs = client.page.AuditLogsPage();

    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateEditedTagEntry();
  },

  // Test cases for auditing edition of existing Tag

  'Validate delete Tag modal': function (client) {
    const tags = client.page.TagsPage();

    tags.navigate()
      .deleteTag();
  },

  'Verify the Audit log entry for deletion of existing tag': function (client) {
    const auditLogs = client.page.AuditLogsPage();

    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateDeletedTagEntry();
  },
}
