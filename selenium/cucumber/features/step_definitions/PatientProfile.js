'use strict';

const PatientProfilePage = require('./page_elements/PatientProfilePage');

module.exports = {
  clickEditProfile: function clickEditProfile(driver, by, callback) {
    PatientProfilePage.editProfile(driver, by).click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => clickEditProfile(driver, by, callback));
    });
  },

  selectOtherAsType: function selectOtherAsType(driver, by, callback) {
    PatientProfilePage.typeOtherSelect(driver, by).click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => selectOtherAsType(driver, by, callback), 1000);
    });
  },

  changeFirstName: function changeFirstName(driver, by, firstName, callback) {
    PatientProfilePage.firstNameInput(driver, by).clear()
    .then(() => PatientProfilePage.firstNameInput(driver, by).sendKeys(firstName))
    .then(() => callback())
    .catch(() => {
      setTimeout(() => changeFirstName(driver, by, firstName, callback), 1000);
    });
  },

  changeMiddleName: function changeMiddleName(driver, by, middleName, callback) {
    PatientProfilePage.middleNameInput(driver, by).clear()
    .then(() => PatientProfilePage.middleNameInput(driver, by).sendKeys(middleName))
    .then(() => callback())
    .catch(() => {
      setTimeout(() => changeMiddleName(driver, by, middleName, callback), 1000);
    });
  },

  changeLastName: function changeLastName(driver, by, lastName, callback) {
    PatientProfilePage.lastNameInput(driver, by).clear()
    .then(() => PatientProfilePage.lastNameInput(driver, by).sendKeys(lastName))
    .then(() => callback())
    .catch(() => {
      setTimeout(() => changeLastName(driver, by, lastName, callback), 1000);
    });
  },

  changePrefix: function changePrefix(driver, by, callback) {
    PatientProfilePage.prefixSelect(driver, by).click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => changePrefix(driver, by, callback), 1000);
    });
  },

  changeSuffix: function changeSuffix(driver, by, callback) {
    PatientProfilePage.suffixSelect(driver, by).click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => changeSuffix(driver, by, callback), 1000);
    });
  },

  changeId: function changeId(driver, by, callback) {
    const randomId = Math.floor(Math.random() * 1000);
    PatientProfilePage.externalIdInput(driver, by).clear()
    .then(() => PatientProfilePage.externalIdInput(driver, by).sendKeys(randomId))
    .then(() => callback())
    .catch(() => {
      setTimeout(() => changeId(driver, by, callback), 1000);
    });
  },

  selectSpecificYear: function selectSpecificYear(driver, by, callback) {
    PatientProfilePage.yearSelect(driver, by).click() // year dropdown
    .then(() => callback())
    .catch(() => {
      setTimeout(() => selectSpecificYear(driver, by, callback), 1000);
    });
  },

  selectSpecificMonth: function selectSpecificMonth(driver, by, callback) {
    PatientProfilePage.monthSelect(driver, by).click() // month dropdown
    .then(() => callback())
    .catch(() => {
      setTimeout(() => selectSpecificMonth(driver, by, callback), 1000);
    });
  },

  selectSpecificDay: function selectSpecificDay(driver, by, callback) {
    PatientProfilePage.daySelect(driver, by).click() // day dropdown
    .then(() => callback())
    .catch(() => {
      setTimeout(() => selectSpecificDay(driver, by, callback), 1000);
    });
  },

  // specifically the user type displayed under the name on a Profile Summary
  seeUserType: function seeUserType(driver, by, type, callback) {
    PatientProfilePage.userTypeLabel(driver, by, type)
    .then(() => callback())
    .catch(() => {
      setTimeout(() => seeUserType(driver, by, type, callback), 1000);
    });
  },

  // selects the relationship type when creating a connected party
  selectRelationship: function selectRelationship(driver, by, relationship, callback) {
    PatientProfilePage.connectionTypeDropdown(driver, by).click() // clicks the select dropdown
    .then(() => {
      if (relationship === 'Dependant') {
        PatientProfilePage.dependentOption(driver, by).click() // clicks Dependant
        .then(() => callback());
      }
    }).catch(() => {
      setTimeout(() => selectRelationship(driver, by, relationship, callback), 1000);
    });
  },

  // specifies the first and last name of the new connected party contact
  nameConnectedParty: function nameConnectedParty(driver, by, firstName, lastName, callback) {
    PatientProfilePage.connectedPartyFirstNameInput(driver, by).sendKeys(firstName) // firstName
    .then(() => PatientProfilePage.connectedPartyLastNameInput(driver, by).sendKeys(lastName)) // lastName
    .then(() => callback())
    .catch(() => {
      setTimeout(() => nameConnectedParty(driver, by, firstName, lastName, callback), 1000);
    });
  },
};
