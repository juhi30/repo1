import { client } from 'nightwatch-api';
import {
  deleteOrganization,
  archiveOrganization,
  login,
} from '../../services/Rhinoapi.service';

const { EventEmitter } = require('events');
const testConstants = require('../../toolboxes/feeder.toolbox');

// CREATE MY NEW ORG HERE
beforeAll(async () => {
  const loginPage = client.page.LoginPage();
  const setup = client.page.AccountSetupPage();
  const org = client.page.UniversalElements();

  try {
    // Increase max listeners for long running test
    EventEmitter.defaultMaxListeners = 100;
    await loginPage.navigate()
      .enterCSRCreds(testConstants.ccrLogin, testConstants.ccrPassword)
      .submit()
      .pause(2000)
      .validateUrlChange('/selectorg');
    org.waitForElementVisible('@searchInputForOrg', 'Search Org fiels is visible');

    await setup.navigate()
      .clickBillingToggle()
      .fillInOrgBasicInformation(testConstants.orgName, testConstants.address, testConstants.city,
        testConstants.state, testConstants.zip)
      .clickCreateOrganization()
      .waitForElementNotVisible('@createOrgButton', 'Create Org button not visible')
      .pause(1000)
      .getOrgId();
  } catch (err) {
    console.log('==error on orgSetupAndTearDown=====', err);
  }
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
    // Reset max listeners to the node.js default once the test is complete.
    EventEmitter.defaultMaxListeners = 10;
  } catch (err) {
    console.log('===error on after all orgSetupAndTeardown=======', err);
    done(err);
    // Reset max listeners to the node.js default once the test is complete.
    EventEmitter.defaultMaxListeners = 10;
  }
});
