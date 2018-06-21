const systemDetailsCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  validatePageElements: function() {
    return this.waitForElementVisible('@rhinoLogoBackButton', 'Rhino Logo is visible')
      .verify.visible('@sytemDetailsTable', 'System details table is visible')
      .verify.visible('@shareWithCCRButton', 'Share with CCR button is visible')
  },

  clickBackToRhinogramLink: function() {
    return this.waitForElementVisible('@backToRhinogramLink', 'Back link is visible')
      .click('@backToRhinogramLink')
      .waitForElementNotPresent('@backToRhinogramLink', 'Link is no longer present')
  },

  clickShareWithCCRButton: function() {
    return this.waitForElementVisible('@shareWithCCRButton', 'Button is visible')
      .click('@shareWithCCRButton')
      .waitForElementNotVisible('@shareWithCCRButton', 'Button is no longer visible')
  }

}

module.exports = {
  commands: [systemDetailsCommands],
  url: function() {
    return this.api.launch_url + '/diagnostics'
  },
  elements: {

    backToRhinogramLink: {
      selector: `//A[contains(@class, 'u-inline-block')]`,
      locateStrategy: 'xpath',
    },

    shareWithCCRButton: {
      selector: `//BUTTON[contains(@type, 'button')]`,
      locateStrategy: 'xpath',
    },
  }
}
