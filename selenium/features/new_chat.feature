Feature: New Chat Functionality
  as a Member
  I should be able to start a New Chat
  only with other Members

Scenario: Searching for a Member by first name
  * I login with "gma" and "123456"
  * I navigate to "https://dev.dev-rhinogram.com/chat"
  * I click New Chat
  * I search for "Keaton"
  * I should see "Keaton Foster"

Scenario: Searching for a Member by last name
  * I search for "Foster"
  * I should see "Keaton Foster"

Scenario: Searching for User by first name
  * I search for "Geoff"
  * I should not see "Geoff Maas"

Scenario: Searching for User by last name
  * I search for "Maas"
  * I should not see "Geoff Maas"
