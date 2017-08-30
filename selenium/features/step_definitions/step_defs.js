'use strict';

const sel = require('selenium-webdriver');
const ar = require('./AutoResponse');
const chan = require('./Channels');
const chat = require('./Chat');
const contacts = require('./Contacts');
const convoThd = require('./ConvoThread');
const inbox = require('./Inbox');
const loc = require('./Locations');
const login = require('./Login');
const members = require('./Members');
const patPro = require('./PatientProfile');
const patView = require('./PatientView');
const pref = require('./Preferences');
const uni = require('./Universal');

const by  = sel.By;

module.exports = function cuke() {
  let browser;

  if (!process.env.SELENIUM_BROWSER) {
    browser = 'chrome';
  } else {
    browser = process.env.SELENIUM_BROWSER;
  }

  const driver = new sel.Builder().forBrowser(browser).setScrollBehavior(0).build();

  this.setDefaultTimeout(13000);

/*======= Universal Steps =======*/

   /* Login Setup. Ensures that the "user" is logged out. -- Navigates to the /settings/profile url (since that page won't require any lazy loading), waits for
   4 seconds (to ensure the page loads), then clicks Settings -> Logout */
  this.Then(/^pre-login-setup$/, (callback) => {
    uni.getProfile(driver);
    setTimeout(() => uni.logoutIfPossible(driver, by, callback), 2000);
  });

  this.Then(/^I click the "([^"]*)" link$/, (linkText, callback) => {
    setTimeout(() => uni.clickLink(driver, by, linkText, callback), 1000);
  });

  this.Then(/^I click the "([^"]*)" button$/, (buttonText, callback) => {
    setTimeout(() => uni.clickButton(driver, by, buttonText, callback), 1000);
  });

  this.Then(/^I should see "([^"]*)"$/, (string, callback) => {
    setTimeout(() => uni.seeOnPage(driver, by, string, callback), 1000);
  });

  this.Then(/^I should see a success toast$/, (callback) => {
    setTimeout(() => uni.seeSuccessToast(driver, by, callback), 1000);
  });

  this.Then(/^I navigate to Settings: Profile$/, (callback) => {
    setTimeout(() => uni.navigateToProfile(driver, by, callback), 1000);
  });

  this.Then(/^I navigate to Settings: Preferences$/, (callback) => {
    setTimeout(() => uni.navigateToPreferences(driver, by, callback), 1000);
  });

  this.Then(/^I navigate to Settings: Organization$/, (callback) => {
    setTimeout(() => uni.navigateToOrganization(driver, by, callback), 1000);
  });

  this.Then(/^I navigate to Settings: Locations$/, (callback) => {
    setTimeout(() => uni.navigateToLocations(driver, by, callback), 1000);
  });

  this.Then(/^I navigate to Settings: Channels$/, (callback) => {
    setTimeout(() => uni.navigateToChannels(driver, by, callback), 1000);
  });

  this.Then(/^I navigate to Settings: Auto-Response$/, (callback) => {
    setTimeout(() => uni.navigateToAutoResponse(driver, by, callback), 1000);
  });

  this.Then(/^I navigate to Settings: Members$/, (callback) => {
    setTimeout(() => uni.navigateToMembers(driver, by, callback), 1000);
  });

  this.Then(/^I click the "([^"]*)" tab$/, (tab, callback) => {
    setTimeout(() => uni.navigateToTab(driver, by, tab, callback), 1000);
  });

  this.Then(/^wait 1 second$/, (callback) => {
    uni.waitOneSecond(callback);
  });

/*======= Auto Response Page =======*/

  this.Then(/^I name the new event "([^"]*)"$/, (eventName, callback) => {
    setTimeout(() => ar.nameEvent(driver, by, eventName, callback), 1000);
  });

  this.Then(/^I select the first channel$/, (callback) => {
    setTimeout(() => ar.selectFirstChannel(driver, by, callback), 1000);
  });

  this.Then(/^I remove the event$/, (callback) => {
    setTimeout(() => ar.removeOOOEvent(driver, by, callback), 1000);
  });

  this.Then(/^I click the Schedule Event button$/, (callback) => {
    setTimeout(() => ar.clickScheduleEvent(driver, by, callback), 1000);
  });

  this.Then(/^I submit the new event$/, (callback) => {
    setTimeout(() => ar.submitEvent(driver, by, callback), 1000);
  });

