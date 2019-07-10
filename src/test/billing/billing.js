import { client } from 'nightwatch-api';
import * as billing from '../../toolboxes/billing.toolbox';
import * as login from '../../toolboxes/login.toolbox';

const billingFeeder = require('../../feeder/billing.feeder');
const memberFeeder = require('../../feeder/member.feeder');

const billingPage = client.page.BillingUsagePage();
const universal = client.page.UniversalElements();

describe('Billing Organization Test Cases', () => {
  test('Login as Member', async () => {
    await login.memberLogin(global.billingMemberUsername1, memberFeeder.memberPassword);
  });

  test('Verifying billing UI', async () => {
    await universal.clickBilling();
    await billing.verifyBillingPageForStandardPlan();
  });

  test('Add details for billing bank account', async () => {
    const billingPaymentDetails = {
      firstName: billingFeeder.paymentFirstname,
      lastName: billingFeeder.paymentLastname,
      bankName: billingFeeder.bankName,
      accountNumber: billingFeeder.accountNumber,
      routingNumber: billingFeeder.routingNumber,
      accountType: billingFeeder.accountType,
    };

    await billingPage.verifyAddPaymentButton()
      .changePaymentMethod('@radioBankAccount')
      .addPaymentToBank(billingPaymentDetails);
  });

  test('Update details for billing bank account', async () => {
    await billing.updateBankDetails();
  });

  test('Verify the details for billing contact', async () => {
    await billing.verifyBillingContactDetails();
  });

  test('Update Billing Contact details', async (done) => {
    await billing.updateContactDetails();
    done();
  });
});
