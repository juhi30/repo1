/*--------------------------------------------------------------------------------------------------------*/
// tests for the billing page and elements it contains.
// User is logged in as Member with Billing Permissions 
// Member belongs to a billing organization
/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

  'Login Page with Member Credentials': function (client) {
    const login = client.page.LoginPage();

    login.navigate()
      .enterMemberCreds('duttamunish', 'Test@123')
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
      .createNewTag()
      .pause(5000);

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
      .pause(5000);
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
      .deleteTag()
      .pause(5000);
  },

  'Verify the Audit log entry for deletion of existing tag': function (client) {
    const auditLogs = client.page.AuditLogsPage();

    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateDeletedTagEntry();
  },

  // Test case for auditing Billing entries
  'Navigate to Billing page and verify Billing page accessibility': function (client) {
    const billing = client.page.BillingUsagePage();

    billing.navigate()
      .validateUrlChange()
      .pause(5000);
  },

  'Update Billing Contact Details': function (client) {
    const contact = client.page.BillingUsagePage();

    contact.openUpdateModal('@updateBillingContactButton', '@updateContactModalHeader')
      .updateBillingContact()
      .pause(5000);
  },

  'Verify the Audit log entry for updating Billing contact': function (client) {
    const auditLogs = client.page.AuditLogsPage();

    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateBillingEntry()
  },

  'Add/Update payment method': function (client) {
    const billing = client.page.BillingUsagePage();
    billing.navigate()
      .validateUrlChange()
      .pause(5000)
      .openUpdateModal('@changePaymentMethodButton', '@updatePaymentModalHeader')
      .pause(1000)
      .changePaymentMethod('@radioBankAccount')
      .pause(1000)
      .updatePaymentToBank()
      .pause(5000);
  },

  'Verify the Audit log entry for add/update Payment method': function (client) {
    const auditLogs = client.page.AuditLogsPage();

    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateBillingEntry();
  }
}
