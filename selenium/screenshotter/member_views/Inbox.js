const InboxPage = require('../../page_elements/InboxPage');
const Chat = require('./Chat');
const webdriver = require('selenium-webdriver');

const promise = webdriver.promise;
const flow = promise.controlFlow();

function Inbox(driver, by, waitFor) {
  flow.execute(() => driver.get('https://dev.dev-rhinogram.com/inbox'));
  flow.execute(() => waitFor(InboxPage.firstThread, Chat));
  flow.execute(() => driver.saveScreenshot('inbox_0')); // inbox (initial view)

  flow.execute(() => waitFor(InboxPage.newMessageButton, Chat));
  flow.execute(() => InboxPage.newMessageButton.find(driver, by).click());
  flow.execute(() => waitFor(InboxPage.newMessageSearchInput, Chat));
  flow.execute(() => driver.saveScreenshot('inbox_1')); // new message dropdown

  flow.execute(() => InboxPage.newMessageSearchInput.find(driver, by).sendKeys('Bobby'));
  flow.execute(() => waitFor(InboxPage.firstResultNewMessageSearch, Chat));
  flow.execute(() => driver.saveScreenshot('inbox_2')); // new message search results

  flow.execute(() => Chat(driver, by, waitFor));
}

module.exports = Inbox;
