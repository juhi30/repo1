'use strict';

const PatientViewPage = require('./page_elements/PatientViewPage');

module.exports = {
  sendMessage: function sendMessage(driver, by, callback) {
    PatientViewPage.messageInput(driver, by).sendKeys('Just a test')
    .then(() => PatientViewPage.sendButton(driver, by).click())
    .then(() => callback())
    .catch(() => {
      setTimeout(() => sendMessage(driver, by, callback), 1000);
    });
  },
};
