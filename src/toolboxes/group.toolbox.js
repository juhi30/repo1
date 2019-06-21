import { client } from 'nightwatch-api';

const group = client.page.GroupsPage();
const route = client.page.ChannelRouteMemberContainer();
const channel = client.page.ChannelsCreateEditPage();
const channelList = client.page.ChannelsPage();
const auditLogs = client.page.AuditLogsPage();

/**
 * Used to create Group of any type
 * @param  {Object} groupDetails Group details to be created
 * @param  {string} groupTypeOption Group type option radio element
 * @param {string} groupTypeListViewElement created group element on Group listing
 * @param {string} memberResultElement Member element to route with group on group creation page
 */
export async function createGroup(groupDetails, groupTypeOption, groupTypeListViewElement, routeDetails) {
  await group.navigate()
    .clickAddGroup()
    .selectGroupType(groupTypeOption)
    .addGroupDetails(groupDetails.name, groupDetails.purpose);

  await routeDetails.map(field => route.routeSearch('@memberInput', field.memberName, field.element));

  await group.createUpdateButton('@createGroupButton', '@groupCreateSuccessMessage')
    .checkGroupVisibilityOnList(groupTypeListViewElement)
    .waitForElementNotPresent('@groupCreateSuccessMessage');

  await auditLogs.navigate()
    .pause(2000)
    .validateAuditEntry(groupDetails.memberName, 'Group', 'Add', groupDetails.name, '@categoryGroup');
}

/**
 * Used to add channel and route group in that channel While editing group
 * @param  {Object} groupDetails Group details to be created
 * @param  {string} channelType Channel type to be created
 * @param {string} groupTypeListViewElement created group element on Group listing
 * @param {string} groupResultElement Group element to route with channel on channel creation page
 */
export async function addChannelRouteToGroup(groupDetails, groupListViewElement, channelType, groupResultElement) {
  await group.navigate()
    .openInEditMode(groupListViewElement)
    .addChannel()
    .pause(500)
    .verify.urlContains('channels', 'Channel Page is opened');

  await channelList.waitForElementVisible('@addChannelButton', 'Created Channel button is visible')
    .click('@addChannelButton');

  channel.selectChannelCategory(channelType)
    .channelDetails(groupDetails.channelName, groupDetails.purpose, groupDetails.timeZone);

  route.selectGroupRoute()
    .routeSearch('@groupInput', groupDetails.groupName, groupResultElement);

  await channel.createUpdateChannel('@createChannelButton', 'Create Channel button is visible')
    .checkSuccessMessage('@channelCreateSuccessMessage')
    .waitForElementNotPresent('@channelCreateSuccessMessage');
}

/**
 * Used to convert a group type into another group, enable availability hours toggle and change group name
 * @param  {Object} groupEditDetails Group details to be edited
 * @param  {string} editedGroupElement Group element that needs to be edited
 * @param {string} groupTypeListViewElement edited group element on Group listing
 */
export async function convertGroupTypeToAnotherGroupType(groupEditDetails, editedGroupElement, groupTypeListViewElement) {
  await group.navigate()
    .openInEditMode(editedGroupElement)
    .convertGroupType(groupEditDetails.newGroupType, groupEditDetails.newName, groupEditDetails.newPurpose);

  channel.enableDisableToggles('@availabilityHoursToggle')
    .pause(1000);
  group.selectTimezone()
    .createUpdateButton('@updateGroupButton', '@groupUpdateSuccessMessage')
    .checkGroupVisibilityOnList(groupTypeListViewElement)
    .waitForElementNotPresent('@groupUpdateSuccessMessage');

  await auditLogs.navigate()
    .pause(2000)
    .validateAuditEntry(groupEditDetails.memberName, 'Group', 'Add', groupEditDetails.newName, '@categoryGroup');
}

export async function routeGroupToChannel(groupListViewElement, channelNameElement, groupName, groupResultElement) {
  await group.navigate()
    .openInEditMode(groupListViewElement)
    .addChannel()
    .pause(500)
    .verify.urlContains('channels', 'Channel Page is opened');

  await channelList.waitForElementVisible('@addChannelButton', 'Create Channel button is visible')
    .channelEditMode(channelNameElement)
    .pause(500)
    .checkElementVisibility('@editChannel');
  route.selectGroupRoute()
    .routeSearch('@groupInput', groupName, groupResultElement);

  await channel.createUpdateChannel('@updateChannelButton', 'Update Channel button is visible')
    .checkSuccessMessage('@channelUpdateSuccessMessage')
    .waitForElementNotPresent('@channelUpdateSuccessMessage');
}

export async function verifyGroupDeletion(groupDetails, groupListViewElement, successMessage) {
  await group.navigate()
    .openInEditMode(groupListViewElement)
    .deleteGroup()
    .confirmDelete(successMessage);

  await auditLogs.navigate()
    .pause(2000)
    .validateAuditEntry(groupDetails.memberName, 'Group', 'Delete', groupDetails.name, '@categoryGroup');
}

export async function closeDeleteGroupModal(groupListViewElement) {
  await group.navigate()
    .openInEditMode(groupListViewElement)
    .deleteGroup()
    .closeGroupDeleteModal();
}