/*======= Channels Page =======*/

  this.Then(/^I toggle the Business Hours "([^"]*)"$/, (toggleOption, callback) => {
    setTimeout(() => chan.toggleBizHours(driver, by, toggleOption, callback), 1000);
  });

  this.Then(/^I click the Edit Channel button$/, (callback) => {
    setTimeout(() => chan.clickEditChannel(driver, by, callback), 1000);
  });

  this.Then(/^I click the Save Channel button$/, (callback) => {
    setTimeout(() => chan.clickSaveChannel(driver, by, callback), 1000);
  });

/*======= Chat Page =======*/

  this.Then(/^I click New Chat and search for "([^"]*)"$/, (name, callback) => {
    setTimeout(() => chat.chatSearch(driver, by, name, callback), 1000);
  });

  this.Then(/^I select the result of chat search$/, (callback) => {
    setTimeout(() => chat.chatSearchSelect(driver, by, callback), 1000);
  });

  this.Then(/^I send a chat message with the current time and date$/, (callback) => {
    setTimeout(() => chat.sendCurrentDate(driver, by, callback), 1000);
  });

  this.Then(/^I click the first chat thread$/, (callback) => {
    setTimeout(() => chat.clickFirstChatThread(driver, by, callback), 1000);
  });

  this.Then(/^I should see that chat$/, (callback) => {
    setTimeout(() => chat.seeChat(driver, by, callback), 1000);
  });

  /*======== Contacts Page =========*/

  this.Then(/^I select the "([^"]*)" filter$/, (filter, callback) => {
    setTimeout(() => contacts.filterPatient(driver, by, filter, callback), 1000);
  });

  this.Then(/^I click the first Contact$/, (callback) => {
    setTimeout(() => contacts.clickFirstContact(driver, by, callback), 1000);
  });

  this.Then(/^I click the Add Contact button and Add New Contact$/, (callback) => {
    setTimeout(() => contacts.clickAddNewContact(driver, by, callback), 1000);
  });

  this.Then(/^I submit a contact creation form$/, (callback) => {
    setTimeout(() => contacts.submitNewContact(driver, by, callback), 1000);
  });

  /*======= Conversation Thread ========*/

  this.Then(/^I leave a note of the time and date$/, (callback) => {
    setTimeout(() => convoThd.leaveTimeDateNote(driver, by, callback), 1000);
  });

  this.Then(/^I should see that note in the thread$/, (callback) => {
    setTimeout(() => convoThd.seeTimeDateNote(driver, by, callback), 1000);
  });

  this.Then(/^I click the Add Note button$/, (callback) => {
    setTimeout(() => convoThd.clickAddNote(driver, by, callback), 1000);
  });

  /*======= Login Page =======*/

  this.Then(/^I login with "([^"]*)" and "([^"]*)"$/, (username, password, callback) => {
    setTimeout(() => login.login(driver, by, username, password, callback), 2000);
  });

/*======= Location Page =======*/

  this.Then(/^I fill in the location name with "([^"]*)"$/, (locationName, callback) => {
    setTimeout(() => loc.fillName(driver, by, locationName, callback), 1000);
  });

  this.Then(/^I fill in the address with "([^"]*)"$/, (address, callback) => {
    setTimeout(() => loc.fillAddress1(driver, by, address, callback), 1000);
  });

  this.Then(/^I fill in the city with "([^"]*)"$/, (city, callback) => {
    setTimeout(() => loc.fillCity(driver, by, city, callback), 1000);
  });

  this.Then(/^I fill in the state with "([^"]*)"$/, (state, callback) => {
    setTimeout(() => loc.fillState(driver, by, state, callback), 1000);
  });

  this.Then(/^I fill in the zipcode with "([^"]*)"$/, (zipcode, callback) => {
    setTimeout(() => loc.fillZip(driver, by, zipcode, callback), 1000);
  });

  this.Then(/^I select a transfer Location and confirm$/, (callback) => {
    setTimeout(() => loc.deleteLocation(driver, by, callback), 1000);
  });

  this.Then(/^If "([^"]*)" doesn't exist, then it is created$/, (location, callback) => {
    setTimeout(() => loc.checkForLocation(driver, by, location, callback), 1000);
  });

  this.Then(/^I submit the Add Location form$/, (callback) => {
    setTimeout(() => loc.submitAddLocationForm(driver, by, callback), 1000);
  });

  this.Then(/^I click the Add Location button$/, (callback) => {
    setTimeout(() => loc.clickAddLocationButton(driver, by, callback), 1000);
  });

