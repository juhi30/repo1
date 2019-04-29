const testConstants = require('../toolboxes/feeder.toolbox');

const newChannelCommands = {

  pause(time) {
    this.api.pause(time);
    return this;
  },

  clickAddChannel() {
    return this.waitForElementVisible('@addChannelIcon', 'Add channel icon is visible')
      .click('@addChannelIcon')
      .waitForElementVisible('@newChannelSetUpPageTitle', 'New channel setup page is open');
  },

  newPhoneNumberChannelCreation() {
    return this.click('@newPhoneChannelOption')
      .waitForElementVisible('@chooseANumberBox', 'Form to Create New phone type channel is available')
      .setValue('@chooseANumberBox', testConstants.numberForNewPhoneChannel)
      .pause(1000)
      .click('@selectNumber')
      .setValue('@forwardingNumber', testConstants.forwardingNumber)
      .setValue('@channelName', testConstants.channelName)
      .setValue('@timeZone', testConstants.timeZone)
      .click('@selectMember')
      .click('@createChannelButton')
      .waitForElementVisible('@channelCreationSuccessMessage', 'Channel created successfully');
  },

};

module.exports = {
  commands: [newChannelCommands],
  url() {
    return `${this.api.launch_url}/settings/organization/channels`;
  },

  elements: {

    addChannelIcon: {
      selector: '//BUTTON[@title=\'Create Channel\']',
      locateStrategy: 'xpath',
    },

    newChannelSetUpPageTitle: {
      selector: '//DIV[@class=\'app-page__header__title\'][text()=\'New Channel Setup\']',
      locateStrategy: 'xpath',
    },

    newPhoneChannelOption: {
      selector: '//SPAN[@class=\'form__block-group__label\'][text()=\'New Phone Number\']',
      locateStrategy: 'xpath',
    },

    rhinoSecureChannel: {
      selector: '//SPAN[@class=\'form__block-group__label\'][text()=\'RhinoSecure\']', // can use a diff xpath this just easier to read
      locateStrategy: 'xpath',
    },

    chooseANumberBox: {
      selector: '//INPUT[@placeholder=\'Search by area code\']',
      locateStrategy: 'xpath',
    },

    selectNumber: {
      selector: '//DIV[@class=\'rhinodio\']//DIV[@role=\'button\'][1]',
      locateStrategy: 'xpath',
    },

    selectMember: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.memberName}')]`,
      locateStrategy: 'xpath',
    },

    forwardingNumber: {
      selector: '//INPUT[@name=\'forwardingNumber\']',
      locateStrategy: 'xpath',
    },

    channelName: {
      selector: '//INPUT[@name=\'channelName\']',
      locateStrategy: 'xpath',
    },

    timeZone: {
      selector: '//SELECT[@name=\'timeZoneId\']',
      locateStrategy: 'xpath',
    },

    purpose: {
      selector: '//INPUT[@name=\'channelPurpose\']',
      locateStrategy: 'xpath',
    },

    channelRoute: {
      selector: '//DIV[@class=\'box__title\'][text()=\'Channel Route \']',
      locateStrategy: 'xpath',
    },

    searchMember: {
      selector: '//INPUT[contains(@id,\'preloadedMembers\')]',
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------------*/
    // channel details
    /*---------------------------------------------------------------*/

    channelNameInput: {
      selector: '//INPUT[@id=\'channelName-c0e8f325-63fe-405f-8156-391e8b1e3bbf\']',
      locateStrategy: 'xpath',
    },

    channelPurposeInput: {
      selector: '//INPUT[@id=\'channelPurpose-0d657490-4a60-43d2-befd-372c3f93d662\']',
      locateStrategy: 'xpath',
    },

    channelTimeZone: {
      selector: '//SELECT[@id=\'timeZoneId-8769c4a9-0e82-4a0d-a9d5-40ba67bb81eb\']',
      locateStrategy: 'xpath',
    },

    dayLightSavingsCheckbox: {
      selector: '//LABEL[@class=\'rhinobox__label\'][text()=\'Daylight saving time observed\']',
      locateStrategy: 'xpath',
    },

    channelCreationSuccessMessage: {
      selector: '//DIV[text()=\'Channel created successfully.\']',
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------------*/
    // channel tags (use tags page object)
    /*---------------------------------------------------------------*/


  },
};
