import { client } from 'nightwatch-api';

const memberPreferences = client.page.MemberPreferencePage();

describe('Member Preferences Page', () => {
  test('Default page Settings Of Member Preferences Page', async () => {
    await memberPreferences.navigate();
  });

  test('Update Page Settings on Member Preferences', async () => {
    await memberPreferences.clickEventOnMemberPreferencesPage('@checkAssignToMeNotificationOnDesktop', 'click on assigned to me messages')
      .clickEventOnMemberPreferencesPage('@checkFollowingNotificationOnMobile', 'click on Following patient messages')
      .clickEventOnMemberPreferencesPage('@updatePreferencesButton', 'Update Member Preferences Page')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible')
      .waitForElementNotPresent('@updationSuccessfulMessage', 'success message is gone');
  });

  test('Update Member Preferences Page after adding Group On Patient', async () => {
    await memberPreferences.clickEventOnMemberPreferencesPage('@individualGroupNotificationLinkForPatient', 'click on group notification for Patient messages')
      .clickEventOnMemberPreferencesPage('@checkPatientGroupNotificationOnMobile', 'Selection on group for Patient messages')
      .clickEventOnMemberPreferencesPage('@updatePreferencesButton', 'Update Member Preferences Page')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible')
      .waitForElementNotPresent('@updationSuccessfulMessage', 'success message is gone');
  });

  test('Update Member Preferences Page after adding Group On Team', async () => {
    await memberPreferences.clickEventOnMemberPreferencesPage('@individualGroupNotificationLinkForTeam', 'click on group notification for Team messages')
      .clickEventOnMemberPreferencesPage('@checkTeamGroupNotificationOnMobile', 'Selection on group for Team messages')
      .clickEventOnMemberPreferencesPage('@updatePreferencesButton', 'Update Member Preferences Page')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible')
      .waitForElementNotPresent('@updationSuccessfulMessage', 'success message is gone');
  });

  test('Update Member Preferences Page after adding Group On Patient and Team', async () => {
    await memberPreferences.clickEventOnMemberPreferencesPage('@individualGroupNotificationLinkForPatientAndTeam', 'click on group notification for Patient and Team messages')
      .clickEventOnMemberPreferencesPage('@checkTeamAndPatientGroupNotificationOnMobile', 'Selection on group for Patient and Team messages')
      .clickEventOnMemberPreferencesPage('@updatePreferencesButton', 'Update Member Preferences Page')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible');
  });
});
