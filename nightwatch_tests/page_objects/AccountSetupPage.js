const accountSetupCommands = {

    pause: function (time) {
        this.api.pause(time);
        return this;
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

        // existingBillingRadio: {
        //     selector: ``,
        //     locateStrategy: 'xpath',
        // },

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

        // currently will not be used for automated testing

        /*---------------------------------------------------------*/

        createOrgButton: {
            selector: `//BUTTON[contains(text(), 'Create Organization')]`,
            locateStrategy: 'xpath',
        },
    }
}