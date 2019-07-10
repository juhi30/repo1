import logger from 'rhinotilities/lib/loggers/logger';

const contactFeeder = require('./../feeder/contact.feeder');
const helper = require('../toolboxes/helpers.toolbox');

const randomNumber = Math.floor(Math.random() * 1000000);
const existingOrgFeeder = require('../feeder/existingOrg.feeder');

const contactsCommands = {

  clickFilterOption(element, filter) {
    return this.click('@filterDropdown')
      .click(element)
      .verify.containsText('@filterDropdown', filter, `Filter dropdown is now set to ${filter}`);
  },

  clickAddContact() {
    return this.waitForElementVisible('@addContactButton', 'Add contact button is visible')
      .click('@addContactButton')
      .waitForElementVisible('@addContactButtonModal', 'Add new contact button is visible')
      .verify.visible('@addContactDropdownInput', 'Dropdown input is visible')
      .verify.visible('@addNewContactButton', 'Add New Contact button is visible');
  },

  searchForContact(contactName, firstResultObject) {
    return this.waitForElementVisible('@searchContactInput', 'Search Contacts Bar is visible')
      .click('@searchContactInput')
      .setValue('@addContactDropdownInput', contactName)
      .waitForElementVisible(firstResultObject, 'First result is visible')
      .click(firstResultObject)
      .waitForElementVisible('@profileInboxContainer', 'Profile summary is visible');
  },

  validateContactFilterOptions() {
    return this.waitForElementVisible('@filterDropdown', 'Filter dropdown button is visible')
      .click('@filterDropdown')
      .verify.visible('@allContactsOption', 'All contacts option is visible')
      .verify.visible('@patientFilterOption', 'Patient filter option is visible')
      .verify.visible('@unknownFilterOption', 'Unknown filter option is visible')
      .verify.visible('@otherFilterOption', 'Other filter option is visible')
      .click('@filterDropdown');
  },

  sendOutboundMessageAndGetReply(handlerMessage, message) {
    const handlerRandomizedMessage = `${handlerMessage} ${randomNumber}`;
    return this.waitForElementVisible('@inboxMessageArea', 'Inbox message area is visible')
      .setValue('@inboxMessageArea', handlerRandomizedMessage)
      .pause(1000)
      .click('@sendMessageButton')
      .pause(3000)
      .setValue('@inboxMessageArea', message)
      .pause(1000)
      .click('@sendMessageButton')
      .pause(5000)
      .waitForElementVisible('@replyMessage', 'Reply is received from bot contact to the channel')
      .pause(2000);
  },

  sendOutboundMessageToFbContact(message) {
    const randomizedMessage = `${message} ${randomNumber}`;
    return this.waitForElementVisible('@inboxMessageArea', 'Inbox message area is visible')
      .setValue('@inboxMessageArea', randomizedMessage)
      .pause(1000)
      .click('@sendMessageButton')
      .pause(3000)
      .waitForElementVisible('@fbContactMessage', 'Message is sent to facebook contact')
      .pause(2000);
  },

  openContactChat(contactName) {
    this.api.useXpath().waitForElementVisible(`//SPAN[contains(text(),'${contactName}')]`, `${contactName} is visible in the list.`)
      .click(`//SPAN[contains(text(),'${contactName}')]`);
    return this.waitForElementVisible('@goToConversationButton', 'Go to conversation button is visible')
      .click('@goToConversationButton')
      .waitForElementVisible('@inboxMessageArea', 'Conversation Chat box is opened for the selected contact.');
  },

  selectMessageTab(messageTab) {
    return this.api.useXpath().waitForElementVisible(`//SPAN[@class='button__text-wrapper'][contains(text(),'${messageTab}')]`, `${messageTab} is visible`)
      .click(`//SPAN[@class='button__text-wrapper'][contains(text(),'${messageTab}')]`);
  },

  getInboundMessage() {
    return this.waitForElementVisible('@inboxMessageArea', 'Inbox message area is visible')
      .pause(4000)
      .waitForElementVisible('@inboundMessage', 'Inbound Message is received from Bot Contact')
      .pause(2000);
  },

  clickCreateUpdateContact(actionButton, notification) {
    return this.waitForElementVisible(actionButton, `${actionButton} is visible`)
      .click(actionButton)
      .waitForElementVisible(notification, ` ${notification} is visible`);
  },

  clickAddNewContact() {
    return this.waitForElementVisible('@addContactButtonModal', 'Add new contact button is visible')
      .click('@addNewContactButton');
  },

  validateAnalyticsIconVisibility() {
    return this.waitForElementVisible('@pageHeader', 'Page header is visible')
      .verify.visible('@analyticsIcon', 'Analytics icon is visible');
  },

  validateAnalyticsPageNavigation() {
    return this.click('@analyticsIcon');
  },

  validateUrlChange(url) {
    return this.verify.urlContains(url);
  },

  verifyPageTitle() {
    return this.waitForElementVisible('@contactPageTitle', 'The Contact Page title is visible');
  },

  enterDetails(element, value) {
    return this.waitForElementVisible(element, ` ${element} is visible`)
      .setValue(element, value);
  },

  selectRadioOption(element) {
    return this.waitForElementVisible(element, ` ${element} is visible`)
      .click(element);
  },

  contactEditMode(createdContact) {
    return this.waitForElementVisible(createdContact, ` ${createdContact} Created Contact is visible in the contact list.`)
      .click(createdContact)
      .waitForElementVisible('@summaryPanel', 'Summary Panel opened.')
      .click('@editProfileButton');
  },

  checkElementVisibility(element) {
    logger.info('check visibility of edit page title');
    return this.waitForElementVisible(element, 1000, (result) => {
      logger.info('=================', result.value);
      if (result.value) {
        logger.info('>>>>>>>>>>>>>> Inside If condition');
        this.click(element);
      }
    });
  },

  editContactDetails(element, newValue) {
    return this.waitForElementVisible(element, `${element} is visible`)
      .clearValue(element)
      .setValue(element, newValue);
  },

  async addUpdatePhoto() {
    this.waitForElementVisible('@addPhotoButton', 'Add Photo button visible')
      .click('@addPhotoButton')
      .waitForElementNotVisible('@uploadPhotoButton', 'Upload Photo modal is open')
      .pause(2000);
    await helper.uploadFile(this, 'contact.png', '@addProfilePhoto');
    return this.pause(3000)
      .click('@doneUploadPhoto')
      .waitForElementNotPresent('@doneUploadPhoto', 'Upload photo modal is hidden')
      .click('@updateContactButton')
      .waitForElementVisible('@editSuccessMessage', 'Success message displayed');
  },

  addConnectedParty(searchText) {
    return this.waitForElementVisible('@connectedPartySearchInput', 'Connected Party search input is visible')
      .setValue('@connectedPartySearchInput', searchText)
      .waitForElementVisible('@connectedPartyContact', 'Searched contact is visible')
      .click('@connectedPartyContact')
      .waitForElementVisible('@addedConnectedParty', 'Added connected party is visible in connected party section');
  },

  verifyAddedConnectedParty(connectedContactElement, connectedRelationshipElement, relationship) {
    return this.waitForElementVisible('@contactTitle', 'Contact Title is visible in the contact list.')
      .waitForElementVisible('@editProfileButton', 'Summary Panel opened.')
      .waitForElementVisible(connectedContactElement, 'Added connected party is visible on summary panel')
      .waitForElementVisible(connectedRelationshipElement, `Added connected party is ${relationship}`);
  },

  clickCreateNewContact() {
    return this.waitForElementVisible('@createNewContactByConnectionButton', 'Create New Contact button is visible')
      .click('@createNewContactByConnectionButton')
      .waitForElementVisible('@createContactFormModal', 'Add new contact form modal is visible');
  },

  clickSearchUsers() {
    return this.waitForElementVisible('@searchUserButton', 'Search user button is visible')
      .click('@searchUserButton')
      .waitForElementVisible('@addContactButtonModal', 'Search user modal is opened');
  },

  deleteContact(contactName) {
    return this.waitForElementVisible(contactName, ` ${contactName} is visible in the contact list.`)
      .click(contactName)
      .waitForElementVisible('@deleteContactButton', 'Delete Contact Button is visible.')
      .click('@deleteContactButton')
      .waitForElementVisible('@confirmDeleteButton', 'Delete Modal Opened.')
      .click('@confirmDeleteButton')
      .waitForElementVisible('@deleteSuccessMessage', 'Delete Success Message is visible.')
      .pause(1000);
  },

  getRandomNumber() {
    return randomNumber;
  },

  verifyAddContactButtonVisibility() {
    return this.expect.element('@addContactButton').to.not.be.present;
  },

  addPhoneNumberEmail(linkElement, inputFieldElement, value) {
    return this.click(linkElement)
      .waitForElementVisible(inputFieldElement, ` ${inputFieldElement} is visible`)
      .setValue(inputFieldElement, value);
  },

  openAppointmentStatusDropdown() {
    return this.waitForElementVisible('@appointmentStatusDropdown', 'Dropdown for Appointment Status is visible')
      .click('@appointmentStatusDropdown');
  },

  selectAppointmentStatus(statusElement) {
    let xOffset = 0;
    let yOffset = 0;

    // Scrolls the Summary panel to get the required function in view
    return this.getLocation(statusElement, (tpObj) => {
      xOffset = tpObj.value.x;
      yOffset = tpObj.value.y;
      logger.info(`====Get Location X === ${tpObj.value.x}`);
      logger.info(`====Get Location Y === ${tpObj.value.y}`);
      this.moveToElement(statusElement, xOffset, yOffset)
        .moveToElement(statusElement, xOffset, yOffset);
    })
      .pause(5000)
      .click(statusElement);
  },

  clickConfirmStatusChange() {
    let xOffset = 0;
    let yOffset = 0;

    // Scrolls the Summary panel to get the required function in view
    return this.getLocation('@confirmStatusChange', (tpObj) => {
      xOffset = tpObj.value.x;
      yOffset = tpObj.value.y;
      logger.info(`====Get Location X === ${tpObj.value.x}`);
      logger.info(`====Get Location Y === ${tpObj.value.y}`);
      this.moveToElement('@confirmStatusChange', xOffset, yOffset)
        .moveToElement('@confirmStatusChange', xOffset, yOffset);
    })
      .click('@confirmStatusChange')
      .waitForElementVisible('@appointmentUpdateMessage', 'Appointment Update success message is visible')
      .waitForElementNotPresent('@appointmentUpdateMessage', 'Appointment Update success message is gone');
  },

  grantRhinopayStatus() {
    return this.waitForElementVisible('@rhinopayConsentInput', 'Rhinopay consent is visible')
      .click('@rhinopayConsentInput');
  },

  clickForwadingToggle() {
    return this.waitForElementVisible('@forwardingToggle', 'Forwarding Toggle is visible')
      .click('@forwardingToggle');
  },
};

