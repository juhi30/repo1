const tagCommands = {

  pause: function (time) {
    this.api.pause(time);
    return this;
  },

  validateTagPageElements: function () {
    return this.waitForElementVisible('@newTagButton', 'New Tag button is visible')
      .waitForElementVisible('@firstTag', 'First tag is visible')
  },

  validateCreateTagModal: function () {
    return this.click('@newTagButton')
      .waitForElementVisible('@createTagButton', 'Create Tag modal is visible')
      .waitForElementVisible('@tagNameInput', 'Tag name input is visible')
      .waitForElementVisible('@tagCategoryLocation', 'Location category is visible')
      .waitForElementVisible('@tagCategoryDepartment', 'Department category is visible')
      .waitForElementVisible('@tagCategoryRole', 'Role category is visible')
      .waitForElementVisible('@tagCategoryCustom', 'Custom category is visible')
  },

  createNewTag: function () {
    return this.setValue('@tagNameInput', 'fake_tag')
      .click('@tagCategoryCustom')
      .pause(1000)
      .click('@createTagButton')
      .waitForElementNotVisible('@createTagButton', 'New Tag Modal is hidden')
      .waitForElementVisible('@fakeTag', 'New tag exists')
  },

  editTag: function () {
    return this.waitForElementVisible('@fakeTag', 'last tag is visible')
      .click('@fakeTag')
      .waitForElementVisible('@updateTagButton', 'Edit tag modal is visible')
      .click('@tagNameInput')
      .clearValue('@tagNameInput')
      .setValue('@tagNameInput', 'Edited_tag')
      .click('@updateTagButton')
      .waitForElementNotVisible('@updateTagButton', 'Edit Tag Modal is hidden')
      .waitForElementVisible('@editedTag', 'Edited tag exists')
  },

  deleteTag: function () {
    return this.waitForElementVisible('@editedTag', 'last tag is visible')
      .click('@editedTag')
      .waitForElementVisible('@deleteTagTrashIcon', 'Trash Icon is visible')
      .click('@deleteTagTrashIcon')
      .waitForElementVisible('@deleteTagConfirmButton', 'Delete confirm is visible')
      .click('@deleteTagConfirmButton')
      .waitForElementNotVisible('@updateTagButton', 'Edit Tag Modal is hidden')
      .waitForElementNotPresent('@editedTag', 'Tag is deleted')
  },
}

module.exports = {
  commands: [tagCommands],
  url: function () {
    return this.api.launch_url + '/settings/organization/tags'
  },
  elements: {

    /*------------------------------------------------------------*/
    // Main Page elements
    /*------------------------------------------------------------*/

    newTagButton: {
      selector: `//BUTTON[contains(@title, 'Create Tag)]`,
      locateStrategy: 'xpath',
    },

    firstTag: {
      selector: `//SPAN[contains(.,'#Charleston')]`, 
    },

    fakeTag: {
      selector: `//SPAN[contains(.,'#fake_tag')]`,
      locateStrategy: 'xpath'
    },

    editedTag: {
      selector: `//SPAN[contains(.,'#Edited_tag')]`,
      locateStrategy: 'xpath'
    },

    /*------------------------------------------------------------*/
    // New Tag modal elements
    /*------------------------------------------------------------*/

    tagNameInput: {
      selector: `//INPUT[contains(@id,'tagName')]`, 
      locateStrategy: 'xpath',
    },

    tagCategoryLocation: {
      selector: `//LABEL[contains(text(),'Location')]`,
      locateStrategy: 'xpath',
    },

    tagCategoryDepartment: {
      selector: `//LABEL[contains(text(),'Department')]`,
      locateStrategy: 'xpath',
    },

    tagCategoryRole: {
      selector: `//LABEL[contains(text(),'Role')]`,
      locateStrategy: 'xpath',
    },

    tagCategoryCustom: {
      selector: `//LABEL[contains(text(),'Custom')]`,
      locateStrategy: 'xpath',
    },

    createTagButton: {
      selector: `//SPAN[contains(text(),'Create Tag')]`,
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------*/
    // Edit Tag modal elements (category xpaths are the same)
    /*------------------------------------------------------------*/

    updateTagButton: {
      selector: `//SPAN[contains(text(), 'Update Tag')]`,
      locateStrategy: 'xpath',
    },

    deleteTagTrashIcon: {
      selector: `//BUTTON[contains(@title,'Delete Tag')]`,
      locateStrategy: 'xpath',
    },

    deleteTagConfirmButton: {
      selector: `//SPAN[contains(text(),'Yes, delete tag')]`,
      locateStrategy: 'xpath',
    },

  }
}