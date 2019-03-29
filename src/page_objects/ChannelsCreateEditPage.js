const testConstants = require('../../toolboxes/feeder.toolbox');
const editChannelsCommands = {

  validateCreateEls: function () {
    return this.waitForElementVisible('@channelNameInput', 'create channel is visible')
      .verify.visible('')
  },

  validateEditEls: function () {
    return this.waitForElementVisible('@channelNameInput', 'Edit channel is visible')
      .waitForElementVisible('@backButton', 'back button is visible')
      .verify.visible('@newNumberRadio', 'new number radio is visible')
      .verify.visible('@chooseNumberInput', 'choose a number input is visible')
      .verify.visible('@forwardNumberInput', 'forward number input is visible')
  },

  validateEditAndCreateEls: function () {
    return this.waitForElementVisible('@channelNameInput', 'channel name input is visible')
      .verify.visible('@channelPurposeInput', 'channel purpose is visible')
      .verify.visible('@channelTimezoneDropdown', 'timezone dropdown is visible')
      .verify.visible('@channelDSTCheckbox', 'DST checkbox is visible')
      .verify.visible('@updateChannelButton', 'update channel button is visible')
  },

  createNewSecureChannel: function () {
    return this.waitForElementVisible('@secureChannelRadio', 'secure channel radio is visible')
      .click('@secureChannelRadio')
      .setValue('@channelNameInput', 'Rhino Secure test')
      .setValue('@channelPurposeInput', 'automatic testing')
      .setValue('@channelTimezoneDropdown', 'e')
  },

  validateChannelRoutes: function () {
    return this.waitForElementVisible('@membersButton', 'members button is visible')
      .verify.visible('@groupsButton', 'groups button is visible')
      .verify.visible('@memberInput', 'search input is visible')
      .verify.visible('@firstMember', 'first member is visible')
  },

  selectChannelRoutes: function () {
    return this.waitForElementVisible('@membersButton', 'members button is visible')
      .click('@groupsButton')
      .waitForElementVisible('@firstGroup', 'first group is visible')
      .click('@firstGroup')
      .waitForElementVisible('@membersButton', 'members button is visible')
      .click('@membersButton')
      .waitForElementVisible('@memberInput', 'member input is visible')
      .setValue('@memberInput', 'night')
      .waitForElementVisible('@firstMember', 'first member is visible')
      .click('@firstMember')
  },

  // updateWebFormOnChannels: function (element, newValue) {
  //   return this.waitForElementVisible(element, element + ' : element is visible')
  //     .clearValue(element)
  //     .setValue(element, newValue)
  //     .click('@updateChannelButton')
  // },

  validateAndUpdateWebform: function (element, newValue) {
    return this.waitForElementVisible(element, element + ' : is visible')
      .clearValue(element)
      .setValue(element, newValue)
      .waitForElementVisible('@submitButton', 'submit button is visible')
      .click('@submitButton')
  }

}

