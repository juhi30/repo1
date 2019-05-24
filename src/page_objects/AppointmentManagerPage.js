const appointmentFeeder = require('../feeder/appointments.feeder');

const appointmentRemindersCommands = {

  verifyMenuItem() {
    return this.waitForElementVisible('@appointmentManagerMenuItem', 'Appointment Manager option is visible in the Settings Menu items');
  },

  openAppointmentManager() {
    return this.click('@appointmentManagerMenuItem');
  },

  verifyBanner() {
    return this.waitForElementVisible('@appointmentManagerPageTitle', 'Appointment Manager page is open')
      .waitForElementVisible('@lastSyncBanner', 'Banner for last sync update is visible');
  },

  verifyUpcomingAppointsCount(text) {
    return this.waitForElementVisible('@totalUpcomingAppointments', 'Total Upcoming appointments count is visible')
      .click('@totalUpcomingAppointments')
      .expect.element('@totalUpcomingAppointments').text.to.contain(text);
  },

  validateDateRange() {
    return this.waitForElementVisible('@datePicker', 'Date picker is visible')
      .click('@datePicker')
      .waitForElementVisible('@datePickerMenu', 'Date picker menu is opened after click')
      .verify.visible('@todayOption', 'Today option is visible')
      .verify.visible('@tomorrowOption', 'Tomorrow option is visible')
      .verify.visible('@nextSevenDaysOption', 'Next 7 days option is visible')
      .verify.visible('@nextThirtyDaysOption', 'Next 30 days option is visible')
      .verify.visible('@customRangeOption', 'Custom Range option is visible')
      .verify.visible('@customRangeFromDate', 'From Date input is visible')
      .verify.visible('@customRangeToDate', 'To Date is visible');
  },

  clickContactName(contactName) {
    return this.api.useXpath().waitForElementVisible(`//SPAN[contains(., '${contactName}')]`, `Span with text "${contactName}" is visible`)
      .click(`//SPAN[contains(., '${contactName}')]`);
  },

  verifyContactAndItsStatus(patientName, AppointmentStatus) {
    return this.api.useXpath().verify.visible(`//*[contains(.,'${patientName}')]//parent::button//parent::div/preceding-sibling::div//*[contains(.,'${AppointmentStatus}')]`, `Patient "${patientName}" with status "${AppointmentStatus}" as appointment status is visible`);
  },
};

module.exports = {
  commands: [appointmentRemindersCommands],
  url() {
    return `${this.api.launch_url}/settings/organization/appointment-manager`;
  },
  elements: {

    appointmentManagerPageTitle: {
      selector: '//DIV[@class=\'u-m-t-large\']//H3[text()=\'Appointment Manager\']',
      locateStrategy: 'xpath',
    },

    appointmentManagerMenuItem: {
      selector: '//SPAN[@class=\'u-text-overflow\'][text()=\'Appointment Manager\']',
      locateStrategy: 'xpath',
    },

    lastSyncBanner: {
      selector: '//DIV[@class=\'alert u-m-b alert--info\']//DIV[contains(text(),\'Last data sync from PMS/EHR:\')]',
      locateStrategy: 'xpath',
    },

    totalUpcomingAppointments: {
      selector: '//H4[@class=\'u-text-left u-p-t-small\'][contains(text(),\'Total Upcoming\')]',
      locateStrategy: 'xpath',
    },

    datePicker: {
      selector: '//DIV[contains(@class, \'daterange__dropdown\')]',
      locateStrategy: 'xpath',
    },

    datePickerMenu: {
      selector: '//DIV[contains(@class, \'daterange__dropdown\')]//DIV[contains(@class, \'dropdown__menu__scroll\')]',
      locateStrategy: 'xpath',
    },

    todayOption: {
      selector: `//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${appointmentFeeder.today}']`,
      locateStrategy: 'xpath',
    },

    tomorrowOption: {
      selector: `//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${appointmentFeeder.tomorrow}']`,
      locateStrategy: 'xpath',
    },

    nextSevenDaysOption: {
      selector: `//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${appointmentFeeder.nextSevenDays}']`,
      locateStrategy: 'xpath',
    },

    nextThirtyDaysOption: {
      selector: `//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${appointmentFeeder.nextThirtyDays}']`,
      locateStrategy: 'xpath',
    },

    customRangeOption: {
      selector: `//DIV[@class= 'dropdown__menu__item__content__label']//span[text()='${appointmentFeeder.customRange}']`,
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
  },
};
