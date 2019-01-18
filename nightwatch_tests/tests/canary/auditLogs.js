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

  'Verify the Audit log entry for new added tag': function (client) {
    const tags = client.page.TagsPage();
    const auditLogs = client.page.AuditLogsPage();

    // create new tag
    tags.navigate()
      .validateNewTagButton()
      .validateCreateTagModal()
      .createNewTag()
      .pause(5000);

    // verify Audit log entry  
    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateTagEntry('Add', 'fake_tag');
  },

  // Test cases for auditing edition of existing Tag

  'Verify the Audit log entry for edition of existing tag': function (client) {
    const tags = client.page.TagsPage();
    const auditLogs = client.page.AuditLogsPage();

    // Edit tag
    tags.navigate()
      .editTag()
      .pause(5000);

    // verify Audit Log entry
    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateTagEntry('Edit', 'Edited_tag');
  },

  // Test cases for auditing edition of existing Tag

  'Verify the Audit log entry for deletion of existing tag': function (client) {
    const tags = client.page.TagsPage();
    const auditLogs = client.page.AuditLogsPage();

    // Delete tag
    tags.navigate()
      .deleteTag()
      .pause(5000);

    // Verify Audit Log entry
    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateTagEntry('Delete', 'Edited_tag');
  },

  // Test case for auditing Billing entries

  'Verify the Audit log entry for updating Billing contact': function (client) {
    const billing = client.page.BillingUsagePage();
    const auditLogs = client.page.AuditLogsPage();

    // Update Billing Contact Details
    billing.navigate()
      .validateUrlChange()
      .pause(5000)
      .openUpdateModal('@updateBillingContactButton', '@updateContactModalHeader')
      .updateBillingContact()
      .pause(5000);

    // Verify Audit Log entry
    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateBillingEntry()
  },

  'Verify the Audit log entry for add/update Payment method': function (client) {
    const billing = client.page.BillingUsagePage();
    const auditLogs = client.page.AuditLogsPage();

    // Add/Update payment method
    billing.navigate()
      .validateUrlChange()
      .pause(5000)
      .openUpdateModal('@changePaymentMethodButton', '@updatePaymentModalHeader')
      .pause(1000)
      .changePaymentMethod('@radioBankAccount')
      .pause(1000)
      .updatePaymentToBank()
      .pause(5000);

    // Verify Audit Log entry
    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateBillingEntry();
  },

  // Test cases for auditing New OOO Event

  'Verify the Audit log entry for new added Event': function (client) {
    const ooo = client.page.OutOfOfficePage();
    const auditLogs = client.page.AuditLogsPage();

    // Create OOO Event
    ooo.navigate()
      .validateUrlChange()
      .pause(3000)
      .openOOOPage('@addOOOEventButton', '@createEventPageHeader')
      .createEvent()
      .pause(3000)

    // Verify Audit Log entry
    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateEventEntry('Add', 'Test Event');
  },

  'Verify the Audit log entry of edited Event': function (client) {
    const ooo = client.page.OutOfOfficePage();
    const auditLogs = client.page.AuditLogsPage();

    // Update the Event Details
    ooo.navigate()
      .validateUrlChange()
      .pause(3000)
      .clickFirstEvent()
      .pause(2000)
      .openOOOPage('@editOOOEvent', '@editEventPageHeader')
      .updateEvent()
      .pause(3000)

    // Verify Audit Log entry
    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateEventEntry('Edit', 'Edited_Title');
  },

  'Verify the Audit log entry of deleted Event': function (client) {
    const ooo = client.page.OutOfOfficePage();
    const auditLogs = client.page.AuditLogsPage();

    // Delete Event

    ooo.navigate()
      .validateUrlChange()
      .pause(3000)
      .clickFirstEvent()
      .pause(2000)
      .openOOOPage('@editOOOEvent', '@editEventPageHeader')
      .deleteEvent()

    // Verify Audit Log entry
    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateEventEntry('Delete', 'Edited_Title');
  },
}
