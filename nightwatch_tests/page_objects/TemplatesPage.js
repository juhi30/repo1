const path = require('path');

const templatesCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  /*
    Validation
  */
  renderPageElements: function() {
    return this.waitForElementVisible('@createTemplateButton', 'Create template button is visible')
      .verify.visible('@HIPAATemplate', 'HIPAA template is visible')
      .verify.visible('@firstTestTemplate', 'First test template is visible')
  },

  validateSMSFilter: function() {
    return this.verify.visible('@filterDropdown', 'Channel filter is visible')
      .click('@filterDropdown')
      .waitForElementVisible('@filterTextingChannel', 'Filter choices are visible')
      .click('@filterTextingChannel')
      .waitForElementPresent('@filterDropdown', 'Dropdown choices are closed')
      .verify.containsText('@filterDropdown', 'Texting', 'Texting filter is active')
  },

  validateChannelFilter: function() {
    return this.click('@filterDropdown')
      .waitForElementVisible('@filterAll', 'All channel filter is visible')
      .click('@filterAll')
      // .waitForElementPresent('@filterDropdown', 'Dropdown choices are closed')
      .verify.containsText('@filterDropdown', 'All', 'All filter is active')
  },

  /*
    Clicking
  */

  clickEditTemplateButton: function() {
    return this.waitForElementVisible('@editTemplateButton', 'Edit Template button is visible')
      .click('@editTemplateButton')
  },

  clickCreateTemplateButton: function() {
    return this.waitForElementVisible('@createTemplateButton', 'Create Template button is visible')
      .click('@createTemplateButton')
      .waitForElementVisible('@templateTitleInput', 'Create Template Popup is visible')
  },

  clickCreateTemplateSaveButton: function() {
    return this.waitForElementVisible('@createTemplateSaveButton', 'Save button is visible')
      .click('@createTemplateSaveButton')
  },

  clickDeleteButton: function() {
    return this.waitForElementVisible('@deleteTemplateButton', 'Delete icon is visible')
      .click('@deleteTemplateButton');
  },

  clickDeleteFinalButton: function() {
    return this.waitForElementVisible('@deleteTemplateFinalButton', 'Delete Final button is visible')
      .click('@deleteTemplateFinalButton');
  },

  clickUploadFileButton: function() {
    return this.waitForElementVisible('@uploadFileButton', 'Upload file button is visible')
      .click('@uploadFileButton');
  },

  // Will click the first one found
  clickRemoveAttachmentIcon: function() {
    return this.waitForElementVisible('@removeAttachmentIcon', 'Remove attachment icon is visible')
      .click('@removeAttachmentIcon')
  },

  clickFirstTemplate: function() {
    return this.waitForElementVisible('@firstTemplate', 3000, false, null, 'First Template is visible')
      .click('@firstTemplate')
  },

  /*
    Multistep functions
  */

  fillTitleAndMessage: function(title, message) {
    return this.waitForElementVisible('@templateTitleInput', 'Title input is visible')
      .setValue('@templateTitleInput', title)
      .setValue('@templateMessageInput', message)
  },

  editFirstTemplate: function(title, message) {
    return this.waitForElementVisible('@templateTitleInput', 'Edit template popup is visible')
      .verify.visible('@firstTemplateEditSaveButton', 'Save template button is visible')
      .setValue('@templateTitleInput', title)
      .setValue('@templateMessageInput', message)
      .click('@firstTemplateEditSaveButton')
      .waitForElementNotPresent('@firstTemplateEditSaveButton', 'Edit template popup is not present')
  },

  deleteFirstTemplate: function() {
    return this.waitForElementVisible('@deleteTemplateButton', 'Template delete button is visible')
      .click('@deleteTemplateButton')
      .waitForElementVisible('@deleteTemplateFinalButton', 'Delete template popup is visible')
      .click('@deleteTemplateFinalButton')
      .waitForElementNotVisible('@deleteTemplateFinalButton', 'Delete template popup is hidden')
  },

  deleteSpecificTemplate: function(templateName) {
    this.api.useXpath().waitForElementVisible(`//SPAN[contains(text(), '${templateName}')]`, `${templateName} template is visible`)
      .click(`//SPAN[contains(text(), '${templateName}')]`);

    return this.waitForElementVisible('@editTemplateButton', 'Edit Template button is visible')
      .click('@editTemplateButton')
      .waitForElementVisible('@deleteTemplateButton', 'Delete button is visible')
      .click('@deleteTemplateButton')
      .waitForElementVisible('@deleteTemplateFinalButton', 'Final delete button is visible')
      .click('@deleteTemplateFinalButton')
  },

  // this function is magic, don't ask why it works. nobody knows. 
  uploadFile: function(filePath) {
    return this.setValue('input[type="file"]', path.resolve(filePath));
  }
}

module.exports = {
  commands: [templatesCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/templates'
  },
  elements: {

    createTemplateButton: {
      selector: `//BUTTON[contains(@title, 'Create Template')]`,
      locateStrategy: 'xpath',
    },

    filterDropdown: {
      selector: `//BUTTON[contains(@class, 'app-page__header__filter__button')]`,
      locateStrategy: 'xpath',
    },

    filterAll: {
      selector: `//SPAN[contains(.,'All')]`,
      locateStrategy: 'xpath',
    },

    filterTextingChannel: {
      selector: `//SPAN[contains(.,'Texting')]`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/

    editTemplateButton: {
      selector: `//SPAN[contains(text(), 'Edit Template')]`,
      locateStrategy: 'xpath',
    },

    firstTemplateEditSaveButton: {
      selector: `//SPAN[contains(text(), 'Update Template')]`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/

    deleteTemplateButton: {
      selector: `//BUTTON[contains(@title, 'Delete Template')]`,
      locateStrategy: 'xpath',
    },

    deleteTemplateFinalButton: {
      selector: `//SPAN[contains(.,'Yes, delete template')]`,
      locateStrategy: 'xpath',
    },
    /*---------------------------------------------------------*/

    HIPAATemplate: {
      selector: `//SPAN[contains(.,'HIPAA Consent Request')]`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/
    // create template page
    /*---------------------------------------------------------*/

    templateTitleInput: {
      selector: `//INPUT[contains(@name, 'subject')]`,
      locateStrategy: 'xpath',
    },

    templateMessageInput: {
      selector: `//TEXTAREA[contains(@name, 'message')]`,
      locateStrategy: 'xpath',
    },

    createTemplateSaveButton: {
      selector: `//SPAN[contains(.,'Create Template')]`,
      locateStrategy: 'xpath'
    },

    uploadFileButton: {
      selector: `//SPAN[contains(.,'Upload File')]`,
      locateStrategy: 'xpath',
    },

    nullTemplateTitle: {
      selector: `//DIV[contains(.,'Title is required')]`,
      locateStrategy: 'xpath',
    },

    nullTemplateMessage: {
      selector: `//DIV[contains(.,'Message is required')]`,
      locateStrategy: 'xpath',
    },

    removeAttachmentIcon: {
      selector: `//BUTTON[contains(@title, 'Close')]`,
      locateStrategy: 'xpath'
    },

    firstTemplate: {
      selector: `//DIV[@role='button'][1]`, //check this is working only needed to access Edit page
      locateStrategy: 'xpath',
    },
  }
};
