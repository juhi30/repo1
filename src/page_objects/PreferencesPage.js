const testConstant = require('../toolboxes/feeder.toolbox')
const preferencesCommands = {


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
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(text(), '${testConstant.newChannelName}')]`,
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
