import logger from 'rhinotilities/lib/loggers/logger';
import { organizationSetUp, orgTearDown } from '../../toolboxes/organization.toolbox';
import { ccrLogin } from '../../toolboxes/login.toolbox';

const { EventEmitter } = require('events');
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
    // Increase max listeners for long running test
    EventEmitter.defaultMaxListeners = 100;

    await ccrLogin(testConstants.ccrLogin, testConstants.ccrPassword);

    await organizationSetUp(organizationDetails, 'NEW_CANARY_ORG_ID');
  } catch (err) {
    logger.info(err, '==error on orgSetupAndTearDown=====');
  }
});

// DELETE MY NEW ORG HERE
afterAll(async (done) => {
  try {
    await orgTearDown(process.env.NEW_CANARY_ORG_ID, testConstants.ccrLogin, testConstants.ccrPassword);
    // Reset max listeners to the node.js default once the test is complete.
    EventEmitter.defaultMaxListeners = 10;
    done();
  } catch (err) {
    logger.error(err, '===error on after all orgSetupAndTeardown=======');
    done(err);
    // Reset max listeners to the node.js default once the test is complete.
    EventEmitter.defaultMaxListeners = 10;
  }
});
