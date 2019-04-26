import { createSession, closeSession } from 'nightwatch-api';
import '../src/env';

jest.setTimeout(120000);

// needed for axios external calls
global.XMLHttpRequest = undefined;

beforeAll(async () => {
  // create a webdriver session before all tests run
  try {
    await createSession({ env: 'default' });
  } catch (err) {
   console.log('====error while creating the nightwatch session on setup.js=== ', err);
  }
  
});

afterAll(async () => {
  // close the webdriver session after all tests run
  try {
    await closeSession();
  } catch (err) {
    console.log('==  error while closing session on setup.js==', err);
  }
});
