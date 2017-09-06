Feature: Search Functionality
  As a member
  I should be able to search for people 
  And those people show up  

Scenario: Searching by first name (patient)
  * I navigate to "https://dev.dev-rhinogram.com"
  * I login with "kfoster" and "chacoz"
  * I click Search
  * I search for "Tony"
  * I should see "Tony Robbins"

Scenario: Searching by last name
  * I search for "Robbins"
  * I should see "Tony Robbins"

Scenario: Searching by phone number
  * I search for "803"
  * I should see "Tony Robbins"

Scenario: Searching by patient ID
  * I search for "#tk-421"
  * I should see "Tony Robbins"

Scenario: Searching an other
  * I search for "Jay"
  * I should see "Jay Jeffers"

Scenario: Searching a connected party
  * I search for "Nameth"
  * I should see "Nameth Joenson"

Scenario: Searching an unknown
  * I search for "Thomas"
  * I should see "Thomas Foster"