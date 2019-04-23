import { client } from 'nightwatch-api';
const memberPrefrences = client.page.MemberPreferencePage();

describe('Member Preferences Page', () => {

  test('Default page Settings Of Member Preferences Page', async () => {
    await memberPrefrences.navigate()
  }),

  test('Update Page Settings on Member Preferences', async () => {
    await memberPrefrences.clickEventOnMemberPreferencesPage('@notificationOnDesktopIfAssign','click on assigned to me messages')
      .clickEventOnMemberPreferencesPage('@notificationOnMobileIfFollowing','click on Following patient messages')
      .clickEventOnMemberPreferencesPage('@updatePrefrencesButton', 'Update Member Preferences Page')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible')
      .pause(2000)
  });

  test('Update Member Preferences Page after adding Group On Patient', async () => {
    await memberPrefrences.clickEventOnMemberPreferencesPage('@groupNotificationLinkOnPatientMsgs','click on group notification for Patient messages')
      .clickEventOnMemberPreferencesPage('@groupNotificationOnMobileForPatient','Selection on group for Patient messages')
      .clickEventOnMemberPreferencesPage('@updatePrefrencesButton', 'Update Member Preferences Page')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible')
      .pause(2000)
  });

  test('Update Member Preferences Page after adding Group On Team', async () => {
    await memberPrefrences.clickEventOnMemberPreferencesPage('@groupNotificationLinkOnTeamMsgs','click on group notification for Team messages')
      .clickEventOnMemberPreferencesPage('@groupNotificationOnMobileForTeam','Selection on group for Team messages')
      .clickEventOnMemberPreferencesPage('@updatePrefrencesButton', 'Update Member Preferences Page')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible')
      .pause(2000)
  });

  test('Update Member Preferences Page after adding Group On Patient and Team', async () => {
    await memberPrefrences.clickEventOnMemberPreferencesPage('@groupNotificationLinkOnPatientAndTeamMsgs','click on group notification for Patient and Team messages')
      .clickEventOnMemberPreferencesPage('@groupNotificationOnMobileForPatientNdTeam','Selection on group for Patient and Team messages')
      .clickEventOnMemberPreferencesPage('@updatePrefrencesButton', 'Update Member Preferences Page')
      .waitForElementVisible('@updationSuccessfulMessage', 'success message is visible')
  });

});
