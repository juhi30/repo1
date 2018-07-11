const systemToolsCommands = {

    pause: function (time) {
        this.api.pause(time);
        return this;
    },

    validateCSRPortal: function () {
        return this.waitForElementVisible('@organizationsButton', 'CSR system tools are visible')
            .verify.urlContains('selectorg')
    },

    clickAcctSetupbutton: function () {
        return this.waitForElementVisible('@accountSetupButton', 'Account setup button is visible')
            .click('@accountSetupButton')
    }
}

module.exports = {
    commands: [systemToolsCommands],

    url: function () {
        return this.api.launch_url + '/selectorg'
    },

    elements: {

        organizationsButton: {
            selector: `//A[contains(@id, 'nav-select-org')]`,
            locateStrategy: 'xpath',
        },

        accountSetupButton: {
            selector: `//A[contains(@id, 'nav-account-setup')]`,
            locateStrategy: 'xpath',
        },

        checkEligibilityButton: {
            selector: `//A[contains(@id, 'nav-check-eligibility')]`,
            locateStrategy: 'xpath',
        },

        systemAlertButton: {
            selector: `//A[contains(@id, 'nav-system-alert')]`,
            locateStrategy: 'xpath',
        },

    }
}