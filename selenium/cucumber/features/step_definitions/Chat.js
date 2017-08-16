'use strict';

const ChatPage = require('./page_elements/ChatPage');

const currentDate = new Date().toString();

module.exports = {
  chatSearch: function chatSearch(driver, by, name, callback) {
    ChatPage.newChatButton(driver, by).click() // clicking New Chat
    .then(() => ChatPage.newChatSearchInput(driver, by).sendKeys(name)) // enters the name var in the search input
    .then(() => callback())
    .catch(() => {
      setTimeout(() => chatSearch(driver, by, name, callback), 1000);
    });
  },

  chatSearchSelect: function chatSearchSelect(driver, by, callback) {
    ChatPage.newChatSearchResult(driver, by).click() // clicking the result (should equal the name)
    .then(() => callback())
    .catch(() => {
      setTimeout(() => chatSearchSelect(driver, by, callback), 1000);
    });
  },

  sendCurrentDate: function sendCurrentDate(driver, by, callback) {
    ChatPage.chatMessageInput(driver, by).click()
    .then(() => ChatPage.chatMessageInput(driver, by).sendKeys(currentDate))
    .then(() => ChatPage.sendMessageButton(driver, by).click())
    .then(() => callback())
    .catch(() => {
      setTimeout(() => sendCurrentDate(driver, by, callback), 1000);
    });
  },

  clickFirstChatThread: function clickFirstChatThread(driver, by, callback) {
    ChatPage.firstChatThread(driver, by).click() // clicks the first chat thread
    .then(() => callback())
    .catch(() => {
      setTimeout(() => clickFirstChatThread(driver, by, callback), 1000);
    });
  },

  seeChat: function seeChat(driver, by, callback) {
    driver.getPageSource()
    .then((pageSrc) => {
      if (pageSrc.includes(currentDate)) {
        callback();
      } else {
        setTimeout(() => seeChat(driver, by, callback), 1000);
      }
    }).catch(() => {
      setTimeout(() => seeChat(driver, by, callback), 1000);
    });
  },
};
