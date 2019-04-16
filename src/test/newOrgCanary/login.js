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
      .validateUrlChange_CCR('/selectorg')
  });

  test('Switch organization as a CCR', async () => {
    const org = client.page.UniversalElements();
    const setup = client.page.AccountSetupPage();

    await org.searchForOrganization(testConstants.orgName)
      .ccrOrgLogin()
    await setup.getOrgId()

    //Go back to Org Listing page
    await org.selectOrganization()

      //Search the next Org
      .searchForOrganization(testConstants.orgName2, '@org2SearchResult')
      .ccrOrgLogin('@org2SearchResult')
    await setup.getOrgId()
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
    await login.verify.visible('@usernameInput', 'User is still on the login page.')
  });

  test('Login with valid username and password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .enterMemberCreds(testConstants.memberUsername, testConstants.memberPassword)
      .submit()
      .validateUrlChange()
  });

  test('logout as Member', async () => {
    const logout = client.page.UniversalElements();

    await logout.clickLogout();
  });

  test('Login with valid username and invalid password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .fillInUsername(testConstants.memberUsername)
      .fillInPassword(testConstants.state)
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible.')
  });

  test('Login with invalid username and valid password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .fillInUsername(testConstants.state)
      .fillInPassword(testConstants.memberPassword)
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible.')
  });

  test('Login with empty username and password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible.')
  });

  test('Use invalid username for forgotten password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .resetPassword(testConstants.state)
      .waitForElementVisible('@contactAdminMsg', 'Message to contact admin is visible.')
  });

  test('Use valid username for forgotten password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .resetPassword(testConstants.memberUsername)
      .waitForElementVisible('@successEmailMessage', 'Message saying email for password reset sent is visible.')
  });

  test('Use invalid email for forgotten password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .resetPassword(testConstants.invalidEmail)
      .waitForElementVisible('@contactAdminMsg', 'Message to contact admin is visible.')
  });

  test('Use valid email for forgotten password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .resetPassword(testConstants.memberEmail)
      .waitForElementVisible('@successEmailMessage', 'Message saying email for password reset sent is visible.')
  });

  test('Login to gmail using iMap', async (done) => {
    try {
      gmail.fetchPasswordResetLink().then((result) => {
        process.env.NEW_HREF = result.hrefValue
        console.log('>>>>>>>>>>>', process.env.NEW_HREF)
        done()
      })
    }
    catch (err) {
      console.log('=====err===', err);
    }
  });

  test('navigate to the reset password link received in email', async () => {
    const login = client.page.LoginPage();
    await client
      .url(process.env.NEW_HREF)
    login.waitForElementVisible('@confirmPasswordInput', 'User landed on reset password page.')
  });

  test('Unused reset password token is invalidated if another reset request is sent', async () => {
    const universal = client.page.UniversalElements();
    const login = client.page.LoginPage();
    const member = client.page.MembersPage();

    await login.navigate()
      .enterCSRCreds(testConstants.ccrLogin, testConstants.ccrPassword)
      .submit()
    await universal.searchForOrganization(testConstants.orgName)
      .ccrOrgLogin()
    await member.navigate()
      .selectMember()
      .createTempPassword()
      .getTempPassword()

    client.refresh();

    await member.createTempPassword()
      .getNewTempPassword()
      .waitForElementNotPresent('@UpdateSuccessMessage', 'Update toast notification no longer visible')
    await universal.clickLogout()

    //Login as Member with Old Password reset token
    await login.navigate()
      .enterMemberCreds(testConstants.memberUsername, global.TEMP_PASSWORD)
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible, old token did not work. ')

    //Login as Member with New Password reset token
    await login.navigate()
      .enterMemberCreds(testConstants.memberUsername, global.TEMP_NEW_PASSWORD)
      .submit()
      .validateUrlChange('change-password')
      .fillInNewPasswordInput(testConstants.memberPassword)
      .fillInConfirmPasswordInput(testConstants.memberPassword)
      .clickSaveAndContinueButton()
      .validateUrlChange()
      .waitForElementNotPresent('@passwordUpdateSuccessMessage')
   
    await universal.clickLogout()
  });
});