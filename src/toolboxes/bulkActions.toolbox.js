import { client } from 'nightwatch-api';

const bulkActions = client.page.BulkActionsPage();
// check the action option for the selected option for Patient Team Inbox when CBA is off
export async function checkForCloseConOptionForPateintTeamForAssignedThread() {
  await bulkActions
    .navigate()
    .selectOption('@assigned')
    .actionForSelection('@closeConversations');
}

export async function checkForCloseConOptionForPateintTeamForDefaultThread() {
  await bulkActions
    .navigate()
    .selectOption('@notAssigned')
    .actionForSelection('@closeConversations');
}

export async function checkForCloseConOptionForPateintTeamForAllThreads() {
  await bulkActions
    .navigate()
    .selectOption('@all')
    .actionForSelection('@closeConversations');
}

// check the action option for the selected option for AssignedToMe inbox when CBA is off
export async function checkForAssignmentCompleteOptionForATMThreads() {
  await bulkActions
    .navigate()
    .selectOption('@all')
    .actionForSelection('@assignmentComplete');
}

// check the action option for the selected option Direct inbox when CBA is off
export async function checkForCloseConOptionForDirectThreads() {
  await bulkActions
    .navigate()
    .selectOption('@all')
    .actionForSelection('@closeConversations');
}
