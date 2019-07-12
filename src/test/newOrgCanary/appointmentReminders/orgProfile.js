import { client } from 'nightwatch-api';
import { logout } from '../../../toolboxes/login.toolbox';

const orgProfileFeeder = require('../../../feeder/orgProfile.feeder');

describe('Organization Profile Edit as CCR', () => {
  test('Edit Organization Profile as CCR', async () => {
    const orgProfile = client.page.OrgProfilePage();

    await orgProfile.navigate();
    await orgProfile.renderPageElements('@addLogoButton');

    await orgProfile.verifyBillingIdAndIntegrationOptions()
      .updateOrgProfileMandatoryFields(orgProfileFeeder.apptReminderOrgNewName,
        orgProfileFeeder.orgNewAddress,
        orgProfileFeeder.orgNewCity,
        orgProfileFeeder.orgNewState,
        orgProfileFeeder.orgNewZip)
      .updateOrgProfileOtherFields(orgProfileFeeder.orgNewAddress2,
        orgProfileFeeder.orgNewPhone,
        orgProfileFeeder.orgNewEmail,
        orgProfileFeeder.orgNewcontactName,
        orgProfileFeeder.orgNewcontactPhone,
        orgProfileFeeder.orgNewcontactEmail)
      .enableDisableToggles('@integrationToggle')
      .updateIntegrationValue(orgProfileFeeder.orgNewIntegration)
      .clickSaveProfile();
  });

  test('logout as CCR', async () => {
    await logout();
  });
});
