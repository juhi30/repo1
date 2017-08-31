'use strict';

const selenium = require('selenium-webdriver');

const by  = selenium.By;

module.exports = function() {
  const driver = new selenium.Builder().forBrowser('chrome').setScrollBehavior(0).build();

  this.setDefaultTimeout(13000);

  this.Then(/^I navigate to "([^"]*)"$/, (url, callback) => {
    driver.get(url);
  });
};
