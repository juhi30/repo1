const commands = {

};

module.exports = {
  commands: [commands],
  url() {
    return `${this.api.launch_url}/inbox/direct`;
  },

  elements: {
    // not much to see here yet kid

    SelectionDropDown: {
      selector: '//*[@class=\'icon dropdown__toggle__caret icon--small\']',
      locateStrategy: 'xpath',
    },

    SelectionOption: {
      selector: '//*[@class=\'u-text-overflow\']',
      locateStrategy: 'xpath',
    },

    patientInboxPageTitle: {
      selector: '//*[contains(text(),\'Patient - \')]',
      locateStrategy: 'xpath',
    },
  },
};
