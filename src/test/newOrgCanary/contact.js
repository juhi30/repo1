import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox')

describe('Automated Tests: Contact', () => {
	const contact = client.page.ContactsPage(),
		auditLogs = client.page.AuditLogsPage();

	test('Contact Create - New Patient type without Connected Party', async () => {
		const contactName = testConstants.contactFirstName + ' ' + testConstants.contactLastName;
		await contact.navigate()
			.verify.urlContains('contacts', 'Contact Page is opened')
			.clickAddContact()
			//.clickAddNewContact()
		await client.url(process.env.APP_URL + '/contacts/create')
		await contact.waitForElementVisible('@contactCreatePageTitle', 'New Contact setup page is open')
			.enterDetails('@firstNameInput', testConstants.contactFirstName)
			.enterDetails('@middleNameInput', testConstants.contactMiddleName)
			.enterDetails('@lastNameInput', testConstants.contactLastName)
			.enterDetails('@preferredNameInput', testConstants.contactPreferredName)
			.enterDetails('@prefixDropdown', testConstants.contactPrefix)
			.enterDetails('@suffixDropdown', testConstants.contactSuffix)
			.enterDetails('@birthDateInput', testConstants.contactBirthDate)
			.selectRadioOption('@genderOption')
			.enterDetails('@phoneNumberInput', testConstants.contactFirstPhoneNumber)
			.enterDetails('@emailInput', testConstants.contactFirstEmail)
			.enterDetails('@noteInput', testConstants.contactNote)
			.clickCreateUpdateContact('@createNewContactButton', '@createSuccessMessage')

		await auditLogs.navigate()
			.verify.urlContains('auditLog', 'AuditL Logs Page is opened')
			.pause(1000)
			.selectContactFilter(contactName, '@searchContactPatient')
			.validateAuditEntry(testConstants.memberName, 'Contact', 'View', contactName, contactName)
	});

	test('Contact Create - New Other type without Connected Party', async () => {
		const contactName = testConstants.contactOtherFirstName + ' ' + testConstants.contactOtherLastName;
		await contact.navigate()
			.verify.urlContains('contacts', 'Contact Page is opened')
			.clickAddContact()
			//.clickAddNewContact()
		await client.url(process.env.APP_URL + '/contacts/create')
		await contact.waitForElementVisible('@contactCreatePageTitle', 'New Contact setup page is open')
			.selectRadioOption('@otherOption')
			.enterDetails('@firstNameInput', testConstants.contactOtherFirstName)
			.enterDetails('@lastNameInput', testConstants.contactOtherLastName)
			.enterDetails('@preferredNameInput', testConstants.contactOtherPreferredName)
			.enterDetails('@prefixDropdown', testConstants.contactOtherPrefix)
			.enterDetails('@suffixDropdown', testConstants.contactOtherSuffix)
			.enterDetails('@birthDateInput', testConstants.contactOtherBirthDate)
			.selectRadioOption('@genderOption')
			.enterDetails('@phoneNumberInput', testConstants.contactOtherFirstNumber)
			.enterDetails('@emailInput', testConstants.contactOtherFirstEmail)
			.enterDetails('@noteInput', testConstants.contactNote)
			.clickCreateUpdateContact('@createNewContactButton', '@createSuccessMessage')

		await auditLogs.navigate()
			.verify.urlContains('auditLog', 'AuditL Logs Page is opened')
			.pause(1000)
			.selectContactFilter(contactName, '@searchContactOther')
			.validateAuditEntry(testConstants.memberName, 'Contact', 'View', contactName, contactName)
	});

	test('Contact Edit - Patient type to Other', async () => {
		const contactName = testConstants.contactNewFirstName + ' ' + testConstants.contactNewLastName;

		await contact.navigate()
			.verify.urlContains('contacts', 'Contact Page is opened')
			.contactEditMode('@createdContact')
			.pause(500)
			.checkElementVisibility('@editProfileButton')
			.selectRadioOption('@otherOption')
			.editContactDetails('@firstNameInput', testConstants.contactNewFirstName)
			.editContactDetails('@lastNameInput', testConstants.contactNewLastName)
			.editContactDetails('@birthDateInput', testConstants.contactNewBirthDate)
			.click('@addPhoneNumber')
			.enterDetails('@anotherPhoneNumberInput', testConstants.contactSecondPhoneNumber)
			.click('@addAnotherEmail')
			.enterDetails('@anotherEmailInput', testConstants.contactSecondEmail)
			.clickCreateUpdateContact('@updateContactButton', '@editSuccessMessage')

		await auditLogs.navigate()
			.verify.urlContains('auditLog', 'AuditL Logs Page is opened')
			.pause(1000)
			.selectContactFilter(contactName, '@searchContactNew')
			.validateAuditEntry(testConstants.memberName, 'Contact', 'Edit', contactName, contactName)
	});

	test('Contact Edit - Upload Photo', async () => {
		const contactName = testConstants.contactNewFirstName + ' ' + testConstants.contactNewLastName;

		await contact.navigate()
			.verify.urlContains('contacts', 'Contact Page is opened')
			.contactEditMode('@editedContact')
			.pause(500)
			.checkElementVisibility('@editProfileButton')
			.addUpdatePhoto()

		await auditLogs.navigate()
			.verify.urlContains('auditLog', 'AuditL Logs Page is opened')
			.pause(1000)
			.selectContactFilter(contactName, '@searchContactNew')
			.validateAuditEntry(testConstants.memberName, 'Contact', 'Edit', contactName, contactName)
	});

	test('Contact Edit - Add connected party as Parent/Stepparent by creating new contact', async () => {
		const contactName = testConstants.contactNewFirstName + ' ' + testConstants.contactNewLastName;
		const connectedPartyContact = testConstants.contactFirstNameOnModal + ' ' + testConstants.contactLastNameOnModal;
		await contact.navigate()
			.verify.urlContains('contacts', 'Contact Page is opened')
			.contactEditMode('@editedContact')
			.pause(500)
			.checkElementVisibility('@editProfileButton')
			.click('@addConnectedPartyButton')
			.clickCreateNewContact()
			.enterDetails('@firstNameInputOnModal', testConstants.contactFirstNameOnModal)
			.enterDetails('@middleNameInputOnModal', testConstants.contactMiddleNameOnModal)
			.enterDetails('@lastNameInputOnModal', testConstants.contactLastNameOnModal)
			.enterDetails('@birthDateInputOnModal', testConstants.contactBirthDateOnModal)
			.enterDetails('@phoneNumberInputOnModal', testConstants.contactNumberOnModal)
			.enterDetails('@emailInputOnModal', testConstants.contactEmailOnModal)
			.clickCreateUpdateContact('@createNewContactButton', '@createSuccessMessage')
			.verify.visible('@addedConnectedParty', 'Added connected party is visible in connected party section')
			.pause(1000)
			.clickCreateUpdateContact('@updateContactButton', '@editSuccessMessage')
			.verifyAddedConnectedParty('@connectedPartyOnSummary', '@parentRelationshipOnSummary', 'Parent')

		await auditLogs.navigate()
			.verify.urlContains('auditLog', 'AuditL Logs Page is opened')
			.pause(1000)
			.selectContactFilter(connectedPartyContact, '@searchedContactConnectedParty')
			.pause(1000)
			.validateAuditEntry(testConstants.memberName, 'Contact', 'Edit', connectedPartyContact, connectedPartyContact)
	});

	test('Contact Edit - Update added connected Party relation from Parent/Stepparent to Guardian', async () => {
		const contactName = testConstants.contactNewFirstName + ' ' + testConstants.contactNewLastName;

		await contact.navigate()
			.verify.urlContains('contacts', 'Contact Page is opened')
			.contactEditMode('@editedContact')
			.pause(500)
			.checkElementVisibility('@editProfileButton')
			.enterDetails('@connectionTypeInput', testConstants.connectedNewRelationship)
			.clickCreateUpdateContact('@updateContactButton', '@editSuccessMessage')
			.verifyAddedConnectedParty('@connectedPartyOnSummary', '@updatedRelationshipOnSummary', testConstants.connectedNewRelationship)

		await auditLogs.navigate()
			.verify.urlContains('auditLog', 'AuditL Logs Page is opened')
			.pause(1000)
			.selectContactFilter(contactName, '@searchContactNew')
			.pause(1000)
			.validateAuditEntry(testConstants.memberName, 'Contact', 'Edit', contactName, contactName)
	});

	test('Contact Edit - Removed added connected party', async () => {
		const contactName = testConstants.contactNewFirstName + ' ' + testConstants.contactNewLastName;

		await contact.navigate()
			.verify.urlContains('contacts', 'Contact Page is opened')
			.contactEditMode('@editedContact')
			.pause(500)
			.checkElementVisibility('@editProfileButton')
			.click('@removeConnectedPartyButton')
			.clickCreateUpdateContact('@updateContactButton', '@editSuccessMessage')

		await auditLogs.navigate()
			.verify.urlContains('auditLog', 'AuditL Logs Page is opened')
			.pause(1000)
			.selectContactFilter(contactName, '@searchContactNew')
			.pause(1000)
			.validateAuditEntry(testConstants.memberName, 'Contact', 'Edit', contactName, contactName)
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
			.waitForElementVisible('@noRecords', 'No contact is visible')
	});

	test('Contact Search - Search for a contact', async () => {
		const searchText = testConstants.contactFirstNameOnModal + ' ' + testConstants.contactLastNameOnModal;
		await contact.searchForContact(searchText, '@searchedContactFirstResult')
			//.click('@searchUsersModalCloseButton')
	});

	// test('Logout as member', async () => {
	// 	const logout = client.page.UniversalElements();

	// 	await logout.clickLogout();
  	// });

});
