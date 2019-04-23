import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');
import {
  deleteOrganization,
  archiveOrganization,
  login
} from '../../services/Rhinoapi.service';

// CREATE MY NEW ORG HERE
beforeAll(async () => {
  const login = client.page.LoginPage();
  const setup = client.page.AccountSetupPage();
  const org = client.page.UniversalElements();
  
  
  await login.navigate()
    .enterCSRCreds(testConstants.ccrLogin, testConstants.ccrPassword)
    .submit()
    .pause(2000)
    .validateUrlChange('/selectorg')
    org.waitForElementVisible('@searchInputForOrg', 'Search Org fiels is visible')

  await setup.navigate()
    .clickBillingToggle()
    .fillInOrgBasicInformation(testConstants.orgName, testConstants.address, testConstants.city,
      testConstants.state, testConstants.zip)
    .clickCreateOrganization()
    .waitForElementNotVisible('@createOrgButton', 'Create Org button not visible')
    .pause(1000)
    .getOrgId()
});

// DELETE MY NEW ORG HERE 
afterAll(async (done) => {

  try {
    console.log('Login...');
    const cookie = await login();
    console.log('Deleting Org ==', process.env.ORGANIZATION_ID);
    const archiveResponse = await archiveOrganization(process.env.ORGANIZATION_ID, cookie);
    console.log('======== Organization Archive Response =======', archiveResponse);
    const deleteResponse = await deleteOrganization(process.env.ORGANIZATION_ID, cookie);
    console.log('====== Organization Deleted =======');
    done();
  } catch (err) {
    console.log(err);
    done(err);
  }
});
