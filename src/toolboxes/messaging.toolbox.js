import { client } from 'nightwatch-api';

const chat = client.page.DirectChatInboxPage();
const helpers = require('../toolboxes/helpers.toolbox');

/**
 * Used to send messages to a Patent or Member
 */

export async function sendADirectMessage(titleElement, memberName, text) {
    await chat.navigate()
    //verify url check
        .clickAddIcon()
        .searchMemberAndOpenchatThread(titleElement, memberName)
        .fillInMessageInput(text)
        .pause(1000)
        .clickSendMessageButton()
        .pause(5000)
}

export async function verifyReceivingMessage(text) {
    await chat.navigate()
    // add verify url check
    helpers.findTextOnPage(chat, text);
}