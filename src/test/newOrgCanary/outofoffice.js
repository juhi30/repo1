import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

describe('OOO Event Page', () => {
	test('Add an OOO event by CCR', async () => {
		const outOfOffice = client.page.OutOfOfficePage();
		const auditLogs = client.page.AuditLogsPage();

		await outOfOffice.navigate()
			.verify.urlContains('out-of-office', 'Out of Office Page is opened')
			.clickAddEvent()
			.enterDetails('@titleInput', testConstants.oooTitle)
			.enterDetails('@messageTextArea', testConstants.oooMessage)
			.enterDetails('@fromDateInput', testConstants.oooFromDate)
			.enterDetails('@fromTimeInput', testConstants.oooFromTime)
			.enterDetails('@toDateInput', testConstants.oooToDate)
			.enterDetails('@toTimeInput', testConstants.oooToTime)
			.selectChannel()
			.submit('@createEventButton', '@eventCreateSuccessMessage')

		await auditLogs.navigate()
			.verify.urlContains('auditLog', 'AuditL Logs Page is opened')
			.pause(3000)
			.validateAuditEntry('ccr', 'Out of Office', 'Add', testConstants.oooTitle, '')
	});

	test('Edit an OOO event by CCR', async () => {
		const outOfOffice = client.page.OutOfOfficePage();
		const auditLogs = client.page.AuditLogsPage();

		await outOfOffice.navigate()
			.eventEditMode('@eventName')
			.editEventDetails('@titleInput', testConstants.newEventTitle)
			.editEventDetails('@messageTextArea', testConstants.newEventMessage)
			.editEventDetails('@fromDateInput', testConstants.newFromDate)
			.enterDetails('@fromTimeInput', testConstants.newFromTime)
			.editEventDetails('@toDateInput', testConstants.newToDate)
			.enterDetails('@toTimeInput', testConstants.newToTime)
			.submit('@updateEventButton', '@eventUpdateSuccessMessage')
			
		await auditLogs.navigate()
			.verify.urlContains('auditLog', 'AuditL Logs Page is opened')
			.pause(3000)
			.validateAuditEntry('ccr', 'Out of Office', 'Edit', testConstants.newEventTitle, '')
	});

	test('Delete created event by CCR', async () => {
		const outOfOffice = client.page.OutOfOfficePage();
		const auditLogs = client.page.AuditLogsPage();

		await outOfOffice.navigate()
			.eventEditMode('@updatedEventName')
			.deleteEvent()

		await auditLogs.navigate()
			.verify.urlContains('auditLog', 'AuditL Logs Page is opened')
			.pause(3000)
			.validateAuditEntry('ccr', 'Out of Office', 'Delete', testConstants.newEventTitle, '')
	});

	test('Logout as CCR', async () => {
		const logout = client.page.UniversalElements();
	
		await logout.clickLogout();    
	  });
});
