import { client } from 'nightwatch-api';

const orgProfile = client.page.OrgProfilePage();

export async function verifyBillingID() {
  await orgProfile
    .waitForElementVisible('@settingsDropdown', 'Setting Visibility')
    .pause(2000)
    .navigate()
    .checkBillingId();
}
