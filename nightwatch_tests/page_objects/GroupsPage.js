const testConstant = require('../feeder')
const groupsPageCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  verifyGroupEls: function() {
    return this.waitForElementPresent('@createButton', 'Create Button is visible')
      .click('@createButton')
      .waitForElementPresent('@teamOption', 'Team option is visible')
      .verify.visible('@patientOption', 'Patient option is visible')
      .verify.visible('@patientAndTeamOption', 'Patient and team option is visible')
  },

  createGroup: function () {
    return this.waitForElementPresent('@groupPageTitle', 'Group Page Title is visible')
      .click('@patientOption')
      .setValue('@nameInput', testConstant.groupName)
      .setValue('@purposeInput', testConstant.purpose)
      .setValue('@groupMemberInput', testConstant.groupmember)
      .pause(2000)
      .click('@memberNameSearchResult')
      .pause(1000)
      .click('@createGroupButton')
  }
}

module.exports = {
  commands: [groupsPageCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/groups'
  },
  elements: {
    groupPageTitle: {
      selector: `//div[@class='app-page__header__title'][text()='Create Group']`,
      locateStrategy: 'xpath',
    },

    createButton: {
      selector: `//BUTTON[@title='Create Group']`,
      locateStrategy: 'xpath',
    },

    // Group Type Options
    teamOption: {
      selector: `//SPAN[contains(.,'Team')]`,
      locateStrategy: 'xpath',
    },

    patientOption: {
      selector: `//*[@class='form__block-group__label'][text()='Patient']`,
      locateStrategy: 'xpath',
    },

    patientAndTeamOption: {
      selector: `//SPAN[contains(.,'Patient and Team')]`,
      locateStrategy: 'xpath',
    },

    // Group Details
    nameInput: {
      selector: `//INPUT[contains(@name, 'name')]`,
      locateStrategy: 'xpath',
    },

    purposeInput: {
      selector: `//INPUT[contains(@name, 'purpose')]`,
      locateStrategy: 'xpath',
    },

    createGroupButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Create Group']`,
      locateStrategy: 'xpath',
    },

    groupMemberInput: {
      selector: `//INPUT[contains(@id,'preloadedMembers')]`,
      locateStrategy: 'xpath',
    },
    // TagsContainer is a separate page object
    // MembersContainer is a separate page object
    // AvailabilityHoursContainer is a separate page object

    memberNameSearchResult: {
      selector: `//SPAN[(@class='resource__intro__title__content')][contains(text(),'${testConstant.groupmember}')]`,
      locateStrategy: 'xpath',
    },
  }
}
