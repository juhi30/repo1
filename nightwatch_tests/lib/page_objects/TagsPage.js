'use strict';

const tagCommands = {

  pause: function (time) {
    this.api.pause(time);
    return this;
  },

  validateTagPageElements: function () {
    return this.waitForElementVisible('@newTagButton', 3000, 'New Tag button is visible').waitForElementVisible('@firstTag', 3000, 'First tag is visible');
  },

  validateCreateTagModal: function () {
    return this.click('@newTagButton').waitForElementVisible('@createTagButton', 3000, 'Create Tag modal is visible').waitForElementVisible('@tagNameInput', 3000, 'Tag name input is visible').waitForElementVisible('@tagCategoryLocation', 3000, 'Location category is visible').waitForElementVisible('@tagCategoryDepartment', 3000, 'Department category is visible').waitForElementVisible('@tagCategoryRole', 3000, 'Role category is visible').waitForElementVisible('@tagCategoryCustom', 3000, 'Custom category is visible');
  },

  createNewTag: function () {
    return this.setValue('@tagNameInput', 'fake_tag').click('@tagCategoryCustom').pause(1000).click('@createTagButton').waitForElementNotVisible('@createTagButton', 3000, 'New Tag Modal is hidden').waitForElementVisible('@fakeTag', 3000, 'New tag exists');
  },

  editTag: function () {
    return this.waitForElementVisible('@fakeTag', 3000, 'last tag is visible').click('@fakeTag').waitForElementVisible('@updateTagButton', 3000, 'Edit tag modal is visible').click('@tagNameInput').clearValue('@tagNameInput').setValue('@tagNameInput', 'Edited_tag').click('@updateTagButton').waitForElementNotVisible('@updateTagButton', 3000, 'Edit Tag Modal is hidden').waitForElementVisible('@editedTag', 3000, 'Edited tag exists');
  },

  deleteTag: function () {
    return this.waitForElementVisible('@editedTag', 3000, 'last tag is visible').click('@editedTag').waitForElementVisible('@deleteTagTrashIcon', 'Trash Icon is visible').click('@deleteTagTrashIcon').waitForElementVisible('@deleteTagConfirmButton', 'Delete confirm is visible').click('@deleteTagConfirmButton').waitForElementNotVisible('@updateTagButton', 3000, 'Edit Tag Modal is hidden').waitForElementNotPresent('@editedTag', 3000, 'Tag is deleted');
  }
};

const TagsPage = {
  commands: [tagCommands],
  url: function () {
    return this.api.launch_url + '/settings/organization/tags';
  },
  elements: {

    /*------------------------------------------------------------*/
    // Main Page elements
    /*------------------------------------------------------------*/

    newTagButton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[6]`, //shifted count need better grab
      locateStrategy: 'xpath'
    },

    firstTag: {
      selector: `//SPAN[contains(.,'#Charleston')]`, // first tag should be under location
      locateStrategy: 'xpath'
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
      selector: `//INPUT[contains(@id,'tagName')]`, // needs to be fixed for serial number
      locateStrategy: 'xpath'
    },

    tagCategoryLocation: {
      selector: `//LABEL[@class='rhinodio__label'][text()='Location']`,
      locateStrategy: 'xpath'
    },

    tagCategoryDepartment: {
      selector: `//LABEL[@class='rhinodio__label'][text()='Department']`,
      locateStrategy: 'xpath'
    },

    tagCategoryRole: {
      selector: `//LABEL[@class='rhinodio__label'][text()='Role']`,
      locateStrategy: 'xpath'
    },

    tagCategoryCustom: {
      selector: `//LABEL[@class='rhinodio__label'][text()='Custom']`,
      locateStrategy: 'xpath'
    },

    createTagButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Create Tag']`,
      locateStrategy: 'xpath'
    },

    /*------------------------------------------------------------*/
    // Edit Tag modal elements (category xpaths are the same)
    /*------------------------------------------------------------*/

    updateTagButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Update Tag']`,
      locateStrategy: 'xpath'
    },

    deleteTagTrashIcon: {
      selector: `/html/body/div[4]/div/div/div[3]/div/div[1]/button`, // better xpath (svg issue)
      locateStrategy: 'xpath'
    },

    deleteTagConfirmButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Yes, delete tag']`,
      locateStrategy: 'xpath'
    }

  }
};

module.exports = TagsPage;