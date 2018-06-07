const channelRoutCommands = {

    pause: function (time) {
        this.api.pause(time);
        return this;
    },


}

module.exports = {
    commands: [channelRoutCommands],
    // url: function () {
    //     return this.api.launch_url + '/settings/organization/channels'
    // },
    elements: {
        
        /*-------------------------Member container select only-------------------------------*/ 
        
        addMemberButton: {
            selector: `//SPAN[@class='button__text-wrapper'][text()='Add More Members']`,
            locateStrategy: 'xpath'
        },

        reviewButton: {
            selector: `//SPAN[@class='button__text-wrapper'][text()='Review']`,
            locateStrategy: 'xpath'
        },

        /*------------------------------------------------------------------*/
        
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
    }
};
