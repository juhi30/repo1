const appointmentFeeder = require('../feeder/appointments.feeder');
const helper = require('../toolboxes/helpers.toolbox');

const appointmentRemindersCommands = {

  verifyMenuItem() {
    return this.waitForElementVisible('@appointmentManagerMenuItem', 'Appointment Manager option is visible in the Settings Menu items');
  },

  openAppointmentManager() {
    return this.waitForElementVisible('@appointmentManagerMenuItem', 'Appointment manager option is visible in the Setting menu')
      .click('@appointmentManagerMenuItem')
      .pause(1000);
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

  openDatePicker() {
    return this.waitForElementVisible('@datePicker', 'Date picker is visible')
      .click('@datePicker');
  },

  validateDateRange() {
    return this.waitForElementVisible('@datePickerMenu', 'Date picker menu is opened after click')
      .verify.visible('@todayOption', 'Today option is visible')
      .verify.visible('@tomorrowOption', 'Tomorrow option is visible')
      .verify.visible('@nextSevenDaysOption', 'Next 7 days option is visible')
      .verify.visible('@nextThirtyDaysOption', 'Next 30 days option is visible')
      .verify.visible('@customRangeOption', 'Custom Range option is visible')
      .verify.visible('@customRangeFromDate', 'From Date input is visible')
      .verify.visible('@customRangeToDate', 'To Date is visible')
      .click('@datePicker');
  },

  datePickerCustomDate(customRangeFor, month, year, date) {
    return this.waitForElementVisible(customRangeFor, 'Date input is visible')
      .click(customRangeFor)
      .waitForElementVisible('@monthDropDown', 'Date picker is opened')
      .setValue('@monthDropDown', month)
      .setValue('@yearDropDown', year)
      .pause(1000)
      .api.useXpath().waitForElementVisible(`//*[contains(@class,'react-datepicker__day react-datepicker')][contains(.,'${date}')]`, `"${date}" Date is visible`)
      .pause(2000)
      .click(`//*[contains(@class,'react-datepicker__day react-datepicker')][contains(.,'${date}')]`)
      .pause(1000);
  },

  // Function to select a quick filter from the date picker
  datePickerQuickFilter(quickFilterOption) {
    return this.waitForElementVisible('@datePickerMenu', 'Date picker menu is opened after click')
      .waitForElementVisible(quickFilterOption, `"${quickFilterOption}" quick filter option is visible`)
      .click(quickFilterOption)
      .pause(1000);
  },

  clickApplyCustomDates() {
    return this.click('@applyCustomDatesButton')
      .waitForElementVisible('@noUpcomingAppointmentsPageCopy', 'No Appointments page copy visible for the selected custom dates');
  },

  clickContactName(contactName) {
    return this.api.useXpath().waitForElementVisible(`//SPAN[contains(., '${contactName}')]`, `Span with text "${contactName}" is visible`)
      .click(`//SPAN[contains(., '${contactName}')]`);
  },

  verifyContactAndItsStatus(patientName, AppointmentStatus) {
    return this.api.useXpath().verify.visible(`//*[@class='button__text-wrapper'][contains(.,'${patientName}')]//parent::button//parent::div/preceding-sibling::div//*[@class='appointments__status-label'][contains(.,'${AppointmentStatus}')]`, `Patient "${patientName}" with status "${AppointmentStatus}" as appointment status is visible`)
      .pause(2000);
  },

  verifyAppointmentDate(patientName, compareWith) {
    const formatedDate = `${helper.changeDateFormat(compareWith, 'America/New_York', 'MM/DD/YY hh:mm a')} (EDT)`;
    return this.api.useXpath().verify.visible(`//*[@class='button__text-wrapper'][contains(.,'${patientName}')]//parent::button//parent::div/preceding-sibling::div//SPAN[contains(text(),'EDT')]`, `Patient "${patientName}" with set appointment date is visible`)
      .expect.element(`//*[@class='button__text-wrapper'][contains(.,'${patientName}')]//parent::button//parent::div/preceding-sibling::div//SPAN[contains(text(),'EDT')]`).text.to.equal(formatedDate);
  },

  verifyUnreadStatus(patientName) {
    return this.api.useXpath().verify.visible(`//*[@class='button__text-wrapper'][contains(.,'${patientName}')]//parent::button//parent::div/preceding-sibling::div//*[@class='appointments__circle--unread u-font-weight-bold']`, `Patient "${patientName}" - Appointment now marked as unread`)
      .pause(2000);
  },

  verifyReadStatus(patientName) {
    return this.api.useXpath().waitForElementNotPresent(`//*[@class='button__text-wrapper'][contains(.,'${patientName}')]//parent::button//parent::div/preceding-sibling::div//*[@class='appointments__circle--unread u-font-weight-bold']`, `Patient "${patientName}" - Appointment now marked as read`)
      .pause(2000);
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
      selector: `//DIV[@class= 'dropdown__menu__container']//*[text()='${appointmentFeeder.customRange}']`,
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

    monthDropDown: {
      selector: '//*[@class=\'react-datepicker__month-container\']//*[@class=\'react-datepicker__month-select\']',
      locateStrategy: 'xpath',
    },

    yearDropDown: {
      selector: '//*[@class=\'react-datepicker__month-container\']//*[@class=\'react-datepicker__year-select\']',
      locateStrategy: 'xpath',
    },

    applyCustomDatesButton: {
      selector: '//SPAN[text()=\'Apply\']',
      locateStrategy: 'xpath',
    },

    noUpcomingAppointmentsPageCopy: {
      selector: '//H3[text()=\'No Upcoming Appointments.\']',
      locateStrategy: 'xpath',
    },

    topPagination: {
      selector: '//*[@class=\'u-text-right u-p-t-small\']',
      locateStrategy: 'xpath',
    },

    bottomPagination: {
      selector: '//*[@class=\'column-4@small column-4@medium column-offset-8@small column-offset-8@medium\']',
      locateStrategy: 'xpath',
    },
  },
};
