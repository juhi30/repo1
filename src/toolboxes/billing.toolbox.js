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
    .pause(2000)
    .navigate()
    .checkBillingId();
}

export async function verifyBillingContactDetails() {
  await billingPage.verifyBillingContactDetailsSection()
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
