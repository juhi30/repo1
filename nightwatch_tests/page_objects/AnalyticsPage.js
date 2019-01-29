const helpers = require('../helpers');

const { dateRangePickerOptions, analyticsChartsNames } = helpers;

const analyticsCommands = {

    pause: function (time) {
        this.api.pause(time);
        return this;
    },

    getTextCallback: function(element, message1, message2, result) {
        this.verify.visible(element, `${message1} ${result.value} ${message2}`);
    },

    validateDatePickerAndOptions: function() {
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

    validateTotalMessageCountGraph: function() {
        return this.waitForElementVisible('@totalMessageCountGraph', 'Total Message Count Graph is visible')
          .verify.visible('@totalMessageCountLabel', 'Total Message Count Label is present on this graph')
          .getText('@totalMessageCountGraphCount', this.getTextCallback.bind(this, '@totalMessageCountGraphCount', 'Total Message Count', 'is visible'));          
    },

    validatePeakTimeGraph: function() {
        return this.waitForElementVisible('@peakMessageTimeGraph', 'Peak Message Time Graph is visible')
          .verify.visible('@peakMessageTimeGraphLabel', 'Peak Message Time Label is present on this graph')
          .getText('@peakMessageTimeGraphTime', this.getTextCallback.bind(this, '@peakMessageTimeGraphTime', 'Peak Message Time', 'is visible'));
          
    },

    validateNewInboundContactsGraph: function() {
        return this.waitForElementVisible('@newInboundContactsGraph', 'New Inbound Contacts Graph is visible')
          .verify.visible('@newInboundContactsGraphLabel', 'New Inbound Contacts Label is present on this graph')
          .getText('@newInboundContactsGraphTotalCount', this.getTextCallback.bind(this, '@newInboundContactsGraphTotalCount', 'New Inbound Contacts total Count', 'is visible'));

    },

    validateResponseTimeGraph: function() {
        return this.waitForElementVisible('@responseTimeGraph', 'Response Time Graph is visible')
          .verify.visible('@responseTimeGraphLabel', 'Response Time Label is present on this graph')
          .getText('@responseTimeGraphAverageMinutes', this.getTextCallback.bind(this, '@responseTimeGraphAverageMinutes', 'Response Time Average Minutes', 'is visible'));
          
    },

    validateDefaultOptionInDateRangeDropdown: function() {
        return this.waitForElementVisible('@dateRangeDropdownLabel', `The default date selection in the date picker is '${helpers.defaultDateRange()}'`);
    },

}

module.exports = {
    commands: [analyticsCommands],

    url: function () {
        return this.api.launch_url + '/analytics'
    },

    elements: {

        /*---------------------------------------------------------*/
        // Analytics Page Information
        /*---------------------------------------------------------*/

        analyticsIcon: {
          selector: `//BUTTON[contains(@id, 'nav-analytics')]`,
          locateStrategy: 'xpath',
        },

        dateRangeDropdown: {
          selector: `//DIV[contains(@class, 'daterange__dropdown')]`,
          locateStrategy: 'xpath',
        },

        dateRangeDropdownMenus: {
          selector: `//DIV[contains(@class, 'analytics__wrapper')]//DIV[contains(@class, 'dropdown__menu__scroll')]`,
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
          selector: `//INPUT[@name= 'startDate']`,
          locateStrategy: 'xpath',
        },

        customRangeToDate: {
          selector: `//INPUT[@name= 'endDate']`,
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
            selector: `//DIV[@class= 'daterange__dropdown']//SPAN[@class='dropdown__toggle__text' and text() = '${helpers.defaultDateRange()}']`,
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

    }
}
