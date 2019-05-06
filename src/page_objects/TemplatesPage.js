const helper = require('../toolboxes/helpers.toolbox');
const templateFeeder = require('../toolboxes/feeder/template.feeder');

const templatesCommands = {

  /*
    Validation
  */
  renderPageElements() {
    return this.waitForElementVisible('@createTemplateButton', 'Create template button is visible')
      .verify.visible('@HIPAATemplate', 'HIPAA template is visible');
  },

  validateTemplateFilter(filter, activeFilterValue) {
    return this.waitForElementVisible('@filterDropdown', ' Template Filter is visible')
      .click('@filterDropdown')
      .waitForElementVisible(filter, `${filter} is visible`)
      .click(filter)
      .pause(1000)
      .waitForElementPresent('@filterDropdown', 'Dropdown choices are closed')
      .verify.containsText('@filterDropdown', activeFilterValue, `${activeFilterValue} is active`);
  },

  /*
   Clicking and checking Success Message.
 */

  async addAttachment() {
    this.waitForElementVisible('@uploadFileButton', ' Upload File button is visible.')
      .click('@uploadFileButton')
      .waitForElementNotVisible('@uploadFileButton', 'Uplaod Photo modal is open')
      .pause(2000);
    await helper.uploadFile(this, 'rhinogram.png');
    return this.pause(2000);
  },

  clickCreateTemplateButton() {
    return this.click('@createTemplateButton')
      .waitForElementVisible('@templateTitleInput', 'Create Template page is opened.');
  },

  clickCreateUpdateButton(element, successMessage) {
    return this.waitForElementVisible(element, `${element} button is visible`)
      .click(element)
      .pause(1000)
      .waitForElementVisible(successMessage, `${successMessage} is visible.`);
  },

  /*
    Multistep functions
  */

  fillTitleAndMessage(title, message) {
    return this.waitForElementVisible('@templateTitleInput', 'Title input is visible')
      .setValue('@templateTitleInput', title)
      .setValue('@templateMessageInput', message);
  },

  markAsFavorite(favOpt, filter, templateName) {
    return this.waitForElementVisible(favOpt, 'Favorite Icon is visible')
      .click(favOpt)
      .waitForElementPresent('@filterDropdown', 'filter dropdown is available')
      .click('@filterDropdown')
      .pause(1000)
      .waitForElementVisible(filter, `${filter} is visible`)
      .click(filter)
      .waitForElementVisible(templateName, `${templateName} is marked as favorite`);
  },

  markAsUnfavorite(favOpt, filter, templateName) {
    return this.waitForElementVisible('@filterDropdown', 'filter dropdown is available')
      .click('@filterDropdown')
      .pause(1000)
      .waitForElementVisible(filter, `${filter} is visible`)
      .click(filter)
      .waitForElementVisible(templateName, `${templateName} favorited template is visible`)
      .click(favOpt)
      .waitForElementVisible('@noResultFound', `${templateName} template is marked as unfavorited.`);
  },

  templateEditMode(templateName) {
    return this.waitForElementVisible(templateName, `${templateName} is visible`)
      .click(templateName)
      .waitForElementVisible('@editTemplateButton', 'Edit template button is visible.')
      .click('@editTemplateButton');
  },

  updateTemplate(newTitle, newMessage) {
    return this.waitForElementVisible('@templateTitleInput', 'Created template is opened in edit mode.')
      .clearValue('@templateTitleInput')
      .setValue('@templateTitleInput', newTitle)
      .clearValue('@templateMessageInput')
      .setValue('@templateMessageInput', newMessage);
  },

  updateSystemTemplate(newMessage) {
    return this.waitForElementVisible('@templateTitleInput', 'Created template is opened in edit mode.')
      .clearValue('@templateMessageInput')
      .setValue('@templateMessageInput', newMessage);
  },

  revertToOriginalSystemTemplate(hipaaMessage) {
    return this.waitForElementVisible('@revertToOriginalButton', 'revert to original button is visible.')
      .click('@revertToOriginalButton')
      .waitForElementVisible('@hipaaMessage', 'HIPAA System template message is reverted and visible.')
      .assert.containsText('@hipaaMessage', hipaaMessage);
  },

  validateTemplateSearch(templateName, result) {
    return this.waitForElementVisible('@templateSearch', 'Template Search is visible.')
      .setValue('@templateSearch', templateName)
      .waitForElementVisible(result, `${result} is visible.`);
  },

  deleteTemplate(successMessage) {
    return this.waitForElementVisible('@deleteTemplateButton', 'Delete button is visible')
      .click('@deleteTemplateButton')
      .waitForElementVisible('@deleteTemplateFinalButton', 'Final delete button is visible')
      .click('@deleteTemplateFinalButton')
      .waitForElementVisible('@deleteTemplateSuccessMessage', 'template deletion is successfull.')
      .waitForElementVisible(successMessage, `${successMessage} is visible`);
  },
};

