'use strict';

const billingCommands = {

  pause: function (time) {
    this.api.pause(time);
    return this;
  },

  validateContactEls: function () {
    return this.waitForElementVisible('@contactTab', 5000, 'Billing Page is visible').verify.visible('@firstNameInput', 'First name input is visible').verify.visible('@lastNameInput', 'last name input is visible').verify.visible('@phoneNumInput', 'Phone Number input is visible').verify.visible('@emailInput', 'Email input is visible');
  },

  fillInContactForm: function (firstName, lastName, phoneNum, email) {
    return this.clearValue('@firstNameInput').setValue('@firstNameInput', firstName).clearValue('@lastNameInput').setValue('@lastNameInput', lastName).clearValue('@phoneNumInput').setValue('@phoneNumInput', phoneNum).clearValue('@emailInput').setValue('@emailInput', email).click('@saveBillingContactButton');
  },

  validatePaymentEls: function () {
    return this.waitForElementPresent('@paymentTab', 5000, 'Payment tab is visible').click('@paymentTab').waitForElementVisible('@changePaymentButton', 5000, 'Payment tab elements are visible').click('@changePaymentButton').waitForElementVisible('@paymentFirstNameInput', 5000, 'first name input is visible').verify.visible('@paymentLastNameInput', 'last name input is visible').verify.visible('@paymentBillingAddInput', 'Billing address input is visible').verify.visible('@paymentCityInput', 'City input is visible').verify.visible('@paymentStateInput', 'State input is visible').verify.visible('@paymentZipInput', 'ZIP code input is visible').verify.visible('@savePaymentButton', 'Save Payment Button is visible');
  },

  validateCCEls: function () {
    return this.click('@creditCardRadio').waitForElementVisible('@creditCardNumInput', 5000, 'Credit card input is visible').verify.visible('@expMonth', 'Expiration month is visible').verify.visible('@expYear', 'Expiration year is visible').verify.visible('@cvvInput', 'CVV input is visible');
  },

  validateBankAcctEls: function () {
    return this.click('@bankAcctRadio').waitForElementVisible('@bankNameInput', 5000, 'Bank name input is visible').verify.visible('@bankAcctNumInput', 'Bank account number is visible').verify.visible('@routingNumInput', 'Routing number input is visible');
  },

  fillInPaymentMethod: function (firstName, lastName, billingAdd, city, state, zip) {
    return this.waitForElementVisible('@paymentFirstNameInput', 5000, 'First name input is visible').clearValue('@paymentFirstNameInput').setValue('@paymentFirstNameInput', firstName).clearValue('@paymentLastNameInput').setValue('@paymentLastNameInput', lastName).clearValue('@paymentBillingAddInput').setValue('@paymentBillingAddInput', billingAdd).clearValue('@paymentCityInput').setValue('@paymentCityInput', city).clearValue('@paymentStateInput').setValue('@paymentStateInput', state).clearValue('@paymentZipInput').setValue('@paymentZipInput', zip);
  },

  fillInCreditCardForm: function () {
    return this.waitForElementVisible('@creditCardRadio', 5000, 'Payment radios are visible').click('@creditCardRadio').waitForElementVisible('@creditCardNumInput', 5000, 'credit card inputs visible').clearValue('@creditCardNumInput').setValue('@creditCardNumInput', 4111111111111111).setValue('@expMonth', 'December').setValue('@expYear', 2020).setValue('@cvvInput', 123);
  },

  fillInBankAcctForm: function () {
    return this.waitForElementVisible('@creditCardRadio', 5000, 'Payment radios are visible').click('@bankAcctRadio').waitForElementVisible('@bankNameInput', 5000, 'Bank account inputs visible').clearValue('@bankNameInput').setValue('@bankNameInput', 'Best Bank').setValue('@bankAcctNumInput', 111111111121);
    // .setValue('@routingNumInput', 021000089)
  },

  savePaymentMethod: function () {
    return this.waitForElementVisible('@savePaymentButton', 5000, 'Save payment button is visible').click('@savePaymentButton');
  },

  changePaymentMethod: function () {
    return this.waitForElementVisible('@changePaymentButton', 5000, 'change payment button is visible').click('@changePaymentButton');
  },

  validateHistoryEls: function () {
    return this.click('@historyTab').waitForElementVisible('@pdfFileButton', 5000, 'PDF view button is visible').click('@pdfFileButton').waitForElementVisible('@closePDFButton', 5000, 'PDF file is visible').click('@closePDFButton');
  }

};

