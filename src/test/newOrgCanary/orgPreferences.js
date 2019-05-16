import { client } from 'nightwatch-api';

const accountSetupFeeder = require('../../feeder/accountSetup.feeder');
const memberFeeder = require('../../feeder/member.feeder');

describe('Preferences Page', () => {
  test('To check Secure Notifications for Preferences ', async () => {
    const preference = client.page.PreferencesPage();
    const checkAuditLogs = client.page.AuditLogsPage();

    await preference.navigate()
      .waitForElementVisible('@selectChannel', 'selected channel is visible')
      .click('@selectChannel')
      .click('@updatePreferences')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible')
      .pause(1000);
    await checkAuditLogs.navigate()
      .pause(1000)
      .validateAuditEntryWithNoDataFound('Edit', 'No Data Found', memberFeeder.memberName, 'Org Preferences');
  });

  test('To check global sounds for the preferences', async () => {
    const preference = client.page.PreferencesPage();
    const checkAuditLogs = client.page.AuditLogsPage();

    await preference.navigate()
      .waitForElementVisible('@globalSound', 'Global sounds button is visible')
      .click('@globalSound')
      .click('@updatePreferences')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible')
      .pause(1000);
    await checkAuditLogs.navigate()
      .pause(1000)
      .validateAuditEntry(memberFeeder.memberName, 'Org Preferences', 'Edit', accountSetupFeeder.orgName);
  });

  test('To check organization system time out for the preferences', async () => {
    const preference = client.page.PreferencesPage();
    const checkAuditLogs = client.page.AuditLogsPage();

    await preference.navigate()
      .waitForElementVisible('@systemTimeOut', 'System time out textfield is visible')
      .clearValue('@systemTimeOut')
      .setValue('@systemTimeOut', 1)
      .click('@updatePreferences')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible');

    await checkAuditLogs.navigate()
      .pause(1000)
      .validateAuditEntry(memberFeeder.memberName, 'Org Preferences', 'Edit', accountSetupFeeder.orgName);
  });

  test('To check closing conversation options for the preferences', async () => {
    const preference = client.page.PreferencesPage();
    const checkAuditLogs = client.page.AuditLogsPage();

    await preference.navigate()
      .waitForElementVisible('@closeByAssignee', 'close by assignee is visible')
      .click('@closeByAssignee')
      .click('@updatePreferences')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible');

    await checkAuditLogs.navigate()
      .pause(1000)
      .validateAuditEntry(memberFeeder.memberName, 'Org Preferences', 'Edit', accountSetupFeeder.orgName);
  });
});
