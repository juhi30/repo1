const testConstants = require('../toolboxes/feeder.toolbox')
const memberPreferencesCommands = {
  clickEventOnMemberPreferencesPage: function (element, message) {
    return this.waitForElementVisible(element, message + ' is visible.')
      .click(element)
  }
}

module.exports = {
  commands: [memberPreferencesCommands],
  url: function () {
    return this.api.launch_url + '/settings/preferences'
  },
  elements: {

    checkAssignToMeNotificationOnDesktop: {
      selector: `//INPUT[contains(@title,"Inbox Assigned to Me Desktop")]/following-sibling::label`,
      locateStrategy: 'xpath',
    },

    checkFollowingNotificationOnMobile: {
      selector: `//INPUT[contains(@title,"Inbox Following Mobile")]/following-sibling::label`,
      locateStrategy: 'xpath',
    },

    individualGroupNotificationLinkForPatient: {
      selector: `//th[text()= 'Patient']//parent::tr//parent::thead//parent::table//Span[contains(text(), 'Individual Group Notifications')]`,
      locateStrategy: 'xpath',
    },

    checkPatientGroupNotificationOnMobile: {
      selector: `//tr[@class="member-preferences__group-sub"]//td//strong[text()='${testConstants.patientTypeGroup}']//parent::td//following-sibling::td//input[contains(@title,'Mobile')]//following-sibling::label`,
      locateStrategy: 'xpath',
    },

    individualGroupNotificationLinkForTeam: {
      selector: `//th[text()= 'Team']//parent::tr//parent::thead//parent::table//Span[contains(text(), 'Individual Group Notifications')]`,
      locateStrategy: 'xpath',
    },

    checkTeamGroupNotificationOnMobile: {
      selector: `//tr[@class="member-preferences__group-sub"]//td//strong[text()='${testConstants.teamTypeGroup}']//parent::td//following-sibling::td//input[contains(@title,'Desktop')]//following-sibling::label`,
      locateStrategy: 'xpath',
    },

    individualGroupNotificationLinkForPatientAndTeam: {
      selector: `//th[text()= 'Patient and Team']//parent::tr//parent::thead//parent::table//Span[contains(text(), 'Individual Group Notifications')]`,
      locateStrategy: 'xpath',
    },

    checkTeamAndPatientGroupNotificationOnMobile: {
      selector: `//tr[@class="member-preferences__group-sub"]//td//strong[text()='${testConstants.patientAndTeamType}']//parent::td//following-sibling::td//input[contains(@title,'Mobile')]//following-sibling::label`,
      locateStrategy: 'xpath',
    },

    updatePrefrencesButton: {
      selector: `//BUTTON[contains(@class, 'button')]//span[contains(text(), 'Update Preferences')]`,
      locateStrategy: 'xpath',
    },

    updationSuccessfulMessage: {
      selector: `//DIV[text()='Preferences updated successfully.']`,
      locateStrategy: 'xpath',
    },

  }
};

