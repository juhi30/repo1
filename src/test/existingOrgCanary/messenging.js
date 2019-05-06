import { client } from 'nightwatch-api';
import * as messengerbot from '../../services/MessengerBot.service';

const existingOrgFeeder = require('../../toolboxes/feeder/existingOrg.feeder');

describe('messsenging tests', () => {
  test('Existing Org Canary Page Login With Member', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .validateForm()
      .enterMemberCreds(existingOrgFeeder.memberUsernameExistingOrg, existingOrgFeeder.memberPasswordExistingOrg)
      .submit();
  });

  test('Send Outbound Message To Contact and Get Reply', async () => {
    const contacts = client.page.ContactsPage();

    await contacts.searchForContact(process.env.EXISTING_ORG_BOT_CONTACT_NAME, '@addContactDropdownFirstResultBot')
      .sendOutboundMessageAndGetReply(`handler add reply ${existingOrgFeeder.testBotReplyMessage}`, 'Hi Bot Contact');
  });

  test('configure forward handler for bot contact to get inbound message', async (done) => {
    const config = {
      number: process.env.EXISTING_ORG_BANDWIDTH_NUMBER_PATIENT,
      config: { handler: 'forward', config: [process.env.EXISTING_ORG_BANDWIDTH_CHANNEL_NUMBER] },
    };

    messengerbot.configureHandler(config).then(async () => {
      done();
    });
  });

  test('Get Inbound Message from Contact', async (done) => {
    const contacts = client.page.ContactsPage();
    const randomNumber = contacts.getRandomNumber();

    const config = {
      to: process.env.EXISTING_ORG_BANDWIDTH_NUMBER_PATIENT,
      text: `${existingOrgFeeder.testBotInboundMessage} ${randomNumber}`,
      media: null,
    };
    messengerbot.sendMessage(config).then(async () => {
      await contacts.getInboundMessage(existingOrgFeeder.testBotInboundMessage);
      done();
    });
  });

  test('Search Facebook Unknown Contact', async () => {
    const contacts = client.page.ContactsPage();

    await contacts.searchForContact(process.env.EXISTING_ORG_FACEBOOK_CONTACT_NAME, '@addContactDropdownFirstResultFb');
  });

  test('Outbound Message from Facebook Channel', async (done) => {
    const contacts = client.page.ContactsPage();
    await contacts.sendOutboundMessageToFbContact(existingOrgFeeder.facebookOutboundMessage);
    done();
  });
});
