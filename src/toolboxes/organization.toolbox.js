import {
  deleteOrganization,
  archiveOrganization,
  login,
} from '../services/Rhinoapi.service';

export function organizationSetUp(client, organizationDetails, envVariable) {
  client.navigate()
    .clickBillingToggle()
    .fillInOrgBasicInformation(organizationDetails)
    .clickCreateOrganization()
    .waitForElementNotVisible('@createOrgButton', 'Create Org button not visible')
    .pause(1000)
    .getOrgId(envVariable);
}

export async function orgTearDown(organizationId) {
  console.log('Login...');
  const cookie = await login();
  console.log('Deleting Org ==', organizationId);
  const archiveResponse = await archiveOrganization(organizationId, cookie);
  console.log('======== Organization Archive Response =======', archiveResponse);
  await deleteOrganization(organizationId, cookie);
  console.log('====== Organization Deleted =======');
}
