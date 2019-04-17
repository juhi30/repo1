/* eslint-disable no-undef */
import { sendMessage } from 'rhinotilities/lib/toolboxes/Bandwidth.toolbox';
import * as rhinofeeder from '../../services/Rhinofeeder.service';
import * as rhinoapi from '../../services/Rhinoapi.service';
import * as rhinoliner from '../../services/Rhinoliner.service';
import * as messengerbot from '../../services/MessengerBot.service';


const followRedirects = require('follow-redirects');

followRedirects.maxRedirects = 10;
followRedirects.maxBodyLength = 500 * 1024 * 1024 * 1024;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('messsenging tests', () => {
  jest.setTimeout(30000);
  test('configure echo handler for known user', (done) => {
    const config = {
      number: process.env.TEST_BANDWIDTH_NUMBER_PATIENT,
      config: { handler: 'echo', config: ['+18039574927'] },
    };
    messengerbot.configureHandler(config).then((response) => {
      done();
    });
  });

  test('configure reply handler for unknown user', (done) => {
    const config = {
      number: process.env.TEST_BANDWIDTH_NUMBER_UNKNOWN,
      config: { handler: 'reply', config: ['I love Rhinogram!'] },
    };
    messengerbot.configureHandler(config).then((response) => {
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
