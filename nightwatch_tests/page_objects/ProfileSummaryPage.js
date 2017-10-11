const profileSummaryCommands = {
  clickEditProfile: function() {
    return this.waitForElementVisible('@editProfileButton', 5000, 'Edit profile button is present')
      .click('@editProfileButton');
  },

  deleteContact: function() {
    return this.waitForElementVisible('@deleteContactButton', 5000, 'Delete button is visible')
      .click('@deleteContactButton')
      .waitForElementVisible('@deleteContactButtonFinal', 5000, 'Final delete button is visible')
      .click('@deleteContactButtonFinal');
  },

  seeDeleteToast: function() {
    return this.waitForElementVisible('@toastSuccessfulDelete', 5000, 'Successful deletion toast is visible');
  }
}

module.exports = {
  commands: [profileSummaryCommands],
  elements: {
    editProfileButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Edit Profile']`,
      locateStrategy: 'xpath',
    },

    deleteContactButton: {
      selector: `//BUTTON[@class='button--reset u-text-danger profile__inner__bottom__delete'][text()='Delete Contact']`,
      locateStrategy: 'xpath',
    },

    deleteContactButtonFinal: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Delete Contact']`,
      locateStrategy: 'xpath',
    },

    toastSuccessfulDelete: {
      selector: `//DIV[@class='toast__text'][text()='Contact successfully deleted.']`,
      locateStrategy: 'xpath',
    },
  }
}