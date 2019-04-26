const profileSummaryCommands = {
  clickEditProfile() {
    return this.waitForElementVisible('@editProfileButton', 'Edit profile button is present')
      .click('@editProfileButton');
  },

  deleteContact() {
    return this.waitForElementVisible('@deleteContactButton', 'Delete button is visible')
      .click('@deleteContactButton')
      .waitForElementVisible('@deleteContactButtonFinal', 'Final delete button is visible')
      .click('@deleteContactButtonFinal');
  },

  seeDeleteToast() {
    return this.waitForElementVisible('@toastSuccessfulDelete', 'Successful deletion toast is visible');
  },

};

module.exports = {
  commands: [profileSummaryCommands],
  elements: {
    editProfileButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Edit Profile\']',
      locateStrategy: 'xpath',
    },

    deleteContactButton: {
      selector: '//BUTTON[@class=\'button--reset u-text-danger profile__inner__bottom__delete\'][text()=\'Delete Contact\']',
      locateStrategy: 'xpath',
    },

    deleteContactButtonFinal: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Delete Contact\']',
      locateStrategy: 'xpath',
    },

    toastSuccessfulDelete: {
      selector: '//DIV[@class=\'toast__text\'][text()=\'Contact successfully deleted.\']',
      locateStrategy: 'xpath',
    },
  },
};
