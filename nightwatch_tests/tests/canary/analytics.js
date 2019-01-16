/*--------------------------------------------------------------------------------------------------------*/
// tests for the Analytics page and elements it contains.
// User is logged in as CCR 
/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

  'Login Page with CCR Credentials': function (client) {
    const login = client.page.LoginPage();

    login.navigate()
      .enterMemberCreds('ccr', 'bacon')
      .submit()
      .validateUrlChange('selectorg');
  },

  'Select Org and Go To Contacts Page': function (client) {
    const selectOrganization = client.page.SelectOrganizationPage();

    selectOrganization.searchForOrganization('another routing').validateUrlChange();
  },

  'Check if Analytics Icon Visible': function (client) {
    const contacts = client.page.ContactsPage();

    contacts.validateAnalyticsIconVisibility()
      .pause(5000);
  },

  'Click Icon and Go To Analytics Page': function (client) {
    const contacts = client.page.ContactsPage();

    contacts.validateAnalyticsPageNavigation()
    .validateUrlChange('analytics')
    .pause(5000);
  },

  'Validate Datepicker and Options Available': function (client) {
    const analytics = client.page.AnalyticsPage();

    analytics.validateDatePickerAndOptions()
    .pause(5000);
  },

}