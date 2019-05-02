import logger from 'rhinotilities/lib/loggers/logger';
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
  logger.info('Login...');
  const cookie = await login();
  logger.info(organizationId, '== Deleting Org ==');
  await archiveOrganization(organizationId, cookie);
  logger.info('======== Organization Archive Response =======');
  await deleteOrganization(organizationId, cookie);
  logger.info('====== Organization Deleted =======');
}

export function selectOrganizationByCCR(organizationName) {
  const org = client.page.UniversalElements();
  org.searchForOrganization(organizationName)
    .ccrOrgLogin()
    .pause(2000);
}
