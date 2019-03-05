import { client } from 'nightwatch-api';

beforeAll(async () => {
  console.log("RUNNING Last SOMETHING");
});

afterAll(async () => {
  console.log("DONE RUNNING Last SOMETHING");
});

describe('Something Last', () => {
  test('Login Last Page Initial Render', async () => {
    const login = client.page.LoginPage();
    console.log("TESTING Last SOMETHING");
    await login.navigate()
      .validateForm()

  });
});