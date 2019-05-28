import { client } from 'nightwatch-api';
import * as analyticsToolbox from '../../toolboxes/analytics.toolbox';
import * as messageToolbox from '../../toolboxes/messaging.toolbox';
import * as loginToolbox from '../../toolboxes/login.toolbox';
import { selectOrganizationByCCR } from '../../toolboxes/organization.toolbox';

const messageFeeder = require('../../feeder/message.feeder');
const contactFeeder = require('../../feeder/contact.feeder');
const loginFeeder = require('../../feeder/login.feeder');
const accountSetupFeeder = require('../../feeder/accountSetup.feeder');


describe('Automated Tests: Analytics', () => {
  test('Check for accessibility of Analytics dashboard as a member', async () => {
    await analyticsToolbox.accessiilityOfAnalyticsDashboard();
  });

  test('Check for accessibility of Date Picker', async () => {
    await analyticsToolbox.verifyAccessibilityOfDatePicker();
  });

  test('Check for default State of Graph', async () => {
    await analyticsToolbox.defaultStateOfGraph();
  });

  test('Check for open conversation: a) count of open threads and b) verify each value of column', async () => {
    await messageToolbox.sendGroupMessageToContact('@patientAndTeamGroup_PatientInbox', '@searchContactModalTitle', contactFeeder.anotherContactFirstName, messageFeeder.groupPatientMessage);
    await analyticsToolbox.verifyTotalCountAndColumnOfOpenConversation();
  });

  test('Check for closed conversation: a) count of closed threads and b) verify each value of column', async () => {
    await analyticsToolbox.verifyTotalCountAndColumnOfClosedConversation();
  });

  test('Check for impact of filters for Contact and Patient', async () => {
    await analyticsToolbox.verifyImpactOfFilters();
  });

  test('logout as Member', async () => {
    await loginToolbox.logout();
  });

  test('login as CCR', async () => {
    await loginToolbox.ccrLogin(loginFeeder.ccrLogin, loginFeeder.ccrPassword);
    await selectOrganizationByCCR(accountSetupFeeder.orgName);
  });

  test('Check for accessibility of Analytics dashboard as a CCR', async () => {
    await analyticsToolbox.accessiilityOfAnalyticsDashboardAsCCR();
  });

  test('logout as CCR', async () => {
    const universalElements = client.page.UniversalElements();
    await universalElements.clickLogout();
  });
});