/*======= Inbox Page ========*/

  this.Then(/^I click on the first thread$/, (callback) => {
    setTimeout(() => inbox.clickFirstThread(driver, by, callback), 1000);
  });

/*======= Members Page ========*/

this.Then(/^I save the member changes$/, (callback) => {
  setTimeout(() => members.saveMemberChanges(driver, by, callback), 1000);
});

  /*======= Patient Profile ========*/

  this.Then(/^I click Edit Profile$/, (callback) => {
    setTimeout(() => patPro.clickEditProfile(driver, by, callback));
  });

  this.Then(/^I select Other as the type$/, (callback) => {
    setTimeout(() => patPro.selectOtherAsType(driver, by, callback), 1000);
  });

  this.Then(/^I change the first name to "([^"]*)"$/, (firstName, callback) => {
    setTimeout(() => patPro.changeFirstName(driver, by, firstName, callback), 1000);
  });

  this.Then(/^I change the middle name to "([^"]*)"$/, (middleName, callback) => {
    setTimeout(() => patPro.changeMiddleName(driver, by, middleName, callback), 1000);
  });

  this.Then(/^I change the last name to "([^"]*)"$/, (lastName, callback) => {
    setTimeout(() => patPro.changeLastName(driver, by, lastName, callback), 1000);
  });

  this.Then(/^I change the prefix$/, (callback) => {
    setTimeout(() => patPro.changePrefix(driver, by, callback), 1000);
  });

  this.Then(/^I change the suffix$/, (callback) => {
    setTimeout(() => patPro.changeSuffix(driver, by, callback), 1000);
  });

  this.Then(/^I change the id$/, (callback) => {
    setTimeout(() => patPro.changeId(driver, by, callback), 1000);
  });

  this.Then(/^They should be a "([^"]*)" type$/, (type, callback) => {
    setTimeout(() => patPro.seeUserType(driver, by, type, callback), 1000);
  });

  this.Then(/^I select November as the month$/, (callback) => {
    setTimeout(() => patPro.selectSpecificMonth(driver, by, callback), 1000);
  });

  this.Then(/^I select 18 as the day$/, (callback) => {
    setTimeout(() => patPro.selectSpecificDay(driver, by, callback), 1000);
  });

  this.Then(/^I select 1913 as the year$/, (callback) => {
    setTimeout(() => patPro.selectSpecificYear(driver, by, callback), 1000);
  });

  /*======= Patient View =======*/

  this.Then(/^I send a secure message to the practice$/, (callback) => {
    setTimeout(() => patView.sendMessage(driver, by, callback), 1000);
  });

  /*======= Preferences View =======*/

  this.Then(/^I toggle sound "([^"]*)"$/, (toggle, callback) => {
    setTimeout(() => pref.toggleSound(driver, by, toggle, callback), 1000);
  });

  this.Then(/^I save the new preferences$/, (callback) => {
    setTimeout(() => pref.clickSave(driver, by, callback), 1000);
  });
};
