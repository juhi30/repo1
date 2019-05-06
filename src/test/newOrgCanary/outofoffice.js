import { client } from 'nightwatch-api';

const memberFeeder = require('../../toolboxes/feeder/member.feeder');
const oooFeeder = require('../../toolboxes/feeder/outOfOffice.feeder');

describe('OOO Event Page', () => {
  test('Add an OOO event by Member', async () => {
    const outOfOffice = client.page.OutOfOfficePage();
    const auditLogs = client.page.AuditLogsPage();

    await outOfOffice.navigate()
      .verify.urlContains('out-of-office', 'Out of Office Page is opened')
      .clickAddEvent()
      .enterDetails('@titleInput', oooFeeder.oooTitle)
      .enterDetails('@messageTextArea', oooFeeder.oooMessage)
      .enterDetails('@fromDateInput', oooFeeder.oooFromDate)
      .enterDetails('@fromTimeInput', oooFeeder.oooFromTime)
      .enterDetails('@toDateInput', oooFeeder.oooToDate)
      .enterDetails('@toTimeInput', oooFeeder.oooToTime)
      .selectChannel()
      .submit('@createEventButton', '@eventCreateSuccessMessage');

    await auditLogs.navigate()
      .verify.urlContains('auditLog', 'AuditL Logs Page is opened')
      .pause(3000)
      .validateAuditEntry(memberFeeder.memberName, 'Out of Office', 'Add', oooFeeder.oooTitle, '');
  });

  test('Edit an OOO event by Member', async () => {
    const outOfOffice = client.page.OutOfOfficePage();
    const auditLogs = client.page.AuditLogsPage();

    await outOfOffice.navigate()
      .eventEditMode('@eventName')
      .editEventDetails('@titleInput', oooFeeder.newEventTitle)
      .editEventDetails('@messageTextArea', oooFeeder.newEventMessage)
      .editEventDetails('@fromDateInput', oooFeeder.newFromDate)
      .enterDetails('@fromTimeInput', oooFeeder.newFromTime)
      .editEventDetails('@toDateInput', oooFeeder.newToDate)
      .enterDetails('@toTimeInput', oooFeeder.newToTime)
      .submit('@updateEventButton', '@eventUpdateSuccessMessage');

    await auditLogs.navigate()
      .verify.urlContains('auditLog', 'AuditL Logs Page is opened')
      .pause(3000)
      .validateAuditEntry(memberFeeder.memberName, 'Out of Office', 'Edit', oooFeeder.newEventTitle, '');
  });

  test('Delete created event by Member', async () => {
    const outOfOffice = client.page.OutOfOfficePage();
    const auditLogs = client.page.AuditLogsPage();

    await outOfOffice.navigate()
      .eventEditMode('@updatedEventName')
      .deleteEvent();

    await auditLogs.navigate()
      .verify.urlContains('auditLog', 'AuditL Logs Page is opened')
      .pause(3000)
      .validateAuditEntry(memberFeeder.memberName, 'Out of Office', 'Delete', oooFeeder.newEventTitle, '');
  });
});
