Feature: New Chat Functionality
  as a Member
  I should be able to start a New Chat
  only with other Members

Scenario: Searching for a Member by first name
  * I login with "gma" and "123456"
  * I click Chat tab
  * I click New Chat
  * I search Chat for "Keaton"
  * I should see "Keaton Foster"

Scenario: Searching for a Member by last name
  * I search Chat for "Foster"
  * I should see "Keaton Foster"

#should not see is too broad and catching the user on the DOM

Scenario: Searching for User by first name
  * I search Chat for "Geoff"
  * I should not see "Geoff Maas"

Scenario: Searching for User by last name
  * I search Chat for "Maas"
  * I should not see "Geoff Maas" in Chat Search

Scenario: Logging out
  * I logout
