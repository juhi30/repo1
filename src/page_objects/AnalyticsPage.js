import moment from 'moment-timezone';
import logger from 'rhinotilities/lib/loggers/logger';

const helpers = require('../toolboxes/helpers.toolbox');
const feeder = require('../feeder/analytics.feeder');
const memberFeeder = require('../feeder/member.feeder');
const groupFeeder = require('../feeder/group.feeder');
const contactFeeder = require('../feeder/contact.feeder');

const {
  dateRangePickerOptions, analyticsChartsNames, analyticsOpenConversationUI, analyticsClosedConversationUI,
} = feeder;

const analyticsCommands = {

  getTextCallback(element, message1, message2, result) {
    this.verify.visible(element, `${message1} ${result.value} ${message2}`);
  },

  visibilityOfAnalyticsPage() {
    return this.waitForElementVisible('@analyticsIcon', 'analytics icon is visible and accessible.')
      .click('@analyticsIcon');
  },

  validateDatePickerAndOptions() {
    return this.waitForElementVisible('@dateRangeDropdown', 'DateRange dropdown is visible and accessible')
      .click('@dateRangeDropdown')
      .waitForElementVisible('@dateRangeDropdownMenus', 'DateRange dropdown is opened after click')
      .verify.visible('@yesterdayOption', 'Yesterday option is visible')
      .verify.visible('@lastSevenDaysOption', 'Last 7 days option is visible')
      .verify.visible('@lastThirtyDaysOption', 'Last 30 days is visible')
      .verify.visible('@lastNintyDaysOption', 'Last 90 days option is visible')
      .verify.visible('@lastTwelveMonthsOption', 'Last 12 months option is visible')
      .verify.visible('@customRangeOption', 'Custom Range option is visible')
      .verify.visible('@customRangeFromDate', 'From Date input is visible')
      .verify.visible('@customRangeToDate', 'To Date is visible');
  },

  validateDefaultOptionInDateRangeDropdown() {
    return this.waitForElementVisible('@dateRangeDropdownLabel', `The default date selection in the date picker is '${helpers.defaultDateRange(30, 1)}'`);
  },

  verifyGraph(element1, element2) {
    return this.waitForElementVisible(element1, `${element1} graph is visible`)
      .verify.visible(element2, `${element2} Label is present on this graph`);
  },

  verifyStateOfGraph(element) {
    return this.waitForElementVisible(element, `${element} no data on the graph is visible`);
  },

  getTotalMessageCount(element) {
    return this.getText(element, this.getTextCallback.bind(this, element, 'count', 'is visible'));
  },

  validateOpenConversations() {
    return this.waitForElementVisible('@conversationGridTitle', 'Converation Grid Title is visible')
      .waitForElementVisible('@defaultTabOpen', 'Open conversation Tab is open by default')
      .verify.visible('@openTableMessage', `Open Table Message "${analyticsOpenConversationUI.openTableMessage}" is visible`)
      .verify.visible('@filterLastMessagedByLabel', 'Last Messaged By Label is visible')
      .verify.visible('@filterByContactButton', 'Contact filter button is visible')
      .verify.visible('@filterByPracticeButton', 'Practice filter button is visible')
      .verify.visible('@timeOpenColumn', 'Time Open Column is visible')
      .verify.visible('@lastMessageColumn', 'Last Message column is visible')
      .verify.visible('@assignmentColumn', 'Assignment Column is visible')
      .verify.visible('@firstRowConversationAssignmentValue', 'value of assignment is visible')
      .verify.visible('@contactColumn', 'Contact Column is visible')
      .verify.visible('@firstRowConversationContactValue', 'value of contact is visible')
      .getText('@totalOpenLabel', this.getTextCallback.bind(this, '@totalOpenLabel', 'Count of ', ' conversations is visible'));
  },

  validateClosedConversations() {
    const self = this;
    return this.pause(1000)
      .waitForElementVisible('@closedTab', 'Closed tab is visible')
      .click('@closedTab')
      .waitForElementVisible('@closedConversationDatePicker', 'Date Range Picker is visible')
      .waitForElementVisible('@closedTableMessage', `Closed Conversation Table Message "${analyticsClosedConversationUI.closedTableMessage}" is visible`)
      .waitForElementVisible('@firstRowConversation', 'First Row of Conversations is visible', (result) => {
        if (result.value) {
          self.verify.visible('@timeOpenColumn', 'Time Open Column is visible')
            .verify.visible('@dateClosedColumn', 'Date Closed column is visible')
            .verify.visible('@closedByColumn', 'Closed By Column is visible')
            .verify.visible('@firstClosedByConversationValue', 'value of Closed By column is visible ')
            .verify.visible('@contactColumn', 'Contact Column is visible')
            .verify.visible('@firstRowConversationContactValue', 'value of contact is visible');
        }
      })
      .getText('@totalClosedLabel', this.getTextCallback.bind(this, '@totalClosedLabel', 'Count of ', ' conversations is visible'));
  },

  validateFiltersOnConversations() {
    const self = this;
    return this.waitForElementVisible('@defaultTabOpen', 'Open Conversations Tab is visible')
      .click('@filterByContactButton')
      .waitForElementVisible('@firstRowConversation', 'First Row of Conversations is visible after clicking Contact filter', (result) => {
        if (result.value) {
          self.waitForElementVisible('@firstRowConversationPracticeColumn', 'Conversation are filtered by practice only after striking out Contact Filter');
        }
      })
      .pause(5000)
      .click('@filterByPracticeButton')
      .waitForElementVisible('@emptyConversations', 'No conversation are available after striking out both filters')
      .click('@filterByContactButton')
      .waitForElementVisible('@firstRowConversation', 'First Row of Conversations is visible', (result) => {
        if (result.value) {
          self.waitForElementVisible('@firstRowConversationContactColumn', 'Conversation are filtered by contact only after cliking Contact filter');
        }
      });
  },

  validateClosedConvoDatePickerAndOptions() {
    return this.click('@closedConversationDatePicker')
      .pause(500)
      .waitForElementVisible('@closedConvoDateRangeDropdownMenus', 'DateRange dropdown is opened after click')
      .verify.visible('@closedConvoYesterdayOption', 'Yesterday option is visible')
      .verify.visible('@closedConvoLastSevenDaysOption', 'Last 7 days option is visible')
      .verify.visible('@closedConvoLastThirtyDaysOption', 'Last 30 days is visible')
      .verify.visible('@closedConvoLastNintyDaysOption', 'Last 90 days option is visible')
      .verify.visible('@closedConvoLastTwelveMonthsOption', 'Last 12 months option is visible')
      .verify.visible('@closedConvoCustomRangeOption', 'Custom Range option is visible')
      .verify.visible('@closedConvoCustomRangeFromDate', 'From Date input is visible')
      .verify.visible('@closedConvoCustomRangeToDate', 'To Date is visible')
      .click('@closedConversationDatePicker');
  },

  validateOpenConvoContactNavigation() {
    const self = this;
    return this.pause(1000)
      .waitForElementVisible('@firstRowConversation', 'First Row of Conversations is visible', (result) => {
        logger.info('open', result.value);
        if (result.value) {
          self.click('@contactNavigation')
            .validateUrlChange('/inbox/all/user/');
        }
      });
  },

  validateClosedConvoContactNavigation() {
    const self = this;
    return this.waitForElementVisible('@closedTab', 'Closed tab is visible in conversations')
      .waitForElementVisible('@firstRowConversation', 'First Row of Conversations is visible', (result) => {
        logger.info(result.value);
        if (result.value) {
          self.click('@contactNavigation')
            .validateUrlChange('/inbox/all/user/');
        }
      });
  },

  validateUrlChange(url) {
    return this.verify.urlContains(url);
  },

  validateDefaultDateRangeInConvoGrid() {
    return this.waitForElementVisible('@closedConvoDateRangeDropdownLabel', `The default date selection in the date picker is '${helpers.defaultDateRange(30, 0)}'`);
  },

};

