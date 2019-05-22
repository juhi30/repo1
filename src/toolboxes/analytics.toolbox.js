import { client } from 'nightwatch-api';

import * as loginToolbox from './login.toolbox';

import { selectOrganizationByCCR } from './organization.toolbox';

const analytics = client.page.AnalyticsPage();
const loginFeeder = require('../feeder/login.feeder');
const accountSetupFeeder = require('../feeder/accountSetup.feeder');

export async function accessiilityOfAnalyticsDashboard() {
  await analytics
    .navigate()
    .visibilityOfAnalyticsPage();
}

export async function verifyAccessibilityOfDatePicker() {
  await analytics
    .navigate()
    .validateDefaultOptionInDateRangeDropdown()
    .validateDatePickerAndOptions();
}

export async function defaultStateOfGraph() {
  await analytics
    .verifyGraph('@totalMessageCountGraph', '@totalMessageCountLabel')
    .getTotalMessageCount('@totalMessageCountGraphCount')
    .verifyGraph('@newInboundContactsGraph', '@newInboundContactsGraphLabel')
    .verifyStateOfGraph('@newInboundContactEmptyMessage')
    .verifyGraph('@responseTimeGraph', '@responseTimeGraphLabel')
    .verifyStateOfGraph('@responseTimeEmptyMessage')
    .verifyGraph('@peakMessageTimeGraph', '@peakMessageTimeGraphLabel')
    .verifyStateOfGraph('@peakMessageTimeEmptyMessage');
}

export async function verifyTotalCountAndColumnOfOpenConversation() {
  await analytics
    .navigate()
    .validateDefaultOptionInDateRangeDropdown()
    .validateOpenConversations();
}

export async function verifyTotalCountAndColumnOfClosedConversation() {
  await analytics
    .navigate()
    .validateClosedConversations()
    .validateDefaultDateRangeInConvoGrid()
    .validateClosedConvoDatePickerAndOptions();
}

export async function verifyImpactOfFilters() {
  await analytics
    .navigate()
    .validateFiltersOnConversations();
}

export async function accessiilityOfAnalyticsDashboardAsCCR() {
  await loginToolbox.ccrLogin(loginFeeder.ccrLogin, loginFeeder.ccrPassword);
  await selectOrganizationByCCR(accountSetupFeeder.orgName);
  await analytics.navigate()
    .visibilityOfAnalyticsPage();
  const universalElements = client.page.UniversalElements();
  await universalElements.clickLogout();
}
