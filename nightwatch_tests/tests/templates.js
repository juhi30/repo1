
/*----------------------------------------------------------------------*/

/*----------------------------------------------------------------------*/

module.exports = {

  'Login Page with Correct Credentials': function(client) {
    const login = client.page.LoginPage();

    login.navigate()
      .fillInForm('ntester', 'tester')
      .submit()
      .validateUrlChange()

    client.pause(1000);
  },

  'Navigate to templates page and render elements': function(client) {
    const templates = client.page.TemplatesPage();

    templates.navigate()
      .renderPageElements()
      .clickCreateTemplate()
      .validateCreateTemplatePopup()


    client.pause(1000)
  },

  'Create a new template validate edit popup and delete new template': function(client) {
    const templates = client.page.TemplatesPage();

    templates.clickCreateTemplate()
      .fillOutNewTemplate('auto test created template', 'this should be in the template\'s message body')

    client.pause()  
  }
}
