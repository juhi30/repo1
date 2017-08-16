Feature: Adding Contacts

Background:
  * pre-login-setup
  * I login with "keatontest" and "chacoZtan609"
  * I click the "Contacts" tab
  * I click the Add Contact button and Add New Contact

Scenario: Adding a Patient
  * I change the first name to "Janiffer"
  * I change the last name to "Stancil"
  * I submit a contact creation form
  * I should see "Birthday is required for all patients"
  * I select November as the month
  * I select 18 as the day 
  * I select 1913 as the year
  * I submit a contact creation form
  * I should see a success toast

Scenario: Adding an Other
  * I select Other as the type
  * I change the first name to "Thomis"
  * I change the last name to "Rhobbins"
  * I submit a contact creation form
  * I should see a success toast