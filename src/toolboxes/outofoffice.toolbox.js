import { client } from 'nightwatch-api';
// import { handleErrorAndRemoveOrg } from './error.toolbox';

const outOfOffice = client.page.OutOfOfficePage();
const auditLogs = client.page.AuditLogsPage();

export const OOOSetup = async ({
  oooTitle, oooMessage, oooFromDate, oooFromTime, oooToDate, oooToTime,
}) => {
  try {
    await outOfOffice.navigate()
      .verify.urlContains('out-of-office', 'Out of Office Page is opened')
      .clickAddEvent()
      .enterDetails('@titleInput', oooTitle)
      .enterDetails('@messageTextArea', oooMessage)
      .enterDetails('@fromDateInput', oooFromDate)
      .enterDetails('@fromTimeInput', oooFromTime)
      .enterDetails('@toDateInput', oooToDate)
      .enterDetails('@toTimeInput', oooToTime)
      .selectChannel()
      .submit('@createEventButton', '@eventCreateSuccessMessage');
  } catch (error) {
    // handleErrorAndRemoveOrg(error, __filename, outOfOffice, process.env.NEW_CANARY_ORG_ID);
  }
};

export const checkOOOAuditEntry = async (memberName, oooTitle, action) => {
  try {
    await auditLogs.navigate()
      .verify.urlContains('auditLog', 'AuditL Logs Page is opened')
      .pause(3000)
      .validateAuditEntry(memberName, 'Out of Office', action, oooTitle, '@categoryOOO');
  } catch (error) {
    // handleErrorAndRemoveOrg(error, __filename, auditLogs, process.env.NEW_CANARY_ORG_ID);
  }
};

export const editOOO = async ({
  newEventTitle, newEventMessage, newFromDate, newFromTime, newToDate, newToTime,
}) => {
  try {
    await outOfOffice.navigate()
      .eventEditMode('@eventName')
      .editEventDetails('@titleInput', newEventTitle)
      .editEventDetails('@messageTextArea', newEventMessage)
      .editEventDetails('@fromDateInput', newFromDate)
      .enterDetails('@fromTimeInput', newFromTime)
      .editEventDetails('@toDateInput', newToDate)
      .enterDetails('@toTimeInput', newToTime)
      .submit('@updateEventButton', '@eventUpdateSuccessMessage');
  } catch (error) {
    // handleErrorAndRemoveOrg(error, __filename, outOfOffice, process.env.NEW_CANARY_ORG_ID);
  }
};

export const deleteOOO = async () => {
  try {
    await outOfOffice.navigate()
      .eventEditMode('@updatedEventName')
      .deleteEvent();
  } catch (error) {
    // handleErrorAndRemoveOrg(error, __filename, outOfOffice, process.env.NEW_CANARY_ORG_ID);
  }
};
