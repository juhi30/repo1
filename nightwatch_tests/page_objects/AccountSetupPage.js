const testConstants = require("../feeder");

const accountSetupCommands = {

  getOrgId: function () {
    return this.waitForElementVisible('@orgId', 'Org Id is visible')
      .getText('@orgId', function (tpObj) {
        tpObj = tpObj.value.replace("ORGANIZATION (#", "");
        tpObj = tpObj.replace(")", "");
        process.env.ORGANIZATION_ID = tpObj
        console.log('Org Id of the newly created org is ==', tpObj);
      });
  },

  pause: function (time) {
    this.api.pause(time);
    return this;
  },

  clickBillingToggle: function () {
    return this.waitForElementPresent('@billingToggle', 'Billing toggle is present')
      .click('@billingToggle')
      .waitForElementNotPresent('@newBillingRadio', 'Billing options are hidden')
  },

  fillInOrgBasicInformation: function (name, address, city, state, zip) {
    return this.waitForElementPresent('@orgNameInput', 'Organization inputs are present')
      .setValue('@orgNameInput', name)
      .waitForElementVisible('@addressLineOneInput', 'Address Line 1 is visible')
      .setValue('@addressLineOneInput', address)
      .waitForElementVisible('@cityInput', 'City field is visible')
      .setValue('@cityInput', city)
      .waitForElementVisible('@stateDropdown', 'State dropdown is visible')
      .setValue('@stateDropdown', state)
      .waitForElementVisible('@zipInput', 'Zip field is visible')
      .setValue('@zipInput', zip)
  },

  setSubscriptionDate: function (date) {
    return this.waitForElementVisible('@ActivationDate', 'Subscription Activation Date picker is visible')
      .setValue('@ActivationDate', date)
  },

  setPlan : function(){
    console.log('Plan Name:: ', testConstants.planName);
    return this.waitForElementVisible('@planList', 'Plan list is visible')
    .click('@planList')
    .waitForElementVisible('@planName', 'Plan selection list is visible')
    .pause(1000)
    .click('@planName')
  },

  billingContactDetails: function (firstName, LastName, email, line1, city, state, zip) {
    return this.verify.visible('@billingBoxTitle', 'Billing contact details form is visible')
      .setValue('@billingFirstName', firstName)
      .setValue('@billingLastName', LastName)
      .setValue('@billingEmail', email)
      .setValue('@billingAddressLine1', line1)
      .setValue('@billingCity', city)
      .setValue('@BillingState', state)
      .setValue('@BillingZip', zip)
  },

  clickCreateOrganization: function () {
    return this.waitForElementPresent('@createOrgButton', 'Create organization button is present')
      .click('@createOrgButton')
      .waitForElementVisible('@orgCreateSucessMessage', 'Organization created successfully')
      .waitForElementVisible('@contactsPage', 'CCR Landed on org contact page')
  },

}

