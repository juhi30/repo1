import { createSession, closeSession } from 'nightwatch-api';
import '../src/env';

jest.setTimeout(60000);

// needed for axios external calls
global.XMLHttpRequest = undefined;

beforeAll(async () => {
  // create a webdriver session before all tests run
  await createSession({ env: 'default' });
});

afterAll(async () => {
  // close the webdriver session after all tests run
  try {
    await closeSession();
  } catch(err) {
    console.log('==== await closeSession();=', err);
  }
 
});
