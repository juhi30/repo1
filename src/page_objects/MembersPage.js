const testConstants = require('../toolboxes/feeder.toolbox');

const membersCommands = {
  clickAddMember: function() {
    return this.waitForElementVisible('@createMemberButton', 'Add member button visible')
      .click('@createMemberButton');
  },

  deactivateMember: function() {
    return this.waitForElementVisible('@deactivateButton', 'Deactivate button is visible')
      .click('@deactivateButton')
  },

  enterDetails: function(element, value) {
    return this.waitForElementVisible('@createMemberPageTitle', 'Create Member page is open')
    .setValue(element, value)
  },

  createMember: function() {
    return this.enterDetails('@memberFirstName', testConstants.memberFirstName)
    .enterDetails('@memberLastName', testConstants.memberLastName)
    .enterDetails('@memberUsername', testConstants.memberUsername)
    .click('@adminRole')
    .click('@billingAdminRole')
    .click('@memberRole')
    .click('@memberAdminRole')
    .click('@createButton')
    .waitForElementVisible('@createSuccessMessage', 'Member created successfully.')
  }
}

module.exports = {
  commands: [membersCommands],
  url: function () {
      return this.api.launch_url + '/settings/organization/members'
  },
  elements: {

    createMemberButton: {
      selector: `//BUTTON[contains(@title, 'Create Member')]`,
      locateStrategy: 'xpath'
    },

    firstMemberSelector: {
      selector: `(//DIV[@role='button'])[1]`, // dynamic element count used, might need better way to access the members
      locateStrategy: 'xpath'

    },

    /*----------------------------------------------------*/
    // Member summary panel
    /*----------------------------------------------------*/

    closeSummaryButton: {
      selector: `//SPAN[contains(@title, 'Close')]`,
      locateStrategy: 'xpath'
    },

    goToConvoButton: {
      selector: `//SPAN[contains(text(), 'Go to Conversation')]`,
      locateStrategy: 'xpath'
    },

    editMemberButton: {
      selector: `//SPAN[contains(text(), 'Edit Member')]`,
      locateStrategy: 'xpath'
    },

    activateMember: {
      selector: `//SPAN[contains(text(), 'Activate')]`, //Only visible if member is deactivated
      locateStrategy: 'xpath'
    },

    createTempPassword: {
      selector: `//SPAN[contains(text(), 'Create')]`,
      locateStrategy: 'xpath'
    },
    
    confirmTempPassword: {
      selector: `//SPAN[contains(text(), 'Yes')]`,
      locateStrategy: 'xpath'
    },

    cancelTempPassword: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Cancel'][text()='Cancel'])[1]`,
      locateStrategy: 'xpath'
    },

    deactivateMemberButton: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Deactivate'][text()='Deactivate'])[1]`,
      locateStrategy: 'xpath'
    },

    /*----------------------------------------------------*/
    // Deactivate/Reactivate member Modals
    /*----------------------------------------------------*/

    closeDeactivateModal: {
      selector: `//SPAN[contains(@title, 'Close')]`,
      locateStrategy: 'xpath'
    },
    
    cancelInModal: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Cancel'][text()='Cancel'])[2]`,
      locateStrategy: 'xpath'
    },

    deactivateInModal: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Deactivate'][text()='Deactivate'])[2]`,
      locateStrategy: 'xpath'
    },

    reactivateInModal: {
      selector: `//SPAN[contains(text(), 'Reactivate')]`,
      locateStrategy: 'xpath'
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
  }
};
