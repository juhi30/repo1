import logger from 'rhinotilities/lib/loggers/logger';
import { client } from 'nightwatch-api';
import * as loginToolbox from '../../toolboxes/login.toolbox';
import { selectOrganizationByCCR } from '../../toolboxes/organization.toolbox';
import { createTempPasswordByCCR, changePasswordUsingTempPassword } from '../../toolboxes/member.toolbox';

const loginFeeder = require('../../feeder/login.feeder');
const accountSetupFeeder = require('../../feeder/accountSetup.feeder');
const memberFeeder = require('../../feeder/member.feeder');
const gmail = require('../../services/Gmail.service');

describe('Login Page Tests Cases', () => {
  test('Login as CCR', async () => {
    await loginToolbox.ccrLogin(loginFeeder.ccrLogin, loginFeeder.ccrPassword);
  });

  // test('Switch organization as a CCR', async () => {
  //   const org = client.page.UniversalElements();

  //   await org.searchForOrganization(accountSetupFeeder.orgName)
  //     .ccrOrgLogin();

  //   // Go back to Org Listing page
  //   await org.selectOrganization()

  //     // Search the next Org
  //     .searchForOrganization(accountSetupFeeder.orgName2, '@org2SearchResult')
  //     .ccrOrgLogin('@org2SearchResult');
  // });

  test('logout as CCR', async () => {
    await loginToolbox.logout();
  });

  test('Attempt to access a page after logging out', async () => {
    await loginToolbox.isContactPageAccessible();
  });

  test('Login as member with valid username and password', async () => {
    await loginToolbox.memberLogin(memberFeeder.memberUsername, memberFeeder.memberPassword);
  });

  test('logout as Member', async () => {
    await loginToolbox.logout();
  });

  test('Use valid username for forgotten password', async () => {
    await loginToolbox.sendForgotPasswordLink(memberFeeder.memberUsername, true);
  });

  test('Use invalid username for forgotten password', async () => {
    await loginToolbox.sendForgotPasswordLink(accountSetupFeeder.state, false);
  });

  test('Use invalid email for forgotten password', async () => {
    await loginToolbox.sendForgotPasswordLink(memberFeeder.invalidEmail, false);
  });

  test('Login with empty username and password', async () => {
    await loginToolbox.verifyMissingCredentialError();
  });

  // test('Login with valid username and invalid password', async () => {
  //   const login = client.page.LoginPage();

  //   await login.navigate()
  //     .fillInUsername(memberFeeder.memberUsername)
  //     .fillInPassword(accountSetupFeeder.state)
  //     .submit()
  //     .waitForElementVisible('@errorPrompt', 'Error message is visible.');
  // });

  // test('Login with invalid username and valid password', async () => {
  //   const login = client.page.LoginPage();

  //   await login.navigate()
  //     .fillInUsername(accountSetupFeeder.state)
  //     .fillInPassword(memberFeeder.memberPassword)
  //     .submit()
  //     .waitForElementVisible('@errorPrompt', 'Error message is visible.');
  // });

  test('Use valid email for forgotten password', async () => {
    await loginToolbox.sendForgotPasswordLink(memberFeeder.memberEmail, true);
  });

  test('Fetch password reset token link using iMap and navigate to that link', async (done) => {
    try {
      loginToolbox.fetchForgotPasswordLink().then(async (response) => {
        await loginToolbox.navigateToResetPasswordPage(response.resetPasswordLink);
        done();
      });
    } catch (err) {
      logger.error(err, '=====err===');
    }
  });

  test('create two temporary password for member by ccr', async () => {
    await loginToolbox.ccrLogin(loginFeeder.ccrLogin, loginFeeder.ccrPassword);
    await selectOrganizationByCCR(accountSetupFeeder.orgName);
    await createTempPasswordByCCR('@selectMemberFromList', 'NEW_CANARY_TEMP_PASSWORD');
    await createTempPasswordByCCR('@selectMemberFromList', 'NEW_CANARY_NEW_TEMP_PASSWORD');
    await loginToolbox.logout();
  });

  test('Unused reset password token is invalidated if another reset request is sent', async () => {
    const { memberUsername, memberPassword } = memberFeeder;
    const tempPassword = global.NEW_CANARY_NEW_TEMP_PASSWORD;
    const errorMessage = 'Error message is visible, old token did not work. ';
    // Login as Member with Old Password reset token
    await loginToolbox.invalidMemberLogin(memberFeeder.memberUsername, 'NEW_CANARY_TEMP_PASSWORD', '@errorPrompt', errorMessage);
    // Login as Member with New Password reset token
    await changePasswordUsingTempPassword(memberUsername, memberPassword, tempPassword);
  });

  test('logout as Member', async () => {
    await loginToolbox.logout();
  });

  test('Invalid member login three times', async (done) => {
    const errorMessage = 'Error message is visible.';
    const thirdLoginAttemptErrorMessage = 'Failed login error message is visible.';

    try {
      // Login with valid user name and invalid password
      await loginToolbox.invalidMemberLogin(memberFeeder.memberUsername, accountSetupFeeder.state, '@errorPrompt', errorMessage);
      // Login with invalid user name and valid password
      await loginToolbox.invalidMemberLogin(accountSetupFeeder.state, memberFeeder.memberPassword, '@errorPrompt', errorMessage);
      // Login with invalid user name and invalid password
      await loginToolbox.invalidMemberLogin(memberFeeder.memberEmail, accountSetupFeeder.state, '@failedLoginAttemptPrompt', thirdLoginAttemptErrorMessage);

      await loginToolbox.sendForgotPasswordLink(memberFeeder.memberEmail, true);

      loginToolbox.fetchForgotPasswordLink().then(async (response) => {
        await loginToolbox.navigateToResetPasswordPage(response.resetPasswordLink);
        await loginToolbox.resetMemberPassword(memberFeeder.memberPassword);
        done();
      });
    } catch (err) {
      logger.error(err, '=====err===');
    }
  });

  test('logout as Member', async () => {
    const logout = client.page.UniversalElements();

    await logout.clickLogout();
  });
});
