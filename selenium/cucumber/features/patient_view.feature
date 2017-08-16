Feature: Viewing the app as a patient

Scenario: Logging in as a patient
  * pre-login-setup
  * I login with "bhill" and "thatsmypurse"
  ## * I click the "Login" link
  * I send a secure message to the practice
  * I click the "Logout" link