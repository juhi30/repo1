import logger from 'rhinotilities/lib/loggers/logger';

const accountSetupCommands = {

  getOrgId(envVariable) {
    return this.waitForElementVisible('@orgId', 'Org Id is visible')
      .getText('@orgId', (tpObj) => {
        tpObj = tpObj.value.replace('ORGANIZATION (#', '');
        tpObj = tpObj.replace(')', '');
        process.env[envVariable] = tpObj;
        logger.info(`====org id === ${process.env[envVariable]}`);
      });
  },

  getBillingId() {
    return this.waitForElementVisible('@orgId', 'Org Id is visible')
      .getText('@orgId', (tpObj) => {
        tpObj = tpObj.value.replace('ORGANIZATION (#', '');
        tpObj = tpObj.replace(')', '');
        process.env.ORGANIZATION_ID = tpObj;
        logger.info(`====org id === ${process.env.ORGANIZATION_ID}`);
      });
  },

  clickBillingToggle() {
    return this.waitForElementPresent('@billingToggle', 'Billing toggle is present')
      .click('@billingToggle')
      .waitForElementNotPresent('@newBillingRadio', 'Billing options are hidden');
  },

  fillInOrgBasicInformation({
    name, address, city, state, zip,
  }) {
    return this.waitForElementPresent('@orgNameInput', 'Organization inputs are present')
      .setValue('@orgNameInput', name)
      .waitForElementVisible('@addressLineOneInput', 'Address Line 1 is visible')
      .setValue('@addressLineOneInput', address)
      .waitForElementVisible('@cityInput', 'City field is visible')
      .setValue('@cityInput', city)
      .waitForElementVisible('@stateDropdown', 'State dropdown is visible')
      .setValue('@stateDropdown', state)
      .waitForElementVisible('@zipInput', 'Zip field is visible')
      .setValue('@zipInput', zip);
  },

  fillBillingContactDetails({
    billingContactFirstName, billingContactLastName, billingContactAddressOne, billingContactEmail,
    billingContactCity, billingContactStateDropdown, billingContactZipInput,
  }) {
    return this.waitForElementPresent('@billingContactFName', 'Billing Contact First Name is present')
      .setValue('@billingContactFName', billingContactFirstName)
      .waitForElementVisible('@billingContactLName', 'Billing Contact Last Name is present')
      .setValue('@billingContactLName', billingContactLastName)
      .waitForElementVisible('@billingContactAddressOne', 'Billing Contact Address Line 1 is visible')
      .setValue('@billingContactAddressOne', billingContactAddressOne)
      .waitForElementVisible('@billingContactEmail', 'Billing Contact Email is visible')
      .setValue('@billingContactEmail', billingContactEmail)
      .waitForElementVisible('@billingContactCity', 'Billing Contact City field is visible')
      .setValue('@billingContactCity', billingContactCity)
      .waitForElementVisible('@billingContactStateDropdown', 'Billing Contact State dropdown is visible')
      .setValue('@billingContactStateDropdown', billingContactStateDropdown)
      .waitForElementVisible('@billingContactZipInput', 'Billing Contact Zip field is visible')
      .setValue('@billingContactZipInput', billingContactZipInput);
  },

  fillBillingPlanDetails(installationFee, subscriptionActivationDate) {
    return this.waitForElementVisible('@orgPlanType', 'Billing Contact First Name is present')
      .click('@orgPlanType')
      .waitForElementVisible('@orgInstallationFee', 'Billing Contact First Name is present')
      .setValue('@orgInstallationFee', installationFee)
      .waitForElementVisible('@orgSubscriptionActivationDate', 'Billing Contact First Name is present')
      .setValue('@orgSubscriptionActivationDate', subscriptionActivationDate);
  },

  clickBillingPlanSelector() {
    return this.waitForElementVisible('@orgPlanSelector', 'Going to select billing plan')
      .click('@orgPlanSelector');
  },

  clickCreateOrganization() {
    return this.waitForElementPresent('@createOrgButton', 'Create organization button is present')
      .click('@createOrgButton');
    // .waitForElementVisible('@contactsPage', 'CCR Landed on org contact page')
  },

};

