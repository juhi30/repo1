import { client } from 'nightwatch-api';

const office = client.page.OfficePage();
const checkAuditLogs = client.page.AuditLogsPage();

export async function createOffice(officeDetails, auditDetails) {
  await office.navigate()
    .clickAddOffice();

  officeDetails.map(field => office.createOfficeForm(field.element, field.value));

  await office.click('@createOfficeButton')
    .pause(2000)
    .successMessageVerification('@officeCreationSuccessMessage');

  await checkAuditLogs.navigate()
    .pause(5000)
    .validateAuditEntry(auditDetails.memberName, 'Office Location', 'Add', auditDetails.officeName);
}

export async function editOffice(officeDetails, officeState, auditDetails) {
  await office.navigate()
    .checkVisibilityOfEditPage();

  officeDetails.map(field => office.editOfficeForm(field.element, field.value));
  office.setValue('@officeState', officeState);

  await office.click('@updateOfficeButton')
    .pause(2000)
    .successMessageVerification('@officeUpdationSuccessMessage');

  await checkAuditLogs.navigate()
    .pause(2000)
    .validateAuditEntry(auditDetails.memberName, 'Office Location', 'Edit', auditDetails.officeName);
}

export async function deleteOffice(auditDetails) {
  await office.navigate()
    .deleteOfficeForm()
    .successMessageVerification('@officeDeletionSuccessMessage');

  await checkAuditLogs.navigate()
    .pause(2000)
    .validateAuditEntry(auditDetails.memberName, 'Office Location', 'Delete', auditDetails.officeName);
}
