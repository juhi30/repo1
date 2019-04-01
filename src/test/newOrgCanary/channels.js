import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Automated Tests: Channels', () => {
    test('login as ccr into the organization', async () => {
        const login = client.page.LoginPage();
        const org = client.page.UniversalElements();

        await login.navigate()
            .enterCSRCreds(testConstants.ccrLogin, testConstants.ccrPassword)
            .submit()
            .pause(2000)
            .validateUrlChange('/selectorg')

        await org.searchForOrganization(testConstants.orgName)
            .ccrOrgLogin()
            .pause(2000)
    });

    test('Required Fields and validations', async () => {
        const channel = client.page.ChannelsPage();
        const field = client.page.ChannelsCreateEditPage();


        await channel.navigate()
        await channel.pause(5000)
        await channel.validateChannelsEls()

        await field.navigate()
            .selectChannelCategory('@newPhoneType')
            .createUpdateChannel('@createChannelButton', 'Create Channel button is visible.')
            .verifyValidations('@channelNameValidation')
            .verifyValidations('@timezoneValidation')
            .verifyValidations('@channelRouteValidation')

        await field.navigate()
            .selectChannelCategory('@rhinoSecureType')
            .createUpdateChannel('@createChannelButton', 'Create Channel button is visible.')
            .verifyValidations('@channelNameValidation')
            .verifyValidations('@timezoneValidation')
            .verifyValidations('@channelRouteValidation')
    });

    test('Channel CRUDing - New Phone type channel creation with member Route', async () => {
        const channel = client.page.ChannelsPage();
        const newPhone = client.page.ChannelsCreateEditPage();
        const route = client.page.ChannelRouteMemberContainer();

        await channel.navigate()
            .validateChannelsEls()

        await newPhone.navigate()
            .validateCreateEls()
            .selectChannelCategory('@newPhoneType')
            .pause(2000)
            .addNumber(testConstants.numberForNewPhoneChannel, testConstants.forwardingNumber)
            .verifyChannelCreation(testConstants.channelName, testConstants.channelPurpose, testConstants.timeZone)

        await route.routeSearch('@memberInput', testConstants.memberFirstName, '@memberResult')
            .pause(2000)

        await newPhone.createUpdateChannel('@createChannelButton', 'Create Channel button is visible.')
            .checkSuccessMessage('@channelCreateSuccessMessage')
    });

    test('Channel CRUDing - Rhinosecure channel creation with group route', async () => {
        const channel = client.page.ChannelsPage();
        const rhino = client.page.ChannelsCreateEditPage();
        const route = client.page.ChannelRouteMemberContainer();

        await channel.navigate()
            .validateChannelsEls()

        await rhino.navigate()
            .validateCreateEls()
            .selectChannelCategory('@rhinoSecureType')
            .verifyChannelCreation(testConstants.rhinoChannelName, testConstants.channelPurpose, testConstants.timeZone)

        await route.selectGroupRoute()
            .routeSearch('@groupInput', testConstants.groupName, '@groupResult')
            .pause(2000)

        await rhino.createUpdateChannel('@createChannelButton', 'Create Channel button is visible.')
            .checkSuccessMessage('@channelCreateSuccessMessage')
            .pause(2000)
    });

    test('Channel Edit - New phone type', async () => {
        const channel = client.page.ChannelsPage();
        const update = client.page.ChannelsCreateEditPage();

        await channel.navigate()

            .channelEditMode('@channelTitle')

        await update.verifyChannelUpdation(testConstants.newChannelName, testConstants.newPurpose)
            .enableDisableToggles('@availabilityHoursToggle')
            .enableDisableToggles('@webFormAddOnnToggle')

        update.createUpdateChannel('@updateChannelButton', 'update channel button is visible.')
            .checkSuccessMessage('@channelUpdateSuccessMessage')
    });

    test('Channel Edit - Rhinosecure', async () => {
        const channel = client.page.ChannelsPage();
        const update = client.page.ChannelsCreateEditPage();

        await channel.navigate()
            .channelEditMode('@rhinoSecureChannelTitle')

        await update.verifyChannelUpdation(testConstants.rhinoChannelNewName, testConstants.newPurpose)
            .enableDisableToggles('@availabilityHoursToggle')
            .pause(2000)
            .createUpdateChannel('@updateChannelButton', 'update channel button is visible.')
            .checkSuccessMessage('@channelUpdateSuccessMessage')
    });

    test('Channel Deletion', async () => {
        const channel = client.page.ChannelsPage();
        const deletechannel = client.page.ChannelsCreateEditPage();

        await channel.navigate()
            .channelEditMode('@updatedChannelTitle')

        await deletechannel.deleteChannels()
            .pause(2000)
        await channel.navigate()
            .channelEditMode('@updatedRhinoSecureChannelTitle')

        await deletechannel.deleteChannels()
    });
});