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

  validateCreateTemplatePopup: function() {
    return this.waitForElementVisible('@templateTitleInput', 'Title input is visible')
      .verify.visible('@templateMessageInput', 'Message input is visible')
      .verify.visible('@createTemplateSaveButton', 'Create button is visible')
      .verify.visible('@uploadFileButton', 'Upload File button is visible')
      // .verify.visible('@cancelCreateButton', 'Cancel button (X) is visible') no good xpaths for svg close button
      .click('@createTemplateSaveButton')
      .verify.visible('@nullTemplateTitle', 'Title validator is visible')
      .verify.visible('@nullTemplateMessage', 'Message validator is visible')
    // .click('@cancelCreateButton')
    // .waitForElementNotPresent('@createTemplatePopup', 'Create template popup is hidden')
  },

  /*
    Clicking
  */

  clickCreateTemplate: function() {
    return this.click('@createTemplateButton')
      .waitForElementVisible('@templateTitleInput', 'Create Template Popup is visible')
  },

  clickSaveNewTemplate: function() {
    return this.waitForElementVisible('@createTemplateSaveButton', 'Save template is visible')
      .click('@createTemplateSaveButton')
      .waitForElementNotPresent('@templateTitleInput', 'Create template popup is hidden')
  },

  /*
    Multistep
  */

  fillTitleAndMessage: function(title, message) {
    return this.waitForElementVisible('@templateTitleInput')
      .setValue('@templateTitleInput', title)
      .setValue('@templateMessageInput', message)
  },

  addAttachment: function() {
    return this.waitForElementVisible('@uploadFileButton')
          // .setValue('input[type="file"]', require('path').resolve(pathToFile)) can use this method, with pathToFile argument, to add attachments
      // .waitForElementVisible('@uploadedFile', 'Uploaded file is visible')
  },

  editFirstTemplate: function() {
    return this.click('@firstTemplateEdit')
      .waitForElementVisible('@templateTitleInput', 'Edit template popup is visible')
      .verify.visible('@firstTemplateEditSaveButton', 'Save template button is visible')
      .setValue('@templateTitleInput', 'I changed the title')
      .setValue('@templateTitleInput')
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

    firstTestTemplate: {
      selector: `//SPAN[contains(.,'Check in')]`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/

    firstTemplateEditButton: {
      selector: `//SPAN[contains(.,'Edit Template')]`,
      locateStrategy: 'xpath',
    },

    firstTemplateEditTitleInput: {
      selector: `//INPUT[contains(@name, 'subject')]`,
      locateStrategy: 'xpath',
    },

    firstTemplateEditMessageInput: {
      selector: `//TEXTAREA[contains(@name, 'message')]`,
      locateStrategy: 'xpath',
    },

    firstTemplateEditSaveButton: {
      selector: `//SPAN[contains(.,'Update Template')]`,
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
      selector: `//SPAN[contains(.,'Upload File')]`,
      locateStrategy: 'xpath'
    },

    uploadFileButton: {
      selector: `//SPAN[contains(.,'Create Template')]`,
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
  }
};

// this is a leftover comment regarding making attachments. keeping it here for reference

 //    we'll use something similar to this  //
  //    fillOutNewTemplate: function(title, message, pathToFile) {
  //      return this.setValue('@templateTitleInput', title)
  //       .setValue('@templateMessageInput', message)
  //       .setValue('input[type="file"]', require('path').resolve(pathToFile))
  //       .waitForElementVisible('@uploadedFile', 'Uploaded file is visible')
  //   },
    
  //      (test call of command with variable input)
  //       .fillOutNewTemplate('auto test created template', 'this should be in the template\'s message body', 'test_files/sevenkbbuggy.PNG')
