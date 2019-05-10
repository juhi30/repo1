import { client } from 'nightwatch-api';

const billingPage = client.page.BillingUsagePage();
const orgProfile = client.page.OrgProfilePage();

export async function verifyBillingPageForStandardPlan() {
  await billingPage.navigate()
    .validateUrlChange()
    .validateSectionsForStandardPlan()
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
