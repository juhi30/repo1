import logger from 'rhinotilities/lib/loggers/logger';

const tagsFeeder = require('../feeder/tags.feeder');

const tagCommands = {
  validateTagPageElements() {
    return this.waitForElementVisible('@newTagButton', 'New Tag button is visible')
      .waitForElementVisible('@charlestonTag', 'First tag is visible');
  },

  validateCreateTagModal() {
    return this.waitForElementVisible('@newTagButton', 'Create tag icon is visible')
      .click('@newTagButton')
      .waitForElementVisible('@createTagButton', 'Create Tag modal is visible')
      .waitForElementVisible('@tagNameInput', 'Tag name input is visible')
      .waitForElementVisible('@tagCategoryLocation', 'Location category is visible')
      .waitForElementVisible('@tagCategoryDepartment', 'Department category is visible')
      .waitForElementVisible('@tagCategoryRole', 'Role category is visible')
      .waitForElementVisible('@tagCategoryCustom', 'Custom category is visible');
  },

  createNewTag(tagType, tagName, tag) {
    return this.waitForElementVisible('@newTagButton', 'add tag button is visible.')
      .pause(3000)
      .click('@newTagButton')
      .pause(3000)
      .waitForElementVisible('@tagNameInput', 'tag name input is visible')
      .setValue('@tagNameInput', tagName)
      .click(tagType)
      .waitForElementVisible('@createTagButton', 'Create Tag Button is visible.')
      .click('@createTagButton')
      .pause(2000)
      .waitForElementVisible(tag, 'Created tag is visible');
  },

  editTag(tag, newValue, newTag) {
    return this.waitForElementVisible(tag, 'Last tag is visible')
      .click(tag)
      .waitForElementVisible('@updateTagButton', 'Edit tag modal is visible')
      .click('@tagNameInput')
      .clearValue('@tagNameInput')
      .setValue('@tagNameInput', newValue)
      .click('@updateTagButton')
      .waitForElementNotVisible('@updateTagButton', 'Edit Tag Modal is hidden')
      .waitForElementVisible(newTag, `${newTag} Edited tag exists`);
  },

  deleteTag(editedTag) {
    return this.waitForElementVisible(editedTag, 'last tag is visible')
      .click(editedTag)
      .waitForElementVisible('@deleteTagTrashIcon', 'Trash Icon is visible')
      .click('@deleteTagTrashIcon')
      .waitForElementVisible('@deleteTagConfirmButton', 'Delete confirm is visible')
      .click('@deleteTagConfirmButton')
      .waitForElementNotVisible('@updateTagButton', 'Edit Tag Modal is hidden')
      .waitForElementNotPresent(editedTag, 'Tag is deleted');
  },

  tagContainerCheck() {
    return this.waitForElementPresent('@newTagContainerButton', 'Tag container is visible');
  },

  clickToToggleTag() {
    return this.waitForElementPresent('@youreItTag', 'youreIt_tag is visible')
      .click('@youreItTag', () => {
        logger.info('Clicked the youreIt tag');
      });
  },

  checkTagSelected() {
    return this.verify.cssProperty('@youreItTag', 'color', 'rgba(0, 117, 201, 1)', 'Tag is selected and highlighted');
  },

  checkTagDeselected() {
    return this.verify.cssProperty('@youreItTag', 'color', 'rgba(64, 64, 64, 1)', 'Tag is deselected');
  },
};

module.exports = {
  commands: [tagCommands],
  url() {
    return `${this.api.launch_url}/settings/organization/tags`;
  },
  elements: {

    /*------------------------------------------------------------*/
    // Main Page elements
    /*------------------------------------------------------------*/

    newTagButton: {
      selector: '//BUTTON[contains(@title, \'Create Tag\')]',
      locateStrategy: 'xpath',
    },

    // its a tag that says "Charleston"...
    charlestonTag: {
      selector: '//SPAN[contains(.,\'#Charleston\')]',
      locateStrategy: 'xpath',
    },

    // its a tag that says "fake_tag"...
    locationTag: {
      selector: `//SPAN[contains(.,'${tagsFeeder.locationName}')]`,
      locateStrategy: 'xpath',
    },

    departmentTag: {
      selector: `//SPAN[contains(.,'${tagsFeeder.departmentName}')]`,
      locateStrategy: 'xpath',
    },

    roleTag: {
      selector: `//SPAN[contains(.,'${tagsFeeder.roleName}')]`,
      locateStrategy: 'xpath',
    },

    customTag: {
      selector: `//SPAN[contains(.,'${tagsFeeder.customName}')]`,
      locateStrategy: 'xpath',
    },

    // its a tag that says "Edited_tag"...
    locationEditedTag: {
      selector: `//SPAN[contains(.,'${tagsFeeder.newLocation}')]`,
      locateStrategy: 'xpath',
    },

    departmentEditedTag: {
      selector: `//SPAN[contains(.,'${tagsFeeder.newDepartment}')]`,
      locateStrategy: 'xpath',
    },

    roleEditedTag: {
      selector: `//SPAN[contains(.,'${tagsFeeder.newRole}')]`,
      locateStrategy: 'xpath',
    },

    customEditedTag: {
      selector: `//SPAN[contains(.,'${tagsFeeder.newCustom}')]`,
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------*/
    // New Tag modal elements
    /*------------------------------------------------------------*/

    tagNameInput: {
      selector: '//INPUT[contains(@id,\'tagName\')]',
      locateStrategy: 'xpath',
    },

    tagCategoryLocation: {
      selector: '//LABEL[@class=\'rhinodio__label\'][contains(text(),\'Location\')]',
      locateStrategy: 'xpath',
    },

    tagCategoryDepartment: {
      selector: '//LABEL[@class=\'rhinodio__label\'][contains(text(),\'Department\')]',
      locateStrategy: 'xpath',
    },

    tagCategoryRole: {
      selector: '//LABEL[@class=\'rhinodio__label\'][contains(text(),\'Role\')]',
      locateStrategy: 'xpath',
    },

    tagCategoryCustom: {
      selector: '//LABEL[@class=\'rhinodio__label\'][contains(text(),\'Custom\')]',
      locateStrategy: 'xpath',
    },

    channelsTagTitle: {
      selector: '//DIV[text()=\'Channel Tags\']',
      locateStrategy: 'xpath',
    },

    createTagButton: {
      selector: '//SPAN[contains(text(),\'Create Tag\')]',
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------*/
    // Edit Tag modal elements (category xpaths are the same)
    /*------------------------------------------------------------*/

    updateTagButton: {
      selector: '//SPAN[contains(text(), \'Update Tag\')]',
      locateStrategy: 'xpath',
    },

    deleteTagTrashIcon: {
      selector: '//BUTTON[contains(@title,\'Delete Tag\')]',
      locateStrategy: 'xpath',
    },

    deleteTagConfirmButton: {
      selector: '//SPAN[contains(text(),\'Yes, delete tag\')]',
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------*/
    // xpaths for assigned tags
    /*------------------------------------------------------------*/

    newTagContainerButton: {
      selector: '//SPAN[contains(text(),\'Create New Tag\')]',
      locateStrategy: 'xpath',
    },

    youreItTag: {
      selector: '//SPAN[contains(.,\'#youreIt_tag\')]',
      locateStrategy: 'xpath',
    },

  },
};
