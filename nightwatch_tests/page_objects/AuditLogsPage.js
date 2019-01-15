const { colors, noteText, messageAlertText } = require('../constants');

let text = '';

const auditLogsCommands = {

  pause: function (time) {
    this.api.pause(time);
    return this;
  },

  elementText: function (ele, message) {
    return this.getText(ele, function (tpObj) {
      text = tpObj.value;
      console.log(text, message);
    });
  },

  validateUrlChange: function () {
    return this.waitForElementNotPresent('@auditPage', 6000, false, null, 'Audit Logs page opened successfully')
      .verify.urlContains('auditLog') // maybe some timeout issues happening here working as of 9/20/1
      .pause(5000)
  },
}

module.exports = {
  commands: [auditLogsCommands],
  url: function () {
    return this.api.launch_url + '/settings/organization/auditLog'
  },
  elements: {

    //*********------ Page Title -----*********//
    auditPage: {
      selector: `//DIV[@class = 'app-page__header__title'][text()='Audit Log']`,
      locateStrategy: 'xpath',
    },
  }
}
