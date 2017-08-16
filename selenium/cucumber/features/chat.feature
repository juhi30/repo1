Feature: Chatting

Scenario: Chatting a member and seeing it 
  * pre-login-setup
  * I login with "keatontest" and "chacoZtan609"
  * I click the "Chat" tab
  * I click New Chat and search for "Johnny Cash"
  * I select the result of chat search
  * I send a chat message with the current time and date
  * wait 1 second
  * pre-login-setup
  * I login with "jcash" and "hytikitattraction88"
  * I click the "Chat" tab
  * I click the first chat thread
  * I should see that chat