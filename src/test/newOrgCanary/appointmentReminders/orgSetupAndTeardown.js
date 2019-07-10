
import logger from 'rhinotilities/lib/loggers/logger';
import { organizationSetUp, orgTearDown } from '../../../toolboxes/organization.toolbox';
import { ccrLogin } from '../../../toolboxes/login.toolbox';

const { EventEmitter } = require('events');
const loginFeeder = require('../../../feeder/login.feeder');
const accountSetupFeeder = require('../../../feeder/accountSetup.feeder');

// CREATE MY NEW ORG HERE
beforeAll(async () => {
  const organizationDetails = {
    name: accountSetupFeeder.appointmentReminderOrgName,
    address: accountSetupFeeder.address,
    city: accountSetupFeeder.city,
    state: accountSetupFeeder.state,
    zip: accountSetupFeeder.zip,
  };

  try {
    // Increase max listeners for long running test
    EventEmitter.defaultMaxListeners = 100;
    await ccrLogin(loginFeeder.appointmentReminderCcrLogin, loginFeeder.appointmentReminderCcrPassword);
    await organizationSetUp(organizationDetails, 'APPOINTMENT_REMINDER_ORG_ID');
  } catch (error) {
    logger.info(error, '===error on beforeAll (AppointmentManagerSuite) orgSetupAndTearDown=====');
  }
});

// DELETE MY NEW ORG HERE
afterAll(async () => {
  try {
    // Reset max listeners to the node.js default once the test is complete.
    EventEmitter.defaultMaxListeners = 10;
    await orgTearDown(process.env.APPOINTMENT_REMINDER_ORG_ID, loginFeeder.appointmentReminderCcrLogin, loginFeeder.appointmentReminderCcrPassword);
  } catch (error) {
    // Reset max listeners to the node.js default once the test is complete.
    EventEmitter.defaultMaxListeners = 10;
    logger.error(error, '===error on afterAll (AppointmentManagerSuite) orgSetupAndTeardown=======');
  }
});
