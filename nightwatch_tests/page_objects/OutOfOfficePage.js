const outOfOfficeCommands = {

  elementText: function (ele, message) {
    return this.getText(ele, function (tpObj) {
      text = tpObj.value;
      console.log(text, message);
    });
  },

  pause: function (time) {
    this.api.pause(time);
    return this;
  },

  validateUrlChange: function () {
    return this.waitForElementNotPresent('@outOfOfficeTitle', 6000, false, null, 'Out Of Office Page Opened successfully')
      .verify.urlContains('office', 'Page is opened')
      .pause(3000)
  },

  validateCreateEventButton: function () {
    return this.waitForElementVisible('@createOOOEventButton', 3000, false, null, 'Create Event Button is visible')
      .click('@createOOOEventButton')
      .waitForElementVisible('@pageHeader', 4000, false, null, 'Page opened')
      .waitForElementVisible('@titleInput', 3000, false, null, 'Title Input text field is visible')
      .setValue('@titleInput', 'Test Event')
      .setValue('@messageTextArea', 'Test Event Sample')
  },

  selectDate: function (date, value) {
    console.log('Selecting Date');
    this.waitForElementVisible(date, 4000, false, null, 'Date Element is visible')
    return this.clearValue(date)
      .setValue(date, value)
  },

  selectTime: function (time, value) {
    console.log('Selecting Time');
    this.waitForElementVisible(time, 4000, false, null, 'Time Element is visible')
    return this.clearValue(time)
      .setValue(time, value)
  },

  createEvent: function () {
    return this.verify.visible('@textChannel', 'Channel is visible')
      .click('@textChannel')
      .pause(1000)
      .click('@createEventButton')
      .pause(3000)
      .waitForElementVisible('@eventCreateSuccessMessage','create Success message is visible') 
  },

  deleteEvent: function () {
    return this.waitForElementVisible('@editOOOEvent', 'Edit Button is visible')
      .click('@editOOOEvent')
      .waitForElementVisible('@trashDeleteIcon', 'Delete Element is visible')
      .click('@trashDeleteIcon')
      .waitForElementVisible('@cancelDeleteButton', 'cancel button is visible')
      .waitForElementVisible('@finalDeleteButton', 'Delete Event button is visible')
      .click('@finalDeleteButton')
      .waitForElementVisible('@eventDeletionSuccessMessage','deletion Success message is visible')
  }, 
  
}

module.exports = {
  commands: [outOfOfficeCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/out-of-office';
  },
  elements: {
    /*-----------------------------------------------------*/
    // OOO list view
    /*----------------------------------------------------*/

    outOfOfficeTitle: {
      selector: `//DIV[text()='Out of Office']`,
      locateStrategy: 'xpath',
    },

    createOOOEventButton: {
      selector: `//BUTTON[contains(@title, 'Create Out of Office Event')]`,
      locateStrategy: 'xpath',
    },

    firstOOOEvent: {
      selector: `//DIV[@role='button'][1]`, //check this is working only needed to access Edit page
      locateStrategy: 'xpath',
    },

    editOOOEvent: {
      selector: `//SPAN[contains(text(), 'Edit Event')]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------*/
    // OOO title and message
    /*-----------------------------------------------------*/

    pageHeader: {
      selector: `//DIV[@class='app-page__header']`,
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

    textChannel: {
      selector: `.//*[@id='app']//div[2]//form/div[3]/div[2]/div/div[1]/div/div/div[1]`,
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

    eventCreateSuccessMessage : {
      selector: `//DIV[text()='Out of Office created successfully.']`,
      locateStrategy:'xpath',
    },

    eventUpdateSuccessMessage :{
      selector:`//DIV[text()='Out of Office updated successfully.']`,
      locateStrategy:'xpath',
    },

    eventDeletionSuccessMessage :{
      selector:`//DIV[text()='Out of Office deleted successfully.']`,
      locateStrategy:'xpath',
    }
  },
};
