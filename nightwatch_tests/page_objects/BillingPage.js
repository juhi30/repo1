const billingCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

}

module.exports = {
  commands: [billingCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/billing'
  },
  elements: {

    contactTab: {
      selector: `//DIV[@class='nav-tabs__item__link'][text()='Contact']`,
      locateStrategy: 'xpath',
    },

    paymentTab: {
      selector: `//DIV[@class='nav-tabs__item__link'][text()='Payment']`,
      locateStrategy: 'xpath',
    },

    historyTab: {
      selector: `//DIV[@class='nav-tabs__item__link'][text()='History']`,
      locateStrategy: 'xpath',
    },

    /*------------------------------------------*/

    firstNameInput: {
      selector: `//INPUT[@id='contactFirstName']`,
      locateStrategy: 'xpath',
    },

    lastNameInput: {
      selector: `//INPUT[@id='contactLastName']`,
      locateStrategy: 'xpath',
    },

    phoneNumberInput: {
      selector: `//INPUT[@id='contactPhone']`,
      locateStrategy: 'xpath',
    },

    emailInput: {
      selector: `//INPUT[@id='contactEmail']`,
      locateStrategy: 'xpath',
    },

    saveBillingButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Billing Contact']`,
      locateStrategy: 'xpath',
    },

    /*------------------------------------------*/

    changePaymentButton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[6]`,
      locateStrategy: 'xpath',
    },

    /*------------------------------------------*/

    pdfFileButton: {
      selector: `//BUTTON[@class='button--reset u-text-primary'][text()='PDF']`,
      locateStrategy: 'xpath',
    },

    closePDFButton: {
      selector: `/html/body/div[4]/div/div[1]/div/button`,
      locateStrategy: 'xpath',
    },

  }
}