module.exports = {
  commands: [accountSetupCommands],

  url: function () {
    return this.api.launch_url + '/accountsetup'
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
      selector: `//*[@class='app-navigation__org']//SPAN[contains(text(),'Organization')]`,
      locateStrategy: 'xpath',
    },

    newBillingRadio: {
      selector: `//LABEL[contains(@for, 'selectedBillingOpt')]`, // used to verify billing options are hidden
      locateStrategy: 'xpath',
    },

    orgNameInput: {
      selector: `//INPUT[contains(@id, 'name')]`,
      locateStrategy: 'xpath',
    },

    parentCompanyInput: {
      selector: `//INPUT[contains(@id, 'parentCompany')]`,
      locateStrategy: 'xpath',
    },

    addressLineOneInput: {
      selector: `//INPUT[contains(@id, 'street1')]`,
      locateStrategy: 'xpath',
    },

    addressLineTwoInput: {
      selector: `//INPUT[contains(@id, 'street2')]`,
      locateStrategy: 'xpath',
    },

    cityInput: {
      selector: `//INPUT[contains(@id, 'city')]`,
      locateStrategy: 'xpath',
    },

    stateDropdown: {
      selector: `//SELECT[contains(@id, 'state')]`,
      locateStrategy: 'xpath',
    },

    zipInput: {
      selector: `//INPUT[contains(@id, 'zip')]`,
      locateStrategy: 'xpath',
    },

    orgPhoneInput: {
      selector: `//INPUT[contains(@id, 'businessPhone')]`,
      locateStrategy: 'xpath',
    },

    orgEmailInput: {
      selector: `//INPUT[contains(@id, 'businessEmail')]`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/
    // Contact information
    /*---------------------------------------------------------*/

    contactNameInput: {
      selector: `//INPUT[contains(@id, 'orgContactName')]`,
      locateStrategy: 'xpath',
    },

    contactPhoneInput: {
      selector: `//INPUT[contains(@id, 'orgContactPhone')]`,
      locateStrategy: 'xpath',
    },

    contactEmailInput: {
      selector: `//INPUT[contains(@id, 'orgContactEmail')]`,
      locateStrategy: 'xpath',
    },
    /*---------------------------------------------------------*/
    // Billing Toggle
    /*---------------------------------------------------------*/

    billingToggle: {
      selector: `//LABEL[contains(@for, 'billingChecked')]`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/
    // Sales Information
    /*---------------------------------------------------------*/

    // currently will not be used for automated testing

    /*---------------------------------------------------------*/
    // Payment Information
    /*---------------------------------------------------------*/

    ActivationDate: {
      selector: `//INPUT[contains(@id, 'startBillingDate')]`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/
    //Billing Contact Details
    /*---------------------------------------------------------*/


    billingBoxTitle: {
      selector: `//DIV[@class='box__title'][text()='Billing Contact']`,
      locateStrategy: 'xpath',
    },

    billingFirstName: {
      selector: `//INPUT[contains(@id, 'billingContactFirstName')]`,
      locateStrategy: 'xpath',
    },

    billingLastName: {
      selector: `//INPUT[contains(@id, 'billingContactLastName')]`,
      locateStrategy: 'xpath',
    },

    billingPhoneNumber: {
      selector: `//INPUT[contains(@id, 'billingContactPhone')]`,
      locateStrategy: 'xpath',
    },

    billingEmail: {
      selector: `//INPUT[contains(@id, 'billingContactEmail')]`,
      locateStrategy: 'xpath',
    },

    billingAddressLine1: {
      selector: `//INPUT[contains(@id, 'billingStreet1')]`,
      locateStrategy: 'xpath',
    },

    billingAddressLine2: {
      selector: `//INPUT[contains(@id, 'billingStreet2')]`,
      locateStrategy: 'xpath',
    },

    billingCity: {
      selector: `//INPUT[contains(@id, 'billingCity')]`,
      locateStrategy: 'xpath',
    },

    BillingState: {
      selector: `//SELECT[contains(@id,'billingState')]`,
      locateStrategy: 'xpath',
    },

    BillingZip: {
      selector: `//INPUT[contains(@id, 'billingZip')]`,
      locateStrategy: 'xpath',
    },

    createOrgButton: {
      selector: `//*[contains(text(), 'Create Organization')]`,
      locateStrategy: 'xpath',
    },

    contactsPage: {
      selector: `//*[text()='Import Contacts']`,
      locateStrategy: 'xpath',
    },

    orgCreateSucessMessage: {
      selector: `//DIV[text()='Organization created successfully.']`,
      locateStrategy: 'xpath',
    },

    planList: {
      selector: `//*[@id="app"]//div[2]//div[3]//button/span`,
      locateStrategy: 'xpath',
    },

    planName: {
   // selector : `//span[@class='u-text-overflow'][text()='Basic Plan New']`,
      selector: `SPAN[@class='u-text-overflow'][text()='${testConstants.planName}']`,
      locateStrategy: 'xpath',
    },
  }
}