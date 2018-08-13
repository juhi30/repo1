const helper = require('../../helpers');

module.exports = {
  'Login as a member': function (client) {
    const login = client.page.LoginPage();

    login.navigate()
      .enterMemberCreds('nightkeaton', 'Chacoz123')
      .submit()
      .validateUrlChange()
  },

  'On the templates page, create a new template': function (client) {
    const template = client.page.TemplatesPage();

    template.navigate()
      .clickCreateTemplateButton()
      .fillTitleAndMessage('Normal template', 'Just a regular template with a regular template message')
      .clickCreateTemplateSaveButton()
  },

  'Remove that template': function (client) {
    const template = client.page.TemplatesPage();

    template.deleteSpecificTemplate('Normal template')
      .pause(2000); // giving time for the success toast to render
    helper.findTextOnPage(template, 'Template deleted successfully');
  }

  // 'Create a new template with an attachment < 600KB': function (client) {
  //   // do stuff
  // },

  // 'Edit that template with an attachment > 600 KB': function (client) {
  //   // do stuff
  // },

  // 'Remove that template': function (client) {
  //   // do stuff
  // }
}
