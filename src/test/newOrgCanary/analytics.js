import {
  accessiilityOfAnalyticsDashboard, verifyAccessibilityOfDatePicker, defaultStateOfGraph, verifyTotalCountAndColumnOfOpenConversation,
  verifyTotalCountAndColumnOfClosedConversation, verifyImpactOfFilters, accessiilityOfAnalyticsDashboardAsCCR,
} from '../../toolboxes/analytics.toolbox';

import * as messageToolbox from '../../toolboxes/messaging.toolbox';

import * as loginToolbox from '../../toolboxes/login.toolbox';

const messageFeeder = require('../../feeder/message.feeder');

const contactFeeder = require('../../feeder/contact.feeder');

describe('Automated Tests: Analytics', () => {
  test('Check for accessibility of Analytics dashboard', async () => {
    await accessiilityOfAnalyticsDashboard();
  });

  test('Check for accessibility of Date Picker', async () => {
    await verifyAccessibilityOfDatePicker();
  });

  test('Check for default State of Graph', async () => {
    await defaultStateOfGraph();
  });

  test('Check for open conversation: a) count of open threads and b) verify each value of column', async () => {
    await messageToolbox.sendGroupMessageToContact('@patientAndTeamGroup_PatientInbox', '@searchContactModalTitle', contactFeeder.anotherContactFirstName, messageFeeder.groupPatientMessage);
    await verifyTotalCountAndColumnOfOpenConversation();
  });

  test('Check for closed conversation: a) count of closed threads and b) verify each value of column', async () => {
    await verifyTotalCountAndColumnOfClosedConversation();
  });

  test('Check for impact of filters for Contact and Patient', async () => {
    await verifyImpactOfFilters();
  });

  test('logout as Member', async () => {
    await loginToolbox.logout();
  });

  test('Check for acessibility of analytics as CCR', async () => {
    await accessiilityOfAnalyticsDashboardAsCCR();
  });
});
