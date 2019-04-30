import { sendMessage } from 'rhinotilities/lib/toolboxes/Bandwidth.toolbox';
import * as messengerbot from '../../services/MessengerBot.service';

// eslint-disable-next-line import/no-extraneous-dependencies
const followRedirects = require('follow-redirects');

followRedirects.maxRedirects = 10;
followRedirects.maxBodyLength = 500 * 1024 * 1024 * 1024;

describe('messsenging tests', () => {
  jest.setTimeout(30000);
  test('configure echo handler for known user', (done) => {
    const config = {
      number: process.env.TEST_BANDWIDTH_NUMBER_PATIENT,
      config: { handler: 'echo', config: ['+18039574927'] },
    };
    messengerbot.configureHandler(config).then(() => {
      done();
    });
  });

  test('configure reply handler for unknown user', (done) => {
    const config = {
      number: process.env.TEST_BANDWIDTH_NUMBER_UNKNOWN,
      config: { handler: 'reply', config: ['I love Rhinogram!'] },
    };
    messengerbot.configureHandler(config).then(() => {
      done();
    });
  });

  test('send messenge from known user', (done) => {
    sendMessage(process.env.TEST_BANDWIDTH_NUMBER_PATIENT, process.env.TEST_BANDWIDTH_NUMBER_ORG, 'Do i still have an appointment tomorrow!').then(() => {
      done();
    });
  });

  test('send messenge from unknown user', (done) => {
    sendMessage(process.env.TEST_BANDWIDTH_NUMBER_UNKNOWN, process.env.TEST_BANDWIDTH_NUMBER_ORG, 'Hello, my name is Shannon, can I get a consult with Dr. Phill?').then(() => {
      done();
    });
  });
});
