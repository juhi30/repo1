const autoResponseCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  validateAutoResponseElements: function() {
    return this.waitForElementVisible('@autoResponseInput', 5000, 'Auto-Response input is visible ready for test')
      .verify.visible('@autoResponseInput', 'Auto-Response text area is visible')
      .verify.visible('@saveAutoResponseButton', 'Save Auto-Response button is visible')
      .verify.visible('@cancelAutoResponseButton', 'Cancel button is visible')
      // .verify.visible('@characterLimitCounter', 'Character limit counter is visible')
      // characterLimitCounter causing error
      .waitForElementVisible('@editEventButton', 5000, 'Edit event button is visible')
      .verify.visible('@deleteEventButton', 'Delete event button is visible')
      .verify.visible('@scheduleEventButton', 'Schedule event button is visible')
      .verify.visible('@firstScheduledEvent', 'First event is visible')
  },

  validateAutoResponsePopupElements: function() {
    return this.waitForElementVisible('@scheduleEventButton', 5000, 'Schedule event button is visible')
      .click('@scheduleEventButton')
      .waitForElementVisible('@submitEventButton', 4000, 'Submit event button on popup is visible')
      .verify.visible('@eventNameInput', 'Event input is visible')
      .verify.visible('@allDayCheckbox', 'All day checkbox is visible')
      .verify.visible('@autoResponseInputInPopup', 'Auto-Response input in popup is visible')
      .verify.visible('@channelsDropdown', 'Channels dropdown tab in popup is visible')
      .click('@channelsDropdown')
      .waitForElementVisible('@firstChannelInDropdown', 5000, 'Wait for first channel')
      .verify.visible('@firstChannelInDropdown', 'First channel in popup is visible')
      .click('@firstChannelInDropdown')
      .verify.visible('@submitEventButton', 'Submit event button in popup is visible')
      .waitForElementVisible('@cancelButtonInNewOOOForm', 5000, 'Cancel button in popup is visible')
      .click('@cancelButtonInNewOOOForm')
  },

  validateDeletePopup: function() {
    return this.waitForElementVisible('@deleteEventButton', 5000, 'Delete event button is visible')
      .click('@deleteEventButton')
      .waitForElementVisible('@closeDeletePopupButton', 5000, 'Delete event popup is visible')
      .verify.visible('@deleteButtonFinal', 'Delete button final is visible')
      .verify.visible('@cancelDeletePopupButton', 'Cancel delete popup button is visible')
      .verify.visible('@closeDeletePopupButton', 'Close delete popup (X) button is visible')
      .click('@closeDeletePopupButton')
  },

  fillInAutoResponse: function(autoResponseText) {
    return this.waitForElementVisible('@autoResponseInput', 5000, 'Input is visible')
      .clearValue('@autoResponseInput')
      .setValue('@autoResponseInput', autoResponseText)
  },

  validateAutoResponseError: function() {
    return this.waitForElementVisible('@autoResponseError', 5000, 'Error prompt is visible')
  },

  submitAutoResponse: function() {
    return this.waitForElementVisible('@saveAutoResponseButton', 5000, 'Save button is visible')
      .click('@saveAutoResponseButton')
  },

  savedPrompt: function() {
    return this.waitForElementVisible('@autoResponseSavedPrompt', 5000, 'Saved prompt is visible')
  },

  fillInOOOEvent: function() {
    return this.waitForElementVisible('@scheduleEventButton', 5000, 'Schedule event button is visible')
      .click('@scheduleEventButton')
      .waitForElementVisible('@channelsDropdown', 5000, 'Channels dropdown is visible')
      .click('@channelsDropdown')
      .click('@firstChannelInDropdown')
      .setValue('@eventNameInput', 'Automated testing created event')
      .click('@allDayCheckbox')
      .waitForElementNotPresent('@fromTimeInput', 5000, 'From time input is not visible')
      .waitForElementNotPresent('@toTimeInput', 5000, 'To time input is not visible')
      .clearValue('@autoResponseInputInPopup')
      .setValue('@autoResponseInputInPopup', 'Hi Im a sentient computer program... ergo... vis a vie...')
      .click('@submitEventButton')
      // .waitForElementVisible('@autoResponseSavedPrompt', 1000, 'Saved prompt is visible')
  },

  validateEditOOOEvent: function() {
    return this.waitForElementVisible('@editEventButton', 5000, 'Edit event button is visible')
      .click('@editEventButton')
      .waitForElementVisible('@scheduleEventPopupSaveButton', 2000, 'Edit OOO event popup visible')
      .click('@cancelButtonInNewOOOForm')
  },

  deleteLastOOOEvent: function() {
    return this.waitForElementVisible('@secondDeleteEventButton', 5000, '2nd Delete event button is visible')
      .click('@secondDeleteEventButton')
      .waitForElementVisible('@deleteButtonFinal', 5000, 'Delete event popup is visible')
      .click('@deleteButtonFinal')
  }
}

