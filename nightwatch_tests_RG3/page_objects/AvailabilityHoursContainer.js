const availabilityHoursCommands = {

    pause: function (time) {
        this.api.pause(time);
        return this;
    },

    validateAvailabilityHoursEls: function () {
        return this.waitForElementVisible('@availabilityHoursToggle', 'Hours toggle is visible')
            .click('@availibilityHoursToggle')
            .verify.visible('@sundayFrom', 'Sunday hours visible')
            .verify.visible('@mondayFrom', 'Monday hours visible')
            .verify.visible('@tuesdayFrom', 'Tuesday hours visible')
            .verify.visible('@wednesdayFrom', 'Wednesday hours visible')
            .verify.visible('@thursdayFrom', 'Thursday hours visible')
            .verify.visible('@fridayFrom', 'Friday hours visible')
            .verify.visible('@saturdayFrom', 'Saturday hours visible')
            .verify.visible('@sundayFrom', 'Sunday hours visible')
            // .verify.visible('@timeZoneSelect', 'timezone dropdown is visibile') //timezone disabled till if statement added
            // .verify.visible('@dstCheck', 'DST checkbox is visible') //same as above only available on members page 
            .verify.visible('@autoResponseTextArea', 'Text area is visible')
            .click('@availabilityHoursToggle')
    },

    updateAvailabilityHours: function () {
        return this.waitForElementVisible('@availabilityHoursToggle', 'Hours toggle is visibile')
            .click('@availabilityHoursToggle')
            .setValue('@sundayFrom', '')

    }

}

module.exports = {
    commands: [availabilityHoursCommands],
    // url: function () {
    //     return this.api.launch_url + '/settings/organization/channels'
    // },
    elements: {

        /*-----------------------------------------------------*/
        // Availability hours
        /*-----------------------------------------------------*/

        availabilityHoursToggle: {
                selector: `//LABEL[contains(@for,'afterHoursEnabled')]`, //id could be here too
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

            timeZoneSelect: {
                selector: `//SELECT[contains(@id,'timeZoneId')]`,
                locateStrategy: 'xpath'
            },
            
            dstCheck: {
                selector: `//LABEL[@class='rhinobox__label'][text()='Daylight saving time observed']`,
                locateStrategy: 'xpath'
            },

            autoResponseTextArea: {
                selector: `//TEXTAREA[contains(@id,'autoResponse')]`,
                locateStrategy: 'xpath'
            },
    }
};
