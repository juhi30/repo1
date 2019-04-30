import logger from 'rhinotilities/lib/loggers/logger';
import { client } from 'nightwatch-api';
import { organizationSetUp, orgTearDown } from '../../toolboxes/organization.toolbox';
import { ccrLogin } from '../../toolboxes/login.toolbox';

const testConstants = require('../../toolboxes/feeder.toolbox');

// CREATE MY NEW ORG HERE
beforeAll(async () => {
  const organizationDetails = {
    name: testConstants.orgName,
    address: testConstants.address,
    city: testConstants.city,
    state: testConstants.state,
    zip: testConstants.zip,
  };

  try {
    await ccrLogin(testConstants.ccrLogin, testConstants.ccrPassword);

    await organizationSetUp(organizationDetails, 'NEW_CANARY_ORG_ID');
  } catch (err) {
    logger.info(err, '==error on orgSetupAndTearDown=====');
  }
});

// DELETE MY NEW ORG HERE
afterAll(async (done) => {
  try {
    await orgTearDown(process.env.NEW_CANARY_ORG_ID);
    done();
  } catch (err) {
    logger.error(err, '===error on after all orgSetupAndTeardown=======');
    done(err);
  }
});
