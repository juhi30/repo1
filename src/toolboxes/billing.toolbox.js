import { client } from 'nightwatch-api';

const billingPage = client.page.BillingUsagePage();
const orgProfile = client.page.OrgProfilePage();
const billingFeeder = require('../feeder/billing.feeder');

export async function verifyBillingPageForStandardPlan() {
  await billingPage.validateSectionsForStandardPlan()
    .verifyPlanName('@planName')
    .validateProductOffered('@integrationsProduct', '@integrationsStatus')
    .validateProductOffered('@textMessageProduct', '@offeredMessages')
    .validateProductOffered('@membersProduct', '@offeredMembers')
    .validateProductOffered('@textChannelProduct', '@offeredTextChannels')
    .validateSection('@currentUsageSection')
    .validateCurrentUsage('@textMessageUsage', '@usedTextMessage')
    .validateCurrentUsage('@membersUsage', '@usedMembers')
    .validateCurrentUsage('@textChannelUsage', '@usedTextChannels')
    .validateMessageUpdateAlert();
}


export async function verifyBillingID() {
  await orgProfile
    .waitForElementVisible('@settingsDropdown', 'Setting Visibility')
    .navigate()
    .checkBillingId();
}

export async function verifyBillingContactDetails() {
  await billingPage
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
}

export async function updateBankDetails() {
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
    .updatePaymentToBankForAccountType(updateBillingPaymentDetails)
    .waitForElementNotPresent('@paymentFirstNameInput', 'Payment modal is hidden');
}

export async function updateContactDetails() {
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
    .verifyBillingContactDetailsSection()
    .updateBillingContact(billingContactDetails)
    .updateBillingContactForState(billingContactDetails);
}
