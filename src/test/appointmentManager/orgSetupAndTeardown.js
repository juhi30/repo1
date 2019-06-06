
import logger from 'rhinotilities/lib/loggers/logger';
import { organizationSetUp, orgTearDown } from '../../toolboxes/organization.toolbox';
import { ccrLogin } from '../../toolboxes/login.toolbox';
// import { handleErrorAndRemoveOrg } from '../../toolboxes/error.toolbox';

const { EventEmitter } = require('events');
const loginFeeder = require('../../feeder/login.feeder');
const accountSetupFeeder = require('../../feeder/accountSetup.feeder');

// CREATE MY NEW ORG HERE
beforeAll(async () => {
  const organizationDetails = {
    name: accountSetupFeeder.appointmentOrgName,
    address: accountSetupFeeder.address,
    city: accountSetupFeeder.city,
    state: accountSetupFeeder.state,
    zip: accountSetupFeeder.zip,
  };

  try {
    // Increase max listeners for long running test
    EventEmitter.defaultMaxListeners = 100;
    await ccrLogin(loginFeeder.appointmentCcrLogin, loginFeeder.appointmentCcrPassword);
    await organizationSetUp(organizationDetails, 'APPOINTMENT_ORG_ID');
  } catch (error) {
    // handleErrorAndRemoveOrg(error, __filename);
    logger.info(error, '===error on beforeAll (AppointmentManagerSuite) orgSetupAndTearDown=====');
  }
});

// DELETE MY NEW ORG HERE
afterAll(async (done) => {
  try {
    // Reset max listeners to the node.js default once the test is complete.
    EventEmitter.defaultMaxListeners = 10;
    await orgTearDown(process.env.APPOINTMENT_ORG_ID, loginFeeder.appointmentCcrLogin, loginFeeder.appointmentCcrPassword);
    done();
  } catch (error) {
    // Reset max listeners to the node.js default once the test is complete.
    EventEmitter.defaultMaxListeners = 10;
    done(error);
    // handleErrorAndRemoveOrg(error, __filename);
    logger.error(error, '===error on afterAll (AppointmentManagerSuite) orgSetupAndTeardown=======');
  }
});
