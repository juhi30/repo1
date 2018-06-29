const inboxCommands = {
  pause: function(time) {
    this.api.pause(time);
    return this;
  },
  // this is just an example of how well specify threads to click on in the future
  clickGeoffreyMaasThread: function() {
    return this.waitForElementVisible('@geoffreyMaasThread', 'Send message button is visible')
      .click('@geoffreyMaasThread');
  },

  fillInMessageInput: function(text) {
    return this.waitForElementVisible('@messageInput', 'Message input is visible')
      .setValue('@messageInput', text);
  },

}

module.exports = {
  commands: [inboxCommands],
  // url: 'https://dev.dev-rhinogram.com/chat', This page object is not specific (it applies to both Patient Messaging and Chat)
  elements: {
    geoffreyMaasThread: {
      selector: `//SPAN[contains(.,'Geoffrey Maas')]`,
      locateStrategy: 'xpath'
    },

    newButton: {
      selector: `//BUTTON[contains(@title, 'Add New Contact')]`,
      locateStrategy: 'xpath'
    },

    /* 
      depending on the context of the inbox (chat or patient messages) the input from clicking the + button will be different
    */

    // not the global search
    patientMessagesSearchInput: {
      selector: `//INPUT[contains(@name, 'nonMembers')]`,
      locateStrategy: 'xpath'
    },

    // not the global search
    chatSearchInput: {
      selector: `//INPUT[contains(@name, 'members')]`,
      locateStrategy: 'xpath'
    },

    // searchResult: {
    //   selector: `//SPAN[contains(.,'')]`
    // }
  }
};
