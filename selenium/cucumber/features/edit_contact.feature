Feature: Editing a contact

Background:
  * pre-login-setup
  * I login with "keatontest" and "chacoZtan609"

Scenario: Editing a patient
  * I click the "Contacts" tab
  * I select the "Patient" filter
  * I click the first Contact
  * I click Edit Profile
  * I change the middle name to "Sampson"
  * I change the prefix
  * I change the suffix
  * I change the id
  * I click the "Save Contact" link

Scenario: Editing a member
  * I click the "Contacts" tab
  * I select the "Member" filter
  * I click the first Contact
  * I click Edit Profile
  * I change the middle name to "Samsonite"
  * I change the prefix
  * I change the suffix
  * I save the member changes
