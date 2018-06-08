const editChannelsCommands = {

    pause: function (time) {
        this.api.pause(time);
        return this;
    },
    
    validateCreateEls: function() {
        return this.waitForElementVisible('@channelNameInput', 'create channel is visible')
            .verify.visible('')
    },

    validateEditEls: function() {
        return this.waitForElementVisible('@channelNameInput', 'Edit channel is visible')
            .waitForElementVisible('@backButton', 'back button is visible')
            .verify.visible('@newNumberRadio', 'new number radio is visible')
            .verify.visible('@chooseNumberInput', 'choose a number input is visible')
            .verify.visible('@forwardNumberInput', 'forward number input is visible')
    },

    validateEditAndCreateEls: function() {
        return this.waitForElementVisible('@channelNameInput', 'channel name input is visible')
            .verify.visible('@channelPurposeInput', 'channel purpose is visible')
            .verify.visible('@channelTimezoneDropdown', 'timezone dropdown is visible')
            .verify.visible('@channelDSTCheckbox', 'DST checkbox is visible')
            .verify.visible('@updateChannelButton', 'update channel button is visible')
    },

    createNewSecureChannel: function() {
        return this.waitForElementVisible('@secureChannelRadio', 'secure channel radio is visible')
            .click('@secureChannelRadio')
            .setValue('@channelNameInput', 'Rhino Secure test')
            .setValue('@channelPurposeInput', 'automatic testing')
            .setValue('@channelTimezoneDropdown', 'e')

    },

    clickCreateChannel: function() {
        return this.waitForElementVisible('@createChannelButton', 'create channel button is visible')
            .click('@createChannelButton')
    },
    
}

module.exports = {
    commands: [editChannelsCommands],
    // url: function () {
    //     return this.api.launch_url + '/settings/organization/channels/edit'
    // },
    elements: {

        /*-----------------------------------------------------*/
        // Edit Channel main components
        /*-----------------------------------------------------*/

        backButton: {
            selector: `//BUTTON[contains(@title, 'Go back')]`, 
            locateStrategy: 'xpath'
        },

        newNumberRadio: {
            selector: `//SPAN[@class='form__block-group__label'][text()='New Phone Number']`, // for csr view(grabbed from member view)
            locateStrategy: 'xpath'
        },

        chooseNumberInput: {
            selector: `//INPUT[contains(@id,'search')]`,
            locateStrategy: 'xpath'
        },

        forwardNumberInput: {
            selector: `//INPUT[contains(@id,'forwardingNumber')]`,
            locateStrategy: 'xpath'
        },

        facebookChannelRadio: {
            selector: `//SPAN[@class='form__block-group__label'][text()='Facebook']`,
            locateStrategy: 'xpath'
        },

        secureChannelRadio: {
            selector: `//SPAN[@class='form__block-group__label'][text()='RhinoSecure']`,
            locateStrategy: 'xpath'
        },

        channelNameInput: {
            selector: `//INPUT[contains(@id,'channelName')]`,
            locateStrategy: 'xpath'
        },

        channelPurposeInput: {
            selector: `//INPUT[contains(@id,'channelPurpose')]`,
            locateStrategy: 'xpath'
        },

        channelTimezoneDropdown: {
            selector: `//SELECT[contains(@id,'timeZoneId')]`,
            locateStrategy: 'xpath'
        },

        channelDSTCheckbox: {
            selector: `//LABEL[@class='rhinobox__label'][text()='Daylight saving time observed']`,
            locateStrategy: 'xpath'
        },

        updateChannelButton: {
            selector: `//SPAN[@class='button__text-wrapper'][text()='Update Channel']`,
            locateStrategy: 'xpath'
        },

        createChannelButton: {
            selector: `//SPAN[@class='button__text-wrapper'][text()='Create Channel']`,
            locateStrategy: 'xpath'
        },

        /*-----------------------------------------------------*/
        // Channel forwarding
        /*-----------------------------------------------------*/

        channelForwardingToggle: {
            selector: `//LABEL[contains(@for,'allowChannelReroute')]`, // id could be used here
            locateStrategy: 'xpath'
        }
    }
};
