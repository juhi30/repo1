import { client } from 'nightwatch-api';

const officeFeeder = require('../../toolboxes/feeder/office.feeder');
const memberFeeder = require('../../toolboxes/feeder/member.feeder');

describe('Office Page', () => {
  test('Login as Member', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .fillInUsername(memberFeeder.memberUsername)
      .fillInPassword(memberFeeder.memberPassword)
      .submit()
      .validateUrlChange();
  });

  test('To add the office by Member', async () => {
    const office = client.page.OfficePage();
    const checkAuditLogs = client.page.AuditLogsPage();

    await office.navigate()
      .clickAddOffice()
      .createOfficeForm('@officeName', officeFeeder.officeName)
      .createOfficeForm('@officeAddressLine1', officeFeeder.officeAddress)
      .createOfficeForm('@officeCity', officeFeeder.officeCity)
      .createOfficeForm('@officeState', officeFeeder.officeState)
      .createOfficeForm('@officeZip', officeFeeder.zipCode)
      .click('@createOfficeButton')
      .successMessageVerification('@officeCreationSuccessMessage');

    await checkAuditLogs.navigate()
      .pause(5000)
      .validateAuditEntry(memberFeeder.memberName, 'Office Location', 'Add', officeFeeder.officeName);
  });

  test('To edit the office by Member', async () => {
    const office = client.page.OfficePage();
    const checkAuditLogs = client.page.AuditLogsPage();

    await office.navigate()
      .checkVisibilityOfEditPage()
      .editOfficeForm('@officeName', officeFeeder.newOfficeName)
      .editOfficeForm('@officeAddressLine1', officeFeeder.newOfficeAddress)
      .editOfficeForm('@officeCity', officeFeeder.newOfficeCity)
      .setValue('@officeState', officeFeeder.newOfficeState)
      .editOfficeForm('@officeZip', officeFeeder.newZipCode)
      .click('@updateOfficeButton')
      .successMessageVerification('@officeUpdationSuccessMessage');

    await checkAuditLogs.navigate()
      .pause(2000)
      .validateAuditEntry(memberFeeder.memberName, 'Office Location', 'Edit', officeFeeder.newOfficeName);
  });

  test('To delete the office by Member ', async () => {
    const office = client.page.OfficePage();
    const checkAuditLogs = client.page.AuditLogsPage();
    const logout = client.page.UniversalElements();

    await office.navigate()
      .deleteOfficeForm()
      .successMessageVerification('@officeDeletionSuccessMessage');

    await checkAuditLogs.navigate()
      .pause(2000)
      .validateAuditEntry(memberFeeder.memberName, 'Office Location', 'Delete', officeFeeder.newOfficeName);
  });
});
