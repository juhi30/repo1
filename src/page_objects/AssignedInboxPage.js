const messageFeeder = require('../feeder/message.feeder');

const commands = {


};

module.exports = {
  commands: [commands],
  url() {
    return `${this.api.launch_url}/inbox`;
  },
  elements: {
    assignedToMePageTitle: {
      selector: '//DIV[contains(@class, \'bulk-action__header__title\')]',
      locateStrategy: 'xpath',
    },

    assignedThread: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(text(),${messageFeeder.directChatMessage})]`,
      locateStrategy: 'xpath',
    },
  },
};
