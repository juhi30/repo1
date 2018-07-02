const outOfOfficeCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
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
    /*-----------------------------------------------------*/

    createOOOEventButton: {
        selector: `//BUTTON[contains(@title, 'Create Out of Office Event')]`,
        locatestrategy: 'xpath'
      },

      firstOOOEvent: {
        selector: `//DIV[@role='button'][1]`, //check this is working only needed to access Edit page
        locatestrategy: 'xpath'
      },

      editOOOEvent: {
        selector: `//SPAN[contains(text(), 'Edit Event')]`,
        locatestrategy: 'xpath'
      },

    /*-----------------------------------------------------*/
    // OOO title and message
    /*-----------------------------------------------------*/

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
      locateStrategy: 'xpath'
    },

    fromTimeInput: {
      selector: `//SELECT[contains(@id, 'fromTime')]`,
      locateStrategy: 'xpath'
    },

    closedAllDayCheck: {
      selector: `//LABEL[contains(text(), 'Office is closed all day')]`,
      locateStrategy: 'xpath'
    },

    toDateInput: {
      selector: `//INPUT[@id='to']`,
      locateStrategy: 'xpath'
    },

    toTimeInput: {
      selector: `//SELECT[contains(@id, 'toTime')]`,
      locateStrategy: 'xpath'
    },

    /*-----------------------------------------------------*/
    // Save, update, and delete buttons
    /*-----------------------------------------------------*/

    createEventButton: {
      selector: `//SPAN[contains(text(), 'Create Event')]`,
      locateStrategy: 'xpath'
    },

    updateEventButton: {
      selector: `//SPAN[contains(text(), 'Update Event')]`,
      locateStrategy: 'xpath'
    },

    trashDeleteIcon: {
      selector: `//SELECT[contains(@title, 'Delete Out of Office Event')]`,
      locateStrategy: 'xpath'
    },

    cancelDeleteButton: {
      selector: `//SPAN[contains(text(), 'Cancel')]`,
      locateStrategy: 'xpath'
    },
    
    finalDeleteButton: {
      selector: `//SPAN[contains(text(), 'Yes, delete event')]`,
      locateStrategy: 'xpath'
    },
  },
};
