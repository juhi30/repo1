const analyticsCommands = {

    pause: function (time) {
        this.api.pause(time);
        return this;
    },

    validateDatePickerAndOptions: function() {
        return this.waitForElementVisible('@dateRangeDropdown', 'DateRange dropdown is visible')
          .click('@dateRangeDropdown')
          .waitForElementVisible('@dateRangeDropdownMenus', 'DateRange dropdown is opened after click')
          .verify.visible('@yesterdayOption', 'All contacts option is visible')
          .verify.visible('@lastSevenDaysOption', 'Last 7 days option is visible')
          .verify.visible('@lastThirtyDaysOption', 'Last 30 days is visible')
          .verify.visible('@lastNintyDaysOption', 'Last 90 days option is visible')
          .verify.visible('@lastTwelveMonthsOption', 'Last 12 months option is visible')
          .verify.visible('@customRangeOption', 'Custom Range option is visible')
          .verify.visible('@customRangeFromDate', 'From Date input is visible')
          .verify.visible('@customRangeToDate', 'To Date is visible');
        
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
    }
}
