const outOfOfficeCommands = {

  pause: function (time) {
    this.api.pause(time);
    return this;
  },

  validateUrlChange: function () {
    return this.waitForElementVisible('@outOfOfficeTitle', 6000, false, null, 'Out Of Office Page Opened successfully')
      .verify.urlContains('out-of-office', 'Out of Office Page is opened')
      .pause(3000)
  },

  validateCreateOOOEvent: function () {
    return this.waitForElementVisible('@createOOOEventButton', 3000, false, null, 'Create Event Button is visible')
      .click('@createOOOEventButton')
      .waitForElementVisible('@pageHeader', 4000, false, null, 'Out of Office Page opened')
      .setValue('@titleInput', 'Test Event')
      .setValue('@messageTextArea', 'Test Event Sample')
      .clearValue('@fromDateInput')
      .setValue('@fromDateInput', '09/29/2018')
      .clearValue('@toDateInput')
      .setValue('@toDateInput', '09/29/2019')
      .clearValue('@fromTimeInput')
      .setValue('@fromTimeInput', '12:00am')
      .clearValue('@toTimeInput')
      .setValue('@toTimeInput', '11:59pm')     
      .verify.visible('@textChannel1', 'Channel is visible')
      .click('@textChannel1')
      .pause(1000)
  },

  createEvent: function () {
    return this.click('@createEventButton')
      .pause(3000)
      .waitForElementVisible('@eventCreateSuccessMessage','create Success message is visible') 
  },

  editEvent: function(){
    return this.waitForElementVisible('@editOOOEvent', 'Edit Button is visible')
      .click('@editOOOEvent')
      .clearValue('@titleInput')
      .setValue('@titleInput', 'New Test Event')
      .clearValue('@messageTextArea')
      .setValue('@messageTextArea', 'New Test Event Sample')
      .clearValue('@fromDateInput')
      .setValue('@fromDateInput', '10/28/2019')
      .clearValue('@toDateInput')
      .setValue('@toDateInput', '10/28/2020')
      .clearValue('@toTimeInput')
      .setValue('@toTimeInput', '11:00am')
      .clearValue('@fromTimeInput')
      .setValue('@fromTimeInput', '12:00am')
      .click('@addMoreChannelsLinktext')
      .waitForElementVisible('@textChannel2', 'Another Channel is visible')
      .click('@textChannel2')
      .pause(1000)
      .click('@updateEventButton')
      .waitForElementVisible('@eventUpdateSuccessMessage','Event Updated Success message is visible')
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
      .pause(1000)
      .expect.element('@firstOOOEvent').to.not.be.present;
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
      selector: `//SPAN[text()='Edit Event']`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------*/
    // OOO title and message
    /*-----------------------------------------------------*/

    pageHeader: {
      selector: `//DIV[text()='Out of Office']`,
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

    textChannel1: {
      selector: `.//*[@id='app']//div[2]//form/div[3]/div[2]/div/div[1]/div/div/div[1]`,
      locateStrategy: 'xpath',
    },

    textChannel2:{
      selector : `.//*[@id='app']//div[2]//form/div[3]/div[2]/div/div[1]/div/div/div[2]`,
      locateStrategy:'xpath',
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
    },

    addMoreChannelsLinktext : {
      selector:`//SPAN[text()='Add More Channels']`,
      locateStrategy:'xpath',
    },
  },
};
