
import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');
describe(' Automated Test Cases - Groups', () => {
    
    const group = client.page.GroupsPage(),
        route = client.page.ChannelRouteMemberContainer(),
        entry = client.page.AuditLogsPage(),
        channel = client.page.ChannelsCreateEditPage(),
        channelList = client.page.ChannelsPage();

    test('Create Groups - Patient Type', async () => {

        await group.navigate()
            .verifyGroupEls()
            .selectGroupType('@patientOption')
            .addGroupDetails(testConstants.patientTypeGroup, testConstants.purpose)

        route.routeSearch('@memberInput', testConstants.memberName, '@memberResult')

        group.createUpdateButton('@createGroupButton', '@groupCreateSuccessMessage')
            .checkGroupVisibility('@patientGroup', '@patientGroupListView')

        await entry.navigate()
            .validateAuditEntry(testConstants.memberName, 'Group', 'Add', testConstants.patientTypeGroup)

    });

    test('Add Channel Routes to patient Type Group', async () => {
        await group.navigate()
            .openInEditMode('@patientGroupListView')
            .addChannel()
            .pause(500)
            .verify.urlContains('channels', 'Channel Page is opened')

        channelList.waitForElementVisible('@addChannelButton', 'Created Channel button is visible')
            .click('@addChannelButton')

        channel.selectChannelCategory('@rhinoSecureType')
            .channelDetails(testConstants.patientGroupChannel, testConstants.newGroupPurpose, testConstants.timeZone)

        route.selectGroupRoute()
            .routeSearch('@groupInput', testConstants.patientTypeGroup, '@patientGroupResult')

        channel.createUpdateChannel('@createChannelButton', 'Create Channel button is visible')
            //.pause(1000)
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

        route.routeSearch('@memberInput', testConstants.memberName, '@memberResult')

        group.createUpdateButton('@createGroupButton', '@groupCreateSuccessMessage')
            .checkGroupVisibility('@patientAndTeamGroup_PatientInbox', '@patientAndTeamGroupListView')
            .checkGroupVisibility('@patientAndTeamGroup_TeamInbox', '@patientAndTeamGroupListView')

        await entry.navigate()
            .validateAuditEntry(testConstants.memberName, 'Group', 'Add', testConstants.patientAndTeamType)
    });

    test('Convert Patient Group to Patient and team type Group', async () => {
        await group.navigate()
            .openInEditMode('@patientGroupListView')
            .convertGroupType('@patientAndTeamOption', testConstants.updatedPatientTypeGroup, testConstants.newGroupPurpose)

        channel.enableDisableToggles('@availabilityHoursToggle')
            .pause(2000)
        group.selectTimezone()

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

        channel.enableDisableToggles('@availabilityHoursToggle')
            .pause(2000)
        group.selectTimezone()

            .createUpdateButton('@updateGroupButton', '@groupUpdateSuccessMessage')
            .checkGroupVisibility('@updatedTeamGroup_PatientInbox', '@updatedTeamGroup_ListView')
            .checkGroupVisibility('@updatedTeamGroup_TeamInbox', '@updatedTeamGroup_ListView')

        await entry.navigate()
            .validateAuditEntry(testConstants.memberName, 'Group', 'Edit', testConstants.updatedTeamTypeGroup)
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
    //         .channelDetails(testConstants.patientAndTeamGroupChannel, testConstants.newGroupPurpose, testConstants.timeZone)

    //     route.selectGroupRoute()
    //         .routeSearch('@groupInput', testConstants.patientAndTeamType, '@patientAndTeamGroupResult')

    //     channel.createUpdateChannel('@createChannelButton', 'Create Channel button is visible')
    //         .pause(1000)
    //         .checkSuccessMessage('@channelCreateSuccessMessage')
    // });
});
