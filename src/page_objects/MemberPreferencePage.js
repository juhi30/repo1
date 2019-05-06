const groupFeeder = require('../feeder/group.feeder');

const memberPreferencesCommands = {
  clickEventOnMemberPreferencesPage(element, message) {
    return this.waitForElementVisible(element, `${message} is visible.`)
      .click(element);
  },
};

module.exports = {
  commands: [memberPreferencesCommands],
  url() {
    return `${this.api.launch_url}/settings/preferences`;
  },
  elements: {

    checkAssignToMeNotificationOnDesktop: {
      selector: '//INPUT[contains(@title,"Inbox Assigned to Me Desktop")]/following-sibling::label',
      locateStrategy: 'xpath',
    },

    checkFollowingNotificationOnMobile: {
      selector: '//INPUT[contains(@title,"Inbox Following Mobile")]/following-sibling::label',
      locateStrategy: 'xpath',
    },

    individualGroupNotificationLinkForPatient: {
      selector: '//th[text()= \'Patient\']//parent::tr//parent::thead//parent::table//Span[contains(text(), \'Individual Group Notifications\')]',
      locateStrategy: 'xpath',
    },

    checkPatientGroupNotificationOnMobile: {
      selector: `//tr[@class="member-preferences__group-sub"]//td//strong[text()='${groupFeeder.patientTypeGroup}']//parent::td//following-sibling::td//input[contains(@title,'Mobile')]//following-sibling::label`,
      locateStrategy: 'xpath',
    },

    individualGroupNotificationLinkForTeam: {
      selector: '//th[text()= \'Team\']//parent::tr//parent::thead//parent::table//Span[contains(text(), \'Individual Group Notifications\')]',
      locateStrategy: 'xpath',
    },

    checkTeamGroupNotificationOnMobile: {
      selector: `//tr[@class="member-preferences__group-sub"]//td//strong[text()='${groupFeeder.teamTypeGroup}']//parent::td//following-sibling::td//input[contains(@title,'Desktop')]//following-sibling::label`,
      locateStrategy: 'xpath',
    },

    individualGroupNotificationLinkForPatientAndTeam: {
      selector: '//th[text()= \'Patient and Team\']//parent::tr//parent::thead//parent::table//Span[contains(text(), \'Individual Group Notifications\')]',
      locateStrategy: 'xpath',
    },

    checkTeamAndPatientGroupNotificationOnMobile: {
      selector: `//tr[@class="member-preferences__group-sub"]//td//strong[text()='${groupFeeder.patientAndTeamType}']//parent::td//following-sibling::td//input[contains(@title,'Mobile')]//following-sibling::label`,
      locateStrategy: 'xpath',
    },

    updatePreferencesButton: {
      selector: '//BUTTON[contains(@class, \'button\')]//span[contains(text(), \'Update Preferences\')]',
      locateStrategy: 'xpath',
    },

    updationSuccessfulMessage: {
      selector: '//DIV[text()=\'Preferences updated successfully.\']',
      locateStrategy: 'xpath',
    },

  },
};
