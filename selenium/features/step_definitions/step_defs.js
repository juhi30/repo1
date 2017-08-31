'use strict';

const selenium = require('selenium-webdriver');

const by  = selenium.By;

module.exports = function cuke() {
  const driver = new sel.Builder().forBrowser('chrome').setScrollBehavior(0).build();

  this.setDefaultTimeout(13000);

  this.Then(/^pre-login-setup$/, (callback) => {
    uni.getProfile(driver);
    setTimeout(() => uni.logoutIfPossible(driver, by, callback), 2000);
  });
};
