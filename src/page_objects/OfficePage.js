const officeFeeder = require('../toolboxes/feeder/member.feeder');

const officeCommands = {

  clickAddOffice() {
    return this.waitForElementVisible('@officePageTitle', 'Offices page is open')
      .verify.visible('@addOfficeIcon', 'Add office icon is visible')
      .click('@addOfficeIcon')
      .waitForElementVisible('@officeCreatepageTitle', 'New Office setup page is open');
  },

  createOfficeForm(inputField, newValue) {
    return this.waitForElementVisible(inputField, `${inputField}: is visible`)
      .setValue(inputField, newValue);
  },

  checkVisibilityOfEditPage() {
    return this.waitForElementVisible('@officesTitle', 'officeToBeEdited is visible')
      .click('@officeToBeEdited')
      .waitForElementVisible('@editOfficeButton', 'edit office button is visible')
      .click('@editOfficeButton')
      .waitForElementVisible('@editOfficeTitle', 'edit office page is opened.');
  },

  editOfficeForm(inputField, updatedValue) {
    return this.waitForElementVisible(inputField, `${inputField}: is visible`)
      .clearValue(inputField)
      .setValue(inputField, updatedValue);
  },

  deleteOfficeForm() {
    return this.waitForElementVisible('@officesTitle', 'officeToBeDeleted is visible')
      .click('@officeToBeDeleted')
      .waitForElementVisible('@editOfficeButton', 'edit office button is visible')
      .click('@editOfficeButton')
      .waitForElementVisible('@editOfficeTitle', 'edit office page is opened.')
      .click('@deleteOfficeButton')
      .waitForElementVisible('@sureDeleteButton', 'delete sure office button is visible')
      .click('@sureDeleteButton');
  },

  successMessageVerification(element) {
    return this.waitForElementVisible(element, `${element}: is successfully done`);
  },
};

module.exports = {
  commands: [officeCommands],
  url() {
    return `${this.api.launch_url}/settings/organization/offices`;
  },
  elements: {
    officePageTitle: {
      selector: '//div[@class=\'app-page__header__title\'][text()=\'Offices\']',
      locateStrategy: 'xpath',
    },

    officeCreatepageTitle: {
      selector: '//DIV[@class=\'app-page__header__title\'][text()=\'Create Office\']',
      locateStrategy: 'xpath',
    },

    addOfficeIcon: {
      selector: '//BUTTON[@title=\'Create Office\']',
      locateStrategy: 'xpath',
    },

    officeName: {
      selector: '//INPUT[contains(@id,\'name\')]',
      locateStrategy: 'xpath',
    },

    officeAddressLine1: {
      selector: '//INPUT[contains(@id,\'street1\')]',
      locateStrategy: 'xpath',
    },

    officeAddressLine2: {
      selector: '//INPUT[contains(@id,\'street2\')]',
      locateStrategy: 'xpath',
    },

    officeCity: {
      selector: '//INPUT[contains(@id,\'city\')]',
      locateStrategy: 'xpath',
    },

    officeState: {
      selector: '//SELECT[contains(@id,\'state\')]',
      locateStrategy: 'xpath',
    },

    officeZip: {
      selector: '//INPUT[contains(@id,\'zip\')]',
      locateStrategy: 'xpath',
    },

    createOfficeButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Create Office\']',
      locateStrategy: 'xpath',
    },

    officeCreationSuccessMessage: {
      selector: '//DIV[text()=\'Office created successfully.\']',
      locateStrategy: 'xpath',
    },

    editOfficeButton: {
      selector: '//SPAN[contains(text(),\'Edit Office\')]',
      locateStrategy: 'xpath',
    },

    editOfficeTitle: {
      selector: '//DIV[contains(text(),\'Edit Office\')]',
      locateStrategy: 'xpath',
    },

    updateOfficeButton: {
      selector: '//SPAN[text()=\'Update Office\']',
      locateStrategy: 'xpath',
    },

    officeUpdationSuccessMessage: {
      selector: '//DIV[text()=\'Office updated successfully.\']',
      locateStrategy: 'xpath',
    },

    deleteOfficeButton: {
      selector: '//BUTTON[@title=\'Delete Office\']',
      locateStrategy: 'xpath',
    },

    sureDeleteButton: {
      selector: '//SPAN[text()=\'Yes, delete office\']',
      locateStrategy: 'xpath',
    },

    officeDeletionSuccessMessage: {
      selector: '//DIV[text()=\'Office deleted successfully.\']',
      locateStrategy: 'xpath',
    },

    officeToBeEdited: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${officeFeeder.officeName}')]`,
      locateStrategy: 'xpath',
    },

    officesTitle: {
      selector: '//DIV[text()=\'Offices\']',
      locateStrategy: 'xpath',
    },

    officeToBeDeleted: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${officeFeeder.newOfficeName}')]`,
      locateStrategy: 'xpath',
    },

  },
};