module.exports = {
  commands: [accountSetupCommands],

  url() {
    return `${this.api.launch_url}/accountsetup`;
  },

  elements: {

    /*---------------------------------------------------------*/
    // Organization Information
    /*---------------------------------------------------------*/

    // Not in use when creating org without billing
    // existingBillingRadio: {
    //     selector: ``,
    //     locateStrategy: 'xpath',
    // },

    orgId: {
      selector: '//*[@class=\'app-navigation__org\']//SPAN[contains(text(),\'Organization\')]',
      locateStrategy: 'xpath',
    },

    newBillingRadio: {
      selector: '//LABEL[contains(@for, \'selectedBillingOpt\')]', // used to verify billing options are hidden
      locateStrategy: 'xpath',
    },

    billingContactFName: {
      selector: '//input[contains(@id, \'billingContactFirstName\')]',
      locateStrategy: 'xpath',
    },

    billingContactLName: {
      selector: '//input[contains(@id, \'billingContactLastName\')]',
      locateStrategy: 'xpath',
    },

    billingContactAddressOne: {
      selector: '//input[contains(@id, \'billingStreet1\')]',
      locateStrategy: 'xpath',
    },

    billingContactEmail: {
      selector: '//input[contains(@id, \'billingContactEmail\')]',
      locateStrategy: 'xpath',
    },

    billingContactCity: {
      selector: '//input[contains(@id, \'billingCity\')]',
      locateStrategy: 'xpath',
    },

    billingContactStateDropdown: {
      selector: '//select[contains(@id, \'billingState\')]',
      locateStrategy: 'xpath',
    },

    billingContactZipInput: {
      selector: '//input[contains(@id, \'billingZip\')]',
      locateStrategy: 'xpath',
    },

    orgPlanSelector: {
      selector: '(//button[@class= \'button dropdown__toggle button--input\'])[1]',
      locateStrategy: 'xpath',
    },

    orgPlanType: {
      selector: '//SPAN[text()= \'Standard Plan\']/parent::div/parent::div/parent::div/parent::a',
      locateStrategy: 'xpath',
    },

    orgInstallationFee: {
      selector: '//input[contains(@id, \'installAmount\')]',
      locateStrategy: 'xpath',
    },

    orgSubscriptionActivationDate: {
      selector: '//input[contains(@id, \'startBillingDate\')]',
      locateStrategy: 'xpath',
    },

    orgNameInput: {
      selector: '//INPUT[contains(@id, \'name\')]',
      locateStrategy: 'xpath',
    },

    parentCompanyInput: {
      selector: '//INPUT[contains(@id, \'parentCompany\')]',
      locateStrategy: 'xpath',
    },

    addressLineOneInput: {
      selector: '//INPUT[contains(@id, \'street1\')]',
      locateStrategy: 'xpath',
    },

    addressLineTwoInput: {
      selector: '//INPUT[contains(@id, \'street2\')]',
      locateStrategy: 'xpath',
    },

    cityInput: {
      selector: '//INPUT[contains(@id, \'city\')]',
      locateStrategy: 'xpath',
    },

    stateDropdown: {
      selector: '//SELECT[contains(@id, \'state\')]',
      locateStrategy: 'xpath',
    },

    zipInput: {
      selector: '//INPUT[contains(@id, \'zip\')]',
      locateStrategy: 'xpath',
    },

    orgPhoneInput: {
      selector: '//INPUT[contains(@id, \'businessPhone\')]',
      locateStrategy: 'xpath',
    },

    orgEmailInput: {
      selector: '//INPUT[contains(@id, \'businessEmail\')]',
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/
    // Contact information
    /*---------------------------------------------------------*/

    contactNameInput: {
      selector: '//INPUT[contains(@id, \'orgContactName\')]',
      locateStrategy: 'xpath',
    },

    contactPhoneInput: {
      selector: '//INPUT[contains(@id, \'orgContactPhone\')]',
      locateStrategy: 'xpath',
    },

    contactEmailInput: {
      selector: '//INPUT[contains(@id, \'orgContactEmail\')]',
      locateStrategy: 'xpath',
    },
    /*---------------------------------------------------------*/
    // Billing Toggle
    /*---------------------------------------------------------*/

    billingToggle: {
      selector: '//LABEL[contains(@for, \'billingChecked\')]',
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/
    // Sales Information
    /*---------------------------------------------------------*/

    // currently will not be used for automated testing

    /*---------------------------------------------------------*/
    // Payment Information
    /*---------------------------------------------------------*/

    // currently will not be used for automated testing

    /*---------------------------------------------------------*/

    createOrgButton: {
      selector: '//*[contains(text(), \'Create Organization\')]',
      locateStrategy: 'xpath',
    },

    contactsPage: {
      selector: '//*[text()=\'Import Contacts\']',
      locateStrategy: 'xpath',
    },
  },
};
