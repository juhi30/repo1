import { client } from 'nightwatch-api';
import logger from 'rhinotilities/lib/loggers/logger';

const gmail = require('../services/Gmail.service');

const login = client.page.LoginPage();
const org = client.page.UniversalElements();
const contacts = client.page.ContactsPage();

export async function ccrLogin(userName, password) {
  login.navigate()
    .enterCSRCreds(userName, password)
    .submit()
    .pause(2000)
    .validateUrlChange('/selectorg');
  org.waitForElementVisible('@searchInputForOrg', 'Search Org fields is visible');
}

export async function logout() {
  const universalElements = client.page.UniversalElements();
  await universalElements.clickLogout();
}

export async function isContactPageAccessible() {
  await contacts.navigate()
    .verifyAddContactButtonVisibility();
  login.verify.visible('@usernameInput', 'User is still on the login page.');
}

export async function memberLogin(userName, password) {
  await login.navigate()
    .enterMemberCreds(userName, password)
    .submit()
    .validateUrlChange();
}

export async function invalidMemberLogin(userName, password, errorPromptElement, errorMessage) {
  await login.navigate()
    .enterMemberCreds(userName, password)
    .submit()
    .waitForElementVisible(errorPromptElement, errorMessage);
}

export async function sendForgotPasswordLink(userName, isUserNameValid) {
  await login.navigate()
    .resetPassword(userName)
    .pause(4000); // significant pause time for ensuring email is delivered
  if (isUserNameValid) await login.waitForElementVisible('@successEmailMessage', 'Message saying email for password reset sent is visible.');
  else await login.waitForElementVisible('@contactAdminMsg', 'Message to contact admin is visible.');
}

export async function verifyMissingCredentialError() {
  await login.navigate()
    .submit()
    .waitForElementVisible('@missingCredentialErrorPrompt', 'Error message is visible.');
}

export function fetchForgotPasswordLink() {
  return new Promise((resolve) => {
    gmail.fetchPasswordResetLink().then((result) => {
      // process.env.NEW_HREF = result.hrefValue;
      logger.info(`====>>>>> ${result.hrefValue}`);
      resolve({ success: true, resetPasswordLink: result.hrefValue });
    });
  });
}

export async function navigateToResetPasswordPage(url) {
  await client.url(url);
  login.waitForElementVisible('@confirmPasswordInput', 'User landed on reset password page.');
}

export async function resetMemberPassword(password) {
  await login.fillInNewPasswordInput(password)
    .fillInConfirmPasswordInput(password)
    .clickSaveAndContinueButton()
    .pause(1000);
}
