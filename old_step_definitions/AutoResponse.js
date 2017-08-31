'use strict';

const AutoResponsePage = require('./page_elements/AutoResponsePage');

module.exports = {
  nameEvent: function nameEvent(driver, by, eventName, callback) {
    AutoResponsePage.eventNameInput(driver, by).sendKeys(eventName)
    .then(() => callback())
    .catch(() => {
      setTimeout(() => nameEvent(driver, by, eventName, callback), 1000);
    });
  },

  clickAllDay: function clickAllDay(driver, by, callback) {
    AutoResponsePage.allDayCheckbox(driver, by).click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => clickAllDay(driver, by, callback), 1000);
    });
  },

  selectFirstChannel: function selectFirstChannel(driver, by, callback) {
    AutoResponsePage.channelsDropdown(driver, by).click() // channels dropdown
    .then(() => AutoResponsePage.firstChannelInDropdown(driver, by).click()) // selects first channel
    .then(() => AutoResponsePage.eventNameInput(driver, by).click()) // just doing this so the Channels dropdown closes
    .then(() => callback())
    .catch(() => {
      setTimeout(() => selectFirstChannel(driver, by, callback), 1000);
    });
  },

  removeOOOEvent: function removeOOOEvent(driver, by, callback) {
    AutoResponsePage.deleteButton(driver, by).click()
    .then(() => AutoResponsePage.deleteButtonFinal(driver, by).click()) // in the modal
    .then(() => {
      setTimeout(() => callback(), 1000);
    })
    .catch(() => {
      setTimeout(() => removeOOOEvent(driver, by, callback), 1000);
    });
  },

  clickScheduleEvent: function clickScheduleEvent(driver, by, callback) {
    AutoResponsePage.scheduleEventButton(driver, by).click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => clickScheduleEvent(driver, by, callback), 1000);
    });
  },

  submitEvent: function submitEvent(driver, by, callback) {
    AutoResponsePage.submitEventButton(driver, by).click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => submitEvent(driver, by, callback), 1000);
    });
  },
};
