
import logger from 'rhinotilities/lib/loggers/logger';
import { organizationSetUp, orgTearDown } from '../../../toolboxes/organization.toolbox';
import { ccrLogin } from '../../../toolboxes/login.toolbox';

const { EventEmitter } = require('events');
const loginFeeder = require('../../../feeder/login.feeder');
const accountSetupFeeder = require('../../../feeder/accountSetup.feeder');

// CREATE MY NEW ORG HERE
beforeAll(async () => {
  const organizationDetails = {
    name: accountSetupFeeder.rhinopayNewCanaryOrgName,
    address: accountSetupFeeder.address,
    city: accountSetupFeeder.city,
    state: accountSetupFeeder.state,
    zip: accountSetupFeeder.zip,
  };

  try {
    // Increase max listeners for long running test
    EventEmitter.defaultMaxListeners = 100;
    await ccrLogin(loginFeeder.rhinopayNewCanaryCcrLogin, loginFeeder.rhinopayNewCanaryCcrPassword);
    await organizationSetUp(organizationDetails, 'RP_NEWCANARY_ORG_ID');
  } catch (error) {
    logger.info(error, '===error on beforeAll (RhinopayNewCanarySuite) orgSetupAndTearDown=====');
  }
});

// DELETE MY NEW ORG HERE
afterAll(async (done) => {
  try {
    // Reset max listeners to the node.js default once the test is complete.
    EventEmitter.defaultMaxListeners = 10;
    await orgTearDown(process.env.RP_NEWCANARY_ORG_ID, loginFeeder.rhinopayNewCanaryCcrLogin, loginFeeder.rhinopayNewCanaryCcrPassword, 1);
    done();
  } catch (error) {
    // Reset max listeners to the node.js default once the test is complete.
    EventEmitter.defaultMaxListeners = 10;
    done(error);
    logger.error(error, '===error on afterAll (RhinopayNewCanarySuite) orgSetupAndTeardown=======');
  }
});
