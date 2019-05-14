import { client } from 'nightwatch-api';

const contactFeeder = require('../../feeder/contact.feeder');

describe('Automated Tests: Contact', () => {
  const contact = client.page.ContactsPage();
  const auditLogs = client.page.AuditLogsPage();

  test('Contact Create - New Patient type without Connected Party', async () => {
    const contactName = `${contactFeeder.contactFirstName} ${contactFeeder.contactLastName}`;

    await contact.navigate()
      .verify.urlContains('contacts', 'Contact Page is opened')
      .clickAddContact()
      .clickAddNewContact();

    await client.url(`${process.env.APP_URL}/contacts/create`);
    await contact.waitForElementVisible('@contactCreatePageTitle', 'New Contact setup page is open')
      .enterDetails('@firstNameInput', contactFeeder.contactFirstName)
      .enterDetails('@middleNameInput', contactFeeder.contactMiddleName)
      .enterDetails('@lastNameInput', contactFeeder.contactLastName)
      .enterDetails('@preferredNameInput', contactFeeder.contactPreferredName)
      .enterDetails('@prefixDropdown', contactFeeder.contactPrefix)
      .enterDetails('@suffixDropdown', contactFeeder.contactSuffix)
      .enterDetails('@birthDateInput', contactFeeder.contactBirthDate)
      .selectRadioOption('@genderOption')
      .enterDetails('@phoneNumberInput', contactFeeder.contactFirstPhoneNumber)
      .enterDetails('@emailInput', contactFeeder.contactFirstEmail)
      .enterDetails('@noteInput', contactFeeder.contactNote)
      .clickCreateUpdateContact('@createNewContactButton', '@createSuccessMessage');

    await auditLogs.navigate()
      .verify.urlContains('auditLog', 'Audit Logs Page is opened')
      .pause(1000)
      .selectContactFilter(contactName, '@searchContactPatient')
      .pause(1000)
      .selectActionFilter('@selectAddAction')
      .pause(1000)
      .validateAuditEntry(contactFeeder.memberName, 'Contact', 'View', contactName, contactName);
  });

  test('Contact Create - Another New Patient type, used later for Messaging tests', async () => {
    const contactName = `${contactFeeder.contactFirstName} ${contactFeeder.contactLastName}`;

    await contact.navigate()
      .verify.urlContains('contacts', 'Contact Page is opened')
      .clickAddContact()
      .clickAddNewContact();

    await client.url(`${process.env.APP_URL}/contacts/create`);
    await contact.waitForElementVisible('@contactCreatePageTitle', 'New Contact setup page is open')
      .enterDetails('@firstNameInput', contactFeeder.anotherContactFirstName)
      .enterDetails('@lastNameInput', contactFeeder.anotherContactLastName)
      .enterDetails('@birthDateInput', contactFeeder.anotherContactBirthDate)
      .enterDetails('@phoneNumberInput', contactFeeder.anotherContactFirstPhoneNumber)
      
      .clickCreateUpdateContact('@createNewContactButton', '@createSuccessMessage');
  });

  test('Contact Create - New Other type without Connected Party', async () => {
    const contactName = `${contactFeeder.contactOtherFirstName} ${contactFeeder.contactOtherLastName}`;

    await contact.navigate()
      .verify.urlContains('contacts', 'Contact Page is opened')
      .clickAddContact()
      .clickAddNewContact();

    await client.url(`${process.env.APP_URL}/contacts/create`);

    await contact.waitForElementVisible('@contactCreatePageTitle', 'New Contact setup page is open')
      .selectRadioOption('@otherOption')
      .enterDetails('@firstNameInput', contactFeeder.contactOtherFirstName)
      .enterDetails('@lastNameInput', contactFeeder.contactOtherLastName)
      .enterDetails('@preferredNameInput', contactFeeder.contactOtherPreferredName)
      .enterDetails('@prefixDropdown', contactFeeder.contactOtherPrefix)
      .enterDetails('@suffixDropdown', contactFeeder.contactOtherSuffix)
      .enterDetails('@birthDateInput', contactFeeder.contactOtherBirthDate)
      .selectRadioOption('@genderOption')
      .enterDetails('@phoneNumberInput', contactFeeder.contactOtherFirstNumber)
      .enterDetails('@emailInput', contactFeeder.contactOtherFirstEmail)
      .enterDetails('@noteInput', contactFeeder.contactNote)
      .clickCreateUpdateContact('@createNewContactButton', '@createSuccessMessage');

    await auditLogs.navigate()
      .verify.urlContains('auditLog', 'Audit Logs Page is opened')
      .pause(1000)
      .selectContactFilter(contactName, '@searchContactOther')
      .pause(1000)
      .selectActionFilter('@selectAddAction')
      .pause(1000)
      .validateAuditEntry(contactFeeder.memberName, 'Contact', 'View', contactName, contactName);
  });

  test('Contact Edit - Patient type to Other', async () => {
    const contactName = `${contactFeeder.contactNewFirstName} ${contactFeeder.contactNewLastName}`;

    await contact.navigate()
      .verify.urlContains('contacts', 'Contact Page is opened')
      .contactEditMode('@createdContact')
      .pause(500)
      .checkElementVisibility('@editProfileButton')
      .selectRadioOption('@otherOption')
      .editContactDetails('@firstNameInput', contactFeeder.contactNewFirstName)
      .editContactDetails('@lastNameInput', contactFeeder.contactNewLastName)
      .editContactDetails('@birthDateInput', contactFeeder.contactNewBirthDate)
      .click('@addPhoneNumber')
      .enterDetails('@anotherPhoneNumberInput', contactFeeder.contactSecondPhoneNumber)
      .click('@addAnotherEmail')
      .enterDetails('@anotherEmailInput', contactFeeder.contactSecondEmail)
      .clickCreateUpdateContact('@updateContactButton', '@editSuccessMessage');

    await auditLogs.navigate()
      .verify.urlContains('auditLog', 'Audit Logs Page is opened')
      .pause(1000)
      .selectContactFilter(contactName, '@searchContactNew')
      .pause(1000)
      .selectActionFilter('@selectEditAction')
      .pause(1000)
      .validateAuditEntry(contactFeeder.memberName, 'Contact', 'Edit', contactName, contactName);
  });

  test('Contact Edit - Upload Photo', async () => {
    const contactName = `${contactFeeder.contactNewFirstName} ${contactFeeder.contactNewLastName}`;

    await contact.navigate()
      .verify.urlContains('contacts', 'Contact Page is opened')
      .contactEditMode('@editedContact')
      .pause(500)
      .checkElementVisibility('@editProfileButton')
      .addUpdatePhoto();

    await auditLogs.navigate()
      .verify.urlContains('auditLog', 'Audit Logs Page is opened')
      .pause(1000)
      .selectContactFilter(contactName, '@searchContactNew')
      .pause(1000)
      .selectActionFilter('@selectEditAction')
      .pause(1000)
      .validateAuditEntry(contactFeeder.memberName, 'Contact', 'Edit', contactName, contactName);
  });

  test('Contact Edit - Add connected party as Parent/Stepparent by creating new contact', async () => {
    const connectedPartyContact = `${contactFeeder.contactFirstNameOnModal} ${contactFeeder.contactLastNameOnModal}`;

    await contact.navigate()
      .verify.urlContains('contacts', 'Contact Page is opened')
      .contactEditMode('@editedContact')
      .pause(500)
      .checkElementVisibility('@editProfileButton')
      .click('@addConnectedPartyButton')
      .clickCreateNewContact()
      .enterDetails('@firstNameInputOnModal', contactFeeder.contactFirstNameOnModal)
      .enterDetails('@middleNameInputOnModal', contactFeeder.contactMiddleNameOnModal)
      .enterDetails('@lastNameInputOnModal', contactFeeder.contactLastNameOnModal)
      .enterDetails('@birthDateInputOnModal', contactFeeder.contactBirthDateOnModal)
      .enterDetails('@phoneNumberInputOnModal', contactFeeder.contactNumberOnModal)
      .enterDetails('@emailInputOnModal', contactFeeder.contactEmailOnModal)
      .clickCreateUpdateContact('@createNewContactButton', '@createSuccessMessage')
      .waitForElementVisible('@addedConnectedParty', 'Added connected party is visible in connected party section')
      .pause(1000)
      .clickCreateUpdateContact('@updateContactButton', '@editSuccessMessage')
      .pause(1000)
      .verifyAddedConnectedParty('@connectedPartyOnSummary', '@parentRelationshipOnSummary', 'Parent');

    await auditLogs.navigate()
      .verify.urlContains('auditLog', 'Audit Logs Page is opened')
      .pause(1000)
      .selectContactFilter(connectedPartyContact, '@searchedContactConnectedParty')
      .pause(1000)
      .selectActionFilter('@selectAddAction')
      .pause(1000)
      .validateAuditEntry(contactFeeder.memberName, 'Contact', 'Edit', connectedPartyContact, connectedPartyContact);
  });

  test('Contact Edit - Update added connected Party relation from Parent/Stepparent to Guardian', async () => {
    const contactName = `${contactFeeder.contactNewFirstName} ${contactFeeder.contactNewLastName}`;

    await contact.navigate()
      .verify.urlContains('contacts', 'Contact Page is opened')
      .contactEditMode('@editedContact')
      .pause(500)
      .checkElementVisibility('@editProfileButton')
      .enterDetails('@connectionTypeInput', contactFeeder.connectedNewRelationship)
      .clickCreateUpdateContact('@updateContactButton', '@editSuccessMessage')
      .verifyAddedConnectedParty('@connectedPartyOnSummary', '@updatedRelationshipOnSummary', contactFeeder.connectedNewRelationship);

    await auditLogs.navigate()
      .verify.urlContains('auditLog', 'Audit Logs Page is opened')
      .pause(1000)
      .selectContactFilter(contactName, '@searchContactNew')
      .pause(1000)
      .selectActionFilter('@selectEditAction')
      .pause(1000)
      .validateAuditEntry(contactFeeder.memberName, 'Contact', 'Edit', contactName, contactName);
  });

  test('Contact Edit - Removed added connected party', async () => {
    const contactName = `${contactFeeder.contactNewFirstName} ${contactFeeder.contactNewLastName}`;

    await contact.navigate()
      .verify.urlContains('contacts', 'Contact Page is opened')
      .contactEditMode('@editedContact')
      .pause(500)
      .checkElementVisibility('@editProfileButton')
      .click('@removeConnectedPartyButton')
      .clickCreateUpdateContact('@updateContactButton', '@editSuccessMessage')
      .pause(1000);

    await auditLogs.navigate()
      .verify.urlContains('auditLog', 'Audit Logs Page is opened')
      .pause(1000)
      .selectContactFilter(contactName, '@searchContactNew')
      .pause(1000)
      .selectActionFilter('@selectEditAction')
      .pause(1000)
      .validateAuditEntry(contactFeeder.memberName, 'Contact', 'Edit', contactName, contactName);
  });

  test('Contact Filter - Filter for a contact', async () => {
    await contact.navigate()
      .verify.urlContains('contacts', 'Contact Page is opened')
      .validateContactFilterOptions()
      .clickFilterOption('@patientOption', 'Patient')
      .waitForElementVisible('@filteredPatientContact', 'Patient contact is visible')
      .waitForElementVisible('@filteredContactPatientType', 'Filtered contact should be Patient')
      .clickFilterOption('@otherOption', 'Other')
      .waitForElementVisible('@filteredOtherContact', 'Other contact is visible')
      .waitForElementVisible('@filteredContactOtherType', 'Filtered contact should be Other')
      .clickFilterOption('@unknownOption', 'Unknown')
      .waitForElementVisible('@noRecords', 'No contact is visible');
  });

  test('Contact Search - Search for a contact', async () => {
    const searchText = `${contactFeeder.contactFirstNameOnModal} ${contactFeeder.contactLastNameOnModal}`;

    await contact.searchForContact(searchText, '@searchedContactFirstResult');
  });

  test('Delete Contact - Converted Contact(patient to Other)', async () => {
    const contactName = `${contactFeeder.contactNewFirstName} ${contactFeeder.contactNewLastName}`;

    await contact.navigate()
      .deleteContact('@contactTitle');

    await auditLogs.navigate()
      .verify.urlContains('auditLog', 'Audit Logs Page is opened')
      .pause(2000)
      .selectContactFilter(contactName, '@searchContactNew')
      .pause(1000)
      .selectActionFilter('@selectDeleteAction')
      .pause(1000)
      .validateAuditEntry(contactFeeder.memberName, 'Contact', 'Delete', contactName, contactName);
  });

  test('Delete Contact - Other Contact type', async () => {
    const contactName = `${contactFeeder.contactOtherFirstName} ${contactFeeder.contactOtherLastName}`;

    await contact.navigate()
      .deleteContact('@otherContactTitle');

    await auditLogs.navigate()
      .verify.urlContains('auditLog', 'Audit Logs Page is opened')
      .pause(2000)
      .selectContactFilter(contactName, '@searchOtherContact')
      .pause(1000)
      .selectActionFilter('@selectDeleteAction')
      .pause(1000)
      .validateAuditEntry(contactFeeder.memberName, 'Contact', 'Delete', contactName, contactName);
  });

  test('Delete Contact - Connected Party Contact', async () => {
    const contactName = `${contactFeeder.contactFirstNameOnModal} ${contactFeeder.contactLastNameOnModal}`;

    await contact.navigate()
      .deleteContact('@connectedPartyTitle');

    await auditLogs.navigate()
      .verify.urlContains('auditLog', 'Audit Logs Page is opened')
      .pause(2000)
      .selectContactFilter(contactName, '@searchConnectedParty')
      .pause(1000)
      .selectActionFilter('@selectDeleteAction')
      .pause(1000)
      .validateAuditEntry(contactFeeder.memberName, 'Contact', 'Delete', contactName, contactName);
  });
});
