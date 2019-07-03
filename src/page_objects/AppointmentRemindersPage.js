const appointmentRemindersCommands = {

  openAppointmentReminders() {
    return this.waitForElementVisible('@appointmentRemindersMenuItem', 'Appointment reminder option is visible in the Setting menu')
      .click('@appointmentRemindersMenuItem');
  },

  selectChannel(channel) {
    return this.waitForElementVisible('@defaultChannelDropdown', `${channel} is visible`)
      .setValue('@defaultChannelDropdown', channel);
  },

  enableDisableToggles(toggle) {
    return this.waitForElementVisible(toggle, `${toggle} toggle is visible.`)
      .click(toggle);
  },

  checkVariableMessage(message, index = 1) {
    return this.api.useXpath().waitForElementVisible(`(//SPAN[contains(., '${message}')])[${index}]`, `Variable Message with text "${message}" is visible`);
  },

  selectVariableMessage(message) {
    return this.api.useXpath().waitForElementVisible(`//SPAN[contains(., '${message}')]`, `Span with text "${message}" is visible`)
      .click(`//SPAN[contains(., '${message}')]`);
  },

  updateDetails(element, newValue) {
    return this.verify.visible(element, `${element} is visible`)
      .clearValue(element)
      .setValue(element, newValue);
  },

  clickSaveAppointments() {
    return this.click('@saveChangesButton')
      .waitForElementVisible('@appointmentRemindersSuccessMessage', 'Success message displayed')
      .waitForElementNotPresent('@appointmentRemindersSuccessMessage', 'Success message is gone');
  },
};

module.exports = {
  commands: [appointmentRemindersCommands],
  url() {
    return `${this.api.launch_url}/settings/organization/appointment-reminders`;
  },
  elements: {
    appointmentRemindersMenuItem: {
      selector: '//SPAN[@class=\'u-text-overflow\'][text()=\'Appointment Reminders\']',
      locateStrategy: 'xpath',
    },


    /*--------------------------------------------*/
    // Outgoing Channels container
    /*--------------------------------------------*/

    // officeChannelDropdown: {
    //     selector: `//INPUT[contains(@id, 'title')]`,
    //     locatestrategy: 'xpath'
    // },

    defaultChannelDropdown: {
      selector: '//SELECT[contains(@id, \'selectedChannel\')]',
      locateStrategy: 'xpath',
    },

    /*--------------------------------------------*/
    // Appointment Scheduled container
    /*--------------------------------------------*/

    appointmentScheduledToggle: {
      selector: '//LABEL[contains(@for, \'appointmentScheduled\')]',
      locateStrategy: 'xpath',
    },

    /*--------------------------------------------*/
    // Appointment reminder container
    /*--------------------------------------------*/

    appointmentReminderToggle: {
      selector: '//LABEL[contains(@for, \'appointmentReminders\')]',
      locateStrategy: 'xpath',
    },

    appointmentDeliveryHours: {
      selector: '//INPUT[contains(@id,\'appointmentRemindersDeliveryHours\')]',
      locateStrategy: 'xpath',
    },

    /*--------------------------------------------*/

    saveChangesButton: {
      selector: '//SPAN[contains(text(), \'Save Changes\')]',
      locateStrategy: 'xpath',
    },

    appointmentRemindersSuccessMessage: {
      selector: '//DIV[text()=\'Organization updated successfully.\']',
      locateStrategy: 'xpath',
    },
  },
};
