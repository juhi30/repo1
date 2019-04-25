import logger from 'rhinotilities/lib/loggers/logger';
import { createSession, closeSession } from 'nightwatch-api';
import '../src/env';

jest.setTimeout(60000);

// needed for axios external calls
global.XMLHttpRequest = undefined;

beforeAll(async () => {
  // create a webdriver session before all tests run
  try {
    await createSession({ env: 'default' });
  } catch (err) {
    logger.error(err, '====error while creating the nightwatch session on setup.js===');
  }
  
});

afterAll(async () => {
  // close the webdriver session after all tests run
  try {
    await closeSession();
  } catch (err) {
    logger.error(err, '==  error while closing session on setup.js==');
  }
});
