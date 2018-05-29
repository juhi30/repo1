const editChannelsCommands = {

    pause: function (time) {
        this.api.pause(time);
        return this;
    },

    

}

module.exports = {
    commands: [editChannelsCommands],
    url: function () {
        return this.api.launch_url + '/settings/organization/channels/edit'
    },
    elements: {

        /*-----------------------------------------------------*/
        // Edit Channel main components
        /*-----------------------------------------------------*/

        backButton: {
            selector: ``,
            locateStrategy: 'xpath'
        },

        newNumberRadio: {
            selector: ``,
            locateStrategy: 'xpath'
        },

        searchNumberInput: {
            selector: `//INPUT[contains(@id,'search')]`,
            locateStrategy: 'xpath'
        },

        forwardNumberInput: {
            selector: `//INPUT[contains(@id,'forwardingNumber')]`,
            locateStrategy: 'xpath'
        },

        facebookChannelRadio: {
            selector:  ``,
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

        /*-----------------------------------------------------*/
        //Channel tags check
        /*-----------------------------------------------------*/


        /*-----------------------------------------------------*/
        //Channel route
        /*-----------------------------------------------------*/

        membersButton: {    
            selector: `//SPAN[contains(.,'Members')]`,
            locateStrategy: 'xpath'
        },

        groupsButton: {
            selector: `//SPAN[contains(.,'Groups')]`,
            locateStrategy: 'xpath'
        },

        routeInput: {
            selector: `//INPUT[contains(@id, 'preloadedMembers')]`,
            locateStrategy: 'xpath'
        },

        firstMember: {
            selector: `//SPAN[contains(., 'Night Member')]`,
            locateStrategy: 'xpath'
        },

        firstGroup: {
            selector: `//SPAN[contains(., 'QA Inbox & Chat Group')]`,
            locateStrategy: 'xpath'
        },

        /*-----------------------------------------------------*/
        // Availability hours
        /*-----------------------------------------------------*/

        availabilityHoursToggle: {
            selector: `(//LABEL[@class='rhinoswitcher__label'])[1]`, //id could be here too
            locateStrategy: 'xpath'
        },

        sundayFrom: {
            selector: `//SELECT[contains(@id,'from-0')]`,
            locateStrategy: 'xpath'
        },

        sundayTo: {
            selector: `//SELECT[contains(@id,'from-0')]`,
            locateStrategy: 'xpath'
        },

        mondayFrom: {
            selector: `//SELECT[contains(@id,'from-1')]`,
            locateStrategy: 'xpath'
        },

        mondayTo: {
            selector: `//SELECT[contains(@id,'to-1')]`,
            locateStrategy: 'xpath'
        },

        tuesdayFrom: {
            selector: `//SELECT[contains(@id,'from-2')]`,
            locateStrategy: 'xpath'
        },

        tuesdayTo: {
            selector: `//SELECT[contains(@id,'to-2')]`,
            locateStrategy: 'xpath'
        },

        wednesdayFrom: {
            selector: `//SELECT[contains(@id,'from-3')]`,
            locateStrategy: 'xpath'
        },

        wednesdayTo: {
            selector: `//SELECT[contains(@id,'to-3')]`,
            locateStrategy: 'xpath'
        },

        thursdayFrom: {
            selector: `//SELECT[contains(@id,'from-4')]`,
            locateStrategy: 'xpath'
        },

        thursdayTo: {
            selector: `//SELECT[contains(@id,'to-4')]`,
            locateStrategy: 'xpath'
        },

        fridayFrom: {
            selector: `//SELECT[contains(@id,'from-5')]`,
            locateStrategy: 'xpath'
        },

        fridayTo: {
            selector: `//SELECT[contains(@id,'to-5')]`,
            locateStrategy: 'xpath'
        },

        saturdayFrom: {
            selector: `//SELECT[contains(@id,'from-6')]`,
            locateStrategy: 'xpath'
        },

        saturdayTo: {
            selector: `//SELECT[contains(@id,'to-6')]`,
            locateStrategy: 'xpath'
        },

        autoResponseTextArea: {
            selector: `//TEXTAREA[contains(@id,'autoResponse')]`,
            locateStrategy: 'xpath'
        },

        /*-----------------------------------------------------*/
        // Channel forwarding
        /*-----------------------------------------------------*/

        channelForwardingToggle: {
            selector: `(//LABEL[@class='rhinoswitcher__label'])[2]`, // id could be used here
            locateStrategy: 'xpath'
        }
    }
};
