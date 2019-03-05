import { client } from 'nightwatch-api';

beforeAll(async () => {
  console.log("RUNNING First SOMETHING");
});

afterAll(async () => {
  console.log("DONE RUNNING First SOMETHING");
});

describe('Something First', () => {
  test('Login First Page Initial Render', async () => {
    const login = client.page.LoginPage();
    console.log("TESTING First SOMETHING");
    await login.navigate()
      .validateForm()

  });
});