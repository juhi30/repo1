const testConstants = require('../toolboxes/feeder.toolbox');
const groupsPageCommands = {


  verifyGroupEls: function () {
    return this.waitForElementVisible('@createButton', 'Create Button is visible')
      .click('@createButton')
      .waitForElementVisible('@teamOption', 'Team option is visible')
      .waitForElementVisible('@patientOption', 'Patient option is visible')
      .waitForElementVisible('@patientAndTeamOption', 'Patient and team option is visible')
  },

  selectGroupType: function (groupType) {
    return this.waitForElementVisible(groupType, groupType + ' is visible')
      .click(groupType)
  },

  addGroupDetails: function (groupName, groupPurpose) {
    return this.waitForElementVisible('@nameInput', 'Group Name Input is visible.')
      .setValue('@nameInput', groupName)
      .verify.visible('@purposeInput', 'Purpose Input is visible.')
      .setValue('@purposeInput', groupPurpose)
  },

  createUpdateButton: function (button, successMessage, group) {
    return this.waitForElementVisible(button, button + ' is visible')
      .click(button)
      .waitForElementVisible(successMessage, successMessage + ' is visible')
  },

  checkGroupVisibility: function (nav, list) {
    return this.waitForElementVisible(nav, 'Created ' + nav + ' Group is visible in the navigation section.')
      .waitForElementVisible(list, 'Created' + list + ' Group is visible in the Group List as well.')
  },

  openInEditMode: function (group) {
    return this.waitForElementVisible(group, group + ' is visible')
      .click(group)
      .waitForElementVisible('@editGroupButton', 'Edit Group Button is visible.')
      .click('@editGroupButton')
  },

  convertGroupType: function (newType, newName, newPurpose) {
    return this.waitForElementVisible(newType, newType + ' is visible')
      .click(newType)
      .clearValue('@nameInput')
      .setValue('@nameInput', newName)
      .clearValue('@purposeInput')
      .setValue('@purposeInput', newPurpose)
  },

  addChannel: function () {
    return this.waitForElementVisible('@addChannelLink', 'Channel Link is visible')
      .click('@addChannelLink') // Channel creation with group Route Work
  },

  selectTimezone: function () {
    return this.waitForElementVisible('@groupTimezone', ' Timezone list is visible')
      .setValue('@groupTimezone', testConstants.timeZone)
  },
}

