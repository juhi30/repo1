const helpers = require('../helpers');

const analyticsCommands = {

    pause: function (time) {
        this.api.pause(time);
        return this;
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
        const self = this;
        return this.waitForElementVisible('@totalMessageCountGraph', 'Total Message Count Graph is visible')
          .verify.visible('@totalMessageCountLabel', 'Total Message Count Label is present on this graph')
          .getText('@totalMessageCountGraphCount', function (tpObj) {
             self.verify.visible('@totalMessageCountGraphCount', `Total Message Count ${tpObj.value} is visible`);
          });
          
    },

    validatePeakTimeGraph: function() {
        const self = this;
        return this.waitForElementVisible('@peakMessageTimeGraph', 'Peak Message Time Graph is visible')
          .verify.visible('@peakMessageTimeGraphLabel', 'Peak Message Time Label is present on this graph')
          .getText('@peakMessageTimeGraphTime', function (tpObj) {
             self.verify.visible('@peakMessageTimeGraphTime', `Peak Message Time (${tpObj.value}) is visible`);
          })
          
    },

    validateNewInboundContactsGraph: function() {
        const self = this;
        return this.waitForElementVisible('@newInboundContactsGraph', 'New Inbound Contacts Graph is visible')
          .verify.visible('@newInboundContactsGraphLabel', 'New Inbound Contacts Label is present on this graph')
          .getText('@newInboundContactsGraphTotalCount', function (tpObj) {
             self.verify.visible('@newInboundContactsGraphTotalCount', `New Inbound Contacts total Count(${tpObj.value}) is visible`);
          });
    },

    validateResponseTimeGraph: function() {
        const self = this;
        return this.waitForElementVisible('@responseTimeGraph', 'Response Time Graph is visible')
          .verify.visible('@responseTimeGraphLabel', 'Response Time Label is present on this graph')
          .getText('@responseTimeGraphAverageMinutes', function (tpObj) {
             self.verify.visible('@responseTimeGraphAverageMinutes', `Response Time Average Minutes (${tpObj.value}) is visible`);
          });
          
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
          selector: `//DIV[contains(@class, 'dropdown__menu__scroll')]`,
          locateStrategy: 'xpath',
        },

        yesterdayOption: {
          selector: `//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='Yesterday']`,
          locateStrategy: 'xpath',
        },

        lastSevenDaysOption: {
          selector: `//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='Last 7 Days']`,
          locateStrategy: 'xpath',
        },

        lastThirtyDaysOption: {
          selector: `//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='Last 30 Days']`,
          locateStrategy: 'xpath',
        },

        lastNintyDaysOption: {
          selector: `//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='Last 90 Days']`,
          locateStrategy: 'xpath',
        },

        lastTwelveMonthsOption: {
          selector: `//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='Last 12 Months']`,
          locateStrategy: 'xpath',
        },

        customRangeOption: {
          selector: `//DIV[@class= 'date-range__label' and text() = 'Custom Range']`,
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
            selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = 'Total Message Count']//parent::div//parent::div//CANVAS`,
            locateStrategy: 'xpath',
        },

        totalMessageCountLabel: {
          selector: `//DIV[@class= 'chart__header' ]//DIV[@class= 'header__title' and text()='Total Message Count']`,
          locateStrategy: 'xpath',
        },

        totalMessageCountGraphCount: {
            selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = 'Total Message Count']//parent::div//DIV[@class= 'header__subtitle primary']`,
            locateStrategy: 'xpath',
        },

        dateRangeDropdownLabel: {
            selector: `//DIV[@class= 'daterange__dropdown']//SPAN[@class='dropdown__toggle__text' and text() = '${helpers.defaultDateRange()}']`,
            locateStrategy: 'xpath',
        },

        peakMessageTimeGraph: {
            selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = 'Peak Message Time']//parent::div//parent::div//CANVAS`,
            locateStrategy: 'xpath',
        },

        peakMessageTimeGraphLabel: {
          selector: `//DIV[@class= 'chart__header' ]//DIV[@class= 'header__title' and text()='Peak Message Time']`,
          locateStrategy: 'xpath',
        },

        peakMessageTimeGraphTime: {
            selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = 'Peak Message Time']//parent::div//DIV[@class= 'header__subtitle secondary']`,
            locateStrategy: 'xpath',
        },

        responseTimeGraphAverageMinutes: {
            selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = 'Response Time']//parent::div//DIV[@class= 'header__subtitle secondary']`,
            locateStrategy: 'xpath',
        },

        responseTimeGraph: {
            selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = 'Response Time']//parent::div//parent::div//CANVAS`,
            locateStrategy: 'xpath',
        },

        responseTimeGraphLabel: {
          selector: `//DIV[@class= 'chart__header' ]//DIV[@class= 'header__title' and text()='Response Time']`,
          locateStrategy: 'xpath',
        },

        newInboundContactsGraphTotalCount: {
            selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = 'New Inbound Contacts']//parent::div//DIV[@class= 'header__subtitle primary']`,
            locateStrategy: 'xpath',
        },

        newInboundContactsGraph: {
            selector: `//DIV[@class= 'chart']/DIV/DIV[@class= 'header__title' and text() = 'New Inbound Contacts']//parent::div//parent::div//CANVAS`,
            locateStrategy: 'xpath',
        },

        newInboundContactsGraphLabel: {
          selector: `//DIV[@class= 'chart__header' ]//DIV[@class= 'header__title' and text()='New Inbound Contacts']`,
          locateStrategy: 'xpath',
        },

    }
}
