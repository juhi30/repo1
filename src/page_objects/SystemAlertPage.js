const systemAlertCommands = {

  pause(time) {
    this.api.pause(time);
    return this;
  },
};

module.exports = {
  commands: [systemAlertCommands],

  url() {
    return `${this.api.launch_url}/inbox`;
  },

  elements: {

    enableSysAlertToggle: {
      selector: '//LABEL[contains(@for, \'active\')]',
      locateStrategy: 'xpath',
    },

    messageTextArea: {
      selector: '//INPUT[contains(@id, \'alertMessage\')]',
      locateStrategy: 'xpath',
    },

    urlInput: {
      selector: '//INPUT[contains(@id, \'url\')]',
      locateStrategy: 'xpath',
    },

    typeDropdown: {
      selector: '//SELECT[contains(@id, \'alertType\')]',
      locateStrategy: 'xpath',
    },

    urlTextInput: {
      selector: '//INPUT[contains(@id, \'urlText\')]',
      locateStrategy: 'xpath',
    },

    saveAlertButton: {
      selector: '//BUTTON[contains(text(), \'Save Alert\')]',
      locateStrategy: 'xpath',
    },
  },
};
