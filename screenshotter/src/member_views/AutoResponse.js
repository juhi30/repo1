const AutoResponsePage = require('../../page_elements/AutoResponsePage');
const Channels = require('./Channels');
const webdriver = require('selenium-webdriver');

const promise = webdriver.promise;
const flow = promise.controlFlow();

function AutoResponse(driver, by, waitFor) {
  flow.execute(() => driver.get('https://dev.dev-rhinogram.com/settings/organization/auto-response'));
  flow.execute(() => waitFor(AutoResponsePage.scheduleEventButton, Channels));
  flow.execute(() => driver.saveScreenshot('auto_response_0')); // auto response page (initial view)

  flow.execute(() => AutoResponsePage.scheduleEventButton.find(driver, by).click());
  flow.execute(() => waitFor(AutoResponsePage.allDayCheckbox, Channels));
  flow.execute(() => driver.saveScreenshot('auto_response_1')); // schedule OOO Event

  flow.execute(() => AutoResponsePage.channelsDropdown.find(driver, by).click());
  flow.execute(() => waitFor(AutoResponsePage.firstChannelInDropdown, Channels));
  flow.execute(() => driver.saveScreenshot('auto_response_2')); // locations dropdown (OOO event)

  flow.execute(() => Channels(driver, by, waitFor));
}

module.exports = AutoResponse;
