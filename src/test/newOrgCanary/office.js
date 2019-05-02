import { client } from 'nightwatch-api';

const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Office Page', () => {
  test('Login as Member', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .fillInUsername(testConstants.memberUsername)
      .fillInPassword(testConstants.memberPassword)
      .submit()
      .validateUrlChange();
  });

  test('To add the office by Member', async () => {
    const office = client.page.OfficePage();
    const checkAuditLogs = client.page.AuditLogsPage();

    await office.navigate()
      .clickAddOffice()
      .createOfficeForm('@officeName', testConstants.officeName)
      .createOfficeForm('@officeAddressLine1', testConstants.officeAddress)
      .createOfficeForm('@officeCity', testConstants.officeCity)
      .createOfficeForm('@officeState', testConstants.officeState)
      .createOfficeForm('@officeZip', testConstants.zip)
      .click('@createOfficeButton')
      .successMessageVerification('@officeCreationSuccessMessage');

    await checkAuditLogs.navigate()
      .pause(5000)
      .validateAuditEntry(testConstants.memberName, 'Office Location', 'Add', testConstants.officeName);
  });

  test('To edit the office by Member', async () => {
    const office = client.page.OfficePage();
    const checkAuditLogs = client.page.AuditLogsPage();

    await office.navigate()
      .checkVisibilityOfEditPage()
      .editOfficeForm('@officeName', testConstants.newOfficeName)
      .editOfficeForm('@officeAddressLine1', testConstants.newOfficeAddress)
      .editOfficeForm('@officeCity', testConstants.newOfficeCity)
      .setValue('@officeState', testConstants.newOfficeState)
      .editOfficeForm('@officeZip', testConstants.newZipCode)
      .click('@updateOfficeButton')
      .successMessageVerification('@officeUpdationSuccessMessage');

    await checkAuditLogs.navigate()
      .pause(2000)
      .validateAuditEntry(testConstants.memberName, 'Office Location', 'Edit', testConstants.newOfficeName);
  });

  test('To delete the office by Member ', async () => {
    const office = client.page.OfficePage();
    const checkAuditLogs = client.page.AuditLogsPage();
    // const logout = client.page.UniversalElements();

    await office.navigate()
      .deleteOfficeForm()
      .successMessageVerification('@officeDeletionSuccessMessage');

    await checkAuditLogs.navigate()
      .pause(2000)
      .validateAuditEntry(testConstants.memberName, 'Office Location', 'Delete', testConstants.newOfficeName);
  });
});
