const testConstants = require('../toolboxes/feeder.toolbox')
const memberPreferencesCommands = {
  clickEventOnMemberPreferencesPage: function(element,message) {
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

    /*---------------------------------------------------------------*/
    // Mode of Notifications of  Patient Messages
    /*---------------------------------------------------------------*/

    notificationOnDesktopIfAssign: {
      selector: `//INPUT[contains(@title,"Inbox Assigned to Me Desktop")]/following-sibling::label`,
      locateStrategy: 'xpath',
    },

    notificationOnMobileIfFollowing: {
      selector: `//INPUT[contains(@title,"Inbox Following Mobile")]/following-sibling::label`,
      locateStrategy: 'xpath',
    },

    groupNotificationLinkOnPatientMsgs: {
      selector:`//th[text()= 'Patient']//parent::tr//parent::thead//parent::table//Span[contains(text(), 'Individual Group Notifications') or contains(text(), 'Hide Individual Groups')]`,
      locateStrategy: 'xpath',
    },

    groupNotificationOnMobileForPatient: {
      selector: `//tr[@class="member-preferences__group-sub"]//td//strong[text()='${testConstants.patientTypeGroup}']//parent::td//following-sibling::td//input[contains(@title,'Mobile')]//following-sibling::label`,
      locateStrategy: 'xpath',
    },

    groupNotificationLinkOnTeamMsgs: {
      selector:`//th[text()= 'Team']//parent::tr//parent::thead//parent::table//Span[contains(text(), 'Individual Group Notifications') or contains(text(), 'Hide Individual Groups')]`,
      locateStrategy: 'xpath',
    },

    groupNotificationOnMobileForTeam: {
      selector: `//tr[@class="member-preferences__group-sub"]//td//strong[text()='${testConstants.teamTypeGroup}']//parent::td//following-sibling::td//input[contains(@title,'Desktop')]//following-sibling::label`,
      locateStrategy: 'xpath',
    },

    groupNotificationLinkOnPatientAndTeamMsgs: {
      selector:`//th[text()= 'Patient and Team']//parent::tr//parent::thead//parent::table//Span[contains(text(), 'Individual Group Notifications') or contains(text(), 'Hide Individual Groups')]`,
      locateStrategy: 'xpath',
    },

    groupNotificationOnMobileForPatientNdTeam: {
      selector: `//tr[@class="member-preferences__group-sub"]//td//strong[text()='${testConstants.patientAndTeamType}']//parent::td//following-sibling::td//input[contains(@title,'Mobile')]//following-sibling::label`,
      locateStrategy: 'xpath',
    },

    updatePrefrencesButton: {
      selector:`//BUTTON[contains(@class, 'button')]//span[contains(text(), 'Update Preferences')]`,
      locateStrategy: 'xpath',
    },

    updationSuccessfulMessage: {
        selector: `//DIV[text()='Preferences updated successfully.']`,
        locateStrategy: 'xpath',
      },

  }
};

