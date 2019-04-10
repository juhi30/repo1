import { client } from 'nightwatch-api';

describe('Existing Canary Login Page Tests', () => {
  test('Existing Org Canary Page Initial Render', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
    .waitForElementVisible('@errorPrompt', 'Error message is visible.')

  });

  test('Try to login with NO name and NO password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .submit()
      .waitForElementVisible('@errorPrompt', 'Error message is visible.')

  });

  test('Try to login with name and NO password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
           .fillInUsername('nightmember')
           .submit()
           .waitForElementVisible('@errorPrompt', 'Error message is visible.')

  });

  test('Try to login with NO name and password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
           .fillInPassword('justsomepassword')
          .submit()
          .waitForElementVisible('@errorPrompt', 'Error message is visible.')
  });
});