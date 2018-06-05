'use strict';

/*----------------------------------------------------------------------*/
// These tests check the simple functionality of templating system. They
// render the page elements and make sure all popups and edit forms work
// as they are supposed to
/*----------------------------------------------------------------------*/

module.exports = {

  'Login Page with Correct Credentials': function (client) {
    const login = client.page.LoginPage();

    login.navigate().enterMemberCreds().submit().validateUrlChange();

    client.pause(1000);
  },

  'Navigate to templates page and render elements': function (client) {
    const templates = client.page.TemplatesPage();

    templates.navigate().renderPageElements().validateSMSFilter().pause(1000).validateChannelFilter().clickCreateTemplate().validateCreateTemplatePopup();

    client.pause(1000);
  },

  'Create a new template validate edit popup and delete new template': function (client) {
    const templates = client.page.TemplatesPage();

    templates.clickCreateTemplate().fillOutNewTemplate('auto test created template', 'this should be in the template\'s message body', 'test_files/sevenkbbuggy.PNG').pause(2000).saveNewTemplate().editTemplate().pause(2000).deleteTemplate();

    client.end(5000);
  }
};