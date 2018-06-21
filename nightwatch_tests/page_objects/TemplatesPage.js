const templatesCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  renderPageElements: function() {
    return this.waitForElementVisible('@createTemplateButton', 2000, 'Create template button is visible')
      .verify.visible('@hIPAATemplate', 'HIPAA template is visible')
      .verify.visible('@firstTestTemplate', 'First test template is visible')
  },

  validateSMSFilter: function() {
    return this.verify.visible('@filterDropdown', 'Channel filter is visible')
      .click('@filterDropdown')
      .waitForElementVisible('@filterTextingChannel', 5000, 'Filter choices are visible')
      .click('@filterTextingChannel')
      .waitForElementPresent('@filterDropdown', 5000, 'Dropdown choices are closed')
      .verify.containsText('@filterDropdown', 'Texting', 'Texting filter is active')
  },

  validateChannelFilter: function() {
    return this.click('@filterDropdown')
      .waitForElementVisible('@filterAll', 5000, 'All channel filter is visible')
      .click('@filterAll')
      // .waitForElementPresent('@filterDropdown', 5000, 'Dropdown choices are closed')
      .verify.containsText('@filterDropdown', 'All', 'All filter is active')
  },

  clickCreateTemplate: function() {
    return this.click('@createTemplateButton')
      .waitForElementVisible('@createTemplateTitle', 2000, 'Create Template Popup is visible')
  },

  validateCreateTemplatePopup: function() {
    return this.waitForElementVisible('@createTemplateTitle', 5000, 'Title input is visible')
      .verify.visible('@createTemplateMessage', 'Message input is visible')
      .verify.visible('@createTemplateSaveButton', 'Create button is visible')
      .verify.visible('@uploadFileButton', 'Upload File button is visible')
      // .verify.visible('@cancelCreateButton', 'Cancel button (X) is visible') no good xpaths for svg close button
      .click('@createTemplateSaveButton')
      .verify.visible('@nullTemplateTitle', 'Title validator is visible')
      .verify.visible('@nullTemplateMessage', 'Message validator is visible')
    // .click('@cancelCreateButton')
    // .waitForElementNotPresent('@createTemplatePopup', 5000, 'Create template popup is hidden')
  },

  // uploadToTemplate: function() {
  //   return this.setValue('input[type="file"]', require('path').resolve('/Users/geoffmaas/Desktop/test_pics/night_watch.jpg'))
  // },

  fillOutNewTemplate: function(title, message, pathToFile) {
    return this.setValue('@createTemplateTitle', title)
      .setValue('@createTemplateMessage', message)
      .setValue('input[type="file"]', require('path').resolve(pathToFile))
      .waitForElementVisible('@uploadedFile', 5000, 'Uploaded file is visible')
  },

  saveNewTemplate: function() {
    return this.waitForElementVisible('@createTemplateSaveButton', 5000, 'Save template is visible')
      .click('@createTemplateSaveButton')
      .waitForElementNotPresent('@createTemplateTitle', 5000, 'Create template popup is hidden')
  },

  editTemplate: function() {
    return this.click('@firstTemplateEdit')
      .waitForElementVisible('@createTemplateTitle', 5000, 'Edit template popup is visible')
      .verify.visible('@firstTemplateEditSaveButton', 'Save template button is visible')
      .setValue('@createTemplateTitle', '* added from edit popup')
      .click('@firstTemplateEditSaveButton')
      .waitForElementNotPresent('@firstTemplateEditSaveButton', 5000, 'Edit template popup is not present')
  },

  deleteTemplate: function() {
    return this.waitForElementVisible('@firstTemplateDelete', 1000, 'Template delete button is visible')
      .click('@firstTemplateDelete')
      .waitForElementVisible('@firstTemplateDeleteFinal', 1500, 'Delete template popup is visible')
      .click('@firstTemplateDeleteFinal')
      .waitForElementNotVisible('@firstTemplateDeleteFinal', 1500, 'Delete template popup is hidden')
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
      locateStrategy: 'class name',
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
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Template']`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/

    firstTemplateDelete: {
      selector: `(//BUTTON[@type='button'][text()='Delete'][text()='Delete'])[1]`,
      locateStrategy: 'xpath',
    },

    // firstTemplateDeletePopup: {
    //   selector: `/html/body/div[4]/div/div/div`,
    //   locateStrategy: 'xpath',
    // },

    firstTemplateDeleteFinal: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Delete']`,
      locateStrategy: 'xpath',
    },
    /*---------------------------------------------------------*/

    hIPAATemplate: {
      selector: `(//DIV[@class='bucket__header__title'][text()='HIPAA Consent Request'][text()='HIPAA Consent Request'])[1]`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/
    // create template popup
    /*---------------------------------------------------------*/

    // createTemplatePopup: {
    //   selector: `/html/body/div[5]/div/div/div`,
    //   locateStrategy: 'xpath',
    // },

    createTemplateTitle: {
      selector: `//INPUT[@id='subject']`,
      locateStrategy: 'xpath',
    },

    createTemplateMessage: {
      selector: `//TEXTAREA[@id='message']`,
      locateStrategy: 'xpath',
    },

    createTemplateSaveButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Create']`,
      locateStrategy: 'xpath'
    },

    uploadFileButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Upload File']`,
      locateStrategy: 'xpath',
    },

    uploadedFile: {
      selector: `(//DIV[@class='template-attachments__name'])[2]`,
      locateStrategy: 'xpath',
    },

    // cancelCreateButton: {
    //   selector: `/html/body/div[5]/div/div/div/div/div[1]/button`,
    //   locateStrategy: 'xpath'
    // },

    nullTemplateTitle: {
      selector: `//DIV[@class='form__validation-message'][text()='Title is required']`,
      locateStrategy: 'xpath',
    },

    nullTemplateMessage: {
      selector: `//DIV[@class='form__validation-message'][text()='Message is required']`,
      locateStrategy: 'xpath',
    },
  }
};
