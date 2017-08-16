Feature: Using invalid login creds

Background:
  * pre-login-setup

Scenario: Valid username with invalid password
  * I login with "keatontest" and "nottherightpassword"
  * I should see "Username and password did not match"

Scenario: Invalid username and password
  * I login with "jellyfwish" and "tasteslikechicken"
  * I should see "Username and password did not match"
