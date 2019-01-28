const accountSetupCommands = {

    pause: function (time) {
        this.api.pause(time);
        return this;
    },

    validateUrlChange: function () {
        return this.waitForElementNotPresent('@createOrgButton', false, null, 'Create Organization button is no longer visible, page changes to Contacts')
            .verify.urlContains('contacts')  // maybe some timeout issues happening here working as of 9/20/1
    },

    clickBillingToggle: function () {
        return this.waitForElementPresent('@billingToggle', 'Billing toggle is present')
            .click('@billingToggle')
            .waitForElementNotPresent('@newBillingRadio', 'Billing options are hidden')
    },

    //Creating Without Billing organization
    fillInOrgBasicInformation: function (name, address, city, state, zip) {
        return this.waitForElementPresent('@orgNameInput', 'Organization inputs are present')
            .setValue('@orgNameInput', name)
            .setValue('@addressLineOneInput', address)
            .setValue('@cityInput', city)
            .setValue('@stateDropdown', state)
            .setValue('@zipInput', zip)
    },

    clickCreateOrganizaton: function () {
        return this.waitForElementPresent('@createOrgButton', 'Create organization button is present')
            .click('@createOrgButton')
    }
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

        plans: {
            selector : `//*[@id="app"]//div[2]//div[5]/div[3]//button/span`,
            locateStrategy : 'xpath',
        },    

        /*---------------------------------------------------------*/
        // Payment Information
        /*---------------------------------------------------------*/

        // currently will not be used for automated testing

        /*---------------------------------------------------------*/

        createOrgButton: {
            selector: `//SPAN[text()='Create Organization']`,
            locateStrategy: 'xpath',
        },
    }
}