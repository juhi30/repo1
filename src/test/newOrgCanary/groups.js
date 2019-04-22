import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');
const group = client.page.GroupsPage();
const route = client.page.ChannelRouteMemberContainer();
const entry = client.page.AuditLogsPage();
const channel = client.page.ChannelsCreateEditPage();

describe(' Automated Test Cases - Groups', () => {

    test('Create Groups - Patient Type', async () => {

        await group.navigate()
            .verifyGroupEls()
            .selectGroupType('@patientOption')
            .addGroupDetails(testConstants.patientTypeGroup, testConstants.purpose)

        await route.routeSearch('@memberInput', testConstants.memberName, '@memberResult')

        await group.createUpdateButton('@createGroupButton', '@groupCreateSuccessMessage')
            .checkGroupVisibility('@patientGroup', '@patientGroupListView')

        await entry.navigate()
            .validateAuditEntry(testConstants.memberName, 'Group', 'Add', testConstants.patientTypeGroup)

    });

    test('Add Channel Routes to patient Type Group', async () => {
        await group.navigate()
            .openInEditMode('@patientGroupListView')
            .addChannel()

        await channel.navigate()
            .selectChannelCategory('@rhinoSecureType')
            .channelDetails(testConstants.patientGroupChannel, testConstants.newGroupPurpose, testConstants.timeZone)

        await route.selectGroupRoute()
            .routeSearch('@groupInput', testConstants.patientTypeGroup, '@patientGroupResult')

        await channel.createUpdateChannel('@createChannelButton', 'Create Channel button is visible')
            .pause(1000)
            .checkSuccessMessage('@channelCreateSuccessMessage')
    });

    test('Create Group - Team Type', async () => {
        await group.navigate()
            .verifyGroupEls()
            .selectGroupType('@teamOption')
            .addGroupDetails(testConstants.teamTypeGroup, testConstants.purpose)

        await route.routeSearch('@memberInput', testConstants.memberName, '@memberResult')

        await group.createUpdateButton('@createGroupButton', '@groupCreateSuccessMessage')
            .checkGroupVisibility('@teamGroup', '@teamGroupListView')

        await entry.navigate()
            .validateAuditEntry(testConstants.memberName, 'Group', 'Add', testConstants.teamTypeGroup)
    });

    test('Create Group - Patient And Team Type', async () => {
        await group.navigate()
            .verifyGroupEls()
            .selectGroupType('@patientAndTeamOption')
            .addGroupDetails(testConstants.patientAndTeamType, testConstants.purpose)

        await route.routeSearch('@memberInput', testConstants.memberName, '@memberResult')

        await group.createUpdateButton('@createGroupButton', '@groupCreateSuccessMessage')
            .checkGroupVisibility('@patientAndTeamGroup_PatientInbox', '@patientAndTeamGroupListView')
            .checkGroupVisibility('@patientAndTeamGroup_TeamInbox', '@patientAndTeamGroupListView')

        await entry.navigate()
            .validateAuditEntry(testConstants.memberName, 'Group', 'Add', testConstants.patientAndTeamType)
    });

    test('Convert Patient Group to Patient and team type Group', async () => {
        await group.navigate()
            .openInEditMode('@patientGroupListView')
            .convertGroupType('@patientAndTeamOption', testConstants.updatedPatientTypeGroup, testConstants.newGroupPurpose)

        await channel.enableDisableToggles('@availabilityHoursToggle')
            .pause(2000)
        await group.selectTimezone()

            .createUpdateButton('@updateGroupButton', '@groupUpdateSuccessMessage')
            .checkGroupVisibility('@updatedPatientGroup_PatientInbox', '@updatedPatientGroup_ListView')
            .checkGroupVisibility('@updatedPatientGroup_TeamInbox', '@updatedPatientGroup_ListView')

        await entry.navigate()
            .validateAuditEntry(testConstants.memberName, 'Group', 'Edit', testConstants.updatedPatientTypeGroup)
    });

    test('Convert Team Group to Patient and team type Group', async () => {
        await group.navigate()
            .openInEditMode('@teamGroupListView')
            .convertGroupType('@patientAndTeamOption', testConstants.updatedTeamTypeGroup, testConstants.newGroupPurpose)

        await channel.enableDisableToggles('@availabilityHoursToggle')
            .pause(2000)
        await group.selectTimezone()

            .createUpdateButton('@updateGroupButton', '@groupUpdateSuccessMessage')
            .checkGroupVisibility('@updatedTeamGroup_PatientInbox', '@updatedTeamGroup_ListView')
            .checkGroupVisibility('@updatedTeamGroup_TeamInbox', '@updatedTeamGroup_ListView')

        await entry.navigate()
            .validateAuditEntry(testConstants.memberName, 'Group', 'Edit', testConstants.updatedTeamTypeGroup)
    });

    test('Add Channel Routes to Patient And Team Type Group', async () => {
        await group.navigate()
            .openInEditMode('@patientAndTeamGroupListView')
            .addChannel()

        await channel.navigate()
            .selectChannelCategory('@rhinoSecureType')
            .channelDetails(testConstants.patientAndTeamGroupChannel, testConstants.newGroupPurpose, testConstants.timeZone)

        await route.selectGroupRoute()
            .routeSearch('@groupInput', testConstants.patientAndTeamType, '@patientAndTeamGroupResult')

        await channel.createUpdateChannel('@createChannelButton', 'Create Channel button is visible')
            .pause(1000)
            .checkSuccessMessage('@channelCreateSuccessMessage')
    });
});
