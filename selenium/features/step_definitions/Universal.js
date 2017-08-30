'use strict';

const UniversalElements = require('./page_elements/UniversalElements');
const PatientViewPage = require('./page_elements/PatientViewPage');

let url;

// This ENVIRONMENT varible must be set to run the tests. 'prod' will run on the test production org, 'staging' on staging.
// Otherwise, the ENVIRONMENT variable must equal the PR instance generated for the corresponding pull request.

switch (process.env.ENVIRONMENT) {
  case 'prod':
    url = 'https://app.rhinogram.com/settings/profile';
    break;
  case 'develop':
    url = 'https://dev.dev-rhinogram.com/settings/profile';
    break;
  case 'staging':
    url = 'https://staging.rhinogram.com/settings/profile';
    break;
  default:
    url = `${process.env.ENVIRONMENT}.com/settings/profile`;
}

module.exports = {
  /* Use navigateToProfile and logoutIfPossible together to provide the first step, pre-login-setup */
  getProfile: function navigateToProfile(driver) {
    driver.get(url);
  },

/* The most convoluted step, but arguably the most important. It "gets" a url (/settings/profile), and depending
on whether the user is logged in or out, either /login or /settings/profile will be displayed. If logged out,
the step passes; if logged in, I click the logout button, and the step passes. */
  logoutIfPossible: function logoutIfPossible(driver, by, callback) {
    driver.getPageSource()
    .then((pageSrc) => {
      if (pageSrc.includes('My Profile')) { // IF at settings/profile, then logout
        UniversalElements.settingsDropdown(driver, by).click()
        .then(() => {
          setTimeout(() => {
            UniversalElements.logoutButton(driver, by).click()
            .then(() => callback());
          }, 1000);
        });
      } else if (pageSrc.includes('Log In')) { // IF at /login, continue to next step
        callback();
      } else if (pageSrc.includes('Logout')) { // IF at /securemessage (patient view), then logout
        PatientViewPage.logoutButton(driver, by).click()
        .then(() => callback());
      } else {
        setTimeout(() => {
          logoutIfPossible(driver, by, callback);
        }, 1000);
      }
    }).catch(() => {
      setTimeout(() => {
        logoutIfPossible(driver, by, callback);
      }, 1000);
    });
  },

  clickLink: function clickLink(driver, by, linkText, callback) {
    driver.findElement(by.linkText(linkText)).click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => clickLink(driver, by, linkText, callback), 1000);
    });
  },

  clickButton: function clickButton(driver, by, buttonText, callback) {
    driver.findElement(by.buttonText(buttonText)).click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => clickButton(driver, by, buttonText, callback), 1000);
    });
  },

  seeOnPage: function seeOnPage(driver, by, string, callback) {
    driver.getPageSource()
    .then((page) => {
      if (page.includes(string)) {
        callback();
      } else {
        setTimeout(() => seeOnPage(driver, by, string, callback), 1000);
      }
    }).catch(() => {
      setTimeout(() => seeOnPage(driver, by, string, callback), 1000);
    });
  },

  seeSuccessToast: function seeSuccessToast(driver, by, callback) {
    driver.findElement(by.css('div.toast.toast--success'))
    .then(() => callback())
    .catch(() => {
      setTimeout(() => seeSuccessToast(driver, by, callback), 1000);
    });
  },

  // clicks on either the Chat tab, or the Contacts tab (I omitted Inbox from this list since thats the default page when entering the app)
  navigateToTab: function navigateToTab(driver, by, tabId, callback) {
    if (tabId === 'Contacts') {
      UniversalElements.contactsTab(driver, by).click() // Contacts tab
      .then(() => callback())
      .catch(() => {
        setTimeout(() => navigateToTab(driver, by, tabId, callback), 1000);
      });
    } else {
      UniversalElements.chatInboxTab(driver, by).click()
      .then(() => callback())
      .catch(() => {
        setTimeout(() => navigateToTab(driver, by, tabId, callback), 1000);
      });
    }
  },

  navigateToProfile: function navigateToProfile(driver, by, callback) {
    UniversalElements.settingsDropdown(driver, by).click() // settings button
    .then(() => UniversalElements.myProfileInSettingsDropdown(driver, by).click()) // Settings -> Profile
    .then(() => callback())
    .catch(() => {
      setTimeout(() => navigateToProfile(driver, by, callback), 1000);
    });
  },

  // "Organization" meaning the org's profile, as opposed to the logged-in users profile
  navigateToOrganization: function navigateToOrganization(driver, by, callback) {
    UniversalElements.settingsDropdown(driver, by).click()
    .then(() => UniversalElements.orgProfileInSettingsDropdown(driver, by).click()) // Settings -> (Org) Profile
    .then(() => callback())
    .catch(() => {
      setTimeout(() => navigateToOrganization(driver, by, callback), 1000);
    });
  },

  navigateToPreferences: function navigateToPreferences(driver, by, callback) {
    UniversalElements.settingsDropdown(driver, by).click()
    .then(() => UniversalElements.preferencesInSettingsDropdown(driver, by).click()) // Settings -> Prefer.
    .then(() => callback())
    .catch(() => {
      setTimeout(() => navigateToPreferences(driver, by, callback), 1000);
    });
  },

  navigateToLocations: function navigateToLocations(driver, by, callback) {
    UniversalElements.settingsDropdown(driver, by).click()
    .then(() => UniversalElements.locationsInSettingsDropdown(driver, by).click()) // Settings -> Locations
    .then(() => callback())
    .catch(() => {
      setTimeout(() => navigateToLocations(driver, by, callback), 1000);
    });
  },

  navigateToChannels: function navigateToChannels(driver, by, callback) {
    UniversalElements.settingsDropdown(driver, by).click()
    .then(() => UniversalElements.channelsInSettingsDropdown(driver, by).click()) // Settings -> Channels
    .then(() => callback())
    .catch(() => {
      setTimeout(() => navigateToChannels(driver, by, callback), 1000);
    });
  },

  navigateToAutoResponse: function navigateToAutoResponse(driver, by, callback) {
    UniversalElements.settingsDropdown(driver, by).click()
    .then(() => UniversalElements.autoResponseInSettingsDropdown(driver, by).click())// Settings -> Auto-Response
    .then(() => callback())
    .catch(() => {
      setTimeout(() => navigateToAutoResponse(driver, by, callback), 1000);
    });
  },

  navigateToMembers: function navigateToMembers(driver, by, callback) {
    UniversalElements.settingsDropdown(driver, by).click()
    .then(() => UniversalElements.membersInSettingsDropdown(driver, by).click()) // Settings -> Members
    .then(() => callback())
    .catch(() => {
      setTimeout(() => navigateToMembers(driver, by, callback), 1000);
    });
  },

  waitOneSecond: function waitOneSecond(callback) {
    setTimeout(() => callback(), 1000);
  },

};
