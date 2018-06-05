'use strict';

/*----------------------------------------------------------------------*/

// These tests make sure the templates modal from the conversation thread
// works as intended

/*----------------------------------------------------------------------*/

module.exports = {

  'Login Page with Correct Credentials': function (client) {
    const login = client.page.LoginPage();

    login.navigate().enterMemberCreds().submit().validateUrlChange();

    client.pause(1000);
  },

  'Enter conversation thread by searching for user': function (client) {
    const inbox = client.page.InboxPage();

    inbox.newMessageClick().fillInNewMessageInput('fro').searchResultVisible().clickFirstResult();

    client.pause(1000);
  },

  'Enter templates modal in conversation thread': function (client) {
    const convo = client.page.ConvoThreadPage();
    const temps = client.page.TemplatesPage();

    convo.clickAddFileDropdown().clickUseTemplateChoice().validateTemplateModalEls().useFirstTemplate().clickSendMessage().pause(1000).validateTemplateWasSent();

    client.end(5000);
  }
};