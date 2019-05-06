import { client } from 'nightwatch-api';

const accountSetupFeeder = require('../../toolboxes/feeder/accountSetup.feeder');
const memberFeeder = require('../../toolboxes/feeder/member.feeder');

describe('Preferences Page', () => {
  test('To check Secure Notifications for Preferences ', async () => {
    const preference = client.page.PreferencesPage();
    const checkAuditLogs = client.page.AuditLogPage();

    await preference.navigate()
      .waitForElementVisible('@selectChannel', 'selected channel is visible')
      .click('@selectChannel')
      .click('@updatePreferences')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible')
      .pause(1000);
    await checkAuditLogs.navigate()
      .pause(1000)
      .validateEventEntryWithNoDataFound('Edit', 'No Data Found', memberFeeder.memberName, 'Org Preferences');
  });

  test('To check global sounds for the preferences', async () => {
    const preference = client.page.PreferencesPage();
    const checkAuditLogs = client.page.AuditLogPage();

    await preference.navigate()
      .waitForElementVisible('@globalSound', 'Global sounds button is visible')
      .click('@globalSound')
      .click('@updatePreferences')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible')
      .pause(1000);
    await checkAuditLogs.navigate()
      .pause(1000)
      .validateEventEntry('Edit', accountSetupFeeder.orgName, memberFeeder.memberName, 'Org Preferences');
  });

  test('To check organization system time out for the preferences', async () => {
    const preference = client.page.PreferencesPage();
    const checkAuditLogs = client.page.AuditLogPage();

    await preference.navigate()
      .waitForElementVisible('@systemTimeOut', 'System time out textfield is visible')
      .clearValue('@systemTimeOut')
      .setValue('@systemTimeOut', 1)
      .click('@updatePreferences')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible');

    await checkAuditLogs.navigate()
      .pause(1000)
      .validateEventEntry('Edit', accountSetupFeeder.orgName, memberFeeder.memberName, 'Org Preferences');
  });

  test('To check closing conversation options for the preferences', async () => {
    const preference = client.page.PreferencesPage();
    const checkAuditLogs = client.page.AuditLogPage();
    const logout = client.page.UniversalElements();

    await preference.navigate()
      .waitForElementVisible('@closeByAssignee', 'close by assignee is visible')
      .click('@closeByAssignee')
      .click('@updatePreferences')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible');

    await checkAuditLogs.navigate()
      .pause(1000)
      .validateEventEntry('Edit', accountSetupFeeder.orgName, memberFeeder.memberName, 'Org Preferences');
  });
});
