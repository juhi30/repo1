import { client } from 'nightwatch-api';
const testConstants = require("../../toolboxes/feeder.toolbox")

beforeAll(async () => {
    console.log("RUNNING CANARY LEVEL SOMETHING");

    // CREATE MY NEW ORG HERE
    client.maximizeWindow();
    const org = client.page.UniversalElements()
    const login = client.page.LoginPage();

    await login.navigate()
        .fillInUsername(testConstants.ccrLogin)
        .fillInPassword(testConstants.ccrPassword)
        .submit()
        .validateUrlChange_CCR('/selectorg', 'navigated to select organization list page')

    await org.searchForOrganization(testConstants.orgName1)
        .loginInOrg()
});

afterAll(async () => {
    console.log("DONE RUNNING CANARY LEVEL SOMETHING");

    // DELETE MY NEW ORG HERE
});

//import './login'
//import './orgSwitch'
// import './somethingfirst'
// import './somethingmiddle'
// import './somethinglast'
import './role'