
const rhinopayCommands = {
  enterPaymentDetails() {
    return this.waitForElementVisible('@nameOnCardInput', 'Payment page is visible')
      .setValue('@nameOnCardInput', process.env.RHINOPAY_CREDIT_CARD_NAME)
      .setValue('@cardNumberInput', process.env.RHINOPAY_CREDIT_CARD_NUMBER)
      .setValue('@expirationDateInput', process.env.RHINOPAY_CREDIT_CARD_EXPIRATION)
      .setValue('@zipcodeInput', process.env.RHINOPAY_CREDIT_CARD_ZIPCODE)
      .setValue('@streetInput', process.env.RHINOPAY_CREDIT_CARD_STREET)
      .setValue('@cvvInput', process.env.RHINOPAY_CREDIT_CARD_CVV)
      .click('@submitPaymentButton');
  },
  rhinopaySuccessMessage() {
    return this.waitForElementVisible('@rhinopaySuccess', 'Payment has been made');
  },

};

module.exports = {
  commands: [rhinopayCommands],
  url() {
    return `${global.NEW_CANARY_RHINOPAY_LINK}`;
  },
  elements: {
    nameOnCardInput: {
      selector: '//INPUT[@name=\'nameOnCard\']',
      locateStrategy: 'xpath',
    },
    cardNumberInput: {
      selector: '//INPUT[@name=\'cardNumber\']',
      locateStrategy: 'xpath',
    },
    expirationDateInput: {
      selector: '//INPUT[@name=\'expirationDate\']',
      locateStrategy: 'xpath',
    },
    zipcodeInput: {
      selector: '//INPUT[@name=\'zipcode\']',
      locateStrategy: 'xpath',
    },
    streetInput: {
      selector: '//INPUT[@name=\'street\']',
      locateStrategy: 'xpath',
    },
    cvvInput: {
      selector: '//INPUT[@name=\'cvv\']',
      locateStrategy: 'xpath',
    },

    rhinopaySuccess: {
      selector: '//P[@class=\'u-text-large\'][text()=\'Your payment has been made.\']',
      locateStrategy: 'xpath',
    },

    submitPaymentButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Submit Payment\']',
      locateStrategy: 'xpath',
    },
  },
};
