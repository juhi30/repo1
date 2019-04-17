import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Organisation profile edit as member', () => {
    // When the org is being updated for the first time
    test('Edit Organization Profile as member', async () => {
        const orgProfile = client.page.OrgProfilePage();
        const entry = client.page.AuditLogPage();

        await orgProfile.navigate()
        .renderPageElements('@addLogoButton');
        
        await orgProfile.updateOrgProfileMandatoryFields(testConstants.orgNewName, testConstants.orgNewAddress, testConstants.orgNewCity, testConstants.orgNewState, testConstants.orgNewZip)
            .updateOrgProfileOtherFields(testConstants.orgNewAddress2, testConstants.orgNewPhone, testConstants.orgNewEmail, testConstants.orgNewcontactName, testConstants.orgNewcontactPhone, testConstants.orgNewcontactEmail)
            .clickSaveProfile()

        await entry.navigate()
        .pause(3000)
        .validateEventEntryWithNoDataFound('Edit', testConstants.noDataFound, testConstants.memberName, 'Org Profile')
    });

    test('Add Photo', async () => {
        const orgProfile = client.page.OrgProfilePage();
        const entry = client.page.AuditLogPage();

        await orgProfile.navigate()
        .addUpdateLogo('@addLogoButton')

        await entry.navigate()
        .pause(3000)
        .validateEventEntry('Edit', testConstants.orgNewName, testConstants.memberName, 'Org Profile')
    });

    test('Update Photo', async () => {
        const orgProfile = client.page.OrgProfilePage();
        const entry = client.page.AuditLogPage();

        await orgProfile.navigate()
        .addUpdateLogo('@updateLogoButton')

        await entry.navigate()
        .pause(3000)
        .validateEventEntry('Edit', testConstants.orgNewName, testConstants.memberName, 'Org Profile')
    });

    test('logout as a Member', async () => {
        const logout = client.page.UniversalElements();
    
        await logout.clickLogout();
      });
});

describe('Organization Profile Edit as CCR', () => {

    test('login as CCR into the organization', async () => {
        const login = client.page.LoginPage();
        const org = client.page.UniversalElements();
    
        await login.navigate()
          .enterCSRCreds(testConstants.ccrLogin, testConstants.ccrPassword)
          .submit()
          .pause(2000)
          .validateUrlChange('/selectorg')
    
        await org.searchForOrganization(testConstants.orgName)
          .ccrOrgLogin()
          .pause(2000)
      });

    test('Edit Organization Profile as CCR', async () => {
        const orgProfile = client.page.OrgProfilePage();
        const entry = client.page.AuditLogPage();

        await orgProfile.navigate()
        .renderPageElements('@updateLogoButton');

        await orgProfile.verifyBillingIdAndIntegrationOptions()
        .updateOrgProfileMandatoryFields(testConstants.orgNewName, testConstants.orgNewAddress, testConstants.orgNewCity, testConstants.orgNewState, testConstants.orgNewZip)
        .updateOrgProfileOtherFields(testConstants.orgNewAddress2, testConstants.orgNewPhone, testConstants.orgNewEmail, testConstants.orgNewcontactName, testConstants.orgNewcontactPhone, testConstants.orgNewcontactEmail)
        .enableDisableToggles('@integrationToggle')
        .updateIntegrationValue(testConstants.orgNewIntegration)
        .clickSaveProfile();

        await entry.navigate()
        .pause(3000)
        .validateEventEntry('Edit', testConstants.orgNewName, testConstants.ccrLogin, 'Org Profile')
    });

    test('logout as CCR', async () => {
        const logout = client.page.UniversalElements();
    
        await logout.clickLogout();
    });
});
