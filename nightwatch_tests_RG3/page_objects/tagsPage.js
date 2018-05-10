const tagCommands = {

  pause: function (time) {
    this.api.pause(time);
    return this;
  },

  validateTagPageElements: function() {
    return this.waitForElementVisible('@newTagButton', 3000, 'New Tag button is visible')
      .waitForElementVisible('@firstTag', 3000, 'First tag is visible')
  },

  validateCreateTagModal: function() {
    return this.click('@newTagButton')
      .waitForElementVisible('@createTagButton', 3000, 'Create Tag modal is visible')
      .waitForElementVisible('@tagNameInput', 3000, 'Tag name input is visible')        
      .waitForElementVisible('@tagCategoryLocation', 3000, 'Location category is visible')
      .waitForElementVisible('@tagCategoryDepartment ', 3000, 'Department category is visible')
      .waitForElementVisible('@tagCategoryRole', 3000, 'Role category is visible')
      .waitForElementVisible('@tagCategoryCustom', 3000, 'Custom category is visible')
  },

  createNewTag: function() {
    return this.setValue('@tagNameInput', 'fake_tag')
  }
}

module.exports = {
  commands: [tagCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/tags'
  },
  elements: {

  /*------------------------------------------------------------*/
  // Main Page elements
  /*------------------------------------------------------------*/

    newTagButton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[5]`,
      locateStrategy: 'xpath',
    },

    firstTag: {
      selector: `(//BUTTON[@type='button'])[5]`, // first tag should be under location
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------*/
    // New Tag modal elements
    /*------------------------------------------------------------*/

    tagNameInput: {
      selector: `//INPUT[contains(@id,'tagName')]`,// needs to be fixed for serial number
      locateStrategy: 'xpath',
    },

    tagCategoryLocation: {
      selector: `//LABEL[@class='rhinodio__label'][text()='Location']`,
      locateStrategy: 'xpath',
    },

    tagCategoryDepartment: {
      selector: `//LABEL[@class='rhinodio__label'][text()='Department']`,
      locateStrategy: 'xpath',
    },

    tagCategoryRole: {
      selector: `//LABEL[@class='rhinodio__label'][text()='Role']`,
      locateStrategy: 'xpath',
    },

    tagCategoryCustom: {
      selector: `//LABEL[@class='rhinodio__label'][text()='Custom']`,
      locateStrategy: 'xpath',
    },

    createTagButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Create Tag']`,
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------*/
    // Edit Tag modal elements (category xpaths are the same)
    /*------------------------------------------------------------*/

    updateTagButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Update Tag']`,
      locateStrategy: 'xpath',
    },

    deleteTagTrashIcon: {
      selector: `/html/body/div[4]/div/div/div[3]/div/div[1]/button`, // better xpath (svg issue)
      locateStrategy: 'xpath',
    },

    deleteTagConfirmButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Yes, delete tag']`,
      locateStrategy: 'xpath',
    },

  }
}
