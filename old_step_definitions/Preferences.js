'use strict';

const PreferencesPage = require('./page_elements/PreferencesPage');

module.exports = {

  // clicks the sound toggle "on" or "off"
  toggleSound: function toggleSound(driver, by, toggle, callback) {
    if (toggle === 'on') {
      PreferencesPage.toggleSoundOn(driver, by).click() // On toggle
      .then(() => callback())
      .catch(() => {
        setTimeout(() => toggleSound(driver, by, toggle, callback), 1000);
      });
    } else {
      PreferencesPage.toggleSoundOff(driver, by).click() // Off toggle
      .then(() => callback())
      .catch(() => {
        setTimeout(() => toggleSound(driver, by, toggle, callback), 1000);
      });
    }
  },

  clickSave: function clickSave(driver, by, callback) {
    PreferencesPage.saveButton(driver, by).click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => clickSave(driver, by, callback), 1000);
    });
  },
};
