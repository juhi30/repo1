const outOfOfficeCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  updateDetails: function(element, newValue) {
    return this.verify.visible(element, element + ' is visible')
      .clearValue(element)
      .setValue(element, newValue)
  },

  validateUrlChange: function() {
    return this.waitForElementVisible('@outOfOfficeListPageTitle', 6000, false, null, 'Out Of Office Page Opened successfully')
      .verify.urlContains('out-of-office', 'Out of Office Page is opened')
      .pause(3000)
  },

  verifyCreateOOOEventButton: function() {
    return this.waitForElementVisible('@addOOOEventButton', 3000, false, null, 'Add Event Button is visible')
  },

  openOOOPage: function(element1, element2) {
    return this.click(element1)
      .waitForElementVisible(element2, 6000, false, null, 'Out of Office Page opened')
  },

  selectChannel: function() {
    return this.verify.visible('@firstTextChannel', 'Channel is visible')
      .click('@firstTextChannel')
      .pause(1000)
  },

  submit: function(element, notification) {
    return this.click(element)
      .waitForElementVisible(notification, 'Success message is visible')
      .pause(3000)
  },

  deleteEvent: function() {
    return this.waitForElementVisible('@trashDeleteIcon', 'Delete Element is visible')
      .click('@trashDeleteIcon')
      .waitForElementVisible('@cancelDeleteButton', 'cancel button is visible')
      .waitForElementVisible('@finalDeleteButton', 'Delete Event button is visible')
      .click('@finalDeleteButton')
      .waitForElementVisible('@eventDeletionSuccessMessage', 'deletion Success message is visible')
      .pause(1000)
      .expect.element('@firstOOOEvent').to.not.be.present;
  }
}

module.exports = {
  commands: [outOfOfficeCommands],
  url: function () {
    return this.api.launch_url + '/settings/organization/out-of-office';
  },
  elements: {
    /*-----------------------------------------------------*/
    // OOO list view
    /*----------------------------------------------------*/

    outOfOfficeListPageTitle: {
      selector: `//DIV[text()='Out of Office']`,
      locateStrategy: 'xpath',
    },

    addOOOEventButton: {
      selector: `//BUTTON[(@title='Create Out of Office Event')]`,
      locateStrategy: 'xpath',
    },

    firstOOOEvent: {
      selector: `//DIV[@role='button'][1]`, //check this is working only needed to access Edit page
      locateStrategy: 'xpath',
    },

    editOOOEvent: {
      selector: `//SPAN[text()='Edit Event']`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------*/
    // OOO title and message
    /*-----------------------------------------------------*/

    createEventPageHeader: {
      selector: `//DIV[text()='Create Out of Office Event']`,
      locateStrategy: 'xpath',
    },

    editEventPageHeader: {
      selector: `//DIV[text()='Edit Out of Office Event']`,
      locateStrategy: 'xpath',
    },

    titleInput: {
      selector: `//INPUT[contains(@id, 'title')]`,
      locateStrategy: 'xpath',
    },

    messageTextArea: {
      selector: `//TEXTAREA[contains(@id, 'message')]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------*/
    // Dates for OOO message
    /*-----------------------------------------------------*/

    fromDateInput: {
      selector: `//INPUT[@id='from']`,
      locateStrategy: 'xpath',
    },

    fromTimeInput: {
      selector: `//SELECT[contains(@id, 'fromTime')]`,
      locateStrategy: 'xpath',
    },

    closedAllDayCheck: {
      selector: `//LABEL[contains(text(), 'Office is closed all day')]`,
      locateStrategy: 'xpath',
    },

    toDateInput: {
      selector: `//INPUT[@id='to']`,
      locateStrategy: 'xpath',
    },

    toTimeInput: {
      selector: `//SELECT[contains(@id, 'toTime')]`,
      locateStrategy: 'xpath',
    },

    channels: {
      selector: `//DIV[@role='button']`,
      locateStrategy: 'xpath'
    },

    //Need unique identifier
    firstTextChannel: {
      selector: `(//DIV[@role='button'])[1]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------*/
    // Save, update, and delete buttons
    /*-----------------------------------------------------*/

    createEventButton: {
      selector: `//SPAN[contains(text(), 'Create Event')]`,
      locateStrategy: 'xpath',
    },

    updateEventButton: {
      selector: `//SPAN[contains(text(), 'Update Event')]`,
      locateStrategy: 'xpath',
    },

    trashDeleteIcon: {
      selector: `//BUTTON[@title='Delete Out of Office Event']`,
      locateStrategy: 'xpath',
    },

    cancelDeleteButton: {
      selector: `//SPAN[contains(text(), 'Cancel')]`,
      locateStrategy: 'xpath',
    },

    finalDeleteButton: {
      selector: `//SPAN[contains(text(), 'Yes, delete event')]`,
      locateStrategy: 'xpath',
    },

    eventCreateSuccessMessage: {
      selector: `//DIV[text()='Out of Office created successfully.']`,
      locateStrategy: 'xpath',
    },

    eventUpdateSuccessMessage: {
      selector: `//DIV[text()='Out of Office updated successfully.']`,
      locateStrategy: 'xpath',
    },

    eventDeletionSuccessMessage: {
      selector: `//DIV[text()='Out of Office deleted successfully.']`,
      locateStrategy: 'xpath',
    },

    editedTitle: {
      selector: `//SPAN[text()='Edited_Title']`,
      locateStrategy: 'xpath',
    },
  }
};
