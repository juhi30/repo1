module.exports = {

    'Login Page with Member Credentials': function(client) {
        const login = client.page.LoginPage();

        login.navigate()
            .enterMemberCreds('testmkd1', 'Test@123')
            .submit()
            .validateUrlChange();
    },

    'Navigate to Out Of Office Page and verify OOO page accessibility': function(client) {
        const ooo = client.page.OutOfOfficePage();

        ooo.navigate()
            .validateUrlChange()
            .pause(3000)
    },

    'Verify OOO Elements - Add Button': function(client) {
        const ooo = client.page.OutOfOfficePage();

        ooo.verifyCreateOOOEventButton()
    },

    'Create OOO Event': function(client) {
        const ooo = client.page.OutOfOfficePage();

        ooo.openOOOPage('@addOOOEventButton', '@createEventPageHeader')
            .createEvent()
    },

    'Update the Event Details ': function(client) {
        const ooo = client.page.OutOfOfficePage();

        ooo.openOOOPage('@editOOOEvent', '@editEventPageHeader')
			.updateEvent()
    },

    'Verify Event Deletion': function(client) {
        const ooo = client.page.OutOfOfficePage();

        ooo.openOOOPage('@editOOOEvent', '@editEventPageHeader')
            .deleteEvent();
    },

    'Logout': function(client) {
        const test = client.page.UniversalElements();

        test.clickLogout()
    },
}  
