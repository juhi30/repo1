const testConstants = require('../toolboxes/feeder.toolbox');

const editChannelsCommands = {

    validateCreateEls: function () {
        return this.waitForElementVisible('@createChannelPageTitle', 'create channel page is opened.')
            .verify.visible('@existingPhoneType', 'Existing Phone Channel type is visible')
            .verify.visible('@newPhoneType', 'New Phone Channel type is visible')
            .verify.visible('@rhinoSecureType', 'RhinoSecure Channel type is visible')
    },

    selectChannelCategory: function (channelType) {
        return this.waitForElementVisible(channelType, channelType + ' channel is visible')
            .click(channelType)
    },

    addNumber: function (number, forwardingNumber) {
        return this.waitForElementVisible('@chooseNumberInput', 'Input for Choosing a number is visible.')
            .setValue('@chooseNumberInput', number)
            .waitForElementVisible('@channelNumberSelector', 'Landline Number is visible')
            .click('@channelNumberSelector')
            .waitForElementVisible('@forwardNumberInput', 'input for forwarding number is visible')
            .setValue('@forwardNumberInput', forwardingNumber)
    },

    channelDetails: function (channelName, purpose, timezone) {
        return this.waitForElementVisible('@channelNameInput', 'channel name input is visible')
            .setValue('@channelNameInput', channelName)
            .verify.visible('@channelPurposeInput', 'channel purpose is visible')
            .setValue('@channelPurposeInput', purpose)
            .verify.visible('@channelTimezoneDropdown', 'timezone dropdown is visible')
            .setValue('@channelTimezoneDropdown', timezone)
            .verify.visible('@channelDSTCheckbox', 'DST checkbox is visible')
            .click('@channelDSTCheckbox')
    },

    editChannelDetailsSection: function (newChannelName, newPurpose) {
        return this.waitForElementVisible('@editChannelPageTitle', 'Channel Opened in edit Mode.')
            .clearValue('@channelNameInput')
            .setValue('@channelNameInput', newChannelName)
            .clearValue('@channelPurposeInput')
            .setValue('@channelPurposeInput', newPurpose)
    },

    enableDisableToggles: function (toggleSetup) {
        return this.waitForElementVisible(toggleSetup, toggleSetup + ' toggle is visible.')
            .click(toggleSetup)
    },

    createUpdateChannel: function (ele, message) {
        return this.waitForElementVisible(ele, message)
            .click(ele)
    },

    checkSuccessMessage: function (success) {
        return this.waitForElementVisible(success, success + ' is visible')
    },

    deleteChannels: function () {
        return this.waitForElementVisible('@editChannelPageTitle', 'Channel Opened in edit Mode.')
            .waitForElementVisible('@deleteChannelButton', 'Delete Channel Button is visible')
            .click('@deleteChannelButton')
            .waitForElementVisible('@confirmDeleteChannel', 'confirm delete button is visible')
            .click('@confirmDeleteChannel')
    },
}

