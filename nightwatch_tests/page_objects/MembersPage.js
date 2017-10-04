const membersCommands = {
  clickAddMember: function() {
    return this.waitForElementVisible('@addMemberButton', 5000, 'Add member button visible')
      .click('@addMemberButton');
  }
}

module.exports = {
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
  }
};
