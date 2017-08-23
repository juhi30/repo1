const ChannelsPage = require('../../page_elements/ChannelsPage');
const Locations = require('./Locations');
const webdriver = require('selenium-webdriver');

const promise = webdriver.promise;
const flow = promise.controlFlow();

function Channels(driver, by, waitFor) {
  flow.execute(() => driver.get('https://dev.dev-rhinogram.com/settings/organization/channels')); 
  flow.execute(() => waitFor(ChannelsPage.editChannel, Locations));
  flow.execute(() => driver.saveScreenshot('channels_0')); // channels page (initial view)

  flow.execute(() => ChannelsPage.editChannel.find(driver, by).click());
  flow.execute(() => waitFor(ChannelsPage.bizHoursOffSelector, Locations));
  flow.execute(() => driver.saveScreenshot('channels_1')); // edit channel form

  flow.execute(() => Locations(driver, by, waitFor));
}

module.exports = Channels;