module.exports = {
  commands: [analyticsCommands],

  url() {
    return `${this.api.launch_url}/analytics?from=${moment().format('YYYY-MM-DD')}&to=${moment().format('YYYY-MM-DD')}&activeKey=6`;
  },

  elements: {

    /*---------------------------------------------------------*/
    // Analytics Page Information
    /*---------------------------------------------------------*/

    analyticsIcon: {
      selector: '//BUTTON[contains(@id, \'nav-analytics\')]',
      locateStrategy: 'xpath',
    },

    dateRangeDropdown: {
      selector: '//DIV[contains(@class, \'analytics__date-range\')]//DIV[contains(@class,\'daterange__dropdown\')]',
      locateStrategy: 'xpath',
    },

    dateRangeDropdownMenus: {
      selector: '//DIV[contains(@class, \'analytics__date-range\')]//DIV[contains(@class,\'dropdown__menu__scroll\')]',
      locateStrategy: 'xpath',
    },

    yesterdayOption: {
      selector: `//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${dateRangePickerOptions.yesterday}']`,
      locateStrategy: 'xpath',
    },

    lastSevenDaysOption: {
      selector: `//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${dateRangePickerOptions.last7Days}']`,
      locateStrategy: 'xpath',
    },

    lastThirtyDaysOption: {
      selector: `//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${dateRangePickerOptions.last30Days}']`,
      locateStrategy: 'xpath',
    },

    lastNintyDaysOption: {
      selector: `//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${dateRangePickerOptions.last90Days}']`,
      locateStrategy: 'xpath',
    },

    lastTwelveMonthsOption: {
      selector: `//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${dateRangePickerOptions.last12Months}']`,
      locateStrategy: 'xpath',
    },

    customRangeOption: {
      selector: `//DIV[@class= 'date-range__label' and text() = '${dateRangePickerOptions.customRange}']`,
      locateStrategy: 'xpath',
    },

    customRangeFromDate: {
      selector: '//INPUT[@name= \'startDate\']',
      locateStrategy: 'xpath',
    },

    customRangeToDate: {
      selector: '//INPUT[@name= \'endDate\']',
      locateStrategy: 'xpath',
    },

    totalMessageCountGraph: {
      selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = '${analyticsChartsNames.totalMessageCount}']`,
      locateStrategy: 'xpath',
    },

    totalMessageCountLabel: {
      selector: `//DIV[@class= 'chart__header' ]//DIV[@class= 'header__title' and text()='${analyticsChartsNames.totalMessageCount}']`,
      locateStrategy: 'xpath',
    },

    totalMessageCountGraphCount: {
      selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = '${analyticsChartsNames.totalMessageCount}']//parent::div//DIV[@class= 'header__subtitle primary']`,
      locateStrategy: 'xpath',
    },

    dateRangeDropdownLabel: {
      selector: `//DIV[@class= 'daterange__dropdown']//SPAN[@class='dropdown__toggle__text' and text() = '${helpers.defaultDateRange(30, 1)}']`,
      locateStrategy: 'xpath',
    },

    peakMessageTimeGraph: {
      selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = '${analyticsChartsNames.peakMessageTime}']`,
      locateStrategy: 'xpath',
    },

    peakMessageTimeGraphLabel: {
      selector: `//DIV[@class= 'chart__header' ]//DIV[@class= 'header__title' and text()='${analyticsChartsNames.peakMessageTime}']`,
      locateStrategy: 'xpath',
    },

    peakMessageTimeGraphTime: {
      selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = '${analyticsChartsNames.peakMessageTime}']//parent::div//DIV[contains( @class, 'header__subtitle')]`,
      locateStrategy: 'xpath',
    },

    responseTimeGraphAverageMinutes: {
      selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = '${analyticsChartsNames.responseTime}']//parent::div//DIV[contains(@class,  'header__subtitle')]`,
      locateStrategy: 'xpath',
    },

    responseTimeGraph: {
      selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = '${analyticsChartsNames.responseTime}']`,
      locateStrategy: 'xpath',
    },

    responseTimeGraphLabel: {
      selector: `//DIV[@class= 'chart__header' ]//DIV[@class= 'header__title' and text()='${analyticsChartsNames.responseTime}']`,
      locateStrategy: 'xpath',
    },

    newInboundContactsGraphTotalCount: {
      selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = '${analyticsChartsNames.newInboundContacts}']//parent::div//DIV[contains(@class, 'header__subtitle')]`,
      locateStrategy: 'xpath',
    },

    newInboundContactsGraph: {
      selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = '${analyticsChartsNames.newInboundContacts}']`,
      locateStrategy: 'xpath',
    },

    newInboundContactsGraphLabel: {
      selector: `//DIV[@class= 'chart__header' ]//DIV[@class= 'header__title' and text()='${analyticsChartsNames.newInboundContacts}']`,
      locateStrategy: 'xpath',
    },

    responseTimeEmptyMessage: {
      selector: '//div[@class=\'chart\']//div[@class=\'header__title\' and text()=\'Response Time\']//parent::div//parent::div//div[@class=\'chart__without-data\']',
      locateStrategy: 'xpath',
    },

    peakMessageTimeEmptyMessage: {
      selector: '//div[@class=\'chart\']//div[@class=\'header__title\' and text()=\'Peak Message Time\']//parent::div//parent::div//div[@class=\'chart__without-data\']',
      locateStrategy: 'xpath',
    },

    newInboundContactEmptyMessage: {
      selector: '//div[@class=\'chart\']//div[@class=\'header__title\' and text()=\'New Inbound Contacts\']//parent::div//parent::div//div[@class=\'chart__without-data\']',
      locateStrategy: 'xpath',
    },


    /*---------------------------------------------------------*/
    // Open Conversation Grid Elements
    /*---------------------------------------------------------*/

    conversationGridTitle: {
      selector: `//DIV[@class= 'analytics__title' and text() = '${analyticsOpenConversationUI.conversationGridLabel}']`,
      locateStrategy: 'xpath',
    },

    defaultTabOpen: {
      selector: `//DIV[contains(@class, 'convo__tabs')]//SPAN[text() = '${analyticsOpenConversationUI.defautlTabLabel}']//parent::BUTTON[contains(@class, 'active')]`,
      locateStrategy: 'xpath',
    },

    openTab: {
      selector: `//DIV[contains(@class, 'convo__tabs')]//*[@class='nav-tabs__item__link'][text()='${analyticsOpenConversationUI.defautlTabLabel}']`,
      locateStrategy: 'xpath',
    },

    totalOpenLabel: {
      selector: `//DIV[contains(@class, 'row convo__toggle')]//h3[contains(text() ,'${analyticsOpenConversationUI.totalOpenConversationLabel}')]`,
      locateStrategy: 'xpath',
    },

    filterLastMessagedByLabel: {
      selector: `//DIV[contains(@class, 'row convo__toggle')]//DIV[contains(text() ,'${analyticsOpenConversationUI.filterLastMessagedByLabel}')]`,
      locateStrategy: 'xpath',
    },

    filterByContactButton: {
      selector: `//DIV[contains(@class, 'row convo__toggle')]//BUTTON[contains(@class, 'filter__button')]//SPAN[contains(text() ,'${analyticsOpenConversationUI.contactFilterButton}')]//parent::BUTTON`,
      locateStrategy: 'xpath',
    },

    filterByPracticeButton: {
      selector: `//DIV[contains(@class, 'row convo__toggle')]//BUTTON[contains(@class, 'filter__button')]//SPAN[contains(text() ,'${analyticsOpenConversationUI.practiceFilterButton}')]//parent::BUTTON`,
      locateStrategy: 'xpath',
    },

    timeOpenColumn: {
      selector: `//DIV[@class='tabs-content__pane is-active']//DIV[contains(text() ,'${analyticsOpenConversationUI.timeOpenColumn}')]`,
      locateStrategy: 'xpath',
    },

    lastMessageColumn: {
      selector: `//DIV[contains(@class, 'ReactTable')]//DIV[contains(text() ,'${analyticsOpenConversationUI.lastMessageColumn}')]`,
      locateStrategy: 'xpath',
    },

    assignmentColumn: {
      selector: `//DIV[contains(@class, 'ReactTable')]//DIV[contains(text() ,'${analyticsOpenConversationUI.assignmentColumn}')]`,
      locateStrategy: 'xpath',
    },

    contactColumn: {
      selector: `//DIV[@class='tabs-content__pane is-active']//DIV[contains(text() ,'${analyticsOpenConversationUI.contactColumn}')]`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/
    // Closed Conversation Grid Elements
    /*---------------------------------------------------------*/


    closedTab: {
      selector: `//DIV[contains(@class, 'convo__tabs')]//ul//li//div[@class='nav-tabs__item__link'][text()='${analyticsClosedConversationUI.closedTab}']`,
      locateStrategy: 'xpath',
    },

    totalClosedLabel: {
      selector: '//DIV[contains(@class, \'tabs-content__pane is-active\')]//h3[contains(text() ,\'Total Closed\')]',
      locateStrategy: 'xpath',
    },

    closedConversationDatePicker: {
      selector: '//DIV[@class=\'tabs-content__pane is-active\']//DIV[@class=\'analytics__date-range\']',
      locateStrategy: 'xpath',
    },

    closedConvoDateRangeDropdownLabel: {
      selector: `//DIV[@class= 'tabs-content__pane is-active']//SPAN[@class='dropdown__toggle__text' and text() = '${helpers.defaultDateRange(30, 0)}']`,
      locateStrategy: 'xpath',
    },

    closedTableMessage: {
      selector: `//DIV[contains(@class, 'tabs-content__pane is-active')]//SPAN[text() = '${analyticsClosedConversationUI.closedTableMessage}']`,
      locateStrategy: 'xpath',
    },

    openTableMessage: {
      selector: `//DIV[contains(@class, 'convo-grid')]//SPAN[text() = '${analyticsOpenConversationUI.openTableMessage}']`,
      locateStrategy: 'xpath',
    },

    dateClosedColumn: {
      selector: `//DIV[@class='tabs-content__pane is-active']//DIV[contains(text() ,'${analyticsClosedConversationUI.dateClosedColumn}')]`,
      locateStrategy: 'xpath',
    },

    closedByColumn: {
      selector: `//DIV[@class='tabs-content__pane is-active']//DIV[contains(text() ,'${analyticsClosedConversationUI.closedByColumn}')]`,
      locateStrategy: 'xpath',
    },

    firstRowConversation: {
      selector: '//DIV[@class=\'tabs-content__pane is-active\']//DIV[@class=\'rt-thead -header\']',
      locateStrategy: 'xpath',
    },

    firstRowConversationContactColumn: {
      selector: `(//DIV[contains(@class, 'ReactTable')]//DIV[@class="rt-tbody"]//DIV[@class="rt-tr -odd"])[1]//DIV[2]//SPAN[contains(text(),'${analyticsOpenConversationUI.practiceFilter}')]`,
      locateStrategy: 'xpath',
    },

    firstRowConversationPracticeColumn: {
      selector: `(//DIV[contains(@class, 'ReactTable')]//DIV[@class="rt-tbody"]//DIV[@class="rt-tr -odd"])[1]//DIV[2]//SPAN[contains(text(),'${analyticsOpenConversationUI.contactFilter}')]`,
      locateStrategy: 'xpath',
    },

    firstRowConversationPracticeAssignmentColumn: {
      selector: `(//DIV[contains(@class, 'ReactTable')]//DIV[@class="rt-tbody"]//DIV[@class="rt-tr -odd"])[1]//DIV[3]//SPAN[contains(text(),'${analyticsOpenConversationUI.assignementFilter}')]`,
      locateStrategy: 'xpath',
    },

    firstRowConversationAssignmentValue: {
      selector: `//DIV[contains(@class, 'ReactTable')]//DIV[@class="rt-tbody"]//*[contains(text(),'${groupFeeder.patientAndTeamType}')]`,
      locateStrategy: 'xpath',
    },

    firstRowConversationContactValue: {
      selector: '//DIV[contains(@class, \'tabs-content__pane is-active\')]//DIV[@class="rt-tbody"][1]',
      locateStrategy: 'xpath',
    },

    firstClosedByConversationValue: {
      selector: '(//DIV[@class=\'tabs-content__pane is-active\']//Button//span[@class=\'button__text-wrapper\'])[1]',
      locateStrategy: 'xpath',
    },

    closedConvoDateRangeDropdownMenus: {
      selector: '//DIV[contains(@class, \'tabs-content__pane is-active\')]//DIV[contains(@class, \'dropdown__menu__scroll\')]',
      locateStrategy: 'xpath',
    },

    closedConvoYesterdayOption: {
      selector: `//DIV[contains(@class, 'tabs-content__pane is-active')]//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${dateRangePickerOptions.yesterday}']`,
      locateStrategy: 'xpath',
    },

    closedConvoLastSevenDaysOption: {
      selector: `//DIV[contains(@class, 'tabs-content__pane is-active')]//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${dateRangePickerOptions.last7Days}']`,
      locateStrategy: 'xpath',
    },

    closedConvoLastThirtyDaysOption: {
      selector: `//DIV[contains(@class, 'tabs-content__pane is-active')]//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${dateRangePickerOptions.last30Days}']`,
      locateStrategy: 'xpath',
    },

    closedConvoLastNintyDaysOption: {
      selector: `//DIV[contains(@class, 'tabs-content__pane is-active')]//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${dateRangePickerOptions.last90Days}']`,
      locateStrategy: 'xpath',
    },

    closedConvoLastTwelveMonthsOption: {
      selector: `//DIV[contains(@class, 'tabs-content__pane is-active')]//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${dateRangePickerOptions.last12Months}']`,
      locateStrategy: 'xpath',
    },

    closedConvoCustomRangeOption: {
      selector: `//DIV[contains(@class, 'tabs-content__pane is-active')]//DIV[@class= 'date-range__label' and text() = '${dateRangePickerOptions.customRange}']`,
      locateStrategy: 'xpath',
    },

    closedConvoCustomRangeFromDate: {
      selector: '//DIV[contains(@class, \'tabs-content__pane is-active\')]//INPUT[@name= \'startDate\']',
      locateStrategy: 'xpath',
    },

    closedConvoCustomRangeToDate: {
      selector: '//DIV[contains(@class, \'tabs-content__pane is-active\')]//INPUT[@name= \'endDate\']',
      locateStrategy: 'xpath',
    },

    contactNavigation: {
      selector: '(//DIV[contains(@class, \'tabs-content__pane is-active\')]//DIV[@class = \'rt-tr -odd\']//DIV[4]//BUTTON//SPAN)[1]',
      locateStrategy: 'xpath',
    },

    emptyConversations: {
      selector: '//DIV[contains(@class, \'tabs-content__pane is-active\')]//DIV[@class = \'convo__empty\']',
      locateStrategy: 'xpath',
    },
  },
};