const BillingPage = {
  commands: [billingCommands],
  url: function () {
    return this.api.launch_url + '/settings/organization/billing';
  },
  elements: {

    contactTab: {
      selector: `//DIV[@class='nav-tabs__item__link'][text()='Contact']`,
      locateStrategy: 'xpath'
    },

    paymentTab: {
      selector: `//DIV[@class='nav-tabs__item__link'][text()='Payment']`,
      locateStrategy: 'xpath'
    },

    historyTab: {
      selector: `//DIV[@class='nav-tabs__item__link'][text()='History']`,
      locateStrategy: 'xpath'
    },

    /*------------------CONTACT TAB INPUT------------------------*/

    firstNameInput: {
      selector: `//INPUT[@id='contactFirstName']`,
      locateStrategy: 'xpath'
    },

    lastNameInput: {
      selector: `//INPUT[@id='contactLastName']`,
      locateStrategy: 'xpath'
    },

    phoneNumInput: {
      selector: `//INPUT[@id='contactPhone']`,
      locateStrategy: 'xpath'
    },

    emailInput: {
      selector: `//INPUT[@id='contactEmail']`,
      locateStrategy: 'xpath'
    },

    saveBillingContactButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Billing Contact']`,
      locateStrategy: 'xpath'
    },

    /*------------------PAYMENT TAB INPUTS------------------------*/

    paymentTypeListed: {
      selector: `(//LI[@class=''])[1]`,
      locateStrategy: 'xpath'
    },

    changePaymentButton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[6]`,
      locateStrategy: 'xpath'
    },

    creditCardRadio: {
      selector: `//*[@id="app"]/div/div[2]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div[1]/div/label`,
      locateStrategy: 'xpath'
    },

    bankAcctRadio: {
      selector: `//*[@id="app"]/div/div[2]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div[2]/div/label`,
      locateStrategy: 'xpath'
    },

    savePaymentButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Payment Method']`,
      locateStrategy: 'xpath'
    },

    paymentFirstNameInput: {
      selector: `//INPUT[@id='firstName']`,
      locateStrategy: 'xpath'
    },

    paymentLastNameInput: {
      selector: `//INPUT[@id='lastName']`,
      locateStrategy: 'xpath'
    },

    paymentBillingAddInput: {
      selector: `//INPUT[@id='street1']`,
      locateStrategy: 'xpath'
    },

    paymentCityInput: {
      selector: `//INPUT[@id='city']`,
      locateStrategy: 'xpath'
    },

    paymentStateInput: {
      selector: `//INPUT[@id='state']`,
      locateStrategy: 'xpath'
    },

    paymentZipInput: {
      selector: `//INPUT[@id='zip']`,
      locateStrategy: 'xpath'
    },

    /*-----------------CREDIT CARD INPUTS-------------------------*/

    creditCardNumInput: {
      selector: `//INPUT[@id='ccNumber']`,
      locateStrategy: 'xpath'
    },

    expMonth: {
      selector: `//SELECT[@id='ccExpMonth']`,
      locateStrategy: 'xpath'
    },

    expYear: {
      selector: `//SELECT[@id='ccExpYear']`,
      locateStrategy: 'xpath'
    },

    cvvInput: {
      selector: `//INPUT[@id='cardVerificationValue']`,
      locateStrategy: 'xpath'
    },

    /*-----------------BANK ACCT INPUTS-------------------------*/

    bankNameInput: {
      selector: `//INPUT[@id='bankName']`,
      locateStrategy: 'xpath'
    },

    bankAcctNumInput: {
      selector: `//INPUT[@id='bankAccNum']`,
      locateStrategy: 'xpath'
    },

    routingNumInput: {
      selector: `//INPUT[@id='bankRouteNum']`,
      locateStrategy: 'xpath'
    },

    /*-----------------HISTORY TAB ELEMENTS-------------------------*/

    pdfFileButton: {
      selector: `//BUTTON[@class='button--reset u-text-primary'][text()='PDF']`,
      locateStrategy: 'xpath'
    },

    closePDFButton: {
      selector: `/html/body/div[4]/div/div[1]/div/button`,
      locateStrategy: 'xpath'
    }
  }
};

module.exports = BillingPage;