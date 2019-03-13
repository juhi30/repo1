const testConstants = require("../toolboxes/feeder.toolbox");

const rolescommands = {

    verifyRoleCreation: function () {
        return this.waitForElementVisible('@rolesPageTitle', 'Roles Page is opened')
            .verify.visible('@addRole', 'Create Roles Button is visible')
            .click('@addRole')
            .waitForElementVisible('@createRolesPageTitle', 'create role page is opened')
            .setValue('@roleNameInput', testConstants.roleName)
            .setValue('@rolePurposeInput', testConstants.rolePurpose)
            .click('@editAppointmentReminders')
            .click('@viewAppointmentReminders')
            .click('@viewAuditLogs')
            .click('@editBilling')
            .click('@viewBilling')
            .click('@editChannel')
            .click('@viewChannel')
            .click('@editGroups')
            .click('@viewGroups')
            .click('@deleteMembers')
            .click('@editMembers')
            .click('@viewMembers')
            .click('@deleteOffices')
            .click('@editOffices')
            .click('@viewOffices')
            .click('@deleteOOO')
            .click('@editOOO')
            .click('@viewOOO')
            .click('@editPreferences')
            .click('@viewPreferences')
            .click('@editProfile')
            .click('@viewProfile')
            .click('@deleteRoles')
            .click('@editRoles')
            .click('@viewRoles')
            .click('@deleteTags')
            .click('@editTags')
            .click('@viewTags')
            .click('@deleteTemplates')
            .click('@editTemplates')
            .click('@viewTemplates')
            .click('@AssignMessagetoSelf')
            .click('@assignMessagetoGroup')
            .click('@assignMessagetoMember')
            .click('@closeConversation')
            .click('@editContactsAndConversation')
            .click('@deleteContactsAndConversation')
            .click('@viewContactsAndConversation')
            .click('@viewAnalyticsDashboard')
    },

    verifyRoleUpdation: function () {
        return this.waitForElementVisible('@roleTitle', 'created role ' + testConstants.roleName + ' is visible')
            .click('@roleTitle')
            .waitForElementVisible('@editRoleButton', ' edit role button is visible.')
            .click('@editRoleButton')
            .waitForElementVisible('@roleNameInput', ' edit role page is opened.')
            .clearValue('@roleNameInput')
            .setValue('@roleNameInput', testConstants.newRoleName)
            .clearValue('@rolePurposeInput')
            .setValue('@rolePurposeInput', testConstants.roleNewPurpose)
            .click('@editChannel')
            .click('@viewChannel')
            .click('@editGroups')
            .click('@viewGroups')
            .click('@deleteMembers')
            .click('@editMembers')
            .click('@viewMembers')
            .click('@deleteOffices')
            .click('@editOffices')
            .click('@viewOffices')
            .click('@deleteOOO')
            .click('@editOOO')
            .click('@viewOOO')
            .click('@editPreferences')
            .click('@viewPreferences')
            .click('@editProfile')
            .click('@viewProfile')
            .click('@memberSearchResult')
            .click('@addMoreMembersButton')
            .waitForElementVisible('@memberSearch', 'search box is visible..')
            .setValue('@memberSearch', testConstants.roleMember2)
            .waitForElementVisible('@newMemberSearchResult', testConstants.roleMember2 + ' is visible')
            .click('@newMemberSearchResult')
    },

    verifyRoleDeletion: function () {
        return this.waitForElementVisible('@newRoleTitle', 'updated role is visible')
            .click('@newRoleTitle')
            .waitForElementVisible('@editRoleButton', ' Summary panel opened and edit role button is visible.')
            .click('@editRoleButton')
            .waitForElementVisible('@newMemberSearchResult', testConstants.roleMember2 + ' is visible')
            .click('@newMemberSearchResult')
            .click('@deleteRoleButton')
            .waitForElementVisible('@confirmDeleteButton', ' confirm delete button is visible now.')
            .click('@confirmDeleteButton')
            .waitForElementVisible('@roleDeletionSuccessMessage', 'Role Deleted successfully - Message is visible.')
    },

    editRole: function(){
        return this.waitForElementVisible('@adminRole', '@adminRole' + ' is visible')
            .click('@adminRole')
            .waitForElementVisible('@editRoleButton', ' edit role button is visible.')
            .click('@editRoleButton')
            .waitForElementVisible('@editRolePageTitle','role opened in edit mode!')
    },

    addMemberToRole: function () {
        return this.click('@addMoreMembersButton')
            .waitForElementVisible('@memberSearch', 'search box is visible..')
            .setValue('@memberSearch', testConstants.roleMember1)
            .waitForElementVisible('@memberSearchResult', testConstants.roleMember1 + ' is visible')
            .click('@memberSearchResult')
    },

    createRole:function(){
        return this.verify.waitForElementVisible('@createRoleButton','create role button is visible')
        .click('@createRoleButton')
        .waitForElementVisible('@roleCreationSuccessMessage', 'role creation message is visible.')
    },

    verifyUpdateRole: function () {
        return this.verify.visible('@updateRoleButton', 'update Role Button is visible')
            .click('@updateRoleButton')
            .waitForElementVisible('@roleUpdationSuccessMessage', ' role is updated and message is visible.')
    },
}

