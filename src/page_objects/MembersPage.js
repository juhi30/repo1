const testConstants = require('../toolboxes/feeder.toolbox');

const membersCommands = {
  clickAddMember: function() {
    return this.waitForElementVisible('@createMemberButton', 'Add member button visible')
      .click('@createMemberButton')
      .waitForElementVisible('@createMemberPageTitle', 'Create Member page is open')
  },

  deactivateMember: function() {
    return this.waitForElementVisible('@deactivateButton', 'Deactivate button is visible')
      .click('@deactivateButton')
  },

  enterDetails: function(element, value) {
    return this.waitForElementVisible(element, element + ' is visible')
    .setValue(element, value)
  },

  setMemberRoles: function (roleName) {
    return this.click(roleName)
  },

  createMember: function() {
    return this.click('@createButton')
      .waitForElementVisible('@createSuccessMessage', 'Member created successfully.')
  },

  getTempPassword: function () {
    return this.getAttribute('@tempPassword', 'value', function (tpObj) {
      global.TEMP_PASSWORD = tpObj.value;
      console.log('Temp password is ==', global.TEMP_PASSWORD);
    });
  },

  getNewTempPassword: function () {
    return this.getAttribute('@tempPassword', 'value', function (tpObj) {
      global.TEMP_NEW_PASSWORD = tpObj.value;
      console.log('Temp password is ==', global.TEMP_NEW_PASSWORD);
    });
  },

  selectMember: function () {
    return this.waitForElementVisible('@selectMemberFromList', 'member name is visible')
    .click('@selectMemberFromList')
  },

  createTempPassword: function () {
    return this.waitForElementVisible('@createTempPassword', 'Create temp password text is visible.')
      .click('@createTempPassword')
      .waitForElementVisible('@confirmTempPassword', 'Confirm password button is visible.')
      .click('@confirmTempPassword')
      .waitForElementVisible('@tempPassword', 'temporary password is visible.')
      .waitForElementVisible('@UpdateSuccessMessage', 'Member is updated successfully with new temporary password.')
  },
}

module.exports = {
  commands: [membersCommands],
  url: function () {
    return this.api.launch_url + '/settings/organization/members'
  },
  elements: {

    createMemberButton: {
      selector: `//BUTTON[contains(@title, 'Create Member')]`,
      locateStrategy: 'xpath',
    },

    selectMemberFromList: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.memberFirstName}')]`,
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------------*/
    // Member summary panel
    /*----------------------------------------------------*/

    closeSummaryButton: {
      selector: `//SPAN[contains(@title, 'Close')]`,
      locateStrategy: 'xpath',
    },

    goToConvoButton: {
      selector: `//SPAN[contains(text(), 'Go to Conversation')]`,
      locateStrategy: 'xpath',
    },

    editMemberButton: {
      selector: `//SPAN[contains(text(), 'Edit Member')]`,
      locateStrategy: 'xpath',
    },

    activateMember: {
      selector: `//SPAN[contains(text(), 'Activate')]`, //Only visible if member is deactivated
      locateStrategy: 'xpath',
    },

    createTempPassword: {
      selector: `//SPAN[contains(text(), 'Create')]`,
      locateStrategy: 'xpath',
    },

    confirmTempPassword: {
      selector: `//SPAN[contains(text(), 'Yes')]`,
      locateStrategy: 'xpath',
    },

    cancelTempPassword: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Cancel'][text()='Cancel'])[1]`,
      locateStrategy: 'xpath',
    },

    deactivateMemberButton: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Deactivate'][text()='Deactivate'])[1]`,
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------------*/
    // Deactivate/Reactivate member Modals
    /*----------------------------------------------------*/

    closeDeactivateModal: {
      selector: `//SPAN[contains(@title, 'Close')]`,
      locateStrategy: 'xpath',
    },

    cancelInModal: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Cancel'][text()='Cancel'])[2]`,
      locateStrategy: 'xpath',
    },

    deactivateInModal: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Deactivate'][text()='Deactivate'])[2]`,
      locateStrategy: 'xpath',
    },

    reactivateInModal: {
      selector: `//SPAN[contains(text(), 'Reactivate')]`,
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------------*/
    // Create Member Form
    /*----------------------------------------------------*/

    createMemberPageTitle: {
      selector: `//*[@class = 'app-page__header__title'][text()='Create Member']`,
      locateStrategy: 'xpath',
    },

    memberFirstName: {
      selector: `//*[contains(@id,'firstName')]`,
      locateStrategy: 'xpath',
    },

    memberLastName: {
      selector: `//*[contains(@id,'lastName')]`,
      locateStrategy: 'xpath',
    },

    memberUsername: {
      selector: `//*[contains(@id,'username')]`,
      locateStrategy: 'xpath',
    },

    memberEmailAddress: {
      selector: `//INPUT[contains(@id,'loginEmail')]`,
      locateStrategy: 'xpath',
    },

    tempPassword: {
      selector: `//*[contains(@id,'tempPassword')]`,
      locateStrategy: 'xpath',
    },

    adminRole: {
      selector: `//*[(text()='Admin')]`,
      locateStrategy: 'xpath',
    },

    billingAdminRole: {
      selector: `//*[(text()='Billing Admin')]`,
      locateStrategy: 'xpath',
    },

    memberRole: {
      selector: `//*[(text()='Member')]`,
      locateStrategy: 'xpath',
    },

    memberAdminRole: {
      selector: `//*[(text()='Member Admin')]`,
      locateStrategy: 'xpath',
    },

    createButton: {
      selector: `//*[@class='button__text-wrapper'][text()= 'Create Member']`,
      locateStrategy: 'xpath'
    },

    createSuccessMessage: {
      selector: `//*[text()='Member created successfully.']`,
      locateStrategy: 'xpath',
    },

    UpdateSuccessMessage: {
      selector : `//*[text()='Member updated successfully.']`,
      locateStrategy: 'xpath',
    },
  }
};
