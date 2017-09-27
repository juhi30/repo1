/*--------------------------------------------------------------------------------------------------------*/

// Auto-Response page testing the elements rendering and interaction. Creates and deletes a new out of office
// event as well

/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

  //Logs into app to start tests
  'Login Page with Correct Credentials': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .fillInForm('ntester', 'tester')
      .submit()
      .validateUrlChange()
  },

  'Render Auto-Response page and popup elements': function(client) {
    const autoResponse = client.page.AutoResponsePage();

    autoResponse.navigate()
      .validateAutoResponseElements()
      .validateAutoResponsePopupElements()
      .navigate()
      // navigate added due to not finding second popup(modal) after first fires
      .validateDeletePopup()

    client.pause(1000);
  },

  'Try auto-response with a too long input': function(client) {
    const autoResponse = client.page.AutoResponsePage();

    autoResponse.navigate()
      .fillInAutoResponse('I am a the very model of a modern individual. I am animated, something-ated something sometihginsomething somethign else one more thing')
      .submitAutoResponse()
      .validateAutoResponseError()

    client.pause(1000)
  },

  'Save a new auto-response': function(client) {
    const autoResponse = client.page.AutoResponsePage();

    autoResponse.navigate()
      .fillInAutoResponse('Auto Response TEST!!!')
      .submitAutoResponse()
      .savedPrompt()

    client.pause(1000)
  },

  'Schedule a new out of office event': function(client) {
    const autoResponse = client.page.AutoResponsePage();

    autoResponse.navigate()
      .fillInOOOEvent()

    client.pause(1000)
  },

  'Render edit then delete OOO event': function(client) {
    const autoResponse = client.page.AutoResponsePage();

    autoResponse.navigate()
      .validateEditOOOEvent()
      .navigate()
      .deleteLastOOOEvent()
      .savedPrompt()

    client.end(5000)
  }

}
