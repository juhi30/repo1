import logger from 'rhinotilities/lib/loggers/logger';
import * as loginToolbox from '../../toolboxes/login.toolbox';
import { selectOrganizationByCCR } from '../../toolboxes/organization.toolbox';
import { createTempPasswordByCCR, changePasswordUsingTempPassword } from '../../toolboxes/member.toolbox';

const gmail = require('../../services/Gmail.service');
const loginFeeder = require('../../feeder/login.feeder');
const accountSetupFeeder = require('../../feeder/accountSetup.feeder');
const memberFeeder = require('../../feeder/member.feeder');

describe('Login Page Tests Cases', () => {
  test('Login as CCR', async () => {
    await loginToolbox.ccrLogin(loginFeeder.ccrLogin, loginFeeder.ccrPassword);
  });

  test('logout as CCR', () => {
    loginToolbox.logout();
  });

  test('Attempt to access a page after logging out', async () => {
    await loginToolbox.isContactPageAccessible();
  });

  test('Login as member with valid username and password', async () => {
    await loginToolbox.memberLogin(global.newCanaryUserOne, memberFeeder.memberPassword);
  });

  test('logout as Member', async () => {
    await loginToolbox.logout();
  });

  test('Use valid username for forgotten password', async () => {
    await loginToolbox.sendForgotPasswordLink(global.newCanaryUserOne, true);
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

  test('Login with valid username and invalid password', async () => {
    const errorMessage = 'Error message is visible.';
    await loginToolbox.invalidMemberLogin(global.newCanaryUserOne, accountSetupFeeder.state, '@errorPrompt', errorMessage);
  });

  test('Login with invalid username and valid password', async () => {
    const errorMessage = 'Error message is visible.';
    await loginToolbox.invalidMemberLogin(accountSetupFeeder.state, memberFeeder.memberPassword, '@errorPrompt', errorMessage);
  });

  test('Use valid email for forgotten password', async () => {
    await loginToolbox.sendForgotPasswordLink(global.newCanaryMemberEmail, true);
  });

  test('Fetch password reset token link using iMap and navigate to the reset password link received in email', async (done) => {
    try {
      gmail.fetchPasswordResetLink().then(async (result) => {
        logger.info(`====>>>>> ${result.hrefValue}`);
        await loginToolbox.navigateToResetPasswordPage(result.hrefValue);
        done();
      });
    } catch (err) {
      logger.error(err, '=====err===');
    }
  });

  test('create two temporary password for member by ccr', async () => {
    await loginToolbox.ccrLogin(loginFeeder.ccrLogin, loginFeeder.ccrPassword);
    await selectOrganizationByCCR(accountSetupFeeder.orgName);
    await createTempPasswordByCCR(memberFeeder.memberName, 'NEW_CANARY_TEMP_PASSWORD');
    await createTempPasswordByCCR(memberFeeder.memberName, 'NEW_CANARY_NEW_TEMP_PASSWORD');
    await loginToolbox.logout();
  });

  test('Unused reset password token is invalidated if another reset request is sent', async () => {
    const { memberPassword } = memberFeeder;
    const tempPassword = global.NEW_CANARY_TEMP_PASSWORD;
    const newTempPassword = global.NEW_CANARY_NEW_TEMP_PASSWORD;
    const errorMessage = 'Error message is visible, old token did not work. ';
    // Login as Member with Old Password reset token
    await loginToolbox.invalidMemberLogin(global.newCanaryUserOne, tempPassword, '@errorPrompt', errorMessage);
    // Login as Member with New Password reset token
    await changePasswordUsingTempPassword(global.newCanaryUserOne, memberPassword, newTempPassword);
  });

  test('logout as Member', async () => {
    await loginToolbox.logout();
  });

  test('Invalid member login three times and reset password using forgot password', async (done) => {
    const errorMessage = 'Error message is visible.';
    const thirdLoginAttemptErrorMessage = 'Failed login error message is visible.';

    try {
      // Login with valid user name and invalid password
      await loginToolbox.invalidMemberLogin(global.newCanaryUserOne, accountSetupFeeder.state, '@errorPrompt', errorMessage);
      await loginToolbox.invalidMemberLogin(global.newCanaryUserOne, accountSetupFeeder.state, '@errorPrompt', errorMessage);
      await loginToolbox.invalidMemberLogin(global.newCanaryUserOne, accountSetupFeeder.state, '@failedLoginAttemptPrompt', thirdLoginAttemptErrorMessage);

      await loginToolbox.sendForgotPasswordLink(global.newCanaryMemberEmail, true);

      gmail.fetchPasswordResetLink().then(async (result) => {
        logger.info(`====>>>>> ${result.hrefValue}`);
        await loginToolbox.navigateToResetPasswordPage(result.hrefValue);
        await loginToolbox.resetMemberPassword(memberFeeder.memberPassword);
        done();
      });
    } catch (err) {
      logger.error(err, '=====err===');
    }
  });

  test('logout as Member', async () => {
    await loginToolbox.logout();
  });

  test('create again temporary password for member by ccr', async () => {
    const { memberPassword } = memberFeeder;
    await loginToolbox.ccrLogin(loginFeeder.ccrLogin, loginFeeder.ccrPassword);
    await selectOrganizationByCCR(accountSetupFeeder.orgName);
    await createTempPasswordByCCR(memberFeeder.memberName, 'NEW_CANARY_ANOTHER_TEMP_PASSWORD');
    await loginToolbox.logout();
    const newTempPassword = global.NEW_CANARY_ANOTHER_TEMP_PASSWORD;
    await changePasswordUsingTempPassword(global.newCanaryUserOne, memberPassword, newTempPassword);
  });

  test('logout as Member', async () => {
    await loginToolbox.logout();
  });
});
