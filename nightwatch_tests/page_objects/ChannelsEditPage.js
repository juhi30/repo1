const editChannelsCommands = {
    pause: function (time) {
        this.api.pause(time);
        return this;
    },
}

const ChannelsEditPage = {
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
        // Channel forwarding
        /*-----------------------------------------------------*/

        channelForwardingToggle: {
            selector: `//LABEL[contains(@for,'allowChannelReroute')]`, // id could be used here
            locateStrategy: 'xpath'
        }
    }
};

export default ChannelsEditPage;