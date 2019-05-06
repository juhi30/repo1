
import { client } from 'nightwatch-api';

const channelFeeder = require('../../toolboxes/feeder/channel.feeder');
const groupFeeder = require('../../toolboxes/feeder/group.feeder');
const memberFeeder = require('../../toolboxes/feeder/member.feeder');

describe(' Automated Test Cases - Groups', () => {
  const group = client.page.GroupsPage();
  const route = client.page.ChannelRouteMemberContainer();
  const entry = client.page.AuditLogsPage();
  const channel = client.page.ChannelsCreateEditPage();
  const channelList = client.page.ChannelsPage();

  test('Create Groups - Patient Type', async () => {
    await group.navigate()
      .verifyGroupEls()
      .selectGroupType('@patientOption')
      .addGroupDetails(groupFeeder.patientTypeGroup, groupFeeder.purpose);

    route.routeSearch('@memberInput', memberFeeder.memberName, '@memberResult');

    group.createUpdateButton('@createGroupButton', '@groupCreateSuccessMessage')
      .checkGroupVisibility('@patientGroup', '@patientGroupListView');

    await entry.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Group', 'Add', groupFeeder.patientTypeGroup);
  });

  test('Add Channel Routes to patient Type Group', async () => {
    await group.navigate()
      .openInEditMode('@patientGroupListView')
      .addChannel()
      .pause(500)
      .verify.urlContains('channels', 'Channel Page is opened');

    channelList.waitForElementVisible('@addChannelButton', 'Created Channel button is visible')
      .click('@addChannelButton');

    channel.selectChannelCategory('@rhinoSecureType')
      .channelDetails(groupFeeder.patientGroupChannel, groupFeeder.newGroupPurpose, channelFeeder.timeZone);

    route.selectGroupRoute()
      .routeSearch('@groupInput', groupFeeder.patientTypeGroup, '@patientGroupResult');

    channel.createUpdateChannel('@createChannelButton', 'Create Channel button is visible')
    // .pause(1000)
      .checkSuccessMessage('@channelCreateSuccessMessage');
  });

  test('Create Group - Team Type', async () => {
    await group.navigate()
      .verifyGroupEls()
      .selectGroupType('@teamOption')
      .addGroupDetails(groupFeeder.teamTypeGroup, groupFeeder.purpose);

    await route.routeSearch('@memberInput', memberFeeder.memberName, '@memberResult');

    await group.createUpdateButton('@createGroupButton', '@groupCreateSuccessMessage')
      .checkGroupVisibility('@teamGroup', '@teamGroupListView');

    await entry.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Group', 'Add', groupFeeder.teamTypeGroup);
  });

  test('Create Group - Patient And Team Type', async () => {
    await group.navigate()
      .verifyGroupEls()
      .selectGroupType('@patientAndTeamOption')
      .addGroupDetails(groupFeeder.patientAndTeamType, groupFeeder.purpose);

    route.routeSearch('@memberInput', memberFeeder.memberName, '@memberResult');

    group.createUpdateButton('@createGroupButton', '@groupCreateSuccessMessage')
      .checkGroupVisibility('@patientAndTeamGroup_PatientInbox', '@patientAndTeamGroupListView')
      .checkGroupVisibility('@patientAndTeamGroup_TeamInbox', '@patientAndTeamGroupListView');

    await entry.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Group', 'Add', groupFeeder.patientAndTeamType);
  });

  test('Convert Patient Group to Patient and team type Group', async () => {
    await group.navigate()
      .openInEditMode('@patientGroupListView')
      .convertGroupType('@patientAndTeamOption', groupFeeder.updatedPatientTypeGroup, groupFeeder.newGroupPurpose);

    channel.enableDisableToggles('@availabilityHoursToggle')
      .pause(2000);
    group.selectTimezone()

      .createUpdateButton('@updateGroupButton', '@groupUpdateSuccessMessage')
      .checkGroupVisibility('@updatedPatientGroup_PatientInbox', '@updatedPatientGroup_ListView')
      .checkGroupVisibility('@updatedPatientGroup_TeamInbox', '@updatedPatientGroup_ListView');

    await entry.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Group', 'Edit', groupFeeder.updatedPatientTypeGroup);
  });

  test('Convert Team Group to Patient and team type Group', async () => {
    await group.navigate()
      .openInEditMode('@teamGroupListView')
      .convertGroupType('@patientAndTeamOption', groupFeeder.updatedTeamTypeGroup, groupFeeder.newGroupPurpose);

    channel.enableDisableToggles('@availabilityHoursToggle')
      .pause(2000);
    group.selectTimezone()

      .createUpdateButton('@updateGroupButton', '@groupUpdateSuccessMessage')
      .checkGroupVisibility('@updatedTeamGroup_PatientInbox', '@updatedTeamGroup_ListView')
      .checkGroupVisibility('@updatedTeamGroup_TeamInbox', '@updatedTeamGroup_ListView');

    await entry.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Group', 'Edit', groupFeeder.updatedTeamTypeGroup);
  });

  // test('Add Channel Routes to Patient And Team Type Group', async () => {
  //     await group.navigate()
  //         .pause(500)
  //         .openInEditMode('@patientAndTeamGroupListView')
  //         .addChannel()
  //         .pause(500)
  //         .verify.urlContains('channels', 'Channel Page is opened')

  //     channelList.waitForElementVisible('@addChannelButton', 'Created Channel button is visible')
  //         .click('@addChannelButton')

  //     channel.selectChannelCategory('@rhinoSecureType')
  //         .channelDetails(groupFeeder.patientAndTeamGroupChannel, groupFeeder.newGroupPurpose, channelFeeder.timeZone)

  //     route.selectGroupRoute()
  //         .routeSearch('@groupInput', groupFeeder.patientAndTeamType, '@patientAndTeamGroupResult')

  //     channel.createUpdateChannel('@createChannelButton', 'Create Channel button is visible')
  //         .pause(1000)
  //         .checkSuccessMessage('@channelCreateSuccessMessage')
  // });
});
