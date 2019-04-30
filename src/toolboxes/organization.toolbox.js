import { client } from 'nightwatch-api';
import {
  deleteOrganization,
  archiveOrganization,
  login,
} from '../services/Rhinoapi.service';

const setup = client.page.AccountSetupPage();
export function organizationSetUp(organizationDetails, envVariable) {
  setup.navigate()
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