module.exports = {
  commands: [contactsCommands],
  url() {
    return `${this.api.launch_url}/contacts`;
  },
  elements: {

    /*-----------------------------------------------------------*/
    // filter dropdown and its elements
    /*-----------------------------------------------------------*/


    goToConversationButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Go to Conversation\']',
      locateStrategy: 'xpath',
    },

    filterDropdown: {
      selector: '//BUTTON[contains(@title, \'Filter contacts\')]',
      locateStrategy: 'xpath',
    },

    allContactsOption: {
      selector: '//SPAN[contains(.,\'All Contacts\')]',
      locateStrategy: 'xpath',
    },

    patientFilterOption: {
      selector: '//SPAN[@class=\'u-text-overflow\'][contains(.,\'Patient\')]',
      locateStrategy: 'xpath',
    },

    unknownFilterOption: {
      selector: '//SPAN[@class=\'u-text-overflow\'][contains(.,\'Unknown\')]',
      locateStrategy: 'xpath',
    },

    otherFilterOption: {
      selector: '//SPAN[@class=\'u-text-overflow\'][contains(.,\'Other\')]',
      locateStrategy: 'xpath',
    },

    contactTypeOptionOnModal: {
      selector: `//DIV[@class='modal__body']//label[contains(@for, 'typeId')]//SPAN[contains(.,'${contactFeeder.contactTypeOnModal}')]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/
    // Add contact elements
    /*-----------------------------------------------------------*/

    addContactButton: {
      selector: '//BUTTON[contains(@title, \'Add New Contact\')]',
      locateStrategy: 'xpath',
    },

    searchInputInAddContactModal: {
      selector: '//INPUT[contains(@name, \'nonMembers\')]',
      locateStrategy: 'xpath',
    },

    addContactDropdownInput: {
      selector: '//DIV[contains(@class, \'modal\')]//INPUT',
      locateStrategy: 'xpath',
    },

    profileInboxContainer: {
      selector: '//DIV[contains(@class, \'convo__inner\')]',
      locateStrategy: 'xpath',
    },

    inboxMessageArea: {
      selector: '//DIV[contains(@class, \'convo__message__textarea\')]//TEXTAREA',
      locateStrategy: 'xpath',
    },

    sendMessageButton: {
      selector: '//BUTTON[contains(@class, \'convo__message__send\')]',
      locateStrategy: 'xpath',
    },

    replyMessage: {
      selector: `//DIV[text() = '${existingOrgFeeder.testBotReplyMessage} ${randomNumber}']`,
      locateStrategy: 'xpath',
    },

    inboundMessage: {
      selector: `//DIV[text() = '${existingOrgFeeder.testBotInboundMessage} ${randomNumber}']`,
      locateStrategy: 'xpath',
    },

    fbContactMessage: {
      selector: `//DIV[text() = '${existingOrgFeeder.facebookOutboundMessage} ${randomNumber}']`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/
    // Header Elements
    /*-----------------------------------------------------------*/

    pageHeader: {
      selector: '//HEADER[contains(@class, \'app-header\')]',
      locateStrategy: 'xpath',
    },

    analyticsIcon: {
      selector: '//BUTTON[contains(@id, \'nav-analytics\')]',
      locateStrategy: 'xpath',
    },

    addContactButtonModal: {
      selector: '//BUTTON[contains(@title,\'Search by\')]',
      locateStrategy: 'xpath',
    },

    // Form Elements

    firstNameInput: {
      selector: '//INPUT[contains(@id,\'firstName\')]',
      locateStrategy: 'xpath',
    },

    firstNameInputOnModal: {
      selector: '//DIV[@class=\'modal__body\']//INPUT[contains(@id,\'firstName\')]',
      locateStrategy: 'xpath',
    },

    middleNameInput: {
      selector: '//INPUT[contains(@id,\'middleName\')]',
      locateStrategy: 'xpath',
    },

    addNewContactButton: {
      selector: '//SPAN[contains(.,\'Add New Contact\')]',
      locateStrategy: 'xpath',
    },

    middleNameInputOnModal: {
      selector: '//DIV[@class=\'modal__body\']//INPUT[contains(@id,\'middleName\')]',
      locateStrategy: 'xpath',
    },

    lastNameInput: {
      selector: '//INPUT[contains(@id,\'lastName\')]',
      locateStrategy: 'xpath',
    },

    lastNameInputOnModal: {
      selector: '//DIV[@class=\'modal__body\']//INPUT[contains(@id,\'lastName\')]',
      locateStrategy: 'xpath',
    },

    preferredNameInput: {
      selector: '//INPUT[contains(@id,\'preferredName\')]',
      locateStrategy: 'xpath',
    },

    prefixDropdown: {
      selector: '//SELECT[contains(@id,\'prefixId\')]',
      locateStrategy: 'xpath',
    },

    suffixDropdown: {
      selector: '//SELECT[contains(@id,\'suffixId\')]',
      locateStrategy: 'xpath',
    },

    birthDateInput: {
      selector: '//INPUT[contains(@id,\'birthday\')]',
      locateStrategy: 'xpath',
    },

    birthDateInputOnModal: {
      selector: '//DIV[@class=\'modal__body\']//INPUT[contains(@id,\'birthday\')]',
      locateStrategy: 'xpath',
    },

    genderOption: {
      selector: `//label[text()='${contactFeeder.contactGender}']`,
      locateStrategy: 'xpath',
    },

    phoneNumberInput: {
      selector: '//INPUT[contains(@id,\'userPhones-0\')]',
      locateStrategy: 'xpath',
    },

    phoneNumberInputOnModal: {
      selector: '//DIV[@class=\'modal__body\']//INPUT[contains(@id,\'userPhones-0\')]',
      locateStrategy: 'xpath',
    },

    anotherPhoneNumberInput: {
      selector: '//INPUT[contains(@id,\'userPhones-1\')]',
      locateStrategy: 'xpath',
    },

    emailInput: {
      selector: '//INPUT[contains(@id,\'userEmails-0\')]',
      locateStrategy: 'xpath',
    },

    emailInputOnModal: {
      selector: '//DIV[@class=\'modal__body\']//INPUT[contains(@id,\'userEmails-0\')]',
      locateStrategy: 'xpath',
    },

    anotherEmailInput: {
      selector: '//INPUT[contains(@id,\'userEmails-1\')]',
      locateStrategy: 'xpath',
    },

    noteInput: {
      selector: '//textarea[contains(@id,\'note\')]',
      locateStrategy: 'xpath',
    },

    connectedPartySearchInput: {
      selector: '//INPUT[contains(@id,\'connectedParty\')]',
      locateStrategy: 'xpath',
    },

    connectedPartyContact: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${contactFeeder.contactOtherFirstName}')]`,
      locateStrategy: 'xpath',
    },

    addedConnectedParty: {
      selector: `//DIV[contains(@class,'profile__connected-party')]//SPAN[@class='resource__intro__title__content'][contains(text(), '${contactFeeder.contactFirstNameOnModal}')]`,
      locateStrategy: 'xpath',
    },

    connectedPartyOnSummary: {
      selector: `//DIV[@class='summary-panel__wrapper']//SPAN[contains(@class,'resource__intro__title__content')][contains(text(), '${contactFeeder.contactFirstNameOnModal}')]`,
      locateStrategy: 'xpath',
    },

    parentRelationshipOnSummary: {
      selector: '//DIV[@class=\'summary-panel__wrapper\']//SPAN[contains(@class,\'resource__intro__title__sub\')][contains(text(),\'Parent\')]',
      locateStrategy: 'xpath',
    },

    updatedRelationshipOnSummary: {
      selector: `//DIV[@class='summary-panel__wrapper']//SPAN[contains(@class,'resource__intro__title__sub')][contains(text(), '${contactFeeder.connectedNewRelationship}')]`,
      locateStrategy: 'xpath',
    },

    connectionTypeInput: {
      selector: '//SELECT[contains(@id,\'connectionTypeId\')]',
      locateStrategy: 'xpath',
    },

    // Action elements
    createNewContactButton: {
      selector: '//SPAN[contains(text(),\'Create Contact\')]',
      locateStrategy: 'xpath',
    },

    createNewContactByConnectionButton: {
      selector: '//SPAN[contains(text(),\'Create New Contact\')]',
      locateStrategy: 'xpath',
    },

    editProfileButton: {
      selector: '//SPAN[contains(text(),\'Edit Profile\')]',
      locateStrategy: 'xpath',
    },

    updateContactButton: {
      selector: '//SPAN[contains(text(),\'Update Contact\')]',
      locateStrategy: 'xpath',
    },

    addPhoneNumber: {
      selector: '//SPAN[contains(text(),\'Add another phone number\')]',
      locateStrategy: 'xpath',
    },

    addAnotherEmail: {
      selector: '//SPAN[contains(text(),\'Add another email address\')]',
      locateStrategy: 'xpath',
    },

    addPhotoButton: {
      selector: '//SPAN[contains(.,\'Add Photo\')]',
      locateStrategy: 'xpath',
    },

    uploadPhotoButton: {
      selector: '//LABEL[contains(.,\'Upload Photo\')]',
      locateStrategy: 'xpath',
    },

    doneUploadPhoto: {
      selector: '//SPAN[text()=\'Done\']',
      locateStrategy: 'xpath',
    },

    addConnectedPartyButton: {
      selector: '//SPAN[contains(text(),\'Add Connected Party\')]',
      locateStrategy: 'xpath',
    },

    removeConnectedPartyButton: {
      selector: '//BUTTON[contains(@title,\'Remove connected party\')]',
      locateStrategy: 'xpath',
    },

    searchUserButton: {
      selector: '//SPAN[text()=\'Search users\']',
      locateStrategy: 'xpath',
    },

    filterContactButton: {
      selector: '//BUTTON[@title=\'Filter contacts\']',
      locateStrategy: 'xpath',
    },

    searchUsersModalCloseButton: {
      selector: '//BUTTON[contains(@class,\'close modal__header__close\')][@title=\'Close\']',
      locateStrategy: 'xpath',
    },

    // Notifications
    createSuccessMessage: {
      selector: '//*[text()=\'Contact created successfully.\']',
      locateStrategy: 'xpath',
    },

    editSuccessMessage: {
      selector: '//*[text()=\'Contact updated successfully.\']',
      locateStrategy: 'xpath',
    },

    deleteSuccessMessage: {
      selector: '//*[text()=\'Contact successfully deleted.\']',
      locateStrategy: 'xpath',
    },

    appointmentUpdateMessage: {
      selector: '//*[text()=\'Appointment updated successfully.\']',
      locateStrategy: 'xpath',
    },

    // Others elements
    summaryPanel: {
      selector: '//DIV[@class=\'app-page__header__title\'][text()=\'Summary\']',
      locateStrategy: 'xpath',
    },

    contactCreatePageTitle: {
      selector: '//DIV[@class=\'app-page__header__title\'][text()=\'Create Contact\']',
      locateStrategy: 'xpath',
    },

    contactEditPageTitle: {
      selector: '//DIV[@class=\'app-page__header__title\'][text()=\'Edit Contact\']',
      locateStrategy: 'xpath',
    },

    createdContact: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(text(),'${contactFeeder.contactFirstName}')]`,
      locateStrategy: 'xpath',
    },

    editedContact: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(text(),'${contactFeeder.contactNewFirstName}')]`,
      locateStrategy: 'xpath',
    },

    createContactFormModal: {
      selector: '//h3[@class=\'modal__header__title\'][text()=\'Create Contact\']',
      locateStrategy: 'xpath',
    },

    filteredPatientContact: {
      selector: `//SPAN[contains(@class, 'resource__intro__title__content has-subtitle')][contains(text(),'${contactFeeder.contactFirstNameOnModal} ${contactFeeder.contactLastNameOnModal}')]`,
      locateStrategy: 'xpath',
    },

    filteredContactPatientType: {
      selector: '//DIV[@class=\'resource__right\'][text()=\'Patient\']',
      locateStrategy: 'xpath',
    },

    filteredOtherContact: {
      selector: `//SPAN[contains(@class, 'resource__intro__title__content has-subtitle')][contains(text(),'${contactFeeder.contactNewFirstName} ${contactFeeder.contactNewLastName}')]`,
      locateStrategy: 'xpath',
    },

    filteredContactOtherType: {
      selector: '//DIV[@class=\'resource__right\'][text()=\'Other\']',
      locateStrategy: 'xpath',
    },

    noRecords: {
      selector: '//h3[contains(text(),\'Looks like you don\')]',
      locateStrategy: 'xpath',
    },

    searchContactInput: {
      selector: '//SPAN[contains(text(),\'Search users\')]',
      locateStrategy: 'xpath',
    },

    searchedContactForPatient: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(text(),'${contactFeeder.contactNewFirstName} ${contactFeeder.contactNewLastName}')]`,
      locateStrategy: 'xpath',
    },

    searchedContactFirstResult: {
      selector: `//SPAN[@class='resource__intro__title__content']//STRONG[text()='${contactFeeder.contactFirstNameOnModal} ${contactFeeder.contactLastNameOnModal}']`,
      locateStrategy: 'xpath',
    },

    deleteContactButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][contains(text(),\'Delete Contact\')]',
      locateStrategy: 'xpath',
    },

    confirmDeleteButton: {
      selector: '//*[@class=\'modal__content\']//SPAN[@class=\'button__text-wrapper\'][contains(text(),\'Delete Contact\')]',
      locateStrategy: 'xpath',
    },

    contactTitle: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(text(),'${contactFeeder.contactNewFirstName} ${contactFeeder.contactNewLastName}')]`,
      locateStrategy: 'xpath',
    },

    otherContactTitle: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(text(),'${contactFeeder.contactOtherFirstName} ${contactFeeder.contactOtherLastName}')]`,
      locateStrategy: 'xpath',
    },

    connectedPartyTitle: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(text(),'${contactFeeder.contactFirstNameOnModal} ${contactFeeder.contactLastNameOnModal}')]`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------------*/
    // Upcoming Appointments Section
    /*-----------------------------------------------------------*/

    appointmentStatusDropdown: {
      selector: '//DIV[@class=\'hipaa-status__summary-header is-clickable\'][contains(.,\'Status\')]',
      locateStrategy: 'xpath',
    },

    unconfirmedStatus: {
      selector: '//INPUT[@value=\'81\']//parent::div//LABEL',
      locateStrategy: 'xpath',
    },

    confirmedStatus: {
      selector: '//INPUT[@value=\'82\']//parent::div//LABEL',
      locateStrategy: 'xpath',
    },

    cancelledStatus: {
      selector: '//INPUT[@value=\'83\']//parent::div//LABEL',
      locateStrategy: 'xpath',
    },

    confirmStatusChange: {
      selector: '//BUTTON[@class=\'button button--primary button--small\']//SPAN[text()=\'Confirm status change\']',
      locateStrategy: 'xpath',
    },

    // communication consent Inputs
    rhinopayConsentInput: {
      selector: '//INPUT[@name = \'rhinopayStatusCover\'][@value= \'92\']/following-sibling::label[1]',
      locateStrategy: 'xpath',
    },

    forwardingToggle: {
      selector: '//LABEL[@class=\'rhinoswitcher__label\'][contains(@for,\'forwarding\')]',
      locateStrategy: 'xpath',
    },

    // Contact type
    patientOption: {
      selector: '//SPAN[contains(.,\'Patient\')]',
      locateStrategy: 'xpath',
    },

    otherOption: {
      selector: '//SPAN[contains(.,\'Other\')]',
      locateStrategy: 'xpath',
    },

    // Add Profile Photo
    addProfilePhoto: {
      selector: '//INPUT[@id = \'js-upload-avatar\']',
      locateStrategy: 'xpath',
    },
  },

};
