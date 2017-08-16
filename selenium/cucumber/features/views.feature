Feature: Viewing areas of the app

Background:
  * pre-login-setup
  * I login with "keatontest" and "chacoZtan609"

Scenario: Seeing the inbox page
  * I should see "Inbox"
  * I should see "New Message"

Scenario: Seeing the chat page
  * I click the "Chat" tab
  * I should see "New Chat"

Scenario: Seeing the contacts page
  * I click the "Contacts" tab
  * I should see "Add Contact"

Scenario: Seeing the My Profile page
  * I navigate to Settings: Profile
  * I should see "My Profile"
  * I should see "Office Location Assignment"

Scenario: Seeing the Organization page
  * I navigate to Settings: Organization
  * I should see "Organization Profile"
  * I should see "Organization Name"

Scenario: Seeing the Preferences page
  * I navigate to Settings: Preferences
  * I should see "Sounds On"
  * I should see "Sounds Off"

Scenario: Seeing the Locations page
  * I navigate to Settings: Locations
  * I should see "Add Location"

Scenario: Seeing the Channels page
  * I navigate to Settings: Channels
  * I should see "Here you can add and edit channels, giving your team and your patients more ways to communicate."
  ## * I should see "Add Channel"
  ## * I should see "Edit"

Scenario: Seeing the Auto-Response page
  * I navigate to Settings: Auto-Response
  * I should see "Schedule Event"
  * I should see "Auto-Response"

Scenario: Seeing the Members page
  * I navigate to Settings: Members
  * I should see "Add Member"
  * I should see "Edit"
