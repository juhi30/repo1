import logger from 'rhinotilities/lib/loggers/logger';
import { billingOrganizationSetUp, orgTearDown } from '../../toolboxes/organization.toolbox';
import { ccrLogin } from '../../toolboxes/login.toolbox';

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

  ccrLogin(loginFeeder.billingCcrLogin, loginFeeder.billingCcrPassword)
    .then(() => {
      billingOrganizationSetUp(organizationDetails, 'BILLING_ORG_ID');
    })
    .catch((err) => {
      logger.error(err, '===error on before all orgSetupAndTeardown=======');
    });
});

// DELETE MY NEW ORG HERE
afterAll(async (done) => {
  orgTearDown(process.env.BILLING_ORG_ID, loginFeeder.billingCcrLogin, loginFeeder.billingCcrPassword, 1)
    .then(() => {
      done();
    })
    .catch((err) => {
      logger.error(err, '===error on after all orgSetupAndTeardown=======');
      done(err);
    });
});
