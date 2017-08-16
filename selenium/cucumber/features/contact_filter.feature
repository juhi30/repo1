Feature: Contact Filtering


Scenario: Using the filters
  * pre-login-setup
  * I login with "keatontest" and "chacoZtan609"
  * I click the "Contacts" tab
  * I select the "Patient" filter
  * I click the first Contact
  * They should be a "Patient" type
  * I select the "Member" filter
  * I click the first Contact
  * They should be a "Member" type
  * I select the "Connected party" filter
  * I click the first Contact
  * They should be a "Connected party" type
  * I select the "Unknown" filter
  * I click the first Contact
  * They should be a "Unknown" type
  * I select the "Other" filter
  * I click the first Contact
  * They should be a "Other" type