module.exports = {
  commands: [editChannelsCommands],
  // url: function () {
  //     return this.api.launch_url + '/settings/organization/channels/edit' // removed because it involves the channelID
  // },
  elements: {

    /*-----------------------------------------------------*/
    // Edit Channel main components
    /*-----------------------------------------------------*/

    webFormTitle: {
      selector: `//DIV[text()='Web Form Add-On']`,
      locateStrategy: 'xpath',
    },

    addWebFormButton: {
      selector: `//LABEL[@class='rhinoswitcher__label'][contains(@for,'isWebWidgetEnabled')]`,
      locateStrategy: 'xpath',
    },
    //  ----------- web form elements -------
    formTitle: {
      selector: `//INPUT[contains(@id,'formTitle')]`,
      locateStrategy: 'xpath',
    },

    titleSubtext: {
      selector: `//TEXTAREA[@name='titleSubtext']`,
      locateStrategy: 'xpath',
    },

    phonePlaceholder: {
      selector: `//INPUT[@name='phonePlaceholder']`,
      locateStrategy: 'xpath',
    },

    phoneHelpText: {
      selector: `//TEXTAREA[@name='phoneHelpText']`,
      locateStrategy: 'xpath',
    },

    messagePlaceholder: {
      selector: `//INPUT[@name='messagePlaceholder']`,
      locateStrategy: 'xpath',
    },

    submitButton: {
      selector: `//INPUT[@name='submitButton']`,
      locateStrategy: 'xpath',
    },

    callToActionButton: {
      selector: `//INPUT[@name='calltoActionButton']`,
      locateStrategy: 'xpath',
    },

    confirmationText: {
      selector: `//TEXTAREA[@name='confirmationText']`,
      locateStrategy: 'xpath',
    },
    // ---------- web form confirmation elements -----
    validateTitleMessage: {
      selector: `//DIV[@class='form__validation-message'][text()='Title is required.']`,
      locateStrategy: 'xpath',
    },

    validateTitleSubtextMessage: {
      selector: `//DIV[text()='Title subtext is required.']`,
      locateStrategy: 'xpath',
    },

    validatePhonePlaceholderMessage: {
      selector: `//DIV[text()='Phone placeholder is required.']`,
      locateStrategy: 'xpath',
    },

    validateHelperTextMessage: {
      selector: `//DIV[text()='Helper text is required.']`,
      locateStrategy: 'xpath',
    },

    validateMessagePlaceholderMessage: {
      selector: `//DIV[text()='Message placeholder is required.']`,
      locateStrategy: 'xpath',
    },

    validateButtonTitleMessage: {
      selector: `//DIV[text()='Button title is required.']`,
      locateStrategy: 'xpath',
    },

    validateActionButtonTitleMessage: {
      selector: `//DIV[text()='Action button title is required.']`,
      locateStrategy: 'xpath',
    },

    validateConfirmationTextMessage: {
      selector: `//DIV[text()='Confirmation text is required.']`,
      locateStrategy: 'xpath',
    },

    backButton: {
      selector: `//BUTTON[contains(@title, 'Go back')]`,
      locateStrategy: 'xpath'
    },

    newNumberRadio: {
      selector: `//SPAN[contains(text(), 'New Phone Number')]`, // for csr view(grabbed from member view)
      locateStrategy: 'xpath'
    },

    chooseNumberInput: {
      selector: `//INPUT[contains(@id,'search')]`,
      locateStrategy: 'xpath'
    },

    forwardNumberInput: {
      selector: `//INPUT[contains(@id,'forwardingNumber')]`,
      locateStrategy: 'xpath'
    },

    facebookChannelRadio: {
      selector: `//SPAN[contains(text(), 'Facebook')]`,
      locateStrategy: 'xpath'
    },

    secureChannelRadio: {
      selector: `//SPAN[contains(text(), 'RhinoSecure')]`,
      locateStrategy: 'xpath'
    },

    channelNameInput: {
      selector: `//INPUT[contains(@id,'channelName')]`,
      locateStrategy: 'xpath'
    },

    channelPurposeInput: {
      selector: `//INPUT[contains(@id,'channelPurpose')]`,
      locateStrategy: 'xpath'
    },

    channelTimezoneDropdown: {
      selector: `//SELECT[contains(@id,'timeZoneId')]`,
      locateStrategy: 'xpath'
    },

    channelDSTCheckbox: {
      selector: `//LABEL[contains(text(),'Daylight saving time observed')]`,
      locateStrategy: 'xpath'
    },

    updateChannelButton: {
      selector: `//SPAN[contains(text(),'Update Channel')]`,
      locateStrategy: 'xpath'
    },

    createChannelButton: {
      selector: `//SPAN[contains(text(), 'Create Channel')]`,
      locateStrategy: 'xpath'
    },

    /*-----------------------------------------------------*/
    // Channel forwarding
    /*-----------------------------------------------------*/

    channelForwardingToggle: {
      selector: `//LABEL[contains(@for,'allowChannelReroute')]`,
      locateStrategy: 'xpath'
    },


    // /*-------------------------Member container select only-------------------------------*/

    addMemberButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Add More Members']`,
      locateStrategy: 'xpath'
    },

    reviewButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Review']`,
      locateStrategy: 'xpath'
    },

    // /*------------------------------------------------------------------*/

    membersButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Members']`,
      locateStrategy: 'xpath'
    },

    groupsButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Groups']`,
      locateStrategy: 'xpath'
    },

    memberInput: {
      selector: `//INPUT[contains(@id, 'preloadedMembers')]`,
      locateStrategy: 'xpath'
    },

    groupInput: {
      selector: `//INPUT[contains(@id, 'search')]`,
      locateStrategy: 'xpath'
    },

    firstMember: {
      selector: `//SPAN[contains(., 'Night Member')]`,
      locateStrategy: 'xpath'
    },

    firstGroup: {
      selector: `//SPAN[contains(., 'QA Inbox & Chat Group')]`,
      locateStrategy: 'xpath'
    },
  }
};
