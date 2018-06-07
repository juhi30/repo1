'use strict';

const membersCommands = {
  clickAddMember: function () {
    return this.waitForElementVisible('@addMemberButton', 5000, 'Add member button visible').click('@addMemberButton');
  },

  deactivateMember: function () {
    return this.waitForElementVisible('@deactivateButton', 5000, 'Deactivate button is visible').click('@deactivateButton').waitForElementVisible('@finalDeactivateButton', 5000, 'Final deactivate button is visible').click('@finalDeactivateButton').waitForElementVisible('@memberUpdatedToast', 5000, 'Member updated toast visible');
  }
};

const MembersPage = {
  commands: [membersCommands],
  url: 'https://dev.dev-rhinogram.com/settings/organization/members',
  elements: {
    saveMemberButton: {
      selector: `/html/body/div[1]/div/div/div[3]/div/div/button[2]/span`,
      locateStrategy: 'xpath'
    },
    addMemberButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div[1]/div[1]/div/div[2]/div/button/span`,
      locateStrategy: 'xpath'
    },
    addPhotoButton: {
      selector: `//div[@class='cover__body']//button[.='Add Photo']`,
      locateStrategy: 'xpath'
    },
    closeAddPhotoButton: {
      selector: `//div[7]/div/div/div/div[1]/button`,
      locateStrategy: 'xpath'
    },
    firstNameInput: {
      selector: `//*[@id="firstName"]`,
      locateStrategy: 'xpath'
    },
    closeEditMemberFormButton: {
      selector: `/html/body/div[1]/div/div/div[3]/div/div/button[1]/span`,
      locateStrategy: 'xpath'
    },

    // will select the first one on the page
    deactivateButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div[1]/div[2]/div/div[1]/div[2]/span/button`,
      locateStrategy: 'xpath'
    },

    finalDeactivateButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Deactivate']`,
      locateStrategy: 'xpath'
    },

    // -------- Toasts -------//

    memberUpdatedToast: {
      selector: `//DIV[@class='toast__text'][text()='Member updated successfully.']`,
      locateStrategy: 'xpath'
    }
  }
};

module.exports = MembersPage;