module.exports = {
    commands: [rolescommands],
    url: function () {
        return this.api.launch_url + '/settings/organization/roles'
    },

    elements: {

        //Admin Roles that are already created
        adminRole: {
            selector: `//SPAN[@class='resource__intro__title__content'][text()='${testConstants.adminRole}']`,
            locateStrategy: 'xpath',
        },

        billingRole: {
            selector: `//SPAN[@class='resource__intro__title__content'][text()='${testConstants.billingRole}']`,
            locateStrategy: 'xpath',
        },

        memberRole: {
            selector: `//SPAN[@class='resource__intro__title__content'][text()='${testConstants.memberRole}']`,
            locateStrategy: 'xpath',
        },

        memberAdminRole: {
            selector: `//SPAN[@class='resource__intro__title__content'][text()='${testConstants.memberAdminRole}']`,
            locateStrategy: 'xpath',
        },

        templatesRole: {
            selector: `//SPAN[@class='resource__intro__title__content'][text()='${testConstants.templateRole}']`,
            locateStrategy: 'xpath',
        },

        rolesPageTitle: {
            selector: `//DIV[@class='app-page__header__title'][text()='Roles']`,
            locateStrategy: 'xpath',
        },

        addRole: {
            selector: `//BUTTON[@title='Create Member']`,
            locateStrategy: 'xpath',
        },

        createRolesPageTitle: {
            selector: `//DIV[@class='app-page__header__title'][text()='Create Role']`,
            locateStrategy: 'xpath',
        },

        editRolePageTitle:{
            selector: `//DIV[@class='app-page__header__title'][text()='Edit Role']`,
            locateStrategy: 'xpath',
        },

        roleNameInput: {
            selector: `//INPUT[contains(@id,'name')]`,
            locateStrategy: 'xpath',
        },

        rolePurposeInput: {
            selector: `//INPUT[contains(@id,'description')]`,
            locateStrategy: 'xpath',
        },

        editAppointmentReminders: {
            selector: `//*[text()='Appointment Reminders']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        viewAppointmentReminders: {
            selector: `//*[text()='Appointment Reminders']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        viewAuditLogs: {
            selector: `//*[text()='Audit Log']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        editBilling: {
            selector: `//*[text()='Billing']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        viewBilling: {
            selector: `//*[text()='Billing']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        editChannel: {
            selector: `//*[text()='Channels']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        viewChannel: {
            selector: `//*[text()='Channels']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        editGroups: {
            selector: `//*[text()='Groups']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        viewGroups: {
            selector: `//*[text()='Groups']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        deleteMembers: {
            selector: `//*[text()='Members']//parent::td//parent::tr//LABEL[contains(@for,'delete')]`,
            locateStrategy: 'xpath',
        },

        editMembers: {
            selector: `//*[text()='Members']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        viewMembers: {
            selector: `//*[text()='Members']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        deleteOffices: {
            selector: `//*[text()='Offices']//parent::td//parent::tr//LABEL[contains(@for,'delete')]`,
            locateStrategy: 'xpath',
        },

        editOffices: {
            selector: `//*[text()='Offices']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        viewOffices: {
            selector: `//*[text()='Offices']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        deleteOOO: {
            selector: `//*[text()='Out of Office']//parent::td//parent::tr//LABEL[contains(@for,'delete')]`,
            locateStrategy: 'xpath',
        },

        editOOO: {
            selector: `//*[text()='Out of Office']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        viewOOO: {
            selector: `//*[text()='Out of Office']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        editPreferences: {
            selector: `//*[text()='Preferences']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        viewPreferences: {
            selector: `//*[text()='Preferences']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        editProfile: {
            selector: `//*[text()='Profile']//parent::td//parent::tr//*[contains(@id,'edit')]`,
            locateStrategy: 'xpath',
        },

        viewProfile: {
            selector: `//*[text()='Profile']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        deleteRoles: {
            selector: `//*[text()='Roles']//parent::td//parent::tr//LABEL[contains(@for,'delete')]`,
            locateStrategy: 'xpath',
        },

        editRoles: {
            selector: `//*[text()='Roles']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        viewRoles: {
            selector: `//*[text()='Roles']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        deleteTags: {
            selector: `//*[text()='Tags']//parent::td//parent::tr//LABEL[contains(@for,'delete')]`,
            locateStrategy: 'xpath',
        },

        editTags: {
            selector: `//*[text()='Tags']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        viewTags: {
            selector: `//*[text()='Tags']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        deleteTemplates: {
            selector: `//*[text()='Templates']//parent::td//parent::tr//LABEL[contains(@for,'delete')]`,
            locateStrategy: 'xpath',
        },

        editTemplates: {
            selector: `//*[text()='Templates']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        viewTemplates: {
            selector: `//*[text()='Templates']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        //----------------Page objets for Message Actions------------

        AssignMessagetoSelf: {
            selector: `//*[text()='Assign Message to Self']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        assignMessagetoGroup: {
            selector: `//*[text()='Assign Message to Group']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        assignMessagetoMember: {
            selector: `//*[text()='Assign Message to Member']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        closeConversation: {
            selector: `//*[text()='Close Conversation']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        deleteContactsAndConversation: {
            selector: `//*[text()='Contacts & Conversations']//parent::td//parent::tr//LABEL[contains(@for,'delete')]`,
            locateStrategy: 'xpath',
        },

        editContactsAndConversation: {
            selector: `//*[text()='Contacts & Conversations']//parent::td//parent::tr//LABEL[contains(@for,'edit')]`,
            locateStrategy: 'xpath',
        },

        viewContactsAndConversation: {
            selector: `//*[text()='Contacts & Conversations']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        //-------Miscellanous actions-------

        viewAnalyticsDashboard: {
            selector: `//*[text()='Analytics Dashboard']//parent::td//parent::tr//LABEL[contains(@for,'view')]`,
            locateStrategy: 'xpath',
        },

        addMoreMembersButton: {
            selector: `//SPAN[@class='button__text-wrapper'][text()='Add More Members']`,
            locateStrategy: 'xpath',
        },

        memberSearch: {
            selector: `//INPUT[contains(@id,'preloadedMembers')]`,
            locateStrategy: 'xpath',
        },

        memberSearchResult: {
            selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.roleMember1}')]`,
            locateStrategy: 'xpath',
        },

        newMemberSearchResult: {
            selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.roleMember2}')]`,
            locateStrategy: 'xpath',
        },

        createRoleButton: {
            selector: `//SPAN[@class='button__text-wrapper'][text()='Create Role']`,
            locateStrategy: 'xpath',
        },

        roleCreationSuccessMessage: {
            selector: `//DIV[text()='Role created successfully.']`,
            locateStrategy: 'xpath',
        },

        roleDeletionSuccessMessage: {
            selector: `//DIV[text()='Role deleted successfully.']`,
            locateStrategy: 'xpath',
        },

        roleTitle: {
            selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.roleName}')]`,
            locateStrategy: 'xpath',

        },

        newRoleTitle: {
            selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.newRoleName}')]`,
            locateStrategy: 'xpath',
        },

        editRoleButton: {
            selector: `//SPAN[text()='Edit Role']`,
            locateStrategy: 'xpath',
        },

        updateRoleButton: {
            selector: `//SPAN[text()='Update Role']`,
            locateStrategy: 'xpath',
        },

        roleUpdationSuccessMessage: {
            selector: `//DIV[text()='Role updated successfully.']`,
            locateStrategy: 'xpath',
        },

        deleteRoleButton: {
            selector: `//BUTTON[@title='Delete Channel']`,
            locateStrategy: 'xpath'
        },

        confirmDeleteButton: {
            selector: `//SPAN[@class='button__text-wrapper'][text()='Yes, delete role']`,
            locateStrategy: 'xpath',
        },

        roleDetetionSuccessMessage: {
            selector: `//DIV[text()='Role deleted successfully.']`,
            locateStrategy: 'xpath',
        }
    }
}

