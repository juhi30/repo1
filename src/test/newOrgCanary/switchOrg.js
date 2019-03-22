import { client } from 'nightwatch-api';
const testConstants = require("../../toolboxes/feeder.toolbox")

describe('switch organization as ccr ', () => {

    test('Switch from one organization to another organization', async () => {
        const org = client.page.UniversalElements()
        const login = client.page.LoginPage();

       
        await login.navigate()
           .enterCSRCreds(testConstants.ccrLogin,testConstants.ccrPassword)
            .submit()
            .validateUrlChange_CCR('selectorg',' navigated to select organization list page')

        await org.searchForOrganization(testConstants.orgName)
            .ccrOrgLogin('@organizationSearchResult')
            .selectOrganization()
            .searchForOrganization(testConstants.orgName2)
            .ccrOrgLogin('@organizationSearchResultNew')
            .clickLogout()
    });
});
