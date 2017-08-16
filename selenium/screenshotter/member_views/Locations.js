const LocationsPage = require('../../page_elements/LocationsPage');
const Members = require('./Members');
const webdriver = require('selenium-webdriver');

const promise = webdriver.promise;
const flow = promise.controlFlow();

function Locations(driver, by, waitFor) {
  flow.execute(() => driver.get('https://dev.dev-rhinogram.com/settings/organization/locations'));
  flow.execute(() => waitFor(LocationsPage.editLocationButton, Members));
  flow.execute(() => driver.saveScreenshot('locations_0')); // locations page (initial view)

  flow.execute(() => LocationsPage.editLocationButton.find(driver, by).click());
  flow.execute(() => waitFor(LocationsPage.locationNameInput, Members));
  flow.execute(() => driver.saveScreenshot('locations_1')); // edit/add channel form

  flow.execute(() => Members(driver, by, waitFor));
}

module.exports = Locations;
