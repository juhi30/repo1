const commands = {
  pause: function (time) {
    this.api.pause(time);
    return this;
  },

  clickChattyMemberThread: function() {
    return this.waitForElementVisible('@threadForChattyMember', 'Thread for Chatty Member is visible')
      .click('@threadForChattyMember');
  },

  //typeMessage(message)
  //sendMessage()
}

module.exports = {
  commands: [commands],
  url: function() {
    return this.api.launch_url + '/chat'
  },
  elements: {
    threadForChattyMember: {
      selector: `//SPAN[contains(text(), 'Chatty Member')]`,
      locateStrategy: 'xpath'
    }
  }
}