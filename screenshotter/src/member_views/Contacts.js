const ContactsPage = require('../../page_elements/ContactsPage');
const Profile = require('./Profile');
const webdriver = require('selenium-webdriver');

const promise = webdriver.promise;
const flow = promise.controlFlow();

function Contacts(driver, by, waitFor) {
  flow.execute(() => driver.get('https://dev.dev-rhinogram.com/contacts'));
  flow.execute(() => waitFor(ContactsPage.firstContact, Profile));
  flow.execute(() => driver.saveScreenshot('contacts_0'));

  flow.execute(() => ContactsPage.filterDropdown.find(driver, by).click());
  flow.execute(() => driver.saveScreenshot('contacts_1'));

  flow.execute(() => ContactsPage.memberOption.find(driver, by).click());
  flow.execute(() => waitFor(ContactsPage.firstContact, Profile));
  flow.execute(() => driver.saveScreenshot('contacts_2'));

  flow.execute(() => Profile(driver, by, waitFor));
}

module.exports = Contacts;
