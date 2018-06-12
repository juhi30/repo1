module.exports = {
  // commands: [newContactCommands],
  elements: {
    closeButton: {
      selector: `//div[@class='cover__footer__container']//button[.='Close']`,
      locateStrategy: 'xpath'
    },
    hipaaConsentCheckbox: {
      selector: `//input[@id='hipaaConsent']`,
      locateStrategy: 'xpath'
    },
  }
};
