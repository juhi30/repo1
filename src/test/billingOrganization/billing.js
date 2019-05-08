import { client } from 'nightwatch-api';

describe('Billing Organization Test Cases', () => {
 const orgProfile = client.page.OrgProfilePage();

 test('Checking Created Billing Id is present in Organization', async () => {
   await orgProfile
   .waitForElementVisible('@settingsDropdown', 'Setting Visibility')
   .pause(2000)
   .navigate()
   .checkBillingId();
 });
});