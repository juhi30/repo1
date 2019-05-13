const testConstants = require('./../toolboxes/feeder.toolbox');

const patientCommands = {
  registerPatient(name, email, password) {
    return this.updateDetails('@patientNameInput', name)
      .updateDetails('@patientEmailInput', email)
      .updateDetails('@patientPassword', password)
      .updateDetails('@patientConfirmPassword', password)
  },

  updateDetails(element, newValue) {
    return this.verify.visible(element, `${element} is visible`)
      .clearValue(element)
      .setValue(element, newValue);
  },

  elementText(ele) {
    let text = '';
    return this.getText(ele, (tpObj) => {
      text = tpObj.value;
      console.log(text, testConstants.rhinosecureMessage);
    });
  },

  verifySentMessage() {
    return this.click('@viewMessageButton')
      .waitForElementVisible('@sentMessage', 'Sent Message is displayed')
      .elementText('@sentMessage');
  },
};

module.exports = {
  commands: [patientCommands],
  url() {
    return `${global.PATIENT_SIGNUP_LINK}`;
  },

  elements: {

    patientNameInput: {
      selector: `//INPUT[contains(@id,\'username\')]`,
      locateStrategy: 'xpath',
    },

    patientEmailInput: {
        selector: `//INPUT[contains(@id,\'loginEmail\')]`,
        locateStrategy: 'xpath',
    },

    patientPassword: {
      selector: `//INPUT[contains(@id,\'password\')]`,
      locateStrategy: 'xpath',
    },

    patientConfirmPassword: {
        selector: `//INPUT[contains(@id,\'passwordConfirmation\')]`,
        locateStrategy: 'xpath',
    },

    viewMessageButton: {
        selector: `//SPAN[@class='button__text-wrapper'][text()='View Message']`,
        locateStrategy: 'xpath',
    },

    sentMessage: {
        selector: `//DIV[contains(@class,'msg--inbound')][last()]`,
        locateStrategy: 'xpath',
    },
  },
};