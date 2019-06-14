import { client } from 'nightwatch-api';

const preference = client.page.PreferencesPage();

export async function enableCloseByAssignee() {
  await preference.navigate()
    .waitForElementVisible('@closeByAssignee', 'close by assignee is visible')
    .click('@closeByAssignee')
    .click('@updatePreferences')
    .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible');
}
