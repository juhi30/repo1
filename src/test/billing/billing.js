import { client } from 'nightwatch-api';
import {
  verifyBillingPageForStandardPlan, verifyBillingID,
} from '../../toolboxes/billing.toolbox';

const billingFeeder = require('../../feeder/biling.feeder');

const billingPage = client.page.BillingUsagePage();

describe('Billing Organization Test Cases', () => {
  test('login as a member', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .enterMemberCreds(billingFeeder.memberUsername, billingFeeder.memberPassword)
      .submit()
      .validateUrlChange();
  });

  test('Verify the details for Estimated bill regarding PDF', async () => {
    await billingPage.navigate()
      .validateUrlChange()
      .validateEstimatedBillSection();
  });

  test('Verify the details for billing contact', async () => {
    await billingPage.navigate()
      .validateUrlChange()
      .verifyBillingContactDetailsSection()
      .verifyContactInformation('@contactFirstNameInput', billingFeeder.firstName)
      .verifyContactInformation('@contactLastNameInput', billingFeeder.lastName)
      .verifyContactInformation('@phoneNumberInput', billingFeeder.phoneNumber)
      .verifyContactInformation('@emailAddrInput', billingFeeder.emailAddress)
      .verifyContactInformation('@billingLine1Input', billingFeeder.billingLine1)
      .verifyContactInformation('@billingLine2Input', billingFeeder.billingLine2)
      .verifyContactInformation('@cityInput', billingFeeder.billingCity)
      .verifyContactInformation('@stateInput', billingFeeder.stateId)
      .verifyContactInformation('@contactZipInput', billingFeeder.zipForContact);
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
    await billingPage.navigate()
      .validateUrlChange()
      .verifyBillingContactDetailsSection()
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
    await billingPage.navigate()
      .validateUrlChange()
      .verifyAddPaymentButton()
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
    await billingPage.navigate()
      .validateUrlChange()
      .verifyChangePaymentButton()
      .changePaymentMethod('@radioBankAccount')
      .updatePaymentToBank(updateBillingPaymentDetails)
      .updatePaymentToBankForAccountType(updateBillingPaymentDetails);
  });

  test('Verifying billing UI', async () => {
    await verifyBillingPageForStandardPlan();
  });
});
