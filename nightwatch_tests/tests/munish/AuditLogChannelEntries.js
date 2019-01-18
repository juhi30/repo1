module.exports = {

    'Login with Member Credentials': function (client) {
        const login = client.page.LoginPage();

        login.navigate()
            .enterMemberCreds('newm1', 'Test@123')
            .pause(1000)
            .submit()
            .pause(1000)
            .validateUrlChangeMember();
    },

    'Verify the Audit log entry when user adds channels of Rhino secure type': function (client) {
        const createChannel = client.page.ChannelsPage();
        const route = client.page.ChannelRouteMemberContainer();
        const create = client.page.ChannelsCreateEditPage();
        const auditLogs = client.page.AuditLogsPage();

        createChannel.navigate()
            .navigateToCreateChannels()
        create.createNewSecureChannel()
            .pause(5000)
        route.selectDefaultRoutes('m 1')
        create.clickCreateChannel()
        auditLogs.navigate()
            .validateUrlChange()
            .pause(5000)
            .checkAuditEntry()

    },


}