/*--------------------------------------------------------------------------------------------------------*/
// tests for the Analytics page and elements it contains.
// User is logged in as CCR 
/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

<<<<<<< HEAD
  'Login Page with CCR Credentials': function (client) {
    const login = client.page.LoginPage();

    login.navigate()
      .enterMemberCreds('ccr', 'bacon')
      .submit()
      .validateUrlChange('selectorg');
  },

  'Select One Org For Analytics': function (client) {
    const universalElements = client.page.UniversalElements();

    universalElements.searchForOrganization('Rhino India Scrum Team');
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

  'Check Default option in Date Range Datepicker': function (client) {
    const analytics = client.page.AnalyticsPage();

    analytics.validateDefaultOptionInDateRangeDropdown()
    .pause(2000);
  },

  'Validate Total Message Count Graph': function (client) {
    const analytics = client.page.AnalyticsPage();

    analytics.validateTotalMessageCountGraph()
    .pause(5000);
  },

  'Validate Peak Message Time Graph': function (client) {
    const analytics = client.page.AnalyticsPage();

    analytics.validatePeakTimeGraph()
    .pause(5000);
  },

  'Validate New Inbound Contacts Graph': function (client) {
    const analytics = client.page.AnalyticsPage();

    analytics.validateNewInboundContactsGraph()
    .pause(5000);
  },

  'Validate Response Time Graph': function (client) {
    const analytics = client.page.AnalyticsPage();

    analytics.validateResponseTimeGraph()
    .pause(5000);
  },

}
=======
    'Login Page with CCR Credentials': function (client) {
      const login = client.page.LoginPage();
  
      login.navigate()
        .enterMemberCreds('ccr', 'bacon')
        .submit()
        .validateUrlChange('selectorg');
    },
  
  }
  
>>>>>>> 3c1cd45085beb7d43a707c086648e596fcf63d4e
