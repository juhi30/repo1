const billingCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  validateBillingContactEls: function() {
    return this.waitForElementVisible('@contactTab', 5000, 'Billing Page is visible')
      .verify.visible('@firstNameInput', 'First name input is visible')
      .verify.visible('@lastNameInput', 'last name input is visible')
      .verify.visible('@phoneNumInput', 'Phone Number input is visible')
      .verify.visible('@emailInput', 'Email input is visible')
  },

  validateBillingPaymentEls: function() {
    return this.click('@paymentTab')
      .waitForElementVisible('@changePaymentButton', 5000, 'Payment tab elements are visible')
      .click('@changePaymentButton')
      .waitForElementVisible('@paymentFirstNameInput', 5000, 'first name input is visible')
      .verify.visible('@paymentLastNameInput', 'last name input is visible')
      .verify.visible('@paymentBillingAddInput', 'Billing address input is visible')
      .verify.visible('@paymentCityInput', 'City input is visible')
      .verify.visible('@paymentStateInput', 'State input is visible')
      .verify.visible('@paymentZipInput', 'ZIP code input is visible')
      .verify.visible('@savePaymentButton')

  },

  validateCCEls: function() {
    return this.click('@creditCardRadio')
      .waitForElementVisible('@creditCardNumInput', 5000, 'Credit card input is visible')
      .verify.visible('@expMonth', 'Expiration month is visible')
      .verify.visible('@expYear', 'Expiration year is visible')
      .verify.visible('@cvvInput', 'CVV input is visible')
  },

  validateBankAcctEls: function() {
    return this.click('@bankAcctRadio')
      .waitForElementVisible('@bankNameInput', 5000, 'Bank name input is visible')
      .verify.visible('@bankAcctNumInput', 'Bank account number is visible')
      .verify.visible('@routingNumInput', 'Routing number input is visible')
  },

  validateHistoryEls: function() {
    return this.click('@historyTab')
      .waitForElementVisible('@pdfFileButton', 5000, 'PDF view button is visible')
      .click('@pdfFileButton')
      .waitForElementVisible('@closePDFButton', 5000, 'PDF file is visible')
      .click('@closePDFButton')
  }

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

    /*------------------CONTACT TAB INPUT------------------------*/

    firstNameInput: {
      selector: `//INPUT[@id='contactFirstName']`,
      locateStrategy: 'xpath',
    },

    lastNameInput: {
      selector: `//INPUT[@id='contactLastName']`,
      locateStrategy: 'xpath',
    },

    phoneNumInput: {
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

    /*------------------PAYMENT TAB INPUTS------------------------*/

    changePaymentButton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[6]`,
      locateStrategy: 'xpath',
    },
    creditCardRadio: {
      selector: `//*[@id="app"]/div/div[2]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div[1]/div/label`,
      locateStrategy: 'xpath',
    },
    bankAcctRadio: {
      selector: `//*[@id="app"]/div/div[2]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div[2]/div/label`,
      locateStrategy: 'xpath',
    },
    savePaymentButton: {
      locateStrategy: `//SPAN[@class='button__text-wrapper'][text()='Save Payment Method']`,
      locateStrategy: 'xpath',
    },

    paymentFirstNameInput: {
      selector: `//INPUT[@id='firstName']`,
      locateStrategy: 'xpath',
    },

    paymentLastNameInput: {
      selector: `//INPUT[@id='lastName']`,
      locateStrategy: 'xpath',
    },

    paymentBillingAddInput: {
      selector: `//INPUT[@id='street1']`,
      locateStrategy: 'xpath',
    },

    paymentCityInput: {
      selector: `//INPUT[@id='city']`,
      locateStrategy: 'xpath',
    },

    paymentStateInput: {
      selector: `//INPUT[@id='state']`,
      locateStrategy: 'xpath',
    },

    paymentZipInput: {
      selector: `//INPUT[@id='zip']`,
      locateStrategy: 'xpath',
    },

    /*-----------------CREDIT CARD INPUTS-------------------------*/

    creditCardNumInput: {
      selector: `//INPUT[@id='ccNumber']`,
      locateStrategy: 'xpath',
    },

    expMonth: {
      selector: `//SELECT[@id='ccExpMonth']`,
      locateStrategy: 'xpath',
    },

    expYear: {
      selector: `//SELECT[@id='ccExpYear']`,
      locateStrategy: 'xpath'
    },

    cvvInput: {
      selector: `//INPUT[@id='cardVerificationValue']`,
      locateStrategy: 'xpath',
    },

    /*-----------------BANK ACCT INPUTS-------------------------*/

    bankNameInput: {
      selector: `//INPUT[@id='bankName']`,
      locateStrategy: 'xpath',
    },

    bankAcctNumInput: {
      selector: `//INPUT[@id='bankAccNum']`,
      locateStrategy: 'xpath',
    },

    routingNumInput: {
      selector: `//INPUT[@id='bankRouteNum']`,
      locateStrategy: 'xpath',
    },

    /*-----------------HISTORY TAB ELEMENTS-------------------------*/

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
