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
      .clickCreateTemplateSaveButton();
  },

  'Remove the normal template': function (client) {
    const template = client.page.TemplatesPage();

    helper.clickSpanViaText(template, 'Normal template');

    template.clickEditTemplateButton()
      .clickDeleteButton()
      .clickDeleteFinalButton();

    helper.findTextOnPage(template, 'Template deleted successfully');
  },

  'Create a new template with an attachment < 600KB': function (client) {
    const template = client.page.TemplatesPage();

    template.pause(3000)
      .clickCreateTemplateButton()
      .fillTitleAndMessage('Template w/Attachment', 'This one will be less than 600kb')
      .uploadFile('test_files/sevenkbbuggy.PNG')
      .pause(3000)
      .clickCreateTemplateSaveButton()
      .pause(2000);

    helper.findTextOnPage(template, 'Template created successfully');
  },

  'Remove the template with an attachment': function (client) {
    const template = client.page.TemplatesPage();

    helper.clickSpanViaText(template, 'Template w/Attachment');

    template.clickEditTemplateButton()
      .clickDeleteButton()
      .clickDeleteFinalButton();

    helper.findTextOnPage(template, 'Template deleted successfully');
  }
}
