Feature: Toggling the Business Hours of a Channel on/off

Scenario: Toggling Biz Hours On
  * pre-login-setup
  * I login with "keatontest" and "chacoZtan609"
  * I navigate to Settings: Channels
  * I click the Edit Channel button
  * I toggle the Business Hours "on"
  * I click the Save Channel button
  * I should see "Channel updated successfully."

  Scenario: Toggling Biz Hours Off
  * pre-login-setup
  * I login with "keatontest" and "chacoZtan609"
  * I navigate to Settings: Channels
  * I click the Edit Channel button
  * I toggle the Business Hours "off"
  * I click the Save Channel button
  * I should see "Channel updated successfully."