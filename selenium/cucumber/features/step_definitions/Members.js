'use strict';

const MembersPage = require('./page_elements/MembersPage');

module.exports = {
  saveMemberChanges: function saveMemberChanges(driver, by, callback) {
    MembersPage.saveMemberButton(driver, by).click()
    .then(() => callback())
    .catch(() => {
      setTimeout(() => saveMemberChanges(driver, by, callback), 1000);
    });
  },
};
