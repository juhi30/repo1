/* eslint-disable no-undef */
import { sendMessage } from 'rhinotilities/lib/toolboxes/Bandwidth.toolbox';
import * as rhinofeeder from '../../services/Rhinofeeder.service';
import * as rhinoapi from '../../services/Rhinoapi.service';
import * as rhinoliner from '../../services/Rhinoliner.service';
import * as messengerbot from '../../services/MessengerBot.service';

import { client } from 'nightwatch-api';

const loginApi = require('../../services/Login.Service');
const testConstants = require('../../toolboxes/feeder.toolbox');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('messsenging tests', () => {
  test('Existing Org Canary Page Initial Render', async () => {
    const login = client.page.LoginPage();
    const universalPage = client.page.UniversalElements();

    await login.navigate()
      .validateForm()
      .enterMemberCreds(testConstants.memberUsernameExistingOrg, testConstants.memberPasswordExistingOrg)
      .submit();  
  });

  test('Send Outbound Message To Contact and Get Reply', async () => {
    const contacts = client.page.ContactsPage();

    await contacts.searchForContact(testConstants.botContactName)
      .sendOutboundMessageAndGetReply(`handler add reply ${testConstants.testBotReplyMessage}`, 'Hi Bot Contact');
  });

  test('configure echo handler for bot contact to get inbound message',async (done) => {
    jest.setTimeout(30000);
    const config = {
      number: process.env.TEST_BANDWIDTH_CHANNEL_NUMBER,
      config: { handler: 'echo' },
    };
    messengerbot.configureHandler(config).then((response) => {
      done();
    });
  });

  test('Get Inbound Message from Contact', async (done) => {
    const contacts = client.page.ContactsPage();
    const randomNumber = contacts.getRandomNumber();
    jest.setTimeout(30000);
    const body = {
      from: process.env.TEST_BANDWIDTH_NUMBER_PATIENT,
      to: process.env.TEST_BANDWIDTH_CHANNEL_NUMBER,
      text: `${testConstants.testBotInboundMessage} ${randomNumber}`,
      media: null,
    };
    messengerbot.sendMessage(body).then(async (response) => {
      await contacts.getInboundMessage(testConstants.testBotInboundMessage);
      done();
    });
  }); 

});
