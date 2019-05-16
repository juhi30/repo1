import { client } from 'nightwatch-api';
import * as contactToolbox from '../../toolboxes/contact.toolbox';

const contactFeeder = require('../../feeder/contact.feeder');

describe('Automated Tests: Contact', () => {
  const contact = client.page.ContactsPage();
  const auditLogs = client.page.AuditLogsPage();

  test('Contact Create - New Patient type without Connected Party', async () => {
    const contactName = `${contactFeeder.contactFirstName} ${contactFeeder.contactLastName}`;
    const contactDetails = [{ element: '@firstNameInput', value: contactFeeder.contactFirstName },
      { element: '@middleNameInput', value: contactFeeder.contactMiddleName },
      { element: '@lastNameInput', value: contactFeeder.contactLastName },
      { element: '@preferredNameInput', value: contactFeeder.contactPreferredName },
      { element: '@prefixDropdown', value: contactFeeder.contactPrefix },
      { element: '@suffixDropdown', value: contactFeeder.contactSuffix },
      { element: '@birthDateInput', value: contactFeeder.contactBirthDate },
      { element: '@phoneNumberInput', value: contactFeeder.contactFirstPhoneNumber },
      { element: '@emailInput', value: contactFeeder.contactFirstEmail },
      { element: '@noteInput', value: contactFeeder.contactNote },
    ];
    await contactToolbox.createContact(contactDetails, '@patientOption');

    await auditLogs.navigate()
      .verify.urlContains('auditLog', 'Audit Logs Page is opened')
      .pause(1000)
      .selectContactFilter(contactName, '@searchContactPatient')
      .pause(1000)
      .selectActionFilter('@selectAddAction')
      .pause(1000)
      .validateAuditEntry(contactFeeder.memberName, 'Contact', 'View', contactName, contactName);
  });

  test('Contact Create - New Other type without Connected Party', async () => {
    const contactName = `${contactFeeder.contactOtherFirstName} ${contactFeeder.contactOtherLastName}`;
    const contactDetails = [{ element: '@firstNameInput', value: contactFeeder.contactOtherFirstName },
      { element: '@lastNameInput', value: contactFeeder.contactOtherLastName },
      { element: '@preferredNameInput', value: contactFeeder.contactOtherPreferredName },
      { element: '@prefixDropdown', value: contactFeeder.contactOtherPrefix },
      { element: '@suffixDropdown', value: contactFeeder.contactOtherSuffix },
      { element: '@birthDateInput', value: contactFeeder.contactOtherBirthDate },
      { element: '@phoneNumberInput', value: contactFeeder.contactOtherFirstNumber },
      { element: '@emailInput', value: contactFeeder.contactOtherFirstEmail },
      { element: '@noteInput', value: contactFeeder.contactNote },
    ];

    await contactToolbox.createContact(contactDetails, '@otherOption');

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
    const contactDetails = [{ element: '@firstNameInput', value: contactFeeder.contactNewFirstName },
      { element: '@lastNameInput', value: contactFeeder.contactNewLastName },
      { element: '@birthDateInput', value: contactFeeder.contactNewBirthDate },
    ];
    const contactOtherDetails = [{ linkElement: '@addPhoneNumber', inputFieldElement: '@anotherPhoneNumberInput', value: contactFeeder.contactSecondPhoneNumber },
      { linkElement: '@addAnotherEmail', inputFieldElement: '@anotherEmailInput', value: contactFeeder.contactSecondEmail },
    ];

    await contactToolbox.convertContactTypeAddNumberEmail('@createdContact', '@otherOption', contactDetails, contactOtherDetails);

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
    await contactToolbox.uploadPhoto('@editedContact');

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
    const connectedPartyDetails = [{ element: '@firstNameInputOnModal', value: contactFeeder.contactFirstNameOnModal },
      { element: '@middleNameInputOnModal', value: contactFeeder.contactMiddleNameOnModal },
      { element: '@lastNameInputOnModal', value: contactFeeder.contactLastNameOnModal },
      { element: '@birthDateInputOnModal', value: contactFeeder.contactBirthDateOnModal },
      { element: '@phoneNumberInputOnModal', value: contactFeeder.contactNumberOnModal },
      { element: '@emailInputOnModal', value: contactFeeder.contactEmailOnModal },
    ];
    await contactToolbox.addConnectedPartyToContact('@editedContact', connectedPartyDetails, '@addedConnectedParty', '@connectedPartyOnSummary', '@parentRelationshipOnSummary', 'Parent');

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
    await contactToolbox.updateConnectedPartyRelationWithContact('@editedContact', contactFeeder.connectedNewRelationship, '@connectedPartyOnSummary', '@updatedRelationshipOnSummary', contactFeeder.connectedNewRelationship);

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
    await contactToolbox.removeConnectedParty('@editedContact');

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
    await contactToolbox.searchContact(searchText, '@searchedContactFirstResult');
  });

  test('Delete Contact - Converted Contact(patient to Other)', async () => {
    const contactName = `${contactFeeder.contactNewFirstName} ${contactFeeder.contactNewLastName}`;
    await contactToolbox.deleteContact('@contactTitle');

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

    await contactToolbox.deleteContact('@otherContactTitle');

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

    await contactToolbox.deleteContact('@connectedPartyTitle');

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
