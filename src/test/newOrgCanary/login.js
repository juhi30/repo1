import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Login Page Tests Cases', () => {

  test('Existing Org Canary Page Initial Render', async () => {
    client.maximizeWindow();
    const login = client.page.LoginPage();

    await login.navigate()
      .validateForm()
  });

  test('login with NO username and NO password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible! ')

  });

  test('login with username and No password as CCR', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .fillInUsername(testConstants.ccrLogin)
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible! ')

  });

  test('Try to login with NO username and password as ccr', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .fillInPassword(testConstants.ccrPassword)
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible! ')
  });

  test('login with username and password as ccr', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .fillInUsername(testConstants.ccrLogin)
      .fillInPassword(testConstants.ccrPassword)
      .submit()
      .validateUrlChange_CCR('/selectorg')
  });

  test('logout as CCR', async () => {
    const logout = client.page.UniversalElements();

    await logout.clickLogout();

  });

  test('Attempt to access a page after logging out', async () => {
    const login = client.page.UniversalElements();
    const contacts = client.page.ContactsPage();

    contacts.navigate();
    login.validatePageError('@contactsButton', 'login');

  });

  test('login as ccr into the organization and create temporary password for the member ', async () => {
    const search = client.page.UniversalElements();
    const login = client.page.LoginPage();
    const member = client.page.MembersPage();

    await login.navigate()
      .enterCSRCreds(testConstants.ccrLogin, testConstants.ccrPassword)
      .submit()
    await search.searchForOrganization(testConstants.orgName)
      .ccrOrgLogin()
    await member.navigate()
      .selectMember('@memberSelector')
      .verifyTempPasswordCreation()
      .getTempPassword()

    client.refresh();

    await member.verifyTempPasswordCreation()
      .getNewTempPassword()
      .pause(5000)
    await search.clickLogout()
  });

  test('login as member with old temporary password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .enterMemberCreds(testConstants.memberUsername, global.TEMP_PASSWORD)
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible! ')
  });

  test('login as member with New temporary password', async () => {
    const login = client.page.LoginPage();
    const logout = client.page.UniversalElements();

    await login.navigate()
      .enterMemberCreds(testConstants.memberUsername, global.TEMP_NEW_PASSWORD)
      .submit()
      .validateUrlChange('change-password')
      .fillInNewPasswordInput(testConstants.memberPassword)
      .fillInConfirmPasswordInput(testConstants.memberPassword)
      .clickSaveAndContinueButton()
      .pause(2000)
      .validateUrlChange()
      .pause(2000)

    await logout.clickLogout()
  });
});

describe('Member Login Page Tests', () => {

  test('Try to login with valid name and valid password', async () => {
    const login = client.page.LoginPage();
    await login.navigate()
      .enterMemberCreds(testConstants.validUserName2, testConstants.validPassword1)
      .submit()
      .validateUrlChange()
      .logOut()
  });

  test('Try to login with invalid password for valid name', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .fillInUsername(testConstants.validUserName1)
      .fillInPassword(testConstants.invalidPassword1)
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible! ')
  });

  test('Try to login with valid password for invalid name', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .fillInUsername(testConstants.invalidUsername2)
      .fillInPassword(testConstants.validPassword1)
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible! ')
  });

  test('Try to login with empty name and empty password', async () => {
    const login = client.page.LoginPage();
    await login.navigate()
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible! ')
  });

  test('Try to login with invalid username for forgotten password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .inputsForForgottenPassword(testConstants.invalidUsername)
      .waitForElementVisible('@warningMessage1')
  });

  test('Try to login with valid  username for forgotten password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .inputsForForgottenPassword(testConstants.validUserName1)
      .waitForElementVisible('@successMessage')
  });

  test('Try to login with valid email for forgotten password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .inputsForForgottenPassword(testConstants.validEmailName2)
      .waitForElementVisible('@successMessage')
  });

  test('Try to login with invalid email for forgotten password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .inputsForForgottenPassword(testConstants.invalidEmailname)
      .waitForElementVisible('@warningMessage1')
  });

  test('Switch from one organization to another organization', async () => {
    const org = client.page.UniversalElements()
    const login = client.page.LoginPage();


    await login.navigate()
      .enterCSRCreds(testConstants.ccrLogin, testConstants.ccrPassword)
      .submit()
      .validateUrlChange_CCR('selectorg', ' navigated to select organization list page')

    await org.searchForOrganization(testConstants.orgName)
      .ccrOrgLogin('@organizationSearchResult')
      .selectOrganization()
      .searchForOrganization(testConstants.orgName2)
      .ccrOrgLogin('@organizationSearchResultNew')
      .clickLogout()
  });

  test('Send an email for reset password', async () => {
    const fpass = client.page.ForgotPassword();
    const login = client.page.LoginPage();

    await login.navigate();
    await fpass.verifyForgotPasswordProcess(testConstants.memberUsername)
  });
});