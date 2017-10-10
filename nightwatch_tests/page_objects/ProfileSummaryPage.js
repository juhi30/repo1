const profileSummaryCommands = {
  deleteContact: function() {
    this.waitForElementVisible('@deleteContactButton', 5000, 'Delete button is visible')
      .click('@deleteContactButton')
      .waitForElementVisible('@deleteContactButtonFinal', 5000, 'Final delete button is visible')
      .click('@deleteContactButtonFinal');
  }
}

module.exports = {
  commands: [profileSummaryCommands],
  elements: {
    deleteContactButton: {
      selector: `//BUTTON[@class='button--reset u-text-danger profile__inner__bottom__delete'][text()='Delete Contact']`,
      locateStrategy: 'xpath',
    },

    deleteContactButtonFinal: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Delete Contact']`,
      locateStrategy: 'xpath',
    },
  }
}