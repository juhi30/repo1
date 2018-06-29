const membersCommands = {
  clickAddMember: function() {
    return this.waitForElementVisible('@addMemberButton', 'Add member button visible')
      .click('@addMemberButton');
  },

  deactivateMember: function() {
    return this.waitForElementVisible('@deactivateButton', 'Deactivate button is visible')
      .click('@deactivateButton')
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
      selector: `//SPAN[@class='button__text-wrapper'][text()='Go to Conversation']`,
      locateStrategy: 'xpath'
    },

    editMemberButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Edit Member']`,
      locateStrategy: 'xpath'
    },

    activateMember: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Activate']`, //Only visible if member is deactivated
      locateStrategy: 'xpath'
    },

    createTempPassword: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Create']`,
      locateStrategy: 'xpath'
    },
    
    confirmTempPassword: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Yes']`,
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
      selector: `//SPAN[@class='button__text-wrapper'][text()='Reactivate']`,
      locateStrategy: 'xpath'
    },
  }
};
