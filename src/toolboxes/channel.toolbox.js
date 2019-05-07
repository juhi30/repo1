import { client } from 'nightwatch-api';

const channel = client.page.ChannelsPage();
const channelCreateEdit = client.page.ChannelsCreateEditPage();

/**
 * Used to validate elements(page title and create channel button) on channel listing page
 */
export function validateChannelPageElements() {
  channel.navigate()
    .validateChannelsEls();
}

/**
 * Used to validate channel creation form fields
 * @param  {Object} channelType Channel type like: New Phone, Rhinosecure
 */
export function validateChannelCreationRequiredFields(channelType) {
  channelCreateEdit.navigate()
    .selectChannelCategory(channelType)
    .createUpdateChannel('@createChannelButton', 'Create Channel button is visible.')
    .waitForElementVisible('@channelNameValidation', 'Validation message for channel Name is visible')
    .verify.visible('@timezoneValidation', 'Validation message for TimeZone is visible')
    .verify.visible('@channelRouteValidation', 'validation message for Channel Route is visible');
}

/**
 * Used to create channel(New Phone/Rhinosecure)
 * @param  {string} channelType Channel type like: New Phone, Rhinosecure
 * @param  {object} channelData Data to create new Channel
 */
export function createChannel(channelType, channelData) {
  const route = client.page.ChannelRouteMemberContainer();

  channelCreateEdit.navigate()
    .validateCreateEls()
    .selectChannelCategory(channelType)
    .pause(2000);

  if (channelType === '@newPhoneType') {
    channelCreateEdit.addNumber(channelData.phoneNumber, channelData.forwardingNumber)
      .channelDetails(channelData.channelName, channelData.channelPurpose, channelData.timeZone);
  } else {
    channelCreateEdit.channelDetails(channelData.channelName, channelData.channelPurpose, channelData.timeZone);
  }

  route.routeSearch('@memberInput', channelData.memberFirstName, '@memberResult')
    .pause(2000);

  channelCreateEdit.createUpdateChannel('@createChannelButton', 'Create Channel button is visible.')
    .checkSuccessMessage('@channelCreateSuccessMessage');
}

/**
 * Used to edit channel details(enable toggles, channel name and channel purpose)
 * @param  {string} channelNameElement Channel element that needs to be edit
 * @param  {object} channelData Details that needs to be edit
 * @param  {array} enableToggles Toggles elements that needs to be enabled
 */
export async function editChannel(channelNameElement, channelData, enableToggles) {
  channel.navigate()
    .channelEditMode(channelNameElement)
    .pause(500)
    .checkElementVisibility('@editChannel');

  enableToggles.map(toggle => channelCreateEdit.enableDisableToggles(toggle));
  await channelCreateEdit.editChannelDetailsSection(channelData.channelName, channelData.channelPurpose)
    .createUpdateChannel('@updateChannelButton', 'update channel button is visible.')
    .checkSuccessMessage('@channelUpdateSuccessMessage')
    .waitForElementNotPresent('@channelUpdateSuccessMessage');
}

/**
 * Used to create tag by channel creation
 * @param  {string} editedChannelElement Channel element that needs to be edit
 * @param  {string} tagName Tag name that needs to be created
 */
export async function tagsCreationByChannelEdit(editedChannelElement, tagName) {
  channel.navigate()
    .channelEditMode(editedChannelElement)
    .pause(500)
    .checkElementVisibility('@editChannel');

  await channelCreateEdit.addTag(tagName, '@tagCategory')
    .pause(2000)
    .createUpdateChannel('@updateChannelButton', 'update channel button is visible.')
    .checkSuccessMessage('@channelUpdateSuccessMessage');
}

/**
 * Used to validate all web form related fields for new phone type channel
 * @param  {string} editedChannelElement Channel element that needs to be edit
 */
export async function validateWebFormFieldsByChannelEdit(editedChannelElement) {
  channel.navigate()
    .channelEditMode(editedChannelElement)
    .pause(500)
    .checkElementVisibility('@editChannel');

  await channelCreateEdit.webFormValidation('@formTitle')
    .webFormValidation('@titleSubtext')
    .webFormValidation('@phonePlaceholder')
    .webFormValidation('@phoneHelpText')
    .webFormValidation('@messagePlaceholder')
    .webFormValidation('@submitButton')
    .webFormValidation('@callToActionButton')
    .webFormValidation('@confirmationText')

    .createUpdateChannel('@updateChannelButton')

    .checkForValidation('@titleValidationMessage')
    .checkForValidation('@titleSubtextValidation')
    .checkForValidation('@phonePlaceholderMessage')
    .checkForValidation('@phoneHelpTextMessage')
    .checkForValidation('@messagePlaceholderValidation')
    .checkForValidation('@buttonTitleMessage')
    .checkForValidation('@actionButtonTitleMessage')
    .checkForValidation('@confirmationTextMessage');
}

/**
 * Used to update web form fields by channel edition
 * @param  {string} editedChannelElement Channel element that needs to be edit
 * @param  {array} webFormFields Web form fields that needs to be updated like: [{element: element, value: value}]
 */
export async function updateWebFormFieldsByChannelEdit(editedChannelElement, webFormFields) {
  channel.navigate()
    .channelEditMode(editedChannelElement)
    .pause(500)
    .checkElementVisibility('@editChannel');

  webFormFields.map(field => channelCreateEdit.updateWebForm(field.element, field.value));
  await channelCreateEdit.pause(2000)
    .waitForElementVisible('@updateChannelButton', 'update button is visible')
    .click('@updateChannelButton');
}

/**
 * Used to delete Channel
 * @param  {string} deletedChannelElement Channel element that needs to be deleted
 */
export async function deleteChannel(deletedChannelElement) {
  channel.navigate()
    .channelEditMode(deletedChannelElement)
    .pause(500)
    .checkElementVisibility('@editChannel');

  await channelCreateEdit.deleteChannels()
    .pause(2000);
}
