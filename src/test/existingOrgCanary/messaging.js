import { client } from 'nightwatch-api';
import { memberLogin } from '../../toolboxes/login.toolbox';
import * as messengerBot from '../../services/MessengerBot.service';

const existingOrgFeeder = require('../../feeder/existingOrg.feeder');

describe('Existing org canary: messaging tests', () => {
  test('Existing Org Canary Page Login With Member', async () => {
    const login = client.page.LoginPage();
    await memberLogin(existingOrgFeeder.memberUsernameExistingOrg, existingOrgFeeder.memberPasswordExistingOrg);
    // Below lines have been added to by pass confirm email modal
    await login.clickUpdateLaterOnEmailModal();
  });

  test('Send Outbound Message To Contact and Get Reply', async () => {
    const contacts = client.page.ContactsPage();
    const universal = client.page.UniversalElements();

    await universal.clickContacts()
      .pause(500);
    await contacts.openContactChat('@addContactDropdownFirstResultBot')
      .pause(1000)
      .sendOutboundMessageAndGetReply(`handler add reply ${existingOrgFeeder.testBotReplyMessage}`, 'Hi Bot Contact');
  });

  test('configure forward handler for bot contact to get inbound message', async (done) => {
    const config = {
      number: process.env.EXISTING_ORG_BANDWIDTH_NUMBER_PATIENT,
      config: { handler: 'forward', config: [process.env.EXISTING_ORG_BANDWIDTH_CHANNEL_NUMBER] },
    };

    messengerBot.configureHandler(config).then(async () => {
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
    messengerBot.sendMessage(config).then(async () => {
      await contacts.getInboundMessage(existingOrgFeeder.testBotInboundMessage);
      done();
    });
  });

  test('Search Facebook Unknown Contact', async () => {
    const contacts = client.page.ContactsPage();
    const universal = client.page.UniversalElements();

    await universal.clickContacts()
      .pause(500);
    await contacts.openContactChat('@addContactDropdownFirstResultFb')
      .pause(1000);
  });

  test('Outbound Message from Facebook Channel', async (done) => {
    const contacts = client.page.ContactsPage();
    await contacts.sendOutboundMessageToFbContact(existingOrgFeeder.facebookOutboundMessage);
    done();
  });
});
