const appointmentRemindersCommands = {

  pause(time) {
    this.api.pause(time);
    return this;
  },
};

module.exports = {
  commands: [appointmentRemindersCommands],
  url() {
    return `${this.api.launch_url}/settings/organization/appointment-reminders`;
  },
  elements: {

    /*--------------------------------------------*/
    // Outgoing Channels container
    /*--------------------------------------------*/

    // officeChannelDropdown: {
    //     selector: `//INPUT[contains(@id, 'title')]`,
    //     locatestrategy: 'xpath'
    // },

    defaultChannelDropdown: {
      selector: '//SELECT[contains(@id, \'selectedChannel\')]',
      locatestrategy: 'xpath',
    },

    /*--------------------------------------------*/
    // Appointment Scheduled container
    /*--------------------------------------------*/

    appointmentScheduledToggle: {
      selector: '//LABEL[contains(@for, \'appointmentScheduled\')]',
      locatestrategy: 'xpath',
    },

    scheduledVariableDropdown: {
      selector: '//SELECT[contains(@id, \'appointmentScheduledTemplate\')]',
      locatestrategy: 'xpath',
    },

    /*--------------------------------------------*/
    // Appointment reminder container
    /*--------------------------------------------*/

    appointmentReminderToggle: {
      selector: '//LABEL[contains(@for, \'appointmentReminders\')]',
      locatestrategy: 'xpath',
    },

    oneWeekRadio: {
      selector: '//LABEL[conatins (text(),\'1 week prior\')]',
      locatestrategy: 'xpath',
    },

    twoDayRadio: {
      selector: '//LABEL[conatins (text(),\'48 hours prior\')]',
      locatestrategy: 'xpath',
    },

    oneDayRadio: {
      selector: '//LABEL[conatins (text(),\'24 hours prior\')]',
      locatestrategy: 'xpath',
    },

    twoHourRadio: {
      selector: '//LABEL[conatins (text(),\'2 hours prior\')]',
      locatestrategy: 'xpath',
    },

    reminderVariableDropdown: {
      selector: '//SELECT[contains(@id, \'appointmentReminderTemplate\')]',
      locatestrategy: 'xpath',
    },

    /*--------------------------------------------*/

    saveChangesButton: {
      selector: '//SPAN[contains(text(), \'Save Changes\')]',
      locatestrategy: 'xpath',
    },
  },
};
