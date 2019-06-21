import { client } from 'nightwatch-api';
import * as contactToolbox from '../../toolboxes/contact.toolbox';

const contactFeeder = require('../../feeder/contact.feeder');

describe('Automated Tests: Contact', () => {
  const contact = client.page.ContactsPage();

  test('Contact Create - New Patient type without Connected Party', async () => {
    const contactDetails = [{ element: '@firstNameInput', value: contactFeeder.contactNewFirstName },
      { element: '@middleNameInput', value: contactFeeder.contactMiddleName },
      { element: '@lastNameInput', value: contactFeeder.contactNewLastName },
      { element: '@preferredNameInput', value: contactFeeder.contactPreferredName },
      { element: '@prefixDropdown', value: contactFeeder.contactPrefix },
      { element: '@suffixDropdown', value: contactFeeder.contactSuffix },
      { element: '@birthDateInput', value: contactFeeder.contactBirthDate },
      { element: '@phoneNumberInput', value: contactFeeder.contactFirstPhoneNumber },
      { element: '@emailInput', value: contactFeeder.contactFirstEmail },
      { element: '@noteInput', value: contactFeeder.contactNote },
    ];
    await contactToolbox.createContact(contactDetails, '@patientOption');
  });

  test('Contact Create - Another New Patient type, used later for Messaging tests', async () => {
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
});