module.exports = {
  commands: [autoResponseCommands],
  // url: function() {
  //   return this.api.launch_url + '/settings/organization/auto-response'
  // },
  elements: {

    /*-----------------------------------------------------*/
    // auto response input and buttons elements
    /*-----------------------------------------------------*/

    autoResponseInput: {
      selector: `//TEXTAREA[@id='defaultReply-0cb9105a-b0ae-443a-b73f-66aee8934941']`,
      locateStrategy: 'xpath',
    },
    saveAutoResponseButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Auto-Response']`,
      locateStrategy: 'xpath',
    },
    cancelAutoResponseButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Cancel']`,
      locateStrategy: 'xpath',
    },
    // characterLimitCounter: {
    //   selector: `//DIV[@class='form__character-count']`, //really needed?
    //   locateStrategy: 'xpath',
    // },
    autoResponseError: {
      selector: `//DIV[@class='form__validation-message'][text()='Auto-response must be between 1 and 129 characters.']`,
      locateStrategy: 'xpath',
    },
    autoResponseSavedPrompt: {
      selector:  `//*[@id="js-toasts-container"]/div/div/div`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------*/
    // schedule out of office event elements
    /*-----------------------------------------------------*/

    scheduleEventButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Schedule Event']`,
      locateStrategy: 'xpath',
    },

    firstScheduledEvent: {
      selector: `(//DIV[@class='bucket__header u-flex-justify-between'])[1]`, // xpath using event title container
      locateStrategy: 'xpath',
    },

    editEventButton: {
      selector: `(//BUTTON[@type='button'][text()='Edit'][text()='Edit'])[1]`,
      locateStrategy: 'xpath',
    },

    deleteEventButton: {
      selector: `(//BUTTON[@type='button'][text()='Delete'][text()='Delete'])[1]`,
      locateStrategy: 'xpath',
    },

    secondDeleteEventButton: {
      selector: `(//BUTTON[@type='button'][text()='Delete'][text()='Delete'])[2]`,
      locateStrategy: 'xpath',
      // this element added so test deletes the OOO event it creates as they are listed in order of creation
    },

    // deleteEventPopup: {
    //   selector:`/html/body/div[4]/div/div`,
    //   locateStrategy: 'xpath',
    // },

    deleteButtonFinal: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Delete']`,
      locateStrategy: 'xpath'
    },

    cancelDeletePopupButton: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Cancel'][text()='Cancel'])[2]`,
      locateStrategy: 'xpath',
    },

    closeDeletePopupButton: {
      selector:  `//div[@class='modal__header']/button`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------*/
    // edit schedule event popup elements
    /*-----------------------------------------------------*/

    eventNameInput: {
      selector: `//INPUT[@id='title-4bcfd559-f851-4214-99fa-1e6370fb4843']`,
      locateStrategy: 'xpath',
    },

    fromTimeInput: {
      selector: `//INPUT[@id='from']`,
      locateStrategy: 'xpath',
    },

    toTimeInput: {
      selector: `//SELECT[@id='to']`,
      locateStrategy: 'xpath',
    },

    allDayCheckbox: {
      selector: `//LABEL[@for='closedAllDay'][text()='Office is closed all day']`,
      locateStrategy: 'xpath'
    },

    autoResponseInputInPopup:{
      selector: `//TEXTAREA[@id='message-dd0f7f75-f15c-4c24-a67c-94580d769a0e']`,
      locateStrategy: 'xpath',
    },

    channelsDropdown: {
      selector: `(//INPUT[@type='text'])[4]`,
      locateStrategy: 'xpath'
    },

    firstChannelInDropdown: {
      selector: `(//DIV[@class='dropdown__menu__item__content'])[13]`,
      locateStrategy: 'xpath'
    },

    submitEventButton: {
      selector: `//div[@class='modal__footer']//button[.='Schedule Event']`,
      locateStrategy: 'xpath'
    },

    cancelButtonInNewOOOForm: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Cancel'][text()='Cancel'])[2]`,
      locateStrategy: 'xpath'
    },

    scheduleEventPopupSaveButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Changes']`,
      locateStrategy: 'xpath',
    },

    // closeFormButton: {
    //   selector: `/html/body/div[5]/div/div/div/div[1]/button`,
    //   locateStrategy: 'xpath'
    // }
    // removed because xpath is wonky due to element being an svg
  }
};
