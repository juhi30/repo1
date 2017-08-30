'use strict';

const LocationPage = require('./page_elements/LocationsPage');

module.exports = {
  fillName: function fillName(driver, by, locationName, callback) {
    LocationPage.locationNameInput(driver, by).sendKeys(locationName)
    .then(() => callback())
    .catch(() => {
      setTimeout(() => fillName(driver, by, locationName, callback), 1000);
    });
  },

  fillAddress1: function fillAddress1(driver, by, address, callback) {
    LocationPage.streetOneInput(driver, by).sendKeys(address)
    .then(() => callback())
    .catch(() => {
      setTimeout(() => fillAddress1(driver, by, address, callback), 1000);
    });
  },

  fillCity: function fillCity(driver, by, city, callback) {
    LocationPage.cityInput(driver, by).sendKeys(city)
    .then(() => callback())
    .catch(() => {
      setTimeout(() => fillCity(driver, by, city, callback), 1000);
    });
  },

  fillState: function fillState(driver, by, state, callback) {
    LocationPage.stateInput(driver, by).sendKeys(state)
    .then(() => callback())
    .catch(() => {
      setTimeout(() => fillState(driver, by, state, callback), 1000);
    });
  },

  fillZip: function fillZip(driver, by, zipcode, callback) {
    LocationPage.zipInput(driver, by).sendKeys(zipcode)
    .then(() => callback())
    .catch(() => {
      setTimeout(() => fillZip(driver, by, zipcode, callback), 1000);
    });
  },

  deleteLocation: function deleteLocation(driver, by, callback) {
    LocationPage.locationTransferDropdown(driver, by).click() //location transfer dropdown
    .then(() => LocationPage.firstLocationInDropdown(driver, by).click()) // location selection
    .then(() => LocationPage.submitDeleteButton(driver, by).click())
    .then(() => callback())
    .catch(() => {
      setTimeout(() => deleteLocation(driver, by, callback), 1000);
    });
  },

  checkForLocation: function checkForLocation(driver, by, location, callback) {
    driver.getPageSource()
    .then((pageSource) => {
      if (pageSource.includes(`Location '${location}' already exists`)) {
        callback();
      } else if (pageSource.includes('Location created successfully.')) {
        callback();
      }
    }).catch(() => {
      setTimeout(() => checkForLocation(driver, by, location, callback), 1000);
    });
  },

  submitAddLocationForm: function submitAddLocationForm(driver, by, callback) {
    LocationPage.submitLocationButton(driver, by).click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => submitAddLocationForm(driver, by, callback), 1000);
    });
  },

  clickAddLocationButton: function clickAddLocationButton(driver, by, callback) {
    LocationPage.addLocationButton.click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => clickAddLocationButton(driver, by, callback), 1000);
    });
  },
};
