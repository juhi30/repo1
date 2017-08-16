Feature: Toggling Sound

Background:
  * pre-login-setup
  * I login with "keatontest" and "chacoZtan609"
  * I navigate to Settings: Preferences

Scenario: Toggle On and Save
  * I toggle sound "on"
  * I save the new preferences
  * I should see "Organization updated successfully"
 
Scenario: Toggle Off and Save
  * I toggle sound "off"
  * I save the new preferences
  * I should see "Organization updated successfully"