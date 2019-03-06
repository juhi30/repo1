const rolescommands = {

    validateRolesPage : function(){
        return this.waitForElementVisible('@rolesPageTitle','Roles Page is opened')
        .verify.visible('@createRoleButton','Create Roles Button is visible')
        .click('@createRoleButton')
        .waitForElementVisible('@createRolesPageTitle','create role page is opened')
        .setValue('@roleNameInput','test roles')
        .click('@viewAppointmentReminders')
    }

}

module.exports = {
    commands: [rolescommands],
    url: function () {
        return this.api.launch_url + '/settings/organization/roles'
    },

    elements: {

        rolesPageTitle : {
            selector : `//DIV[@class='app-page__header__title'][text()='Roles']`,
            locateStrategy : 'xpath',
        },

        createRoleButton : {
            selector : `//BUTTON[@title='Create Member']`,
            locateStrategy : 'xpath',
        },

        createRolesPageTitle: {
            selector : `//DIV[@class='app-page__header__title'][text()='Create Role']`,
            locateStrategy : 'xpath',
        },

        roleDetailTitle : {
            selector : `//DIV[@class='box__title'][text()='ROLE DETAILS']`,
            locateStrategy : 'xpath',
        },  

        roleNameInput : {
            selector : `//INPUT[contains(@id,'name')]`,
            locateStrategy: 'xpath',
        },

        rolePurposeInput : {
            selector : `//INPUT[contains(@id,'description')]`,
            locateStrategy : 'xpath',
        },

        editAppointmentReminders : {
            selector : `//*[text()='Appointment Reminders']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy : 'xpath',
        },

        viewAppointmentReminders: {
            selector:`//*[text()='Appointment Reminders']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        viewAuditLogs : {
            selector : `//*[text()='Audit Log']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy : 'xpath',
        },

        editBilling: {
            selector : `//*[text()='Billing']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy : 'xpath',
        },

        viewBilling: {
            selector : `//*[text()='Billing']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy : 'xpath',
        },

        editChannel: {
            selector : `//*[text()='Channels']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy : 'xpath',
        },

        viewChannel: {
            selector: `//*[text()='Channels']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        editGroups: {
            selector: `//*[text()='Groups']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        viewGroups :{
            selector : `//*[text()='Groups']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        deleteMembers : {
            selector: `//*[text()='Members']//parent::td//parent::tr//LABEL[contains(@for,'delete')]`,
            locateStrategy: 'xpath',
        },

        editMembers:{
            selector : `//*[text()='Members']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy:'xpath',
        },

        viewMembers: {
            selector: `//*[text()='Members']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy:'xpath',
        },

        deleteOffices : {
            selector:`//*[text()='Offices']//parent::td//parent::tr//LABEL[contains(@for,'delete')]`,
            locateStrategy:'xpath',
        },

        editOffices : {
            selector:`//*[text()='Offices']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy:'xpath',
        },

        viewOffices: {
            selector:`//*[text()='Offices']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy:'xpath',
        },

        deleteOOO : {
            selector:`//*[text()='Out of Office']//parent::td//parent::tr//LABEL[contains(@for,'delete')]`,
            locateStrategy:'xpath',
        },

        editOOO : {
            selector:`//*[text()='Out of Office']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy:'xpath',
        },

        viewOOO: {
            selector:`//*[text()='Out of Office']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy:'xpath',
        },

        editPreferences : {
            selector:`//*[text()='Preferences']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy:'xpath',
        },

        viewPreferences: {
            selector:`//*[text()='Preferences']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy:'xpath',
        }
























    }

}