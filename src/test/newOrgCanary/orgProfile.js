import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Organization Profile Edit as ccr', () => {

    // When the org is being updated for the first time
    test('Add Photo', async () => {
        const orgProfile = client.page.OrgProfilePage();

        await orgProfile.navigate()
        .addUpdateLogo('@addLogoButton')
    });

    test('Edit Organization Profile', async () => {
        const orgProfile = client.page.OrgProfilePage();

        await orgProfile.navigate()
        .renderPageElements()
        .checkVisibilityForCCR()
        .updateOrgProfileMandatoryFields(testConstants.orgNewName, testConstants.orgNewAddress, testConstants.orgNewCity, testConstants.orgNewState, testConstants.orgNewZip)
        .updateOrgProfileOtherFields(testConstants.orgNewAddress2, testConstants.orgNewPhone, testConstants.orgNewEmail, testConstants.orgNewcontactName, testConstants.orgNewcontactPhone, testConstants.orgNewcontactEmail)
        .enableDisableToggles('@integrationToggle')
        .updateIntegrationValue(testConstants.orgNewIntegration)
        .clickSaveProfile();
    });

    test('Update Photo', async () => {
        const orgProfile = client.page.OrgProfilePage();

        await orgProfile.navigate()
        .addUpdateLogo('@updateLogoButton')
    });

    test('Check audit logs entry for org update', async () => {
        
        const entry = client.page.AuditLogs();

        await entry.navigate()
           .pause(4000)
           .validateOrgUpdateEntry(testConstants.orgNewName, testConstants.ccrLogin, 'Edit', 'Org Profile')
    });

    test('logout as CCR', async () => {
        const logout = client.page.UniversalElements();
    
        await logout.clickLogout();
    });
});

describe('Organisation profile edit as member', () => {
    test('Login with valid username and password', async () => {
        const login = client.page.LoginPage();
    
        await login.navigate()
          .enterMemberCreds(testConstants.memberUsername, testConstants.memberPassword)
          .submit()
          .validateUrlChange()
    });  

    test('Edit Organization Profile as member', async () => {
        const orgProfile = client.page.OrgProfilePage();

        await orgProfile.navigate()
        .renderPageElements()
        .updateOrgProfileMandatoryFields(testConstants.orgNewName, testConstants.orgNewAddress, testConstants.orgNewCity, testConstants.orgNewState, testConstants.orgNewZip)
        .updateOrgProfileOtherFields(testConstants.orgNewAddress2, testConstants.orgNewPhone, testConstants.orgNewEmail, testConstants.orgNewcontactName, testConstants.orgNewcontactPhone, testConstants.orgNewcontactEmail)
        .clickSaveProfile();
    });

    test('Update Photo', async () => {
        const orgProfile = client.page.OrgProfilePage();

        await orgProfile.navigate()
        .addUpdateLogo('@updateLogoButton')
    });

    test('Check audit logs entry for org update', async () => {
            
        const entry = client.page.AuditLogs();

        await entry.navigate()
        .pause(2000)
        .validateOrgUpdateEntry(testConstants.orgNewName, testConstants.memberFirstName, 'Edit', 'Org Profile')
    });
});
