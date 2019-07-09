import logger from 'rhinotilities/lib/loggers/logger';

const moment = require('moment-timezone');
const path = require('path');

function findTextOnPage(client, text) {
  client.api.useCss().verify.containsText('body', text);
}

function returnElementText(client, selector) {
  client.getText(selector, (result) => {
    logger.info(result);
    return result;
  });
}

// Use to upload attachments
async function uploadFile(client, fileName, element) {
  client.setValue(element, `${path.resolve()}/src/assets/${fileName}`);
}

// useful for clicking a specific element without needing a Page Object function
// specific to that element's text (less brittle / more flexible)
async function clickSpanViaText(client, text) {
  await client.api.useXpath().waitForElementVisible(`//SPAN[contains(., '${text}')]`, `Span with text "${text}" is visible`)
    .click(`//SPAN[contains(., '${text}')]`);
}

function clickDivViaText(client, text) {
  client.api.useXpath().waitForElementVisible(`//DIV[contains(text(), '${text}')]`, `Div with text "${text}" is visible`)
    .pause(1000)
    .click(`//DIV[contains(text(), '${text}')]`);
}

function changeDateFormat(date, timeZone, format) {
  return moment.utc(date).tz(timeZone).format(format);
}

const randomNumber = Math.ceil(Math.random() * 10000);

const theDateObj = new Date();
const dateString = `${theDateObj.toLocaleTimeString()}, ${theDateObj.toLocaleDateString()}`;

const csrCreds = {
  username: 'ccrnightwatch',
  password: 'bacon',
};

const memberCreds = {
  username: 'jcash',
  password: 'bacon',
};

const patientCreds = {
  username: 'nightpatient',
  password: 'Nightpass2',
};

const organizationSearchStringForAnalytics = 'Rhino India Scrum Team';

const dateRangePickerOptions = {
  yesterday: 'Yesterday',
  last7Days: 'Last 7 Days',
  last30Days: 'Last 30 Days',
  last90Days: 'Last 90 Days',
  last12Months: 'Last 12 Months',
  customRange: 'Custom Range',
};

const analyticsChartsNames = {
  totalMessageCount: 'Total Message Count',
  peakMessageTime: 'Peak Message Time',
  responseTime: 'Response Time',
  newInboundContacts: 'New Inbound Contacts',
};

const analyticsOpenConversationUI = {
  conversationGridLabel: 'Conversation Activity',
  defautlTabLabel: 'Open',
  totalOpenConversationLabel: 'Total Open',
  filterLastMessagedByLabel: 'Filter Last Messaged By: ',
  contactFilterButton: 'Contact',
  practiceFilterButton: 'Practice',
  timeOpenColumn: 'Time Open',
  lastMessageColumn: 'Last Message',
  assignmentColumn: 'Assignment',
  contactColumn: 'Contact',
  openTableMessage: 'All conversations currently open with contacts.',
  contactFilter: '- Practice',
  practiceFilter: '- Contact',
};

const analyticsClosedConversationUI = {
  closedTab: 'Closed',
  totalClosedConversationLabel: 'Total Closed',
  closedTableMessage: 'Conversations closed with contacts.',
  dateClosedColumn: 'Date Closed',
  closedByColumn: 'Closed By',
};

const analyticsDataUrl = '/analytics?from=2010-01-21&to=2019-02-20&activeKey=6';

const memberCredsForConversationGrid = {
  username: 'analyticsmember',
  password: 'Test@123',
};

function defaultDateRange(startDays, endDays) {
  const startDate = moment().subtract(startDays, 'days').format('MMM DD, YYYY');
  const endDate = moment().subtract(endDays, 'days').format('MMM DD, YYYY');
  return `Last 30 Days (${startDate} - ${endDate})`;
}

function localToUtc(datetime, ianaTimezone) {
  return moment.tz(datetime, 'MM/DD/YYYY hh:mm:ss A', ianaTimezone).utc();
}

module.exports = {
  clickSpanViaText,
  clickDivViaText,
  returnElementText,
  findTextOnPage,
  randomNumber,
  dateString,
  csrCreds,
  memberCreds,
  patientCreds,
  defaultDateRange,
  dateRangePickerOptions,
  analyticsChartsNames,
  organizationSearchStringForAnalytics,
  analyticsDataUrl,
  analyticsOpenConversationUI,
  analyticsClosedConversationUI,
  memberCredsForConversationGrid,
  uploadFile,
  localToUtc,
  changeDateFormat,
};
