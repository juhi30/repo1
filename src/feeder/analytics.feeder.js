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
  assignmentFilterValue: 'Patient and Team Group',
  contactFilterValue: 'Another Patient Contact',
};

const analyticsClosedConversationUI = {
  closedTab: 'Closed',
  totalClosedConversationLabel: 'Total Closed',
  closedTableMessage: 'Conversations closed with contacts.',
  dateClosedColumn: 'Date Closed',
  closedByColumn: 'Closed By',
};

module.exports = {
  dateRangePickerOptions,
  analyticsChartsNames,
  analyticsOpenConversationUI,
  analyticsClosedConversationUI,
};
