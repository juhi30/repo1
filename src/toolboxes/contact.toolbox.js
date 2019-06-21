import { client } from 'nightwatch-api';

const contact = client.page.ContactsPage();
const chat = client.page.DirectChatInboxPage();
const route = client.page.ChannelRouteMemberContainer();

export async function createContact(contactDetails, contactTypeElement) {
  await contact.navigate()
    .verify.urlContains('contacts', 'Contact Page is opened')
    .clickAddContact()
    .clickAddNewContact();

  await client.url(`${process.env.APP_URL}/contacts/create`);
  await contact.waitForElementVisible('@contactCreatePageTitle', 'New Contact setup page is open')
    .selectRadioOption(contactTypeElement);
  contactDetails.map(field => contact.enterDetails(field.element, field.value));
  await contact.selectRadioOption('@genderOption')
    .clickCreateUpdateContact('@createNewContactButton', '@createSuccessMessage')
    .waitForElementNotPresent('@createSuccessMessage', 'Success message is gone');
}

export async function convertContactTypeAddNumberEmail(editedContactElement, newContactType, contactDetails, contactOtherDetails) {
  await contact.navigate()
    .verify.urlContains('contacts', 'Contact Page is opened')
    .contactEditMode(editedContactElement)
    .pause(500)
    .checkElementVisibility('@editProfileButton')
    .selectRadioOption(newContactType);
  contactDetails.map(field => contact.editContactDetails(field.element, field.value));
  contactOtherDetails.map(field => contact.addPhoneNumberEmail(field.linkElement, field.inputFieldElement, field.value));
  await contact.clickCreateUpdateContact('@updateContactButton', '@editSuccessMessage')
    .waitForElementNotPresent('editSuccessMessage', 'Success message is gone');
}

export async function uploadPhoto(editedContactElement) {
  await contact.navigate()
    .verify.urlContains('contacts', 'Contact Page is opened')
    .contactEditMode(editedContactElement)
    .pause(500)
    .checkElementVisibility('@editProfileButton')
    .addUpdatePhoto();
}

export async function addConnectedPartyToContact(editedContactElement, connectedPartyDetails,
  addedConnectedPartyElement, connectedPartySummaryElement, relationshipSummaryElement, relation) {
  await contact.navigate()
    .verify.urlContains('contacts', 'Contact Page is opened')
    .contactEditMode(editedContactElement)
    .pause(500)
    .checkElementVisibility('@editProfileButton')
    .click('@addConnectedPartyButton')
    .clickCreateNewContact();
  connectedPartyDetails.map(fields => contact.enterDetails(fields.element, fields.value));

  await contact.clickCreateUpdateContact('@createNewContactButton', '@createSuccessMessage')
    .waitForElementVisible(addedConnectedPartyElement, 'Added connected party is visible in connected party section')
    .pause(1000)
    .clickCreateUpdateContact('@updateContactButton', '@editSuccessMessage')
    .waitForElementNotPresent('@editSuccessMessage', 'Success message is gone')
    .verifyAddedConnectedParty(connectedPartySummaryElement, relationshipSummaryElement, relation);
}

export async function updateConnectedPartyRelationWithContact(editedContactElement, newRelation, connectedPartySummaryElement, relationshipSummaryElement, relation) {
  await contact.navigate()
    .verify.urlContains('contacts', 'Contact Page is opened')
    .contactEditMode(editedContactElement)
    .pause(500)
    .checkElementVisibility('@editProfileButton')
    .enterDetails('@connectionTypeInput', newRelation)
    .clickCreateUpdateContact('@updateContactButton', '@editSuccessMessage')
    .verifyAddedConnectedParty(connectedPartySummaryElement, relationshipSummaryElement, relation);
}

export async function removeConnectedParty(editedContactElement) {
  await contact.navigate()
    .verify.urlContains('contacts', 'Contact Page is opened')
    .contactEditMode(editedContactElement)
    .pause(500)
    .checkElementVisibility('@editProfileButton')
    .click('@removeConnectedPartyButton')
    .clickCreateUpdateContact('@updateContactButton', '@editSuccessMessage')
    .waitForElementNotPresent('@editSuccessMessage', 'Success message is gone');
}

export async function searchContact(searchText, searchResultElement) {
  await contact.navigate()
    .searchForContact(searchText, searchResultElement);
}

export async function deleteContact(deletedContactElement) {
  await contact.navigate()
    .deleteContact(deletedContactElement);
}

export async function enableContactForwarding(contactName, searchInputField, assigneeName) {
  await contact.navigate()
    .verify.urlContains('contacts', 'Contact Page is opened')
    .contactEditMode(contactName)
    .pause(500)
    .clickForwadingToggle();
  await route.selectGroupRoute();
  await chat.selectMemberAndGroup(searchInputField, assigneeName);
  await contact.clickCreateUpdateContact('@updateContactButton', '@editSuccessMessage');
}
