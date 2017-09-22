module.exports = {
  // commands: [channelsCommands],
  elements: {
    bizHoursOnSelector: {
      selector: `//div[5]/div/div/div/div[2]/div[2]/div/div/div[1]/div/label`,
      locateStrategy: 'xpath'
    },

    bizHoursOffSelector: {
      selector: `//div[5]/div/div/div/div[2]/div[2]/div/div/div[2]/div/input`,
      locateStrategy: 'xpath'
    },

    editChannel: {
      selector: `//div[@class='app-page__container']//button[.='Edit']`,
      locateStrategy: 'xpath'
    },

    saveChannelButton: {
      selector: `//div[@class='modal__footer']//button[.='Save Channel']`,
      locateStrategy: 'xpath'
    },

    closeEditChannelFormButton: {
      selector: `//div[1]/div/div/div/div/div[1]/button`,
      locateStrategy: 'xpath'
    }
  }
};
