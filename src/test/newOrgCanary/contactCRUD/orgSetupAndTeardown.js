
import logger from 'rhinotilities/lib/loggers/logger';
import { organizationSetUp, orgTearDown } from '../../../toolboxes/organization.toolbox';
import { ccrLogin } from '../../../toolboxes/login.toolbox';

const { EventEmitter } = require('events');
const loginFeeder = require('../../../feeder/login.feeder');
const accountSetupFeeder = require('../../../feeder/accountSetup.feeder');

// CREATE MY NEW ORG HERE
beforeAll(async () => {
  const organizationDetails = {
    name: accountSetupFeeder.contactOrgName,
    address: accountSetupFeeder.address,
    city: accountSetupFeeder.city,
    state: accountSetupFeeder.state,
    zip: accountSetupFeeder.zip,
  };

  try {
    // Increase max listeners for long running test
    EventEmitter.defaultMaxListeners = 100;
    await ccrLogin(loginFeeder.contactCrudCcrLogin, loginFeeder.contactCrudCcrPassword);
    await organizationSetUp(organizationDetails, 'CONTACT_CRUD_ORG_ID');
  } catch (error) {
    logger.info(error, '===error on beforeAll (ContactCrudSuite) orgSetupAndTearDown=====');
  }
});

// DELETE MY NEW ORG HERE
afterAll(async (done) => {
  try {
    // Reset max listeners to the node.js default once the test is complete.
    EventEmitter.defaultMaxListeners = 10;
    await orgTearDown(process.env.CONTACT_CRUD_ORG_ID, loginFeeder.contactCrudCcrLogin, loginFeeder.contactCrudCcrPassword);
    done();
  } catch (error) {
    // Reset max listeners to the node.js default once the test is complete.
    EventEmitter.defaultMaxListeners = 10;
    done(error);
    logger.error(error, '===error on afterAll (ContactCrudSuite) orgSetupAndTeardown=======');
  }
});