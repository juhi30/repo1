const testConstant = require('../toolboxes/feeder.toolbox')
const preferencesCommands = {

  checkOrgPreferences: function () {
    return this.waitForElementVisible('@organisationPreferencesTitle', 'organization preferences title is visible')
      .click('@selectChannel')
      .waitForElementVisible('@globalSound', 'global sound is available')
      .click('@globalSound')
      .waitForElementVisible('@closeByAssignee', 'close by assignee is visible')
      .click('@closeByAssignee')
  },

  successMessage: function () {
    return this.waitForElementVisible('@updatePreferences', 'update preferences is visible')
      .click('@updatePreferences')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible')
  },
}

module.exports = {
  commands: [preferencesCommands],
  url: function () {
    return this.api.launch_url + '/settings/organization/preferences'
  },
  elements: {

    /*---------------------------------------------------------------*/
    // Patient messages checks
    /*---------------------------------------------------------------*/
    organisationPreferencesTitle: {
      selector: `//DIV[@class='app-page__header__title'][text()='Organization Preferences']`,
      locateStrategy: 'xpath',
    },

    selectChannel: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][text()='${testConstant.chooseChannel}']`,
      locateStrategy: 'xpath',
    },

    globalSound: {
      selector: `//LABEL[@class='rhinoswitcher__label'][contains(@for, 'soundOn')]`,
      locateStrategy: 'xpath',
    },

    systemTimeOut: {
      selector: `//INPUT[contains(@id,'sessionTimeoutMinutes')]`,
      locateStrategy: 'xpath',
    },

    closeByAssignee: {
      selector: `//LABEL[@class='rhinoswitcher__label'][contains(@for,'allowClosingByAssignee')]`,
      locateStrategy: 'xpath',
    },

    updatePreferences: {
      selector: `//SPAN[text()='Update Preferences']`,
      locateStrategy: 'xpath',
    },

    updationSuccessfulMessage: {
      selector: `//DIV[text()='Organization updated successfully.']`,
      locateStrategy: 'xpath',
    },
  }
};
