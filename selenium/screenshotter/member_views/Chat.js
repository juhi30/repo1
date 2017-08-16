const ChatPage = require('../../page_elements/ChatPage');
const Contacts = require('./Contacts');
const webdriver = require('selenium-webdriver');

const promise = webdriver.promise;
const flow = promise.controlFlow();

function Chat(driver, by, waitFor) {
  flow.execute(() => driver.get('https://dev.dev-rhinogram.com/chat'));
  flow.execute(() => waitFor(ChatPage.newChatButton, Contacts));
  flow.execute(() => driver.saveScreenshot('chat_0'));
  flow.execute(() => ChatPage.newChatButton.find(driver, by).click());
  flow.execute(() => waitFor(ChatPage.newChatSearchInput, Contacts));
  flow.execute(() => ChatPage.newChatSearchInput.find(driver, by).sendKeys('Johnny'));
  flow.execute(() => driver.saveScreenshot('chat_1'));
  flow.execute(() => waitFor(ChatPage.newChatSearchResult, Contacts));
  flow.execute(() => driver.saveScreenshot('chat_2'));
  flow.execute(() => ChatPage.newChatSearchResult.find(driver, by).click());
  flow.execute(() => waitFor(ChatPage.chatMessageInput, Contacts));
  flow.execute(() => driver.saveScreenshot('chat_3'));
  flow.execute(() => ChatPage.chatMessageInput.find(driver, by).sendKeys('A recent MIT study suggests that if ants were able to speak English, it wouldn\'t affect the stereotype that suggests gorillas love bananas.'));
  flow.execute(() => driver.sleep(1000));
  flow.execute(() => ChatPage.sendMessageButton.find(driver, by).click());
  flow.execute(() => driver.saveScreenshot('chat_4'));
  flow.execute(() => Contacts(driver, by, waitFor));
}

module.exports = Chat;
