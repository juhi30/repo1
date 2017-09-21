
module.exports = {

  'Login Page with Correct Credentials': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
      .fillInForm('nightTester', 'tester')
      .submit()
      .validateUrlChange()
    //better name for this function needed

  },

  'Inbox Page initial render': function(client) {
    let inbox = client.page.InboxPage();

    inbox.validateInbox()

    client.pause(3000)
    // client.end();
  },

  'Click New Message button to show Search input': function(client) {
    let inbox = client.page.InboxPage();

    inbox.newMessageClick()
      .validateNewMessageInput()
      .newMessageClick()

    client.pause(5000)
  },

  'No search results with one character input': function(client) {
    let inbox = client.page.InboxPage();

    inbox.newMessageClick()
      .fillInNewMessageInput('j')
      .searchResultNotVisible()
      .newMessageClick()
  },

  'No search results with two characters input': function(client) {
    let inbox = client.page.InboxPage();

    inbox.newMessageClick()
      .fillInNewMessageInput('jy')
      .searchResultNotVisible()
      .newMessageClick()

    client.pause(5000)
  },

  'Search results with three characters input': function(client) {
    let inbox = client.page.InboxPage();

    inbox.newMessageClick()
      .fillInNewMessageInput('jyo')
      .searchResultVisible()
      .clickFirstResult()

    client.end()

  },
}