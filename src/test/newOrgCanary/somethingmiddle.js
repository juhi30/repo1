import { client } from 'nightwatch-api';

beforeAll(async () => {
  console.log("RUNNING Middle SOMETHING");
});

afterAll(async () => {
  console.log("DONE RUNNING Middle SOMETHING");
});

describe('Something Middle', () => {
  test('Login Middle Page Initial Render', async () => {
    const login = client.page.LoginPage();
    console.log("TESTING Middle SOMETHING");
    await login.navigate()
      .validateForm()

  });
});