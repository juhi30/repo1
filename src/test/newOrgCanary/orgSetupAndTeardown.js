import logger from 'rhinotilities/lib/loggers/logger';
import { client } from 'nightwatch-api';
import {
  deleteOrganization,
  archiveOrganization,
  login,
} from '../../services/Rhinoapi.service';

const testConstants = require('../../toolboxes/feeder.toolbox');

// CREATE MY NEW ORG HERE
beforeAll(async () => {
  const loginPage = client.page.LoginPage();
  const setup = client.page.AccountSetupPage();
  const org = client.page.UniversalElements();

  try {
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
    logger.info(err, '==error on orgSetupAndTearDown=====');
  }
});

// DELETE MY NEW ORG HERE
afterAll(async (done) => {
  try {
    logger.info('Login...');
    const cookie = await login(testConstants.ccrLogin, testConstants.ccrPassword);
    logger.info(process.env.ORGANIZATION_ID, '== Deleting Org ==');
    await archiveOrganization(process.env.ORGANIZATION_ID, cookie);
    logger.info('======== Organization Archive Response =======');
    await deleteOrganization(process.env.ORGANIZATION_ID, cookie);
    logger.info('====== Organization Deleted =======');
    done();
  } catch (err) {
    logger.error(err, '===error on after all orgSetupAndTeardown=======');
    done(err);
  }
});
