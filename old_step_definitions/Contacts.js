'use strict';

const ContactsPage = require('./page_elements/ContactsPage');

module.exports = {
  // clicks the specified filter (All Contacts, Member, Patient, Connected Party, Unknown, or Other)
  filterPatient: function filterContact(driver, by, filter, callback) {
    ContactsPage.filterDropdown(driver, by).click()
    .then(() => {
      switch (filter) {
        case 'Patient':
          ContactsPage.patientOption(driver, by).click()
              .then(() => {
                callback();
              });
          break;
        case 'Member':
          ContactsPage.memberOption(driver, by).click()
              .then(() => {
                callback();
              });
          break;
        case 'Connected party':
          ContactsPage.connectedPartyOption(driver, by).click()
              .then(() => {
                callback();
              });
          break;
        case 'Unknown':
          ContactsPage.unknownOption(driver, by).click()
              .then(() => {
                callback();
              });
          break;
        case 'Other':
          ContactsPage.otherOption(driver, by).click()
              .then(() => {
                callback();
              });
          break;
        default:
          setTimeout(() => {
            filterContact(driver, by, filter, callback);
          }, 1000);
      }
    }).catch(() => {
      setTimeout(() => {
        filterContact(driver, by, filter, callback);
      }, 1000);
    });
  },

  clickFirstContact: function clickFirstContact(driver, by, callback) {
    ContactsPage.firstContact(driver, by).click() // clicks the first contact
    .then(() => callback())
    .catch(() => {
      setTimeout(() => clickFirstContact(driver, by, callback), 1000);
    });
  },

  clickAddNewContact: function clickAddNewContact(driver, by, callback) {
    ContactsPage.addContactButton(driver, by).click() // clicks Add Contact
    .then(() => ContactsPage.addContactButtonDropdown(driver, by).click()) // clicks Add new contact in the dropdown
    .then(() => callback())
    .catch(() => {
      setTimeout(() => clickAddNewContact(driver, by, callback), 1000);
    });
  },

  // submits a contact creation form (clicks Add Contact)
  submitNewContact: function submitNewContact(driver, by, callback) {
    ContactsPage.submitNewContactButton(driver, by).click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => submitNewContact(driver, by, callback), 1000);
    });
  },
};
