import { client } from 'nightwatch-api';
import * as billing from '../../toolboxes/billing.toolbox';

const billingFeeder = require('../../feeder/billing.feeder');
const memberFeeder = require('../../feeder/member.feeder');

const billingPage = client.page.BillingUsagePage();
const login = client.page.LoginPage();
const add = client.page.UniversalElements();

describe('Billing Organization Test Cases', () => {
  test('Login as Member', async () => {
    await login.navigate()
      .fillInUsername(memberFeeder.memberUsername1)
      .fillInPassword(memberFeeder.memberPassword)
      .submit()
      .validateUrlChange();
  });

  test('Verifying billing UI', async () => {
    await add.clickBilling();
    await billing.verifyBillingPageForStandardPlan();
  });

  // test('Verify the details for Estimated bill regarding PDF', async () => {
  //   await billingPage.validateEstimatedBillSection();
  // });

  test('Verify the details for billing contact', async () => {
    billing.verifyBillingContactDetails();
  });

  test('Update Billing Contact details', async () => {
    const billingContactDetails = {
      firstName: billingFeeder.contactFirstName,
      lastName: billingFeeder.contactLastName,
      phoneNumber: billingFeeder.contactPhoneNumber,
      emailAddress: billingFeeder.contactEmailAddress,
      billingLine1: billingFeeder.contactBillingLine1,
      billingLine2: billingFeeder.contactBillingLine2,
      billingCity: billingFeeder.contactBillingCity,
      zip: billingFeeder.contactZip,
    };

    await billingPage.verifyBillingContactDetailsSection()
      .updateBillingContact(billingContactDetails)
      .updateBillingContactForState(billingContactDetails);
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
    const updateBillingPaymentDetails = {
      firstName: billingFeeder.newPaymentFirstname,
      lastName: billingFeeder.newPaymentLastname,
      bankName: billingFeeder.newBankName,
      accountNumber: billingFeeder.newAccountNumber,
      routingNumber: billingFeeder.newRoutingNumber,
      accountType: billingFeeder.newAccountType,
    };
    await billingPage.verifyChangePaymentButton()
      .changePaymentMethod('@radioBankAccount')
      .updatePaymentToBank(updateBillingPaymentDetails)
      .updatePaymentToBankForAccountType(updateBillingPaymentDetails);
  });
});
