import logger from 'rhinotilities/lib/loggers/logger';
import { billingOrganizationSetUp, orgTearDown } from '../../toolboxes/organization.toolbox';
import { ccrLogin } from '../../toolboxes/login.toolbox';

const { EventEmitter } = require('events');
const loginFeeder = require('../../feeder/login.feeder');
const accountSetupFeeder = require('../../feeder/accountSetup.feeder');

// CREATE MY NEW ORG HERE
beforeAll(async () => {
  const organizationDetails = {
    name: accountSetupFeeder.billingOrgName,
    address: accountSetupFeeder.address,
    city: accountSetupFeeder.city,
    state: accountSetupFeeder.state,
    zip: accountSetupFeeder.zip,
    billingContactFirstName: accountSetupFeeder.billingContactFirstName,
    billingContactLastName: accountSetupFeeder.billingContactLastName,
    billingContactPhone: accountSetupFeeder.billingContactPhone,
    billingContactAddressOne: accountSetupFeeder.billingContactAddressOne,
    billingContactAddressTwo: accountSetupFeeder.billingContactAddressTwo,
    billingContactEmail: accountSetupFeeder.billingContactEmail,
    billingContactCity: accountSetupFeeder.billingContactCity,
    billingContactState: accountSetupFeeder.billingContactState,
    billingContactZip: accountSetupFeeder.billingContactZip,
    planType: accountSetupFeeder.planType,
    installationFee: accountSetupFeeder.installationFee,
  };

  try {
    // Increase max listeners for long running test
    EventEmitter.defaultMaxListeners = 100;

    await ccrLogin(loginFeeder.billingCcrLogin, loginFeeder.billingCcrPassword);

    await billingOrganizationSetUp(organizationDetails, 'BILLING_ORG_ID');
  } catch (err) {
    logger.error(err, '==error on orgSetupAndTearDown=====');
  }
});

// DELETE MY NEW ORG HERE
afterAll(async (done) => {
  try {
    await orgTearDown(process.env.BILLING_ORG_ID, loginFeeder.billingCcrLogin, loginFeeder.billingCcrPassword);
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
