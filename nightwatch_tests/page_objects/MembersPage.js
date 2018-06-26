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
      selector: `//BUTTON[contains(@title, 'Create Member')]`
    },

    firstMemberSelector: {
      selector: `(//DIV[@role='button'])[1]` // dynamic element count used might need better way to access the members
    },

    /*----------------------------------------------------*/
    // Member summary panel
    /*----------------------------------------------------*/

    closeSummaryButton: {
      selector: `//SPAN[contains(@title, 'Close')]`
    },

    goToConvoButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Go to Conversation']`
    },

    editMemberButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Edit Member']`
    },

    activateMember: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Activate']` //Only visible if member is deactivated
    },

    createTempPassword: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Create']`
    },
    
    confirmTempPassword: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Yes']`
    },

    cancelTempPassword: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Cancel'][text()='Cancel'])[1]`
    },

    deactivateMemberButton: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Deactivate'][text()='Deactivate'])[1]`
    },

    /*----------------------------------------------------*/
    // Deactivate/Reactivate member Modals
    /*----------------------------------------------------*/

    closeDeactivateModal: {
      selector: `//SPAN[contains(@title, 'Close')]`
    },
    
    cancelInModal: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Cancel'][text()='Cancel'])[2]`
    },

    deactivateInModal: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Deactivate'][text()='Deactivate'])[2]`
    },

    reactivateInModal: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Reactivate']`
    },
  }
};
