import { sendADirectMessage , verifyReceivingMessage} from '../../toolboxes/messaging.toolbox';

const memberFeeder = require('../../feeder/member.feeder');
const messageFeeder = require('../../feeder/message.feeder');

describe('Messaging Tests', () => {
  test('Sending a Direct chat message from member2 to member1', async () => {

    await sendADirectMessage('@modalTitle', memberFeeder.memberName, messageFeeder.directChatMessage);
  });

  test('Verify if message is received by Member1', async () => {
    
    await verifyReceivingMessage(messageFeeder.directChatMessage)
  });
});