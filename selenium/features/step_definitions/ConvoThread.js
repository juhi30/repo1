'use strict';

const ConvoThreadPage = require('./page_elements/ConvoThreadPage');

const currentDate = new Date().toString();

module.exports = {
  // inputs a note (of current time/date) and clicks "add"
  leaveTimeDateNote: function leaveTimeDateNote(driver, by, callback) {
    ConvoThreadPage.noteInput(driver, by).sendKeys(currentDate)
    .then(() => ConvoThreadPage.submitNoteButton(driver, by).click())
    .then(() => callback())
    .catch(() => {
      setTimeout(() => leaveTimeDateNote(driver, by, callback), 1000);
    });
  },

  seeTimeDateNote: function seeTimeDateNote(driver, by, callback) {
    driver.getPageSource()
    .then((pageSource) => {
      if (pageSource.includes(currentDate)) {
        callback();
      } else {
        setTimeout(() => seeTimeDateNote(driver, by, callback), 1000);
      }
    }).catch(() => {
      setTimeout(() => seeTimeDateNote(driver, by, callback), 1000);
    });
  },

  clickAddNote: function clickAddNote(driver, by, callback) {
    ConvoThreadPage.addNoteButton(driver, by).click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => clickAddNote(driver, by, callback));
    });
  },
};
