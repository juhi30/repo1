import { client } from 'nightwatch-api';

const office = client.page.OfficePage();
const checkAuditLogs = client.page.AuditLogsPage();

/**
 * Used to create office
 * @param  {Array} officeDetails array of object having 2 keys element and value.
 * @param  {object} auditDetails having 2 keys memeber who perform the action and office name.
 */

export async function createOffice(officeDetails, auditDetails) {
  await office.navigate()
    .clickAddOffice();

  officeDetails.map(field => office.createOfficeForm(field.element, field.value));

  await office.click('@createOfficeButton')
    .successMessageVerification('@officeCreationSuccessMessage');

  await checkAuditLogs.navigate()
    .pause(2000)
    .verify.urlContains('auditLog', 'Audit Logs Page is opened')
    .pause(1000)
    .selectCategoryFilter('@selectOfficeCategory')
    .pause(3000)
    .validateAuditEntry(auditDetails.memberName, 'Office Location', 'Add', auditDetails.officeName);
}

/**
 * Used to update office
 * @param  {Array} officeDetails array of object having 2 keys element and value.
 * @param {string} officeState pass state as string.
 * @param  {object} auditDetails having 2 keys memeber who perform the action and office name.
 */

export async function editOffice(officeDetails, officeState, auditDetails) {
  await office.navigate()
    .checkVisibilityOfEditPage();

  officeDetails.map(field => office.editOfficeForm(field.element, field.value));
  office.setValue('@officeState', officeState);

  await office.click('@updateOfficeButton')
    .successMessageVerification('@officeUpdationSuccessMessage')
    .waitForElementNotPresent('@officeUpdationSuccessMessage');

  await checkAuditLogs.navigate()
    .pause(2000)
    .validateAuditEntry(auditDetails.memberName, 'Office Location', 'Edit', auditDetails.officeName);
}

/**
 * Used to delete office
 * @param {string} officeElement office name element that you want to delete.
 * @param  {object} auditDetails having 2 keys memeber who perform the action and office name.
 */

export async function deleteOffice(officeElement, auditDetails) {
  await office.navigate()
    .deleteOfficeForm(officeElement)
    .successMessageVerification('@officeDeletionSuccessMessage')
    .waitForElementNotPresent('@officeDeletionSuccessMessage');

  await checkAuditLogs.navigate()
    .pause(2000)
    .validateAuditEntry(auditDetails.memberName, 'Office Location', 'Delete', auditDetails.officeName);
}
