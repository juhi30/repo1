const testConstants = require('./../toolboxes/feeder.toolbox');
const helper = require('../toolboxes/helpers.toolbox')

const contactsCommands = {

  validateContactFilterOptions: function() {
    return this.waitForElementVisible('@filterDropdown', 'Filter dropdown button is visible')
      .click('@filterDropdown')
      .verify.visible('@allContactsOption', 'All contacts option is visible')
      .verify.visible('@patientOption', 'Patient option is visible')
      .verify.visible('@unknownOption', 'Unknown option is visible')
      .verify.visible('@otherOption', 'Other option is visible')
      .click('@filterDropdown')
  },

  clickFilterOption: function (element, filter) {
    return this.click('@filterDropdown')
      .click(element)
      .verify.containsText('@filterDropdown', filter, 'Filter dropdown is now set to ' + filter)
  },

  clickAddContact: function() {
    return this.waitForElementVisible('@addContactButton', 'Add contact button is visible')
      .click('@addContactButton')
      .waitForElementVisible('@addContactButtonModal', 'Add new contact modal is visible')
  },

  searchForContact: function (contactName, firstResultObject) {
    return this.waitForElementVisible('@searchContactInput', 'Search Contacts Bar is visible')
      .click('@searchContactInput')
      .setValue('@addContactDropdownInput', contactName)
      .waitForElementVisible(firstResultObject, 'First result is visible')
      .click(firstResultObject)
      .waitForElementVisible('@profileInboxContainer', 'Profile summary is visible')
  },

  clickCreateUpdateContact: function(actionButton, notification) {
    return this.waitForElementVisible(actionButton, actionButton + ' is visible')
      .click(actionButton)
      .waitForElementVisible(notification, notification + 'is visible')
  },

  validateAnalyticsIconVisibility: function() {
    return this.waitForElementVisible('@pageHeader', 'Page header is visible')
      .verify.visible('@analyticsIcon', 'Analytics icon is visible');
  },

  validateAnalyticsPageNavigation: function() {
    return this.click('@analyticsIcon');
  },

  validateUrlChange: function(url) {
    return this.verify.urlContains(url);
          //.pause(1000);
  },

  verifyPageTitle: function () {
    return this.waitForElementVisible('@contactPageTitle', 'The Contact Page title is visible')
  },

  enterDetails: function (element, value) {
    return this.waitForElementVisible(element, element + ' is visible')
      .setValue(element, value)
  },

  selectRadioOption: function(element) {
    return this.waitForElementVisible(element, element + ' is visible')
      .click(element)
  },

  selectCreatedContact: function (createdContact) {
    return this.waitForElementVisible(createdContact, createdContact + ' Created Contact is visible in the contact list.')
      .click(createdContact)
      .waitForElementVisible('@summaryPanel', 'Summary Panel opened.')
      .click('@editProfileButton')
      .waitForElementVisible('@contactEditPageTitle', 'Edit Contact page is open')
  },

  editContactDetails: function (element, newValue) {
    return this.waitForElementVisible(element, element + ' is visible')
      .clearValue(element)
      .setValue(element, newValue)
  },

  addUpdatePhoto: async function () {
    this.waitForElementVisible('@addPhotoButton', 'Add Photo button visible')
      .click('@addPhotoButton')
      .waitForElementNotVisible('@uploadPhotoButton', 'Upload Photo modal is open')
      .pause(2000)
    await helper.uploadFile(this, 'contact.png')
    return this.pause(5000)
      .click('@doneUploadPhoto')
      .pause(5000)
      .click('@updateContactButton')
      .waitForElementVisible('@editSuccessMessage', 'Success message displayed')
  },

  addConnectedParty: function (searchText) {
    return this.waitForElementVisible('@connectedPartySearchInput', 'Connected Party search input is visible')
      .setValue('@connectedPartySearchInput', searchText)
      .waitForElementVisible('@connectedPartyContact', 'Searched contact is visible')
      .click('@connectedPartyContact')
      .waitForElementVisible('@addedConnectedParty', 'Added connected party is visible in connected party section')
  },

  verifyAddedConnectedParty: function (connectedContactElement, connectedRelationshipElement, relationship) {
    return this.waitForElementVisible('@summaryPanel', 'Summary Panel opened.')
      .waitForElementVisible(connectedContactElement, 'Added connected party is visible on summary panel')
      .waitForElementVisible(connectedRelationshipElement, 'Added connected party is ' + relationship)
  },

  clickCreateNewContact: function () {
    return this.waitForElementVisible('@createNewContactByConnectionButton', 'Create New Contact button is visible')
      .click('@createNewContactByConnectionButton')
      .waitForElementVisible('@createContactFormModal', 'Add new contact form modal is visible')
  },

  clickSearchUsers: function () {
    return this.waitForElementVisible('@searchUserButton', 'Search user button is visible')
      .click('@searchUserButton')
      .waitForElementVisible('@addContactButtonModal', 'Search user modal is opened')
  }

  // verifyRemovedConnectedParty: function (connectedContactElement, connectedRelationshipElement, relationship) {
  //   return this.waitForElementVisible('@summaryPanel', 'Summary Panel opened.')
  //     .waitForElement(connectedContactElement, 'Added connected party is visible on summary panel')
  //     .waitForElementNotVisible(connectedRelationshipElement, 'Added connected party is ' + relationship)
  // },
}

