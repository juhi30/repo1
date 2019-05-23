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
  },
};