module.exports = {
  commands: [groupsPageCommands],
  url: function () {
    return this.api.launch_url + '/settings/organization/groups'
  },
  elements: {
    groupPageTitle: {
      selector: `//div[@class='app-page__header__title'][text()='Create Group']`,
      locateStrategy: 'xpath',
    },

    groupTimezone: {
      selector: `//SELECT[contains(@id,'timeZoneId')]`,
      locateStrategy: 'xpath',
    },

    createButton: {
      selector: `//BUTTON[@title='Create Group']`,
      locateStrategy: 'xpath',
    },

    // Group Type Options
    teamOption: {
      selector: `//*[@class='form__block-group__label'][text()='Team']`,
      locateStrategy: 'xpath',
    },

    patientOption: {
      selector: `//*[@class='form__block-group__label'][text()='Patient']`,
      locateStrategy: 'xpath',
    },

    patientAndTeamOption: {
      selector: `//*[@class='form__block-group__label'][text()='Patient and Team']`,
      locateStrategy: 'xpath',
    },

    // Group Details
    nameInput: {
      selector: `//INPUT[contains(@name, 'name')]`,
      locateStrategy: 'xpath',
    },

    purposeInput: {
      selector: `//INPUT[contains(@name, 'purpose')]`,
      locateStrategy: 'xpath',
    },

    createGroupButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Create Group']`,
      locateStrategy: 'xpath',
    },

    groupMemberInput: {
      selector: `//INPUT[contains(@id,'preloadedMembers')]`,
      locateStrategy: 'xpath',
    },
    // TagsContainer is a separate page object
    // MembersContainer is a separate page object
    // AvailabilityHoursContainer is a separate page object

    memberNameSearchResult: {
      selector: `//SPAN[(@class='resource__intro__title__content')][contains(text(),'${testConstants.memberName}')]`,
      locateStrategy: 'xpath',
    },

    updateGroupButton: {
      selector: `//SPAN[@class='button__text-wrapper'][contains(text(),'Update Group')]`,
      locateStrategy: 'xpath',
    },

    patientGroup: {
      selector: `//*[contains(@id, 'nav-inbox')]//SPAN[contains(text(),'${testConstants.patientTypeGroup}')]`,
      locateStrategy: 'xpath',
    },

    patientGroupListView: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.patientTypeGroup}')]`,
      locateStrategy: 'xpath',
    },

    teamGroup: {
      selector: `//*[contains(@id, 'nav-chat')]//SPAN[contains(text(),'${testConstants.teamTypeGroup}')]`,
      locateStrategy: 'xpath',
    },

    teamGroupListView: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.teamTypeGroup}')]`,
      locateStrategy: 'xpath',
    },

    patientAndTeamGroup_PatientInbox: {
      selector: `//*[contains(@id, 'nav-inbox')]//SPAN[contains(text(),'${testConstants.patientAndTeamType}')]`,
      locateStrategy: 'xpath',
    },

    patientAndTeamGroup_TeamInbox: {
      selector: `//*[contains(@id, 'nav-chat')]//SPAN[contains(text(),'${testConstants.patientAndTeamType}')]`,
      locateStrategy: 'xpath',
    },

    patientAndTeamGroupListView: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.patientAndTeamType}')]`,
      locateStrategy: 'xpath',
    },

    updatedPatientAndTeamGroupListView: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.updatedpatientAndTeamType}')]`,
      locateStrategy: 'xpath',
    },

    updatedPatientGroup_PatientInbox: {
      selector: `//*[contains(@id, 'nav-inbox')]//SPAN[contains(text(),'${testConstants.updatedPatientTypeGroup}')]`,
      locateStrategy: 'xpath',
    },

    updatedPatientGroup_TeamInbox: {
      selector: `//*[contains(@id, 'nav-chat')]//SPAN[contains(text(),'${testConstants.updatedPatientTypeGroup}')]`,
      locateStrategy: 'xpath',
    },

    updatedPatientGroup_ListView: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.updatedPatientTypeGroup}')]`,
      locateStrategy: 'xpath',
    },

    updatedTeamGroup_TeamInbox: {
      selector: `//*[contains(@id, 'nav-chat')]//SPAN[contains(text(),'${testConstants.updatedTeamTypeGroup}')]`,
      locateStrategy: 'xpath',
    },

    updatedTeamGroup_PatientInbox: {
      selector: `//*[contains(@id, 'nav-inbox')]//SPAN[contains(text(),'${testConstants.updatedTeamTypeGroup}')]`,
      locateStrategy: 'xpath',
    },

    updatedTeamGroup_ListView: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.updatedTeamTypeGroup}')]`,
      locateStrategy: 'xpath',
    },

    groupCreateSuccessMessage: {
      selector: `//DIV[text()='Group created successfully']`,
      locateStrategy: 'xpath',
    },

    groupUpdateSuccessMessage: {
      selector: `//DIV[text()='Group updated successfully']`,
      locateStrategy: 'xpath',
    },

    editGroupButton: {
      selector: `//SPAN[@class='button__text-wrapper'][contains(text(),'Edit Group')]`,
      locateStrategy: 'xpath',
    },

    addChannelLink: {
      selector: `//P[@class='u-text-small']//A[contains(.,'Channels')]`,
      locateStrategy: 'xpath',
    },

    patientgroupChannelName: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(text(),'${testConstants.patientGroupChannel}')]`,
      locateStrategy: 'xpath',
    },

    patientAndTeamGroupChannel: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(text(),'${testConstants.patientAndTeamGroupChannel}')]`,
      locateStrategy: 'xpath',
    },

    createTagButton: {
      selector: `//SPAN[@class='button__text-wrapper'][contains(text(),'Create New Tag')]`,
      locateStrategy: 'xpath',
    },
  }
}