module.exports = {
    commands: [editChannelsCommands],
    url: function () {
        return this.api.launch_url + '/settings/organization/channels/create'
    },
    elements: {

        editChannelPageTitle: {
            selector: `//DIV[@class='app-page__header__title'][contains(text(),'Edit Channel')]`,
            locateStrategy: 'xpath',
        },

        createChannelPageTitle: {
            selector: `//DIV[@class='app-page__header__title'][contains(text(),'New Channel Setup')]`,
            locateStrategy: 'xpath',
        },

        backButton: {
            selector: `//BUTTON[contains(@title, 'Go back')]`,
            locateStrategy: 'xpath',
        },

        newPhoneType: {
            selector: `//SPAN[contains(text(), 'New Phone Number')]`, // for csr view(grabbed from member view)
            locateStrategy: 'xpath',
        },

        chooseNumberInput: {
            selector: `//INPUT[contains(@id,'search')]`,
            locateStrategy: 'xpath',
        },

        forwardNumberInput: {
            selector: `//INPUT[contains(@id,'forwardingNumber')]`,
            locateStrategy: 'xpath',
        },

        facebookChannelType: {
            selector: `//SPAN[contains(text(), 'Facebook')]`,
            locateStrategy: 'xpath',
        },

        rhinoSecureType: {
            selector: `//SPAN[(text()='RhinoSecure')]`,
            locateStrategy: 'xpath',
        },

        existingPhoneType: {
            selector: `//SPAN[@class='form__block-group__label'][contains(text(),'Existing Phone Number')]`,
            locateStrategy: 'xpath',
        },

        channelNameInput: {
            selector: `//INPUT[contains(@id,'channelName')]`,
            locateStrategy: 'xpath',
        },

        channelPurposeInput: {
            selector: `//INPUT[contains(@id,'channelPurpose')]`,
            locateStrategy: 'xpath',
        },

        channelTimezoneDropdown: {
            selector: `//SELECT[contains(@id,'timeZoneId')]`,
            locateStrategy: 'xpath',
        },

        channelDSTCheckbox: {
            selector: `//LABEL[contains(text(),'Daylight saving time observed')]`,
            locateStrategy: 'xpath',
        },

        updateChannelButton: {
            selector: `//SPAN[contains(text(),'Update Channel')]`,
            locateStrategy: 'xpath',
        },

        createChannelButton: {
            selector: `//SPAN[contains(text(), 'Create Channel')]`,
            locateStrategy: 'xpath',
        },

        /*-----------------------------------------------------*/
        // Channel forwarding
        /*-----------------------------------------------------*/

        channelForwardingToggle: {
            selector: `//LABEL[@class='rhinoswitcher__label'][contains(@for,'allowReroute')]`,
            locateStrategy: 'xpath',
        },

        channelCreateSuccessMessage: {
            selector: `//DIV[text()='Channel created successfully.']`,
            locateStrategy: 'xpath',
        },

        channelUpdateSuccessMessage: {
            selector: `//DIV[text()='Channel updated successfully.']`,
            locateStrategy: 'xpath',
        },

        deleteChannelSuccessMessage: {
            selector: `//DIV[text()='Channel deleted successfully.']`,
            locateStrategy: 'xpath',
        },

        channelContainer: {
            selector: `//SPAN[contains(text(),'${testConstants.channel}')]`, // first channel listed to access channel summary container
            locateStrategy: 'xpath',
        },

        editChannel: {
            selector: `//SPAN[contains(text(),'Edit Channel')]`,
            locateStrategy: 'xpath',
        },

        availabilityHoursToggle: {
            selector: `//LABEL[@class='rhinoswitcher__label'][contains(@for,'afterHoursEnabled')]`,
            locateStrategy: 'xpath',
        },

        webFormAddOnnToggle: {
            selector: `//LABEL[@class='rhinoswitcher__label'][contains(@for,'isWebWidgetEnabled')]`,
            locateStrategy: 'xpath',
        },

        deleteChannelButton: {
            selector: `//BUTTON[@title='Delete Channel']`,
            locateStrategy: 'xpath',
        },

        confirmDeleteChannel: {
            selector: `//SPAN[@class='button__text-wrapper'][contains(text(),'Delete Channel')]`,
            locateStrategy: 'xpath',
        },

        channelNumberSelector: {
            selector: `(//*[@class='resource__intro__title__content has-subtitle'])[1]`,
            locateStrategy: 'xpath',
        },

        // Validation Messages
        channelNameValidation: {
            selector: `//DIV[contains(text(),'Name is required')]`,
            locateStrategy: 'xpath',
        },

        timezoneValidation: {
            selector: `//DIV[contains(text(),'Time zone is required')]`,
            locateStrategy: 'xpath',
        },

        channelRouteValidation: {
            selector: `//DIV[@class='alert__body'][contains(text(),'Select at least one route')]`,
            locateStrategy: 'xpath',
        },
    }
};
