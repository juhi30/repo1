import { client } from 'nightwatch-api';
import * as rhinoapi from '../services/Rhinoapi.service';

const channelFeeder = require('../feeder/channel.feeder');

const channel = client.page.ChannelsPage();
const channelCreateEdit = client.page.ChannelsCreateEditPage();

/**
 * Used to validate elements(page title and create channel button) on channel listing page
 */
export async function validateChannelPageElements() {
  await channel.navigate()
    .validateChannelsEls();
}

/**
 * Used to validate channel creation form fields
 * @param  {Object} channelType Channel type like: New Phone, Rhinosecure
 */
export async function validateChannelCreationRequiredFields(channelType) {
  await channelCreateEdit.navigate()
    .selectChannelCategory(channelType)
    .createUpdateChannel('@createChannelButton', 'Create Channel button is visible.')
    .waitForElementVisible('@channelNameValidation', 'Validation message for channel Name is visible')
    .waitForElementVisible('@timezoneValidation', 'Validation message for TimeZone is visible')
    .waitForElementVisible('@channelRouteValidation', 'validation message for Channel Route is visible');
}

/**
 * Used to create channel(New Phone/Rhinosecure)
 * @param  {string} channelType Channel type like: New Phone, Rhinosecure
 * @param  {object} channelData Data to create new Channel
 */
export async function createChannel(channelType, channelData, routeMember) {
  const route = client.page.ChannelRouteMemberContainer();

  await channelCreateEdit.navigate()
    .validateCreateEls()
    .selectChannelCategory(channelType)
    .pause(2000);

  if (channelType === '@newPhoneType') {
    channelCreateEdit.addNumber(channelData.phoneNumber, channelData.forwardingNumber)
      .channelDetails(channelData.channelName, channelData.channelPurpose, channelData.timeZone);
  } else {
    channelCreateEdit.channelDetails(channelData.channelName, channelData.channelPurpose, channelData.timeZone);
  }

  route.routeSearch('@memberInput', channelData.memberFirstName, routeMember)
    .pause(2000);

  channelCreateEdit.createUpdateChannel('@createChannelButton', 'Create Channel button is visible.')
    .checkSuccessMessage('@channelCreateSuccessMessage')
    .waitForElementNotPresent('@channelCreateSuccessMessage');
}

/**
 * Used to edit channel details(enable toggles, channel name and channel purpose)
 * @param  {string} channelNameElement Channel element that needs to be edit
 * @param  {object} channelData Details that needs to be edit
 * @param  {array} enableToggles Toggles elements that needs to be enabled
 */
export async function editChannel(channelNameElement, channelData, enableToggles) {
  await channel.navigate()
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
  await channel.navigate()
    .channelEditMode(editedChannelElement)
    .pause(500)
    .checkElementVisibility('@editChannel');

  await channelCreateEdit.addTag(tagName, '@tagCategory')
    .waitForElementNotPresent('@tagNameInput')
    .createUpdateChannel('@updateChannelButton', 'update channel button is visible.')
    .checkSuccessMessage('@channelUpdateSuccessMessage')
    .waitForElementNotPresent('@channelUpdateSuccessMessage');
}

/**
 * Used to validate all web form related fields for new phone type channel
 * @param  {string} editedChannelElement Channel element that needs to be edit
 */
export async function validateWebFormFieldsByChannelEdit(editedChannelElement) {
  await channel.navigate()
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
  await channel.navigate()
    .channelEditMode(editedChannelElement)
    .pause(500)
    .checkElementVisibility('@editChannel');

  webFormFields.map(field => channelCreateEdit.updateWebForm(field.element, field.value));
  await channelCreateEdit.pause(2000)
    .waitForElementVisible('@updateChannelButton', 'update button is visible')
    .click('@updateChannelButton')
    .checkSuccessMessage('@channelUpdateSuccessMessage')
    .waitForElementNotPresent('@channelUpdateSuccessMessage');
}

/**
 * Used to delete Channel
 * @param  {string} deletedChannelElement Channel element that needs to be deleted
 */
export async function deleteChannel(deletedChannelElement) {
  await channel.navigate()
    .channelEditMode(deletedChannelElement)
    .pause(500)
    .checkElementVisibility('@editChannel');

  await channelCreateEdit.deleteChannels()
    .pause(2000);
}

export async function verifyAlertMessagesAddonChannels(alertMessage, channelType) {
  await channel.addChannel();

  await channelCreateEdit.selectChannelCategory(channelType)
    .verifyChannelAlerts(alertMessage);
}

export async function verifyAlertDeletingChannel(deletedChannelElement, alertMessage) {
  await channel.channelEditMode(deletedChannelElement);

  await channelCreateEdit.waitForElementVisible('@editChannelPageTitle', 'Channel Opened in edit Mode.')
    .waitForElementVisible('@deleteChannelButton', 'Delete Channel Button is visible')
    .click('@deleteChannelButton')
    .verifyChannelAlerts(alertMessage)
    .waitForElementVisible('@confirmDeleteChannel', 'confirm delete button is visible')
    .click('@confirmDeleteChannel')
    .waitForElementVisible('@deleteChannelSuccessMessage', 'Channel Deleted Successfully')
    .waitForElementNotPresent('@deleteChannelSuccessMessage', 'Delete Success Message is no longer visible.');
}

export async function editChannelRoute(channelNameElement, channelData) {
  await channel.navigate()
    .channelEditMode(channelNameElement)
    .pause(500)
    .checkElementVisibility('@editChannel');

  await channelCreateEdit.editChannelDetailsSection(channelData.channelName, channelData.channelPurpose)
    .createUpdateChannel('@updateChannelButton', 'update channel button is visible.')
    .checkSuccessMessage('@channelUpdateSuccessMessage')
    .waitForElementNotPresent('@channelUpdateSuccessMessage');
}

export async function createBWChannelSkipProvision(ccrLogin, organizationId, userSearchDetails) {
  try {
    const orgId = parseInt(organizationId, 10);
    const ccrCookie = await rhinoapi.login(ccrLogin.userName, ccrLogin.password);
    const ccrUserId = await rhinoapi.getCcrUserId(ccrCookie);
    await rhinoapi.changeOrganization({ orgId, userId: ccrUserId }, ccrCookie);
    const members = await rhinoapi.searchMemberOrContact(userSearchDetails.userName, userSearchDetails.userType, ccrCookie);
    const channelData = {
      name: channelFeeder.channelName,
      purpose: channelFeeder.channelPurpose,
      typeId: 10, // sms channel type
      timeZoneId: 1,
      observesDst: true,
      details: {
        phone: {
          value: process.env.NEW_CANARY_PROVISIONED_BW_CHANNEL_NUMBER,
          typeId: 3,
        },
        forwardingPhone: {
          value: '+15555555555',
          typeId: 3,
        },
        bandwidthNumberId: process.env.NEW_CANARY_PROVISIONED_BW_CHANNEL_NUMBER,
      },
      tagIds: [],
      route: {
        userId: members[0].id,
        groupId: null,
      },
      autoResponse: 'nah',
    };

    await rhinoapi.postProvisionedChannel(channelData, ccrCookie);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('===error while creating BW channel skip provision=======', err);
  }
}