module.exports = {
  commands: [contactsCommands],
  url: function() {
    return this.api.launch_url + '/contacts'
  },
  elements: {

    /*-----------------------------------------------------------*/
    // filter dropdown and its elements
    /*-----------------------------------------------------------*/

    filterDropdown: {
      selector: `//BUTTON[contains(@title, 'Filter contacts')]`,
      locateStrategy: 'xpath'
    },

    allContactsOption: {
      selector: `//SPAN[contains(.,'All Contacts')]`,
      locateStrategy: 'xpath',
    },

    patientOption: {
      selector: `//SPAN[contains(.,'Patient')]`,
      locateStrategy: 'xpath'
    },

    unknownOption: {
      selector: `//SPAN[contains(.,'Unknown')]`,
      locateStrategy: 'xpath'
    },

    otherOption: {
      selector: `//SPAN[contains(.,'Other')]`,
      locateStrategy: 'xpath'
    },

    contactTypeOptionOnModal: {
      selector: `//DIV[@class='modal__body']//label[contains(@for, 'typeId')]//SPAN[contains(.,'${testConstants.contactTypeOnModal}')]`,
      locateStrategy: 'xpath'
    },

    /*-----------------------------------------------------------*/
    // Add contact elements
    /*-----------------------------------------------------------*/

    addContactButton: {
      selector: `//BUTTON[contains(@title, 'Add New Contact')]`,
      locateStrategy: 'xpath'
    },

    searchInputInAddContactModal: {
      selector: `//INPUT[contains(@name, 'nonMembers')]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/
    // Header Elements
    /*-----------------------------------------------------------*/

    pageHeader: {
      selector: `//HEADER[contains(@class, 'app-header')]`,
      locateStrategy: 'xpath',
    },

    analyticsIcon: {
      selector: `//BUTTON[contains(@id, 'nav-analytics')]`,
      locateStrategy: 'xpath',
    },

    addContactButton: {
      selector: `//BUTTON[contains(@title, 'Add New Contact')]`,
      locateStrategy: 'xpath',
    },

    addContactButtonModal: {
      selector: `//BUTTON[contains(@title, 'Search by')]`,
      locateStrategy: 'xpath',
    },

    // Form Elements

    firstNameInput: {
      selector: `//INPUT[contains(@id, 'firstName')]`,
      locateStrategy: 'xpath',
    },

    firstNameInputOnModal: {
      selector: `//DIV[@class='modal__body']//INPUT[contains(@id, 'firstName')]`,
      locateStrategy: 'xpath',
    },

    middleNameInput: {
      selector: `//INPUT[contains(@id, 'middleName')]`,
      locateStrategy: 'xpath',
    },

    middleNameInputOnModal: {
      selector: `//DIV[@class='modal__body']//INPUT[contains(@id, 'middleName')]`,
      locateStrategy: 'xpath',
    },

    lastNameInput: {
      selector: `//INPUT[contains(@id, 'lastName')]`,
      locateStrategy: 'xpath',
    },

    lastNameInputOnModal: {
      selector: `//DIV[@class='modal__body']//INPUT[contains(@id, 'lastName')]`,
      locateStrategy: 'xpath',
    },

    preferredNameInput: {
      selector: `//INPUT[contains(@id, 'preferredName')]`,
      locateStrategy: 'xpath',
    },

    prefixDropdown: {
      selector: `//SELECT[contains(@id, 'prefixId')]`,
      locateStrategy: 'xpath',
    },

    suffixDropdown: {
      selector: `//SELECT[contains(@id, 'suffixId')]`,
      locateStrategy: 'xpath',
    },

    birthDateInput: {
      selector: `//INPUT[contains(@id, 'birthday')]`,
      locateStrategy: 'xpath',
    },

    birthDateInputOnModal: {
      selector: `//DIV[@class='modal__body']//INPUT[contains(@id, 'birthday')]`,
      locateStrategy: 'xpath',
    },

    genderOption: {
      selector: `//label[text()='${testConstants.contactGender}']`,
      locateStrategy: 'xpath',
    },

    phoneNumberInput: {
      selector: `//INPUT[contains(@id, 'userPhones-0')]`,
      locateStrategy: 'xpath',
    },

    phoneNumberInputOnModal: {
      selector: `//DIV[@class='modal__body']//INPUT[contains(@id, 'userPhones-0')]`,
      locateStrategy: 'xpath',
    },

    anotherPhoneNumberInput: {
      selector: `//INPUT[contains(@id, 'userPhones-1')]`,
      locateStrategy: 'xpath',
    },

    emailInput: {
      selector: `//INPUT[contains(@id, 'userEmails-0')]`,
      locateStrategy: 'xpath',
    },

    emailInputOnModal: {
      selector: `//DIV[@class='modal__body']//INPUT[contains(@id, 'userEmails-0')]`,
      locateStrategy: 'xpath',
    },

    anotherEmailInput: {
      selector: `//INPUT[contains(@id, 'userEmails-1')]`,
      locateStrategy: 'xpath',
    },

    noteInput: {
      selector: `//textarea[contains(@id, 'note')]`,
      locateStrategy: 'xpath',
    },

    connectedPartySearchInput: {
      selector: `//INPUT[contains(@id, 'connectedParty')]`,
      locateStrategy: 'xpath',
    },

    connectedPartyContact: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.contactOtherFirstName}')]`,
      locateStrategy: 'xpath',
    },

    addedConnectedParty: {
      selector: `//DIV[contains(@class,'profile__connected-party')]//SPAN[@class='resource__intro__title__content'][contains(text(), '${testConstants.contactFirstNameOnModal}')]`,
      locateStrategy: 'xpath',
    },

    connectedPartyOnSummary: {
      selector: `//DIV[@class='summary-panel__wrapper']//SPAN[contains(@class,'resource__intro__title__content')][contains(text(), '${testConstants.contactFirstNameOnModal}')]`,
      locateStrategy: 'xpath',
    },

    parentRelationshipOnSummary: {
      selector: `//DIV[@class='summary-panel__wrapper']//SPAN[contains(@class,'resource__intro__title__sub')][contains(text(), 'Parent')]`,
      locateStrategy: 'xpath',
    },

    updatedRelationshipOnSummary: {
      selector: `//DIV[@class='summary-panel__wrapper']//SPAN[contains(@class,'resource__intro__title__sub')][contains(text(), '${testConstants.connectedNewRelationship}')]`,
      locateStrategy: 'xpath',
    },

    connectionTypeInput: {
      selector: `//SELECT[contains(@id, 'connectionTypeId')]`,
      locateStrategy: 'xpath',
    },

    // Action elements
    createNewContactButton: {
      selector: `//SPAN[contains(text(), 'Create Contact')]`,
      locateStrategy: 'xpath',
    },

    createNewContactByConnectionButton: {
      selector: `//SPAN[contains(text(), 'Create New Contact')]`,
      locateStrategy: 'xpath',
    },

    editProfileButton: {
      selector: `//SPAN[contains(text(), 'Edit Profile')]`,
      locateStrategy: 'xpath',
    },

    updateContactButton: {
      selector: `//SPAN[contains(text(), 'Update Contact')]`,
      locateStrategy: 'xpath',
    },

    addPhoneNumber: {
      selector: `//SPAN[contains(text(), 'Add another phone number')]`,
      locateStrategy: 'xpath',
    },

    addAnotherEmail: {
      selector: `//SPAN[contains(text(), 'Add another email address')]`,
      locateStrategy: 'xpath',
    },

    addPhotoButton: {
      selector: `//SPAN[contains(.,'Add Photo')]`,
      locateStrategy: 'xpath',
    },

    uploadPhotoButton: {
      selector: `//LABEL[contains(.,'Upload Photo')]`,
      locateStrategy: 'xpath',
    },

    doneUploadPhoto: {
      selector: `//SPAN[text()='Done']`,
      locateStrategy: 'xpath',
    },

    addConnectedPartyButton: {
      selector: `//SPAN[contains(text(), 'Add Connected Party')]`,
      locateStrategy: 'xpath',
    },

    removeConnectedPartyButton: {
      selector: `//BUTTON[contains(@title, 'Remove connected party')]`,
      locateStrategy: 'xpath',
    },

    searchUserButton: {
      selector: `//SPAN[text()='Search users']`,
      locateStrategy: 'xpath',
    },

    filterContactButton: {
      selector: `//BUTTON[@title='Filter contacts']`,
      locateStrategy: 'xpath',
    },

    searchUsersModalCloseButton: {
      selector: `//BUTTON[contains(@class, 'close modal__header__close')][@title='Close']`,
      locateStrategy: 'xpath',
    },

    // Notifications
    createSuccessMessage: {
      selector: `//*[text()='Contact created successfully.']`,
      locateStrategy: 'xpath',
    },

    editSuccessMessage: {
      selector: `//*[text()='Contact updated successfully.']`,
      locateStrategy: 'xpath',
    },

    // Others elements
    summaryPanel: {
      selector: `//DIV[@class='app-page__header__title'][text()='Summary']`,
      locateStrategy: 'xpath',
    },

    contactCreatePageTitle: {
      selector: `//DIV[@class='app-page__header__title'][text()='Create Contact']`,
      locateStrategy: 'xpath',
    },

    contactEditPageTitle: {
      selector: `//DIV[@class='app-page__header__title'][text()='Edit Contact']`,
      locateStrategy: 'xpath',
    },

    createdContact: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(text(),'${testConstants.contactFirstName}')]`,
      locateStrategy: 'xpath',
    },

    editedContact: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(text(),'${testConstants.contactNewFirstName}')]`,
      locateStrategy: 'xpath',
    },

    createContactFormModal: {
      selector: `//h3[@class='modal__header__title'][text()='Create Contact']`,
      locateStrategy: 'xpath',
    },

    filteredPatientContact: {
      selector: `//SPAN[contains(@class, 'resource__intro__title__content has-subtitle')][contains(text(),'${testConstants.contactFirstNameOnModal} ${testConstants.contactLastNameOnModal}')]`,
      locateStrategy: 'xpath',
    },

    filteredContactPatientType: {
      selector: `//DIV[@class='resource__right'][text()='Patient']`,
      locateStrategy: 'xpath',
    },

    filteredOtherContact: {
      selector: `//SPAN[contains(@class, 'resource__intro__title__content has-subtitle')][contains(text(),'${testConstants.contactNewFirstName} ${testConstants.contactNewLastName}')]`,
      locateStrategy: 'xpath',
    },

    filteredContactOtherType: {
      selector: `//DIV[@class='resource__right'][text()='Other']`,
      locateStrategy: 'xpath',
    },

    noRecords: {
      selector: `//h3[contains(text(),'Looks like you don')]`,
      locateStrategy: 'xpath',
    },

    searchContactInput: {
      selector: `//SPAN[contains(text(), 'Search users')]`,
      locateStrategy: 'xpath',
    },

    addContactDropdownInput: {
      selector: `//DIV[contains(@class, 'modal')]//INPUT`,
      locateStrategy: 'xpath',
    },

    profileInboxContainer: {
      selector: `//DIV[contains(@class, 'convo__inner')]`,
      locateStrategy: 'xpath',
    },

    searchedContactFirstResult: {
      selector: `//SPAN[@class='resource__intro__title__content']//STRONG[text()='${testConstants.contactFirstNameOnModal} ${testConstants.contactLastNameOnModal}']`,
      locateStrategy: 'xpath',
    },
  }
};
