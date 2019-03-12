import { client } from 'nightwatch-api';
const testConstants = require("../../toolboxes/feeder.toolbox")

describe('switch organization as ccr ', () => {

    test('Switch from one organization to another organization', async () => {
        const org = client.page.UniversalElements()
        const login = client.page.LoginPage();

        login.navigate()
            .fillInUsername(testConstants.ccrLogin)
            .fillInPassword(testConstants.ccrPassword)
            .submit()
            .validateUrlChange_CCR('/selectorg')

        await org.searchForOrganization(testConstants.orgName1)
            .loginInOrg('@organizationSearchResult')
            .switchOrganization('/selectorg','Switched to organization lists page..!')
            .searchForOrganization(testConstants.orgName2)
            .loginInOrg('@organizationSearchResultNew')
    });
});
