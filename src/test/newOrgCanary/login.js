import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

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

});
