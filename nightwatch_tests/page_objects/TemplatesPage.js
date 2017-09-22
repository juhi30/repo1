module.exports = {
  // commands: [templatesCommands],
  elements: {
    createTemplateButton: {
      selector: `//div[@class='app-page__lead__button-group']//button[.='Create Template']`,
      locateStrategy: 'xpath'
    },
    cancelCreationButton: {
      selector: `//div[5]/div/div/div/div/div[1]/button`,
      locateStrategy: 'xpath'
    },
  }
};
