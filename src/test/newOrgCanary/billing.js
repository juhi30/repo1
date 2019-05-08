import { client } from 'nightwatch-api';

const testConstants = require('../../toolboxes/feeder.toolbox');

const billingPage = client.page.BillingUsagePage();

describe('Automated Tests: Billing Page', () => {
  test('login as a member', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .enterMemberCreds(testConstants.memberUsername, testConstants.memberPassword)
      .submit()
      .validateUrlChange();
  });

  test('Verify the details for billing contact', async () => {
    await billingPage.navigate()
      .validateUrlChange()
      .verifyBillingContactDetailsSection()
      .verifyContactInformation('@contactFirstNameInput', testConstants.firstName)
      .verifyContactInformation('@contactLastNameInput', testConstants.lastName)
      .verifyContactInformation('@phoneNumberInput', testConstants.phoneNumber)
      .verifyContactInformation('@emailAddrInput', testConstants.emailAddress)
      .verifyContactInformation('@billingLine1Input', testConstants.billingLine1)
      .verifyContactInformation('@billingLine2Input', testConstants.billingLine2)
      .verifyContactInformation('@cityInput', testConstants.billingCity)
      .verifyContactInformation('@stateInput', testConstants.stateId)
      .verifyContactInformation('@contactZipInput', testConstants.zipForContact);
  });

  test('Update Billing Contact details', async () => {
    const billingContactDetails = {
      firstName: testConstants.contactFirstName,
      lastName: testConstants.contactLastName,
      phoneNumber: testConstants.contactPhoneNumber,
      emailAddress: testConstants.contactEmailAddress,
      billingLine1: testConstants.contactBillingLine1,
      billingLine2: testConstants.contactBillingLine2,
      billingCity: testConstants.contactBillingCity,
      zip: testConstants.contactZip,
    };
    await billingPage.navigate()
      .validateUrlChange()
      .verifyBillingContactDetailsSection()
      .updateBillingContact(billingContactDetails)
      .updateBillingContactForState(billingContactDetails);
  });

  test('Add details for billing bank account', async () => {
    const billingPaymentDetails = {
      firstName: testConstants.paymentFirstname,
      lastName: testConstants.paymentLastname,
      bankName: testConstants.bankName,
      accountNumber: testConstants.accountNumber,
      routingNumber: testConstants.routingNumber,
      accountType: testConstants.accountType,
    };
    await billingPage.navigate()
      .validateUrlChange()
      .verifyAddPaymentButton()
      .changePaymentMethod('@radioBankAccount')
      .addPaymentToBank(billingPaymentDetails);
  });

  test('Update details for billing bank account', async () => {
    const updateBillingPaymentDetails = {
      firstName: testConstants.newPaymentFirstname,
      lastName: testConstants.newPaymentLastname,
      bankName: testConstants.newBankName,
      accountNumber: testConstants.newAccountNumber,
      routingNumber: testConstants.newRoutingNumber,
      accountType: testConstants.newAccountType,
    };
    await billingPage.navigate()
      .validateUrlChange()
      .verifyChangePaymentButton()
      .changePaymentMethod('@radioBankAccount')
      .updatePaymentToBank(updateBillingPaymentDetails)
      .updatePaymentToBankForAccountType(updateBillingPaymentDetails);
  });
});
