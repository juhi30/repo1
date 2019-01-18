/*--------------------------------------------------------------------------------------------------------*/
// tests for the audit log page and elements it contains
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

  'Navigate to Audit Log page after Clicking on audit log option available on setting Menu': function (client) {
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

  // Test cases for auditing New Template entry

  'Verify the Audit log entry for new added template': function (client) {
    const template = client.page.TemplatesPage();
    const auditLogs = client.page.AuditLogsPage();

    // create new template
    template.navigate()
      .clickCreateTemplateButton()
      .fillTitleAndMessage('Test Template', 'Just a regular template with a regular template message')
      .clickCreateTemplateSaveButton()
      .pause(3000);

    // verify Audit log entry  
    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateTemplateEntry('Add', 'Test Template');
  },

  'Verify the Audit log entry for edit template': function (client) {
    const template = client.page.TemplatesPage();
    const auditLogs = client.page.AuditLogsPage();

    // Edit template
    template.navigate()
      .pause(3000)
      .clickFirstTemplate()
      .clickEditTemplateButton()
      .editFirstTemplate('Edited_Template', 'Just a regular template with a regular template message')
      .pause(3000);

    // verify Audit log entry  
    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateTemplateEntry('Edit', 'Edited_Template');
  },

  'Verify the Audit log entry for delete template': function (client) {
    const template = client.page.TemplatesPage();
    const auditLogs = client.page.AuditLogsPage();

    // Delete template
    template.navigate()
      .pause(3000)
      .clickFirstTemplate()
      .clickEditTemplateButton()
      .clickDeleteButton()
      .clickDeleteFinalButton()
      .pause(3000);

    // verify Audit log entry  
    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .validateTemplateEntry('Delete', 'Edited_Template');
  },

  // Test case for auditing new channel add of Rhino secure type
  'Verify the Audit log entry when user adds channels of Rhino secure type': function (client) {
    const createChannel = client.page.ChannelsPage();
    const route = client.page.ChannelRouteMemberContainer();
    const create = client.page.ChannelsCreateEditPage();
    const auditLogs = client.page.AuditLogsPage();

    createChannel.navigate()
      .navigateToCreateChannels()
    create.createNewSecureChannel()
      .pause(5000)
    route.selectDefaultRoutes('m 1')
    create.clickCreateChannel()
    .pause(3000)

    auditLogs.navigate()
      .validateUrlChange()
      .pause(5000)
      .checkAuditChannelEntry('Channel','Add','Rhino Secure test1')
  },

  'Logout from application': function(client) {
    const logout = client.page.UniversalElements();

    logout.clickLogout()
      .pause(2000)
  },

  'Login Page with CCR Credentials': function (client) {
  const login = client.page.LoginPage();

  login.navigate()
    .enterMemberCreds('mccr', 'bacon')
    .pause(1000)
    .submit()
    .pause(1000)
    .validateUrlChangeAdmin();
  },

  'Verify the Audit Log Entry for an organization created using the Without Billing Customer flow'
    : function (client) {
      const auditLogs = client.page.AuditLogsPage();
      const addOrg = client.page.AccountSetupPage();

      addOrg.navigate()
        .pause(2000)
        .fillInOrgBasicInformation('Without Billing Org', 'line1', 'city', 'Alaska', '12345')
        .clickBillingToggle()
        .clickCreateOrganizaton()
        .pause(2000)
        .validateUrlChange()
        .pause(2000)

      // verify Audit log entry  
      auditLogs.navigate()
        .validateUrlChange()
        .pause(5000)
        .checkAuditOrgEntry('Organization','Add','Without Billing Org');
    },
}
