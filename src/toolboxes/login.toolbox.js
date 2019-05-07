import { client } from 'nightwatch-api';
import logger from 'rhinotilities/lib/loggers/logger';

const gmail = require('../services/Gmail.service');

const login = client.page.LoginPage();
const org = client.page.UniversalElements();
const contacts = client.page.ContactsPage();

export function ccrLogin(userName, password) {
  login.navigate()
    .enterCSRCreds(userName, password)
    .submit()
    .pause(2000)
    .validateUrlChange('/selectorg');
  org.waitForElementVisible('@searchInputForOrg', 'Search Org fields is visible');
}

export function logout() {
  const universalElements = client.page.UniversalElements();
  universalElements.clickLogout();
}

export function isContactPageAccessible() {
  contacts.navigate()
    .verifyAddContactButtonVisibility();
  login.verify.visible('@usernameInput', 'User is still on the login page.');
}

export function memberLogin(userName, password) {
  login.navigate()
    .enterMemberCreds(userName, password)
    .submit()
    .validateUrlChange();
}

export function invalidMemberLogin(userName, password, errorPromptElement, errorMessage) {
  login.navigate()
    .enterMemberCreds(userName, password)
    .submit()
    .waitForElementVisible(errorPromptElement, errorMessage);
}

export function sendForgotPasswordLink(userName, isUserNameValid) {
  login.navigate()
    .resetPassword(userName);
  if (isUserNameValid) login.waitForElementVisible('@successEmailMessage', 'Message saying email for password reset sent is visible.');
  else login.waitForElementVisible('@contactAdminMsg', 'Message to contact admin is visible.');
}

export function verifyMissingCredentialError() {
  login.navigate()
    .submit()
    .waitForElementVisible('@missingCredentialErrorPrompt', 'Error message is visible.');
}

export function fetchForgotPasswordLink() {
  return new Promise((resolve) => {
    gmail.fetchPasswordResetLink().then((result) => {
      // process.env.NEW_HREF = result.hrefValue;
      logger.info(`====>>>>> ${process.env.NEW_HREF}`);
      resolve({ success: true, resetPasswordLink: result.hrefValue });
    });
  });
}

export async function navigateToResetPasswordPage(url) {
  await client.url(url);
  login.waitForElementVisible('@confirmPasswordInput', 'User landed on reset password page.');
}

export function resetMemberPassword(password) {
  login.fillInNewPasswordInput(password)
    .fillInConfirmPasswordInput(password)
    .clickSaveAndContinueButton()
    .waitForElementNotPresent('@confirmPasswordInput');
}
