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
            .updateDetails('@titleInput', 'Test Event')
            .updateDetails('@messageTextArea', 'Test Event Message')
            .updateDetails('@fromDateInput', '09/29/2020')
            .updateDetails('@toDateInput', '09/30/2020')
            .updateDetails('@fromTimeInput', '12:00am')
            .updateDetails('@toTimeInput', '12:00am')
            .selectChannel()
            .submit('@createEventButton', '@eventCreateSuccessMessage')
    },

    'Update the Event Details ': function(client) {
        const ooo = client.page.OutOfOfficePage();

        ooo.openOOOPage('@editOOOEvent', '@editEventPageHeader')
            .updateDetails('@titleInput', 'Edited_Title')
            .updateDetails('@messageTextArea', 'New Test Event Sample')
            .updateDetails('@fromDateInput', '10/28/2019')
            .updateDetails('@fromTimeInput', '12:00am')
            .updateDetails('@toDateInput', '10/28/2020')
            .updateDetails('@toTimeInput', '11:00am')
            .submit('@updateEventButton', '@eventUpdateSuccessMessage')
            .waitForElementPresent('@editedTitle', 10000, 'Edited Title visible')
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