const channelRoutCommands = {

    pause: function (time) {
        this.api.pause(time);
        return this;
    },

    validateChannelRoutes: function () {
        return this.waitForElementVisible('@membersButton', 'members button is visible')
            .verify.visible('@groupsButton', 'groups button is visible')
            .verify.visible('@memberInput', 'search input is visible')
            .verify.visible('@firstMember', 'first member is visible')
    },

    selectChannelRoutes: function () {
        return this.waitForElementVisible('@membersButton', 'members button is visible')
            .click('@groupsButton')
            .waitForElementVisible('@firstGroup', 'first group is visible')
            .click('@firstGroup')
            .waitForElementVisible('@membersButton', 'members button is visible')
            .click('@membersButton')
            .waitForElementVisible('@memberInput', 'member input is visible')
            .setValue('@memberInput', 'night')
            .waitForElementVisible('@firstMember', 'first member is visible')
            .click('@firstMember')
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
            selector: `//SPAN[@class='button__text-wrapper'][text()='Members']`,
            locateStrategy: 'xpath'
        },

        groupsButton: {
            selector: `//SPAN[@class='button__text-wrapper'][text()='Groups']`,
            locateStrategy: 'xpath'
        },

        memberInput: {
            selector: `//INPUT[contains(@id, 'preloadedMembers')]`,
            locateStrategy: 'xpath'
        },

        groupInput: {
            selector: `//INPUT[contains(@id, 'search')]`,
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
