const testConstant = require('../feeder')

const officeCommands = {

    pause: function(time) {
      this.api.pause(time);
      return this;
    },

    validatePageElements: function(){
        return this.waitForElementVisible('@officePageTitle','Office title page is visible')
        .verify.visible('@addOffice','add office icon is visible')
    },

    validateCreateOfficeForm: function(){
        return this.waitForElementVisible('@officeCreatepageTitle','Office creation page is visible and opened')
        .verify.visible('@officeName','Office name input is visible')
        .setValue('@officeName',testConstant.officeName)
        .verify.visible('@officeAddressLine1','Office address line1 input is visible')
        .verify.visible('@officeAddressLine2','Office address line2 input is visible')
        .setValue('@officeAddressLine1',testConstant.officeAddress)
        .verify.visible('@officeCity','Office city input is visible')
        .setValue('@officeCity',testConstant.officecity)
        .verify.visible('@officeState','Office state input is visible')
        .setValue('@officeState',testConstant.officestate)
        .verify.visible('@officeZip','Office zip input is visible')
        .setValue('@officeZip',testConstant.officeZipCode)
    },

    createOffice: function(){
        return this.verify.visible('@createOfficeButton','Create Office Button is visible')
        .click('@createOfficeButton')
    }



}

module.exports = {
    commands: [officeCommands],
    url: function () {
      return this.api.launch_url + '/settings/organization/offices'
    },
    elements: {
        officePageTitle : {
            selector : `//div[@class='app-page__header__title'][text()='Offices']`,
            locateStrategy: 'xpath',
        },

        officeCreatepageTitle:{
            selector:`//DIV[@class='app-page__header__title'][text()='Create Office']`,
            locateStrategy: 'xpath',
        },

        addOffice : {
            selector: `//BUTTON[@title='Create Office']`,
            locateStrategy: 'xpath',
        },

        officeName : {
            selector: `//INPUT[contains(@id,'name')]`,
            locateStrategy: 'xpath',
        },

        officeAddressLine1 : {
            selector : `//INPUT[contains(@id,'street1')]`,
            locateStrategy: 'xpath',
        },

        officeAddressLine2:{
            selector : `//INPUT[contains(@id,'street2')]`,
            locateStrategy: 'xpath',
        },

        officeCity: {
            selector:`//INPUT[contains(@id,'city')]`,
            locateStrategy: 'xpath',
        },

        officeState: {
            selector: `//SELECT[contains(@id,'state')]`,
            locateStrategy: 'xpath',
        },

        officeZip: {
            selector: `//INPUT[contains(@id,'zip')]`,
            locateStrategy: 'xpath',
        },

        createOfficeButton: {
            selector: `//SPAN[@class='button__text-wrapper'][text()='Create Office']`,
            locateStrategy: 'xpath',
        }

    }
}