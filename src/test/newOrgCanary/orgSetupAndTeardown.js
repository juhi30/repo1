import { client } from 'nightwatch-api';
import { organizationSetUp, orgTearDown } from '../../toolboxes/organization.toolbox';
import { ccrLogin } from '../../toolboxes/login.toolbox';

const testConstants = require('../../toolboxes/feeder.toolbox');

// CREATE MY NEW ORG HERE
beforeAll(async () => {
  const loginPage = client.page.LoginPage();
  const setup = client.page.AccountSetupPage();
  const org = client.page.UniversalElements();
  const organizationDetails = {
    name: testConstants.orgName,
    address: testConstants.address,
    city: testConstants.city,
    state: testConstants.state,
    zip: testConstants.zip,
  };

  try {
    await ccrLogin(loginPage, testConstants.ccrLogin, testConstants.ccrPassword);
    org.waitForElementVisible('@searchInputForOrg', 'Search Org fields is visible');

    await organizationSetUp(setup, organizationDetails, 'NEW_CANARY_ORG_ID');
  } catch (err) {
    console.log('==error on orgSetupAndTearDown=====', err);
  }
});

// DELETE MY NEW ORG HERE
afterAll(async (done) => {
  try {
    await orgTearDown(process.env.NEW_CANARY_ORG_ID);
    done();
  } catch (err) {
    console.log('===error on after all orgSetupAndTeardown=======', err);
    done(err);
  }
});
