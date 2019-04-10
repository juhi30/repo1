import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Preferences Page', () => {
    test('To check the Preferences for the org', async () => {

        const preference = client.page.PreferencesPage();
        const logout = client.page.UniversalElements();
        const checkAuditLogs = client.page.AuditLogPage();

        await preference.navigate()
            .checkOrgPreferences()
            .pause(2000)
            // .setTimeoutValue()
            .successMessage()

        await checkAuditLogs.navigate()
            .validateEventEntry(testConstants.editEvent, testConstants.orgName, testConstants.ccrLogin, testConstants.orgCategory)

        await logout.clickLogout()

    });
}); 