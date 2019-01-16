const organizationCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  searchForOrganization: function(orgName) {
    return this.waitForElementVisible('@searchInputForOrg', 'Search Input is visible')
      .setValue('@searchInputForOrg', orgName)
      .waitForElementVisible('@organizationDropdownFirstResult', 'First result is visible')
      .click('@organizationDropdownFirstResult')
  },

  validateUrlChange: function() {
    return this.verify.urlContains('contacts');
  },

}

module.exports = {
  commands: [organizationCommands],
  url: function() {
    return this.api.launch_url + '/selectorg'
  },
  elements: {

    searchInputForOrg: {
      selector: `//input[@placeholder='Search organizations']`,
      locateStrategy: 'xpath',
    },

    organizationDropdownFirstResult: {
      selector: `//SPAN[contains(@class, 'resource__intro__title__content') and text() = 'routing tester' ]`,
      locateStrategy: 'xpath',
    },

  }
};
