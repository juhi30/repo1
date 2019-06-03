import { client } from 'nightwatch-api';

const analytics = client.page.AnalyticsPage();
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
    .validateOpenConversations()
    .validateOpenConvoContactNavigation();
}

export async function verifyTotalCountAndColumnOfClosedConversation() {
  await analytics
    .navigate()
    .pause(2000)
    .validateClosedConversations()
    .validateClosedConvoDatePickerAndOptions()
    .validateDefaultDateRangeInConvoGrid()
    .validateClosedConvoContactNavigation();
}

export async function verifyImpactOfFilters() {
  await analytics
    .navigate()
    .validateFiltersOnConversations();
}

export async function accessiilityOfAnalyticsDashboardAsCCR() {
  await analytics.navigate()
    .visibilityOfAnalyticsPage();
}
