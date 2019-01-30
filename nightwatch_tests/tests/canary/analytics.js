const helpers = require('../../helpers');

/*--------------------------------------------------------------------------------------------------------*/
// tests for the Analytics page and elements it contains.
// User is logged in as CCR 
/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

  'Login Page with CCR Credentials': function (client) {
    const login = client.page.LoginPage();

    login.navigate()
      .enterCSRCreds()
      .submit()
      .validateUrlChange('selectorg');
  },

  'Select One Org For Analytics': function (client) {
    const universalElements = client.page.UniversalElements();

    universalElements.searchForOrganization(helpers.organizationSearchStringForAnalytics);
  },

  'Check if Analytics Icon Visible': function (client) {
    const contacts = client.page.ContactsPage();

    contacts.validateAnalyticsIconVisibility()
      .pause(1000);
  },

  'Click Icon and Go To Analytics Page': function (client) {
    const contacts = client.page.ContactsPage();

    contacts.validateAnalyticsPageNavigation()
    .validateUrlChange('analytics')
    .pause(1000);
  },

  'Check Default option in Date Range Datepicker': function (client) {
    const analytics = client.page.AnalyticsPage();

    analytics.validateDefaultOptionInDateRangeDropdown()
    .pause(2000);
  },

  'Validate Datepicker and Options Available': function (client) {
    const analytics = client.page.AnalyticsPage();

    analytics.validateDatePickerAndOptions()
    .pause(1000);

    client.url(`${process.env.LAUNCH_URL}${helpers.analyticsDataUrl}`);

  },

  'Validate Total Message Count Graph': function (client) {
    const analytics = client.page.AnalyticsPage();

    analytics.validateTotalMessageCountGraph()
    .pause(2000);
  },

  'Validate Peak Message Time Graph': function (client) {
    const analytics = client.page.AnalyticsPage();

    analytics.validatePeakTimeGraph()
    .pause(2000);
  },

  'Validate New Inbound Contacts Graph': function (client) {
    const analytics = client.page.AnalyticsPage();

    analytics.validateNewInboundContactsGraph()
    .pause(2000);
  },

  'Validate Response Time Graph': function (client) {
    const analytics = client.page.AnalyticsPage();

    analytics.validateResponseTimeGraph()
    .pause(2000);
  },

  'Validate Conversation Grid Open Conversations': function (client) {
    const analytics = client.page.AnalyticsPage();
    client.execute('var conversationGridElement = document.getElementsByClassName("convo-grid");' +
          'conversationGridElement[0].scrollIntoView(true);');
    analytics.validateOpenConversations()
    .pause(2000);
  },

  'Validate Open Conversations Contact Navigation': function (client) {
    const analytics = client.page.AnalyticsPage();

    analytics.validateOpenConvoContactNavigation()
    .pause(2000);
  },

  'Verify Contact and Practice Filters on Open Conversation': function(client) {
    client.url(`${process.env.LAUNCH_URL}/analytics`);
    const analytics = client.page.AnalyticsPage();
    
    client.execute('var conversationGridElement = document.getElementsByClassName("convo-grid");' +
          'conversationGridElement[0].scrollIntoView(true);');
    analytics.validateFiltersOnConversations()
    .pause(2000);

  },

  'Validate Closed Conversations Contact Navigation': function (client) {
    const analytics = client.page.AnalyticsPage();
    
    analytics.validateClosedConvoContactNavigation()
    .pause(2000);
  },

  'Validate Conversation Grid Closed Conversations': function (client) {
    const analytics = client.page.AnalyticsPage();

    analytics.validateClosedConversations()
    .pause(2000);
  },

  'Validate Closed Conversations DateRangePicker': function (client) {
    const analytics = client.page.AnalyticsPage();

    analytics.validateClosedConvoDatePickerAndOptions()
    .pause(2000);
  },

  'Validate Datepicker Default Option in Conversation Grid': function(client) {
    const analytics = client.page.AnalyticsPage();

    analytics.validateDefaultDateRangeInConvoGrid()
    .pause(2000);
  },

}
