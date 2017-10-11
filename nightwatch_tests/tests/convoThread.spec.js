
/*--------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------*/

module.exports = {

  'Login Page with Correct Credentials': function(client) {
    const login = client.page.LoginPage();

    login.navigate()
      .fillInForm('ntester', 'tester')
      .submit()
      .validateUrlChange();

    client.pause(1000)
  },

  'Search results with three characters input': function(client) {
    const inbox = client.page.InboxPage();

    inbox.newMessageClick()
      .fillInNewMessageInput('fro')
      .searchResultVisible()
      .clickFirstResult();

    client.pause(1000);
  },

  'Validate conversation thread page elements': function(client) {
    const convo = client.page.ConvoThreadPage();

    convo.validatePageElements()

    client.pause(1000)
  },

  'Add message and add note and test communication filter is working': function(client) {
    const convo = client.page.ConvoThreadPage();

    convo.addMessagesToThread('Why\'d you even rope me into this?!')
      .pause(500)// pause added to let the send button to become active after text added
      .clickSendMessage()
      .pause(500)
      .addNoteToThread('Wubba lubba dub dub!')
      .pause(1000)
      .validateNotesFilter()
      .pause(1000)
      .validateAllComsFilter()

    client.pause(1000)
  },
  'Validate search function on conversation thread': function(client) {
    const convo = client.page.ConvoThreadPage();

    convo.clickSearchButton()
      .searchMessageThread('i may not be able to carry the ring but at least i can carry you!')

    client.pause(1000)
  },

  'Render validate To/From channel dropdowns': function(client) {
    const convo = client.page.ConvoThreadPage();

    convo.validateMessageTo()
      .pause(500)
      .validateMessageFrom()

    client.pause(1000)
  },

  'Render and validate Add file dropdown options': function(client) {
    const convo = client.page.ConvoThreadPage();

    convo.clickAddFileButton()
      .useHIPAATemplate()

    client.end(5000)
  }
}
