const path = require('path');
const testConstants = require('../toolboxes/feeder.toolbox');

const templatesCommands = {

  /*
    Validation
  */
  renderPageElements: function () {
    return this.waitForElementVisible('@createTemplateButton', 'Create template button is visible')
      .verify.visible('@HIPAATemplate', 'HIPAA template is visible')
  },

  validateSMSFilter: function () {
    return this.verify.visible('@filterDropdown', 'Channel filter is visible')
      .click('@filterDropdown')
      .waitForElementVisible('@filterTextingChannel', 'Filter choices are visible')
      .click('@filterTextingChannel')
      .waitForElementPresent('@filterDropdown', 'Dropdown choices are closed')
      .verify.containsText('@filterDropdown', 'Texting', 'Texting filter is active')
  },

  validateChannelFilter: function () {
    return this.click('@filterDropdown')
      .waitForElementVisible('@filterAll', 'All channel filter is visible')
      .click('@filterAll')
      .waitForElementPresent('@filterDropdown', 'Dropdown choices are closed')
      .verify.containsText('@filterDropdown', 'All', 'All filter is active')
  },

  /*
   Clicking and checking Success Message.
 */

  clickUploadFileButton: function () {
    return this.waitForElementVisible('@uploadFileButton', ' Upload File button is visible.')
      .click('@uploadFileButton')
  },

  clickCreateTemplateButton: function () {
    return this.click('@createTemplateButton')
      .waitForElementVisible('@templateTitleInput', 'Create Template page is opened.')
  },

  clickCreateUpdateButton: function (element, successMessage) {
    return this.waitForElementVisible(element, element + ' button is visible')
      .click(element)
      .pause(1000)
      .waitForElementVisible(successMessage, successMessage + ' is visible.')
  },

  /*
    Multistep functions
  */

  fillTitleAndMessage: function (title, message) {
    return this.waitForElementVisible('@templateTitleInput', 'Title input is visible')
      .setValue('@templateTitleInput', title)
      .setValue('@templateMessageInput', message)
  },

  templateEditMode: function (templateName) {
    return this.waitForElementVisible(templateName, templateName + ' is visible')
      .click(templateName)
      .waitForElementVisible('@editTemplateButton', 'Edit template button is visible.')
      .click('@editTemplateButton')
  },

  updateTemplate: function (newTitle, newMessage) {
    return this.waitForElementVisible('@templateTitleInput', 'Created template is opened in edit mode.')
      .clearValue('@templateTitleInput')
      .setValue('@templateTitleInput', newTitle)
      .clearValue('@templateMessageInput')
      .setValue('@templateMessageInput', newMessage)
  },

  updateSystemTemplate: function (newMessage) {
    return this.waitForElementVisible('@templateTitleInput', 'Created template is opened in edit mode.')
      .clearValue('@templateMessageInput')
      .setValue('@templateMessageInput', newMessage)
  },

  revertToOriginalSystemTemplate: function(hipaaMessage){
    return this.waitForElementVisible('@revertToOriginalButton','revert to original button is visible.')
    .click('@revertToOriginalButton')
    .waitForElementVisible('@hipaaMessage','HIPAA System template message is reverted and visible.')
    .assert.containsText('@hipaaMessage',hipaaMessage)
  },

  deleteTemplate: function (successMessage) {
    return this.waitForElementVisible('@deleteTemplateButton', 'Delete button is visible')
      .click('@deleteTemplateButton')
      .waitForElementVisible('@deleteTemplateFinalButton', 'Final delete button is visible')
      .click('@deleteTemplateFinalButton')
      .waitForElementVisible('@deleteTemplateSuccessMessage', 'template deletion is successfull.')
      .waitForElementVisible(successMessage, successMessage + ' is visible')
  },

  // this function is magic, don't ask why it works. nobody knows. 
  uploadFile: function (filePath) {
    return this.setValue('input[type="file"]', path.resolve(filePath));
  }
}

module.exports = {
  commands: [templatesCommands],
  url: function () {
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

    templateTitle: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.templateTitle}')]`,
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
      locateStrategy: 'xpath',
    },

    updateTemplateButton: {
      selector: `//SPAN[contains(.,'Update Template')]`,
      locateStrategy: 'xpath',
    },

    revertToOriginalButton : {
      selector : `//SPAN[contains(text(),'Revert to original')]`,
      locateStrategy: 'xpath',
    },

    hipaaMessage: {
      selector: `//TEXTAREA[contains(@id,'message')]`,
      locateStrategy: 'xpath',
    },
    /*---------------------------------------------------------*/
    // Template Success Message
    /*---------------------------------------------------------*/

    createTemplateSuccessMessage: {
      selector: `//DIV[text()='Template created successfully.']`,
      locateStrategy: 'xpath',
    },

    updateTemplateSuccessMessage: {
      selector: `//DIV[text()='Template updated successfully.']`,
      locateStrategy: 'xpath',
    },

    deleteTemplateSuccessMessage: {
      selector: `//DIV[text()='Template deleted successfully.']`,
      locateStrategy: 'xpath',
    },
  }
};
