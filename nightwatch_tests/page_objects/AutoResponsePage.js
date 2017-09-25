const autoResponseCommands = {

  validateAutoResponseElements: function() {
    return this.waitForElementVisible('body', 500, 'Body is visible ready for test')
      .verify.visible('@autoResponseInput', 'Auto-Response text area is visible')
      .verify.visible('@saveAutoResponseButton', 'Save Auto-Response button is visible')
      .verify.visible('@cancelAutoResponseButton', 'Cancel button is visible')
      .verify.visible('@characterLimitCounter', 'Character limit counter is visible')
      .verify.visible('@scheduleEventButton', 'Schedule event button is visible')
      .verify.visible('@firstScheduledEvent', 'First event is visible')
      .verify.visible('@editEventButton', 'Edit event button is visible')
      .verify.visible('@deleteEventButton', 'Delete event button is visible')
  },

  validateAutoResponsePopupElements: function() {
    return this.click('@scheduleEventButton')
      .waitForElementVisible('@scheduleEventPopup', 1000, 'Schedule event popup is visible')
      .verify.visible('@eventNameInput', 'Event input is visible')
      .verify.visible('@allDayCheckbox', 'All day checkbox is visible')
      .verify.visible('@autoResponseInputInPopup', 'Auto-Response input in popup is visible')
      .verify.visible('@channelsDropdown', 'Channels dropdown tab in popup is visible')
      .click('@channelsDropdown')
      .waitForElementVisible('@firstChannelInDropdown', 1000, 'Wait for first channel')
      .verify.visible('@firstChannelInDropdown', 'First channel in popup is visible')
      .verify.visible('@submitEventButton', 'Submit event button in popup is visible')
      .verify.visible('@cancelButtonInNewOOOForm', 'Cancel button in popup is visible')
      .verify.visible('@closeFormButton', 'Close form (X) button is visible')
  },

  validateDeletePopup: function() {
    return this.click('@deleteEventButton')
      .waitForElementVisible('@deleteEventPopup', 1000, 'Delete event popup is visible')
      .verify.visible('@deleteButtonFinal', 'Delete button final is visible')
      .verify.visible('@cancelDeletePopupButton', 'Cancel delete popup button is visible')
      .verify.visible('@closeDeletePopupButton', 'Close delete popup (X) button is visible')
  }
}

module.exports = {
  commands: [autoResponseCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/auto-response'
  },
  elements: {

    /*-----------------------------------------------------*/
    // auto response input and buttons elements
    /*-----------------------------------------------------*/

    autoResponseInput: {
      selector: `//*[@id="defaultReply"]`,
      locateStrategy: 'xpath',
    },
    saveAutoResponseButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[3]/div/button[2]`,
      locateStrategy: 'xpath',
    },
    cancelAutoResponseButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[3]/div/button[1]`,
      locateStrategy: 'xpath',
    },
    characterLimitCounter: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[2]/div/div/text()`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------*/
    // schedule out of office event elements
    /*-----------------------------------------------------*/

    scheduleEventButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[4]/div/div[2]/div/button`,
      locateStrategy: 'xpath',
    },

    firstScheduledEvent: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[5]/div`,
      locateStrategy: 'xpath',
    },

    editEventButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[5]/div/div[1]/div[2]/button[1]`,
      locateStrategy: 'xpath',
    },

    deleteEventButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[5]/div/div[1]/div[2]/button[2]`,
      locateStrategy: 'xpath',
    },

    deleteEventPopup: {
      selector:`/html/body/div[4]/div/div/div`,
      locateStrategy: 'xpath',
    },

    deleteButtonFinal: {
      selector: `//div[@class='modal__footer']//button[.='Delete']`,
      locateStrategy: 'xpath'
    },

    cancelDeletePopup: {
      selector: `/html/body/div[4]/div/div/div/div[3]/div/button[1]`,
      locateStrategy: 'xpath',
    },

    closeDeletePopupButton: {
      selector:  `/html/body/div[4]/div/div/div/div[1]/button`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------*/
    // schedule event popup elements
    /*-----------------------------------------------------*/

    scheduleEventPopup: {
      selector: `/html/body/div[5]/div/div/div`,
      locateStrategy: 'xpath',
    },

    eventNameInput: {
      selector: `//input[@id='title']`,
      locateStrategy: 'xpath',
    },

    allDayCheckbox: {
      selector: `//*[@id="allDayOOO"]`,
      locateStrategy: 'xpath'
    },

    autoResponseInputInPopup:{
      selector: `//*[@id="message"]`,
      locateStrategy: 'xpath',
    },

    channelsDropdown: {
      selector: `//div[@class='form']/div[5]/span[2]/div/input`,
      locateStrategy: 'xpath'
    },

    firstChannelInDropdown: {
      selector: `//div[@class='form']/div[5]/span[2]/div/div/div/div[1]/a/div`,
      locateStrategy: 'xpath'
    },

    submitEventButton: {
      selector: `//div[@class='modal__footer']//button[.='Schedule Event']`,
      locateStrategy: 'xpath'
    },

    cancelButtonInNewOOOForm: {
      selector: `//div[@class='modal__footer']//button[.='Cancel']`,
      locateStrategy: 'xpath'
    },

    closeFormButton: {
      selector: `/html/body/div[5]/div/div/div/div[1]/button/svg/use`,
      locateStrategy: 'xpath'
    }
  }
};
