Feature: Logging out

Background:
  Given I navigate to "https://dev.dev-rhinogram.com"
 
Scenario: Logging out
  Given I login with "tonton" and "chacoz"
  Then I logout