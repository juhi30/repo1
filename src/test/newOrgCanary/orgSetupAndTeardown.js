import logger from 'rhinotilities/lib/loggers/logger';
import { organizationSetUp, orgTearDown } from '../../toolboxes/organization.toolbox';
import { ccrLogin } from '../../toolboxes/login.toolbox';

const { EventEmitter } = require('events');
const loginFeeder = require('../../toolboxes/feeder/login.feeder');
const accountSetupFeeder = require('../../toolboxes/feeder/accountSetup.feeder');

// CREATE MY NEW ORG HERE
beforeAll(async () => {
  const organizationDetails = {
    name: accountSetupFeeder.orgName,
    address: accountSetupFeeder.address,
    city: accountSetupFeeder.city,
    state: accountSetupFeeder.state,
    zip: accountSetupFeeder.zip,
  };

  try {
    // Increase max listeners for long running test
    EventEmitter.defaultMaxListeners = 100;

    await ccrLogin(loginFeeder.ccrLogin, loginFeeder.ccrPassword);

    await organizationSetUp(organizationDetails, 'NEW_CANARY_ORG_ID');
  } catch (err) {
    logger.info(err, '==error on orgSetupAndTearDown=====');
  }
});

// DELETE MY NEW ORG HERE
afterAll(async (done) => {
  try {
    await orgTearDown(process.env.NEW_CANARY_ORG_ID, loginFeeder.ccrLogin, loginFeeder.ccrPassword);
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
