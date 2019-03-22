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
      .validateError()

  });

  test('login with username and No password as CCR', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .fillInUsername(testConstants.ccrLogin)
      .submit()
      .validateError()

  });

  test('Try to login with NO username and password as ccr', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .fillInPassword(testConstants.ccrPassword)
      .submit()
      .validateError()
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
    const login = client.page.LoginPage();
    const contacts = client.page.ContactsPage();

    contacts.navigate();
    login.validatePageError('login', 'user is still on login page and page cannot be naviated to other page without login');

  });
});