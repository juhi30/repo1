const groupsPageCommands = {
  pause: function(time) {
    this.api.pause(time);
    return this;
  },
}

module.exports = {
  commands: [groupsPageCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/groups'
  },
  elements: {
    createButton: {
      selector: `//BUTTON[@title, 'Create Group']`,
      locateStrategy: 'xpath'
    },

    // Group Type Options
    teamOption: {
      selector: `//SPAN[contains(.,'Team')]`,
      locateStrategy: 'xpath'
    },

    patientOption: {
      selector: `//SPAN[contains(.,'Patient')]`,
      locateStrategy: 'xpath'
    },

    patientAndTeamOption: {
      selector: `//SPAN[contains(.,'Patient and Team')]`,
      locateStrategy: 'xpath'
    },

    createGroupButton: {
      selector: `//SPAN[contains(.,'CreateGroup')]`,
      locateStrategy: 'xpath'
    },

    // Group Details
    nameInput: {
      selector: `//INPUT[contains(@name, 'name')]`,
      locateStrategy: 'xpath'
    },

    purposeInput: {
      selector: `//INPUT[contains(@name, 'purpose')]`,
      locateStrategy: 'xpath'
    }

    // TagsContainer is a separate page object
    // MembersContainer is a separate page object
    // AvailabilityHoursContainer is a separate page object

  }
}
