module.exports = {

    'Login Page with Member Credentials': function (client) {
        const login = client.page.LoginPage();

        login.navigate()
            .enterMemberCreds('plm', 'Test@123')
            .submit()
            .validateUrlChange();
    },

    'Navigate to Out Of Office Page and verify OOO page accessibility': function (client) {
        const ooo = client.page.OutOfOfficePage();

        ooo.navigate()
            .validateUrlChange()
            .pause(5000)
    },

    'Create And Delete Event': function (client) {
        const ooo = client.page.OutOfOfficePage();

        ooo.validateCreateOOOEvent()
             .createEvent()
            .editEvent()
            .deleteEvent()
            .pause(5000)
       },

    'Logout': function (client) {
        const test = client.page.UniversalElements();
    
        test.clickLogout()
     },
}  