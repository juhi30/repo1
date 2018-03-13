const systemDetailsCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  validatePageElements: function() {
    return this.waitForElementVisible('@rhinoLogoBackButton', 5000, 'Rhino Logo is visible')
      .verify.visible('@sytemDetailsTable', 'System details table is visible')
      .verify.visible('@shareWithCCRButton', 'Share with CCR button is visible')
  },

  validateMessageToast: function() {
    return this.click('@shareWithCCRButton')
      .waitForElementVisible('@messageToCCRToast', 5000, 'Message to CCR toast is visible')
  },

  leaveSysDetailsPage: function() {
    return this.click('@rhinoLogoBackButton')
      .waitForElementNotPresent('@rhinoLogoBackButton', 5000, 'Rhino logo is no longer present')
  },

}

module.exports = {
  commands: [systemDetailsCommands],
  url: function() {
    return this.api.launch_url + '/diagnostics'
  },
  elements: {

    rhinoLogoBackButton: {
      selector: `//DIV[@class='u-text-muted u-m-t-small u-text-small'][text()='Back to Rhinogram']`,
      locateStrategy: 'xpath',
      // this xpath is a bit brittle when given a chance find a better option
    },

    sytemDetailsTable: {
      selector: `//*[@id="app"]/div/div[2]/div/table`,
      locateStrategy: 'xpath',
    },

    shareWithCCRButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Share with CCR']`,
      locateStrategy: 'xpath',
    },

    messageToCCRToast: {
      selector: `//DIV[@class='alert u-m-t-large alert--success']`,
      locateStrategy: 'xpath',
    },
  }
}
