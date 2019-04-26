const commands = {
  pause(time) {
    this.api.pause(time);
    return this;
  },

  clickChattyMemberThread() {
    return this.waitForElementVisible('@threadForChattyMember', 'Thread for Chatty Member is visible')
      .click('@threadForChattyMember');
  },
};

module.exports = {
  commands: [commands],
  url() {
    return `${this.api.launch_url}/chat`;
  },
  elements: {
    threadForChattyMember: {
      selector: '//SPAN[contains(text(), \'Chatty Member\')]',
      locateStrategy: 'xpath',
    },
  },
};
