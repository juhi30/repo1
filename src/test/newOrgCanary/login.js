import logger from 'rhinotilities/lib/loggers/logger';
import { client } from 'nightwatch-api';

const testConstants = require('../../toolboxes/feeder.toolbox');
const gmail = require('../../services/Gmail.service');

describe('Login Page Tests Cases', () => {
  test('Login as CCR', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .fillInUsername(testConstants.ccrLogin)
      .fillInPassword(testConstants.ccrPassword)
      .submit()
      .validateUrlChange('selectorg');
  });

  test('Switch organization as a CCR', async () => {
    const org = client.page.UniversalElements();

    await org.searchForOrganization(testConstants.orgName)
      .ccrOrgLogin();

    // Go back to Org Listing page
    await org.selectOrganization()

      // Search the next Org
      .searchForOrganization(testConstants.orgName2, '@org2SearchResult')
      .ccrOrgLogin('@org2SearchResult');
  });

  test('logout as CCR', async () => {
    const logout = client.page.UniversalElements();

    await logout.clickLogout();
  });

  test('Attempt to access a page after logging out', async () => {
    const contacts = client.page.ContactsPage();
    const login = client.page.LoginPage();

    await contacts.navigate()
      .expect.element('@addContactButton').to.not.be.present;
    await login.verify.visible('@usernameInput', 'User is still on the login page.');
  });

  test('Login with valid username and password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .enterMemberCreds(testConstants.memberUsername, testConstants.memberPassword)
      .submit()
      .validateUrlChange();
  });

  test('logout as Member', async () => {
    const logout = client.page.UniversalElements();

    await logout.clickLogout();
  });

  test('Use valid username for forgotten password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .resetPassword(testConstants.memberUsername)
      .waitForElementVisible('@successEmailMessage', 'Message saying email for password reset sent is visible.');
  });

  test('Use invalid username for forgotten password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .resetPassword(testConstants.state)
      .waitForElementVisible('@contactAdminMsg', 'Message to contact admin is visible.');
  });

  test('Login with valid username and invalid password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .fillInUsername(testConstants.memberUsername)
      .fillInPassword(testConstants.state)
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible.');
  });

  test('Login with invalid username and valid password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .fillInUsername(testConstants.state)
      .fillInPassword(testConstants.memberPassword)
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible.');
  });

  test('Use valid email for forgotten password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .resetPassword(testConstants.memberEmail)
      .waitForElementVisible('@successEmailMessage', 'Message saying email for password reset sent is visible.');
  });

  test('Use invalid email for forgotten password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .resetPassword(testConstants.invalidEmail)
      .waitForElementVisible('@contactAdminMsg', 'Message to contact admin is visible.');
  });

  test('Login with empty username and password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible.');
  });

  test('Login to gmail using iMap to fetch password reset token', async (done) => {
    try {
      gmail.fetchPasswordResetLink().then((result) => {
        process.env.NEW_HREF = result.hrefValue
        logger.info(`====>>>>> ${process.env.NEW_HREF}`);
        done()
      })
    }
    catch (err) {
      logger.error(err, '=====err===');
    }
  });

  test('navigate to the reset password link received in email', async () => {
    const login = client.page.LoginPage();
    await client
      .url(process.env.NEW_HREF);
    login.waitForElementVisible('@confirmPasswordInput', 'User landed on reset password page.');
  });

  test('Unused reset password token is invalidated if another reset request is sent', async () => {
    const universal = client.page.UniversalElements();
    const login = client.page.LoginPage();
    const member = client.page.MembersPage();
    const org = client.page.UniversalElements();

    await login.navigate()
      .pause(1000)
      .enterCSRCreds(testConstants.ccrLogin, testConstants.ccrPassword)
      .submit();
    await org.waitForElementVisible('@searchInputForOrg', 'Search Org field is visible');
    await universal.searchForOrganization(testConstants.orgName)
      .ccrOrgLogin();
    await member.navigate()
      .pause(1000)
      .selectMember()
      .createTempPassword()
      .getTempPassword();

    client.refresh();

    await member.createTempPassword()
      .getNewTempPassword()
      .waitForElementNotPresent('@UpdateSuccessMessage', 'Update toast notification no longer visible');
    await universal.clickLogout();

    // Login as Member with Old Password reset token
    await login.navigate()
      .enterMemberCreds(testConstants.memberUsername, global.TEMP_PASSWORD)
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible, old token did not work. ');

    // Login as Member with New Password reset token
    await login.navigate()
      .enterMemberCreds(testConstants.memberUsername, global.TEMP_NEW_PASSWORD)
      .submit()
      .validateUrlChange('change-password')
      .fillInNewPasswordInput(testConstants.memberPassword)
      .fillInConfirmPasswordInput(testConstants.memberPassword)
      .clickSaveAndContinueButton()
      .validateUrlChange()
      .waitForElementNotPresent('@passwordUpdateSuccessMessage');
  });

  test('logout as Member', async () => {
    const logout = client.page.UniversalElements();

    await logout.clickLogout();
  });

  test('Login with valid username and invalid password three times', async (done) => {
    const login = client.page.LoginPage();

    await login.navigate()
      .enterMemberCreds(testConstants.memberEmail, testConstants.state)
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible.')
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible.')
      .submit()
      .waitForElementVisible('@failedLoginAttemptPrompt', 'Failed login error message is visible.');

    await login.navigate()
      .resetPassword(testConstants.memberEmail)
      .pause(10000) // significant pause time for ensuring email is delivered
      .waitForElementVisible('@successEmailMessage', 'Message saying email for password reset sent is visible.');

    const result = await gmail.fetchPasswordResetLink();

    await client.url(`${result.hrefValue}`);
    await login.waitForElementVisible('@confirmPasswordInput', 'User landed on reset password page.');

    await login
      .fillInNewPasswordInput(testConstants.memberPassword)
      .fillInConfirmPasswordInput(testConstants.memberPassword)
      .clickSaveAndContinueButton()
      .waitForElementNotPresent('@confirmPasswordInput');

    done();
  });
});
