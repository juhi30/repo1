const rolesFeeder = require('../toolboxes/feeder/role.feeder');

const rolescommands = {


};

module.exports = {
  commands: [rolescommands],
  url() {
    return `${this.api.launch_url}/settings/organization/roles`;
  },

  elements: {
    rolesPageTitle: {
      selector: '//DIV[@class=\'app-page__header__title\'][text()=\'Roles\']',
      locateStrategy: 'xpath',
    },

    addRole: {
      selector: '//BUTTON[@title=\'Create Member\']',
      locateStrategy: 'xpath',
    },

    createRolesPageTitle: {
      selector: '//DIV[@class=\'app-page__header__title\'][text()=\'Create Role\']',
      locateStrategy: 'xpath',
    },

    roleNameInput: {
      selector: '//INPUT[contains(@id,\'name\')]',
      locateStrategy: 'xpath',
    },

    rolePurposeInput: {
      selector: '//INPUT[contains(@id,\'description\')]',
      locateStrategy: 'xpath',
    },

    editAppointmentReminders: {
      selector: '//*[text()=\'Appointment Reminders\']//parent::td//parent::tr//LABEL[contains(@for,\'edit\')]',
      locateStrategy: 'xpath',
    },

    viewAppointmentReminders: {
      selector: '//*[text()=\'Appointment Reminders\']//parent::td//parent::tr//LABEL[contains(@for,\'view\')]',
      locateStrategy: 'xpath',
    },

    viewAuditLogs: {
      selector: '//*[text()=\'Audit Log\']//parent::td//parent::tr//LABEL[contains(@for,\'view\')]',
      locateStrategy: 'xpath',
    },

    editBilling: {
      selector: '//*[text()=\'Billing\']//parent::td//parent::tr//LABEL[contains(@for,\'edit\')]',
      locateStrategy: 'xpath',
    },

    viewBilling: {
      selector: '//*[text()=\'Billing\']//parent::td//parent::tr//LABEL[contains(@for,\'view\')]',
      locateStrategy: 'xpath',
    },

    editChannel: {
      selector: '//*[text()=\'Channels\']//parent::td//parent::tr//LABEL[contains(@for,\'edit\')]',
      locateStrategy: 'xpath',
    },

    viewChannel: {
      selector: '//*[text()=\'Channels\']//parent::td//parent::tr//LABEL[contains(@for,\'view\')]',
      locateStrategy: 'xpath',
    },

    editGroups: {
      selector: '//*[text()=\'Groups\']//parent::td//parent::tr//LABEL[contains(@for,\'edit\')]',
      locateStrategy: 'xpath',
    },

    viewGroups: {
      selector: '//*[text()=\'Groups\']//parent::td//parent::tr//LABEL[contains(@for,\'view\')]',
      locateStrategy: 'xpath',
    },

    deleteMembers: {
      selector: '//*[text()=\'Members\']//parent::td//parent::tr//LABEL[contains(@for,\'delete\')]',
      locateStrategy: 'xpath',
    },

    editMembers: {
      selector: '//*[text()=\'Members\']//parent::td//parent::tr//LABEL[contains(@for,\'edit\')]',
      locateStrategy: 'xpath',
    },

    viewMembers: {
      selector: '//*[text()=\'Members\']//parent::td//parent::tr//LABEL[contains(@for,\'view\')]',
      locateStrategy: 'xpath',
    },

    deleteOffices: {
      selector: '//*[text()=\'Offices\']//parent::td//parent::tr//LABEL[contains(@for,\'delete\')]',
      locateStrategy: 'xpath',
    },

    editOffices: {
      selector: '//*[text()=\'Offices\']//parent::td//parent::tr//LABEL[contains(@for,\'edit\')]',
      locateStrategy: 'xpath',
    },

    viewOffices: {
      selector: '//*[text()=\'Offices\']//parent::td//parent::tr//LABEL[contains(@for,\'view\')]',
      locateStrategy: 'xpath',
    },

    deleteOOO: {
      selector: '//*[text()=\'Out of Office\']//parent::td//parent::tr//LABEL[contains(@for,\'delete\')]',
      locateStrategy: 'xpath',
    },

    editOOO: {
      selector: '//*[text()=\'Out of Office\']//parent::td//parent::tr//LABEL[contains(@for,\'edit\')]',
      locateStrategy: 'xpath',
    },

    viewOOO: {
      selector: '//*[text()=\'Out of Office\']//parent::td//parent::tr//LABEL[contains(@for,\'view\')]',
      locateStrategy: 'xpath',
    },

    editPreferences: {
      selector: '//*[text()=\'Preferences\']//parent::td//parent::tr//LABEL[contains(@for,\'edit\')]',
      locateStrategy: 'xpath',
    },

    viewPreferences: {
      selector: '//*[text()=\'Preferences\']//parent::td//parent::tr//LABEL[contains(@for,\'view\')]',
      locateStrategy: 'xpath',
    },

    editProfile: {
      selector: '//*[text()=\'Profile\']//parent::td//parent::tr//*[contains(@id,\'edit\')]',
      locateStrategy: 'xpath',
    },

    viewProfile: {
      selector: '//*[text()=\'Profile\']//parent::td//parent::tr//LABEL[contains(@for,\'view\')]',
      locateStrategy: 'xpath',
    },

    deleteRoles: {
      selector: '//*[text()=\'Roles\']//parent::td//parent::tr//LABEL[contains(@for,\'delete\')]',
      locateStrategy: 'xpath',
    },

    editRoles: {
      selector: '//*[text()=\'Roles\']//parent::td//parent::tr//LABEL[contains(@for,\'edit\')]',
      locateStrategy: 'xpath',
    },

    viewRoles: {
      selector: '//*[text()=\'Roles\']//parent::td//parent::tr//LABEL[contains(@for,\'view\')]',
      locateStrategy: 'xpath',
    },

    deleteTags: {
      selector: '//*[text()=\'Tags\']//parent::td//parent::tr//LABEL[contains(@for,\'delete\')]',
      locateStrategy: 'xpath',
    },

    editTags: {
      selector: '//*[text()=\'Tags\']//parent::td//parent::tr//LABEL[contains(@for,\'edit\')]',
      locateStrategy: 'xpath',
    },

    viewTags: {
      selector: '//*[text()=\'Tags\']//parent::td//parent::tr//LABEL[contains(@for,\'view\')]',
      locateStrategy: 'xpath',
    },

    deleteTemplates: {
      selector: '//*[text()=\'Templates\']//parent::td//parent::tr//LABEL[contains(@for,\'delete\')]',
      locateStrategy: 'xpath',
    },

    editTemplates: {
      selector: '//*[text()=\'Templates\']//parent::td//parent::tr//LABEL[contains(@for,\'edit\')]',
      locateStrategy: 'xpath',
    },

    viewTemplates: {
      selector: '//*[text()=\'Templates\']//parent::td//parent::tr//LABEL[contains(@for,\'view\')]',
      locateStrategy: 'xpath',
    },

    // ----------------Page objets for Message Actions------------

    AssignMessagetoSelf: {
      selector: '//*[text()=\'Assign Message to Self\']//parent::td//parent::tr//LABEL[contains(@for,\'edit\')]',
      locateStrategy: 'xpath',
    },

    assignMessagetoGroup: {
      selector: '//*[text()=\'Assign Message to Group\']//parent::td//parent::tr//LABEL[contains(@for,\'edit\')]',
      locateStrategy: 'xpath',
    },

    assignMessagetoMember: {
      selector: '//*[text()=\'Assign Message to Member\']//parent::td//parent::tr//LABEL[contains(@for,\'edit\')]',
      locateStrategy: 'xpath',
    },

    closeConversation: {
      selector: '//*[text()=\'Close Conversation\']//parent::td//parent::tr//LABEL[contains(@for,\'edit\')]',
      locateStrategy: 'xpath',
    },

    deleteContactsAndConversation: {
      selector: '//*[text()=\'Contacts & Conversations\']//parent::td//parent::tr//LABEL[contains(@for,\'delete\')]',
      locateStrategy: 'xpath',
    },

    editContactsAndConversation: {
      selector: '//*[text()=\'Contacts & Conversations\']//parent::td//parent::tr//LABEL[contains(@for,\'edit\')]',
      locateStrategy: 'xpath',
    },

    viewContactsAndConversation: {
      selector: '//*[text()=\'Contacts & Conversations\']//parent::td//parent::tr//LABEL[contains(@for,\'view\')]',
      locateStrategy: 'xpath',
    },

    // -------Miscellanous actions-------

    viewAnalyticsDashboard: {
      selector: '//*[text()=\'Analytics Dashboard\']//parent::td//parent::tr//LABEL[contains(@for,\'view\')]',
      locateStrategy: 'xpath',
    },

    addMoreMembersButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Add More Members\']',
      locateStrategy: 'xpath',
    },

    memberSearch: {
      selector: '//INPUT[contains(@id,\'preloadedMembers\')]',
      locateStrategy: 'xpath',
    },

    memberSearchResult: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${rolesFeeder.roleMember1}')]`,
      locateStrategy: 'xpath',
    },

    newMemberSearchResult: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${rolesFeeder.roleMember2}')]`,
      locateStrategy: 'xpath',
    },

    createRoleButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Create Role\']',
      locateStrategy: 'xpath',
    },

    roleCreationSuccessMessage: {
      selector: '//DIV[text()=\'Role created successfully.\']',
      locateStrategy: 'xpath',
    },

    roleDeletionSuccessMessage: {
      selector: '//DIV[text()=\'Role deleted successfully.\']',
      locateStrategy: 'xpath',
    },

    roleTitle: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${rolesFeeder.roleName}')]`,
      locateStrategy: 'xpath',

    },

    newRoleTitle: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${rolesFeeder.newRoleName}')]`,
      locateStrategy: 'xpath',
    },

    editRoleButton: {
      selector: '//SPAN[text()=\'Edit Role\']',
      locateStrategy: 'xpath',
    },

    updateRoleButton: {
      selector: '//SPAN[text()=\'Update Role\']',
      locateStrategy: 'xpath',
    },

    roleUpdationSuccessMessage: {
      selector: '//DIV[text()=\'Role updated successfully.\']',
      locateStrategy: 'xpath',
    },

    deleteRoleButton: {
      selector: '//BUTTON[@title=\'Delete Channel\']',
      locateStrategy: 'xpath',
    },

    confirmDeleteButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Yes, delete role\']',
      locateStrategy: 'xpath',
    },

    roleDetetionSuccessMessage: {
      selector: '//DIV[text()=\'Role deleted successfully.\']',
      locateStrategy: 'xpath',
    },
  },
};
