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

        ooo.validateCreateEventButton()
            .selectDate('@fromDateInput', '09/29/2018')
            .selectTime('@fromTimeInput', '12:00am')
            .selectDate('@toDateInput', '09/29/2019')
            .selectTime('@toTimeInput', '11:59pm')
            .createEvent()
            .deleteEvent()
            .pause(5000)
      

    },

    'Logout': function (client) {
        const test = client.page.UniversalElements();
    
        test.clickLogout()

    },

}  