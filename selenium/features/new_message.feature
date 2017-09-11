Feature: New Message Functionality
  As a Member
  I should new message a patient
  I click on patient name popup
  And I transfer to patient communication window

Scenario: New message search by patient name
  * I login with "gma" and "123456"
  * I click New Message
  * I search New Message for "Tony"
  * I should see "Tony Robbins"
  * I click first result of New Message search

Scenario: Logging out
  * I logout
