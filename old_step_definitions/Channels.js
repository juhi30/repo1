'use strict';

const ChannelsPage = require('./page_elements/ChannelsPage');

module.exports = {
  toggleBizHours: function toggleBizHours(driver, by, toggleOption, callback) {
    if (toggleOption === 'on') {
      ChannelsPage.bizHoursOnSelector(driver, by).click() // click On
      .then(() => callback())
      .catch(() => {
        setTimeout(() => toggleBizHours(driver, by, toggleOption, callback), 1000);
      });
    } else if (toggleOption === 'off') {
      ChannelsPage.bizHoursOffSelector(driver, by).click() // click Off
      .then(() => callback())
      .catch(() => {
        setTimeout(() => toggleBizHours(driver, by, toggleOption, callback), 1000);
      });
    }
  },

  clickEditChannel: function clickEditChannel(driver, by, callback) {
    ChannelsPage.editChannel(driver, by).click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => clickEditChannel(driver, by, callback), 1000);
    });
  },

  clickSaveChannel: function clickSaveChannel(driver, by, callback) {
    ChannelsPage.saveChannelButton(driver, by).click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => clickSaveChannel(driver, by, callback), 1000);
    });
  },
};
