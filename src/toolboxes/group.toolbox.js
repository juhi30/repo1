import { client } from 'nightwatch-api';

const group = client.page.GroupsPage();
const route = client.page.ChannelRouteMemberContainer();
const channel = client.page.ChannelsCreateEditPage();
const channelList = client.page.ChannelsPage();
const universal = client.page.UniversalElements();
const auditLogs = client.page.AuditLogsPage();

/**
 * Used to create Group of any type
 * @param  {Object} groupDetails Group details to be created
 * @param  {string} groupTypeOption Group type option radio element
 * @param {string} groupTypeListViewElement created group element on Group listing
 * @param {string} memberResultElement Member element to route with group on group creation page
 */
export async function createGroup(groupDetails, groupTypeOption, groupTypeListViewElement, memberResultElement) {
  await group.navigate()
    .clickAddGroup()
    .selectGroupType(groupTypeOption)
    .addGroupDetails(groupDetails.name, groupDetails.purpose);

  route.routeSearch('@memberInput', groupDetails.memberName, memberResultElement);

  group.createUpdateButton('@createGroupButton', '@groupCreateSuccessMessage')
    .checkGroupVisibilityOnList(groupTypeListViewElement)
    .waitForElementNotPresent('@groupCreateSuccessMessage');

  await universal.clickAuditLogs();
  await auditLogs.validateAuditEntry(groupDetails.memberName, 'Group', 'Add', groupDetails.name);
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
    .routeSearch('@groupInput', groupDetails.groupType, groupResultElement);

  await channel.createUpdateChannel('@createChannelButton', 'Create Channel button is visible')
    // .pause(1000)
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

  await universal.clickAuditLogs();
  await auditLogs.validateAuditEntry(groupEditDetails.memberName, 'Group', 'Add', groupEditDetails.newName);
}
