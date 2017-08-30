'use strict';

const InboxPage = require('./page_elements/InboxPage');

module.exports = {
  clickFirstThread: function clickFirstThread(driver, by, callback) {
    InboxPage.firstThread(driver, by).click() // clicks the top thread
    .then(() => callback())
    .catch(() => {
      setTimeout(() => clickFirstThread(driver, by, callback), 1000);
    });
  },
};
