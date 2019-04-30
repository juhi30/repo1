import logger from 'rhinotilities/lib/loggers/logger';
const helpers = require('../toolboxes/helpers.toolbox');

const {
  dateRangePickerOptions, analyticsChartsNames, analyticsOpenConversationUI, analyticsClosedConversationUI,
} = helpers;

const analyticsCommands = {

  pause(time) {
    this.api.pause(time);
    return this;
  },

  getTextCallback(element, message1, message2, result) {
    this.verify.visible(element, `${message1} ${result.value} ${message2}`);
  },

  validateDatePickerAndOptions() {
    return this.waitForElementVisible('@dateRangeDropdown', 'DateRange dropdown is visible')
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

  validateTotalMessageCountGraph() {
    return this.waitForElementVisible('@totalMessageCountGraph', 'Total Message Count Graph is visible')
      .verify.visible('@totalMessageCountLabel', 'Total Message Count Label is present on this graph')
      .getText('@totalMessageCountGraphCount', this.getTextCallback.bind(this, '@totalMessageCountGraphCount', 'Total Message Count', 'is visible'));
  },

  validatePeakTimeGraph() {
    return this.waitForElementVisible('@peakMessageTimeGraph', 'Peak Message Time Graph is visible')
      .verify.visible('@peakMessageTimeGraphLabel', 'Peak Message Time Label is present on this graph')
      .getText('@peakMessageTimeGraphTime', this.getTextCallback.bind(this, '@peakMessageTimeGraphTime', 'Peak Message Time', 'is visible'));
  },

  validateNewInboundContactsGraph() {
    return this.waitForElementVisible('@newInboundContactsGraph', 'New Inbound Contacts Graph is visible')
      .verify.visible('@newInboundContactsGraphLabel', 'New Inbound Contacts Label is present on this graph')
      .getText('@newInboundContactsGraphTotalCount', this.getTextCallback.bind(this, '@newInboundContactsGraphTotalCount', 'New Inbound Contacts total Count', 'is visible'));
  },

  validateResponseTimeGraph() {
    return this.waitForElementVisible('@responseTimeGraph', 'Response Time Graph is visible')
      .verify.visible('@responseTimeGraphLabel', 'Response Time Label is present on this graph')
      .getText('@responseTimeGraphAverageMinutes', this.getTextCallback.bind(this, '@responseTimeGraphAverageMinutes', 'Response Time Average Minutes', 'is visible'));
  },

  validateDefaultOptionInDateRangeDropdown() {
    return this.waitForElementVisible('@dateRangeDropdownLabel', `The default date selection in the date picker is '${helpers.defaultDateRange(30, 1)}'`);
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
      .verify.visible('@contactColumn', 'Contact Column is visible')
      .getText('@totalOpenLabel', this.getTextCallback.bind(this, '@totalOpenLabel', 'Count of ', ' conversations is visible'));
  },

  validateClosedConversations() {
    const self = this;
    return this.waitForElementVisible('@closedTab')
      .click('@closedTab')
      .waitForElementVisible('@closedConversationDatePicker', 'Date Range Picker is visible')
      .verify.visible('@closedTableMessage', `Closed Conversation Table Message "${analyticsClosedConversationUI.closedTableMessage}" is visible`)
      .waitForElementVisible('@firstRowConversation', 'First Row of Conversations is visible', (result) => {
        if (result.value) {
          self.verify.visible('@timeOpenColumn', 'Time Open Column is visible')
            .verify.visible('@dateClosedColumn', 'Date Closed column is visible')
            .verify.visible('@closedByColumn', 'Closed By Column is visible')
            .verify.visible('@contactColumn', 'Contact Column is visible');
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
      .waitForElementVisible('@closedConvoDateRangeDropdownMenus', 'DateRange dropdown is opened after click')
      .verify.visible('@closedConvoYesterdayOption', 'Yesterday option is visible')
      .verify.visible('@closedConvoLastSevenDaysOption', 'Last 7 days option is visible')
      .verify.visible('@closedConvoLastThirtyDaysOption', 'Last 30 days is visible')
      .verify.visible('@closedConvoLastNintyDaysOption', 'Last 90 days option is visible')
      .verify.visible('@closedConvoLastTwelveMonthsOption', 'Last 12 months option is visible')
      .verify.visible('@closedConvoCustomRangeOption', 'Custom Range option is visible')
      .verify.visible('@closedConvoCustomRangeFromDate', 'From Date input is visible')
      .verify.visible('@closedConvoCustomRangeToDate', 'To Date is visible');
  },

  validateOpenConvoContactNavigation() {
    const self = this;
    return this.click('@openTab')
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
      .click('@closedTab')
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
    return `${this.api.launch_url}/analytics`;
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
      selector: '//DIV[contains(@class, \'daterange__dropdown\')]',
      locateStrategy: 'xpath',
    },

    dateRangeDropdownMenus: {
      selector: '//DIV[contains(@class, \'analytics__wrapper\')]//DIV[contains(@class, \'dropdown__menu__scroll\')]',
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
      selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = '${analyticsChartsNames.totalMessageCount}']//parent::div//parent::div//CANVAS`,
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
      selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = '${analyticsChartsNames.peakMessageTime}']//parent::div//parent::div//CANVAS`,
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
      selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = '${analyticsChartsNames.responseTime}']//parent::div//parent::div//CANVAS`,
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
      selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = '${analyticsChartsNames.newInboundContacts}']//parent::div//parent::div//CANVAS`,
      locateStrategy: 'xpath',
    },

    newInboundContactsGraphLabel: {
      selector: `//DIV[@class= 'chart__header' ]//DIV[@class= 'header__title' and text()='${analyticsChartsNames.newInboundContacts}']`,
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
      selector: `//DIV[contains(@class, 'convo__tabs')]//SPAN[text() = '${analyticsOpenConversationUI.defautlTabLabel}']//parent::BUTTON`,
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
      selector: `//DIV[contains(@class, 'ReactTable')]//DIV[contains(text() ,'${analyticsOpenConversationUI.timeOpenColumn}')]`,
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
      selector: `//DIV[contains(@class, 'ReactTable')]//DIV[contains(text() ,'${analyticsOpenConversationUI.contactColumn}')]`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/
    // Closed Conversation Grid Elements
    /*---------------------------------------------------------*/


    closedTab: {
      selector: `//DIV[contains(@class, 'convo__tabs')]//SPAN[text() = '${analyticsClosedConversationUI.closedTab}']`,
      locateStrategy: 'xpath',
    },

    totalClosedLabel: {
      selector: `//DIV[contains(@class, 'row convo__toggle')]//h3[contains(text() ,'${analyticsClosedConversationUI.totalClosedConversationLabel}')]`,
      locateStrategy: 'xpath',
    },

    closedConversationDatePicker: {
      selector: '//DIV[contains(@class, \'convo-grid\')]//DIV[@class= \'daterange__dropdown\']',
      locateStrategy: 'xpath',
    },

    closedConvoDateRangeDropdownLabel: {
      selector: `//DIV[@class= 'daterange__dropdown']//SPAN[@class='dropdown__toggle__text' and text() = '${helpers.defaultDateRange(30, 0)}']`,
      locateStrategy: 'xpath',
    },

    closedTableMessage: {
      selector: `//DIV[contains(@class, 'convo-grid')]//LI[text() = '${analyticsClosedConversationUI.closedTableMessage}']`,
      locateStrategy: 'xpath',
    },

    openTableMessage: {
      selector: `//DIV[contains(@class, 'convo-grid')]//LI[text() = '${analyticsOpenConversationUI.openTableMessage}']`,
      locateStrategy: 'xpath',
    },

    dateClosedColumn: {
      selector: `//DIV[contains(@class, 'ReactTable')]//DIV[contains(text() ,'${analyticsClosedConversationUI.dateClosedColumn}')]`,
      locateStrategy: 'xpath',
    },

    closedByColumn: {
      selector: `//DIV[contains(@class, 'ReactTable')]//DIV[contains(text() ,'${analyticsClosedConversationUI.closedByColumn}')]`,
      locateStrategy: 'xpath',
    },

    firstRowConversation: {
      selector: '(//DIV[contains(@class, \'ReactTable\')]//DIV[@class="rt-tbody"]//DIV[@class="rt-tr -odd"])[1]',
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

    closedConvoDateRangeDropdownMenus: {
      selector: '//DIV[contains(@class, \'convo-grid\')]//DIV[contains(@class, \'dropdown__menu__scroll\')]',
      locateStrategy: 'xpath',
    },

    closedConvoYesterdayOption: {
      selector: `//DIV[contains(@class, 'convo-grid')]//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${dateRangePickerOptions.yesterday}']`,
      locateStrategy: 'xpath',
    },

    closedConvoLastSevenDaysOption: {
      selector: `//DIV[contains(@class, 'convo-grid')]//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${dateRangePickerOptions.last7Days}']`,
      locateStrategy: 'xpath',
    },

    closedConvoLastThirtyDaysOption: {
      selector: `//DIV[contains(@class, 'convo-grid')]//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${dateRangePickerOptions.last30Days}']`,
      locateStrategy: 'xpath',
    },

    closedConvoLastNintyDaysOption: {
      selector: `//DIV[contains(@class, 'convo-grid')]//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${dateRangePickerOptions.last90Days}']`,
      locateStrategy: 'xpath',
    },

    closedConvoLastTwelveMonthsOption: {
      selector: `//DIV[contains(@class, 'convo-grid')]//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${dateRangePickerOptions.last12Months}']`,
      locateStrategy: 'xpath',
    },

    closedConvoCustomRangeOption: {
      selector: `//DIV[contains(@class, 'convo-grid')]//DIV[@class= 'date-range__label' and text() = '${dateRangePickerOptions.customRange}']`,
      locateStrategy: 'xpath',
    },

    closedConvoCustomRangeFromDate: {
      selector: '//DIV[contains(@class, \'convo-grid\')]//INPUT[@name= \'startDate\']',
      locateStrategy: 'xpath',
    },

    closedConvoCustomRangeToDate: {
      selector: '//DIV[contains(@class, \'convo-grid\')]//INPUT[@name= \'endDate\']',
      locateStrategy: 'xpath',
    },

    contactNavigation: {
      selector: '//DIV[contains(@class, \'convo-grid\')]//DIV[@class = \'rt-tr -odd\']//DIV[4]//BUTTON',
      locateStrategy: 'xpath',
    },

    emptyConversations: {
      selector: '//DIV[contains(@class, \'convo-grid\')]//DIV[@class = \'convo__empty\']',
      locateStrategy: 'xpath',
    },
  },
};
