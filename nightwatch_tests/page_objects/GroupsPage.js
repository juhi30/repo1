const groupsPageCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  elementText: function (ele, message) {
    return this.getText(ele, function (tpObj) {
      text = tpObj.value;
      console.log(text, message);
    });
  },

  verifyGroupEls: function(grpName,purpose) {
    return this.waitForElementPresent('@groupPageTitle', 'group Page Title is visible')
      .verify.visible('@createButton', 'Create Button is visible')
      .click('@createButton')
      .waitForElementPresent('@teamOption', 'Team option is visible')
      .verify.visible('@patientOption', 'Patient option is visible')
      .verify.visible('@patientAndTeamOption', 'Patient and team option is visible')
      .click('@patientAndTeamOption')
      .setValue('@nameInput',grpName)
      .verify.visible('@purposeInput' , 'Purpose Input Field is visible')
      .setValue('@purposeInput',purpose)
  }
}

module.exports = {
  commands: [groupsPageCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/groups'
  },
  elements: {

    groupPageTitle:{
      selector : `//DIV[@class='app-page__header__title'][text()='Groups']`,
      locateStrategy: 'xpath',
    },

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

    // Group Details    
    nameInput: {
      selector: `//INPUT[contains(@name, 'name')]`,
      locateStrategy: 'xpath'
    },

    purposeInput: {
      selector: `//INPUT[contains(@name, 'purpose')]`,
      locateStrategy: 'xpath'
    },

    createGroupButton: {
      selector: `//SPAN[contains(.,'CreateGroup')]`,
      locateStrategy: 'xpath'
    },


    // TagsContainer is a separate page object
    // MembersContainer is a separate page object
    // AvailabilityHoursContainer is a separate page object

  }
}