module.exports = {
  commands: [templatesCommands],
  url() {
    return `${this.api.launch_url}/settings/organization/templates`;
  },
  elements: {

    createTemplateButton: {
      selector: '//BUTTON[contains(@title, \'Create Template\')]',
      locateStrategy: 'xpath',
    },

    filterDropdown: {
      selector: '//SPAN[@class=\'dropdown__toggle__text\']',
      locateStrategy: 'xpath',
    },

    filterAll: {
      selector: '//DIV[@class=\'dropdown__menu__item__content__label\']//SPAN[text()=\'All\']',
      locateStrategy: 'xpath',
    },

    favoriteFilter: {
      selector: '//DIV[@class=\'dropdown__menu__item__content__label\']//SPAN[contains(text(),\'Favorite\')]',
      locateStrategy: 'xpath',
    },

    filterTextingChannel: {
      selector: '//SPAN[contains(.,\'Texting\')]',
      locateStrategy: 'xpath',
    },

    favoriteOption: {
      selector: `//*[@class='resource has-right-column']//descendant :: *[contains(text(),'${templateFeeder.templateTitle}')]// ancestor :: DIV[@class='resource has-right-column']//*[@class='resource__right resource__right--no-flex']//DIV//BUTTON//SPAN`,
      locateStrategy: 'xpath',
    },

    favoriteOptionforHIPAA: {
      selector: `//*[@class='resource has-right-column']//descendant :: *[contains(text(),'${templateFeeder.hipaaTitle}')]// ancestor :: DIV[@class='resource has-right-column']//*[@class='resource__right resource__right--no-flex']//DIV//BUTTON//SPAN`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/

    editTemplateButton: {
      selector: '//SPAN[contains(text(), \'Edit Template\')]',
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/

    deleteTemplateButton: {
      selector: '//BUTTON[contains(@title, \'Delete Template\')]',
      locateStrategy: 'xpath',
    },

    deleteTemplateFinalButton: {
      selector: '//SPAN[contains(.,\'Yes, delete template\')]',
      locateStrategy: 'xpath',
    },
    /*---------------------------------------------------------*/

    HIPAATemplate: {
      selector: '//SPAN[contains(.,\'HIPAA Consent Request\')]',
      locateStrategy: 'xpath',
    },

    templateTitle: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${templateFeeder.templateTitle}')]`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/
    // create template page
    /*---------------------------------------------------------*/

    templateTitleInput: {
      selector: '//INPUT[contains(@name, \'subject\')]',
      locateStrategy: 'xpath',
    },

    templateMessageInput: {
      selector: '//TEXTAREA[contains(@name, \'message\')]',
      locateStrategy: 'xpath',
    },

    createTemplateSaveButton: {
      selector: '//SPAN[contains(.,\'Create Template\')]',
      locateStrategy: 'xpath',
    },

    uploadFileButton: {
      selector: '//SPAN[contains(.,\'Upload File\')]',
      locateStrategy: 'xpath',
    },

    nullTemplateTitle: {
      selector: '//DIV[contains(.,\'Title is required\')]',
      locateStrategy: 'xpath',
    },

    nullTemplateMessage: {
      selector: '//DIV[contains(.,\'Message is required\')]',
      locateStrategy: 'xpath',
    },

    removeAttachmentIcon: {
      selector: '//BUTTON[contains(@title, \'Close\')]',
      locateStrategy: 'xpath',
    },

    updateTemplateButton: {
      selector: '//SPAN[contains(.,\'Update Template\')]',
      locateStrategy: 'xpath',
    },

    revertToOriginalButton: {
      selector: '//SPAN[contains(text(),\'Revert to original\')]',
      locateStrategy: 'xpath',
    },

    hipaaMessage: {
      selector: '//TEXTAREA[contains(@id,\'message\')]',
      locateStrategy: 'xpath',
    },
    /*---------------------------------------------------------*/
    // Template Success Message
    /*---------------------------------------------------------*/

    createTemplateSuccessMessage: {
      selector: '//DIV[text()=\'Template created successfully.\']',
      locateStrategy: 'xpath',
    },

    updateTemplateSuccessMessage: {
      selector: '//DIV[text()=\'Template updated successfully.\']',
      locateStrategy: 'xpath',
    },

    deleteTemplateSuccessMessage: {
      selector: '//DIV[text()=\'Template deleted successfully.\']',
      locateStrategy: 'xpath',
    },

    templateSearch: {
      selector: '//INPUT[contains(@id , \'search\')]',
      locateStrategy: 'xpath',
    },

    searchResult: {
      selector: `//SPAN[@class='resource__intro__title__content']//STRONG[contains(text(),'${templateFeeder.templateTitle}')]`,
      locateStrategy: 'xpath',
    },

    /* Search result after updating the template */
    updatedSearchResult: {
      selector: `//SPAN[@class='resource__intro__title__content']//STRONG[contains(text(),'${templateFeeder.newTemplate}')]`,
      locateStrategy: 'xpath',
    },

    noResultFound: {
      selector: '//DIV[@class=\'search__no-results\'][contains(text(),\'No results\')]',
      locateStrategy: 'xpath',
    },
  },
};
