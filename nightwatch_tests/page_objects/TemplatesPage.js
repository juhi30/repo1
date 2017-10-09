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

  clickCreateTemplate: function() {
    return this.click('@createTemplateButton')
      .waitForElementVisible('@createTemplateTitle', 2000, 'Create Template Popup is visible')
  },

  validateCreateTemplatePopup: function() {
    return this.verify.visible('@createTemplateTitle', 'Title input is visible')
      .verify.visible('@createTemplateMessage', 'Message input is visible')
      .verify.visible('@createTemplateSaveButton', 'Create button is visible')
      .verify.visible('@cancelCreateButton', 'Cancel button (X) is visible')
      .click('@createTemplateSaveButton')
      .verify.visible('@nullTemplateTitle', 'Title validator is visible')
      .verify.visible('@nullTemplateMessage', 'Message validator is visible')
      .click('@cancelCreateButton')
      .waitForElementNotVisible('@createTemplatePopup', 1500, 'Create template popup is hidden')
  },

  fillOutNewTemplate: function(title, message) {
    return this.setValue('@createTemplateTitle', title)
      .setValue('@createTemplateMessage', message)
      .click('@createTemplateSaveButton')
      .waitForElementNotVisible('@createTemplatePopup', 1500, 'Create template popup is hidden')
  },

  editTemplate: function() {
    return this.click('@firstTemplateEdit')
      .waitForElementVisible('@firstTemplateEditPopup', 1500, 'Edit template popup is visible')
      .verify.visible('@firstTemplateEditSaveButton', 'Save template button is visible')
      .setValue('@createTemplateTitle', '* added from edit popup')
      .click('@firstTemplateEditSaveButton')
      .waitForElementNotVisible('@firstTemplateEditPopup', 1500, 'Edit template popup is hidden')
  },

  deleteTemplate: function() {
    return this.waitForElementVisible('@firstTemplateDelete', 1000, 'Template delete button is visible')
      .click('@firstTemplateDelete')
      .waitForElementVisible('@firstTemplateDeletePopup', 1500, 'Delete template popup is visible')
      .click('@firstTemplateDeleteFinal')
      .waitForElementNotVisible('@firstTemplateDeletePopup', 1500, 'Delete template popup is hidden')
  }
}

module.exports = {
  commands: [templatesCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/templates'
  },
  elements: {

    createTemplateButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Create Template']`,
      locateStrategy: 'xpath'
    },

    firstTestTemplate: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[2]/div[1]`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/

    firstTemplateEdit: {
      selector: `(//BUTTON[@type='button'][text()='Edit'][text()='Edit'])[1]`,
      locateStrategy: 'xpath',
    },

    firstTemplateEditPopup: {
      selector: `/html/body/div[5]/div/div/div`,
      locateStrategy: 'xpath'
    },

    firstTemplateEditTitleInput: {
      selector: `//*[@id="subject"]`,
      locateStrategy: 'xpath',
    },

    firstTemplateEditSaveButton: {
      selector: `/html/body/div[5]/div/div/div/div/div[3]/button/span`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/

    firstTemplateDelete: {
      selector: `(//BUTTON[@type='button'][text()='Delete'][text()='Delete'])[1]`,
      locateStrategy: 'xpath',
    },

    firstTemplateDeletePopup: {
      selector: `/html/body/div[4]/div/div/div`,
      locateStrategy: 'xpath',
    },

    firstTemplateDeleteFinal: {
      selector: `/html/body/div[4]/div/div/div/div[3]/div/button[2]/span`,
      locateStrategy: 'xpath',
    },
    /*---------------------------------------------------------*/

    hIPAATemplate: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[2]/div[2]`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------*/
    // create template popup
    /*---------------------------------------------------------*/

    createTemplatePopup: {
      selector: `/html/body/div[5]/div/div/div`,
      locateStrategy: 'xpath',
    },

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

    cancelCreateButton: {
      selector: `/html/body/div[5]/div/div/div/div/div[1]/button`,
      locateStrategy: 'xpath'
    },

